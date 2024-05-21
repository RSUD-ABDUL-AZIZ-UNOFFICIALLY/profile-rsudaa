'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react'
import sidebarIcon from "../../public/icon/sidebarIcon.svg";
import skwLogo from "../../public/skw.png";
import Sidebar from './Sidebar';
import { motion, useInView, useAnimation } from "framer-motion"
import { TentangKami, PelayananPublik, Karir, DasarHukum, Aplikasi } from './navItem';

const NavigationBar = () => {
    const navbarRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [sidebar, setSidebar] = useState<boolean>(false)
    const motionRef = useRef(null)
    const isInView = useInView(motionRef, { once: true })
    const mainControls = useAnimation()
    const mainControlsDropdown = useAnimation()
    const mainControlsOffDropdown = useAnimation()
    const handleSidebar = (e: boolean) => [
        setSidebar(e)
    ]

    const [hover, setHover] = useState<boolean>(false)
    const onHover = () => {
        setHover(true)
        mainControlsDropdown.start("visible")

    }
    const offHover = () => {
        setHover(false)
        mainControlsDropdown.start("visible")
    }

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const isTop = scrollTop < 10;

            setIsScrolled(!isTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isInView]);

    return (
        <div className={`navigation-bar p-0 ${isScrolled == true ? `bottom` : `top`}`} ref={navbarRef}>
            <div className="nav-left">
                <button onClick={(() => handleSidebar(true))} className="button-sidebar rounded-full button button-transparant">
                    <Image
                        src={sidebarIcon}
                        alt="Picture of the author"
                        className='h-[20px] w-auto'
                    />
                </button>
                <div className="nav-logo h-full">
                    <div className="">
                        <Image
                            src={skwLogo}
                            alt="Picture of the author"
                            className='lg:h-[70px] h-[50px] w-auto'
                        />
                    </div>
                </div>
            </div>
            <Sidebar handleSidebar={handleSidebar} open={sidebar} />
            <div className="nav-right text-sm">
                <motion.div
                    className="nav-menu"
                    ref={motionRef}
                    variants={{
                        hidden: { opacity: 0, y: -75 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 0.5, delay: 0.25 }}
                >
                    <div className="nm-item">
                        <Link className='item' href="/">Dashboard</Link>
                    </div>
                    <div className="nm-item" onMouseEnter={onHover} onMouseLeave={offHover}>
                        <button className='item' >Tentang Kami</button>
                        <div className="dropdown">
                            {TentangKami()}
                        </div>
                    </div>
                    <div className="nm-item">
                        <button className='item' >Pelayanan Publik</button>
                        <div className="dropdown">
                            {PelayananPublik()}
                        </div>
                    </div>
                    <div className="nm-item">
                        <button className='item'>Karir</button>
                        <div className="dropdown">
                            {Karir()}
                        </div>
                    </div>
                    <div className="nm-item">
                        <button className='item' >Aplikasi</button>
                        <div className="dropdown">
                            {Aplikasi()}
                        </div>
                    </div>
                    <div className="nm-item">
                        <button className='item'>Dasar Hukum</button>
                        <div className="dropdown">
                            {DasarHukum()}
                        </div>
                    </div>
                    <div className="nm-item">
                        <Link className='item' href="/laporan-tahunan">Laporan Tahunan</Link>
                    </div>
                    <div className="nm-item">
                        <Link className='item' href="/">Faq</Link>
                    </div>
                </motion.div>
            </div >
        </div >
    )
}

export default NavigationBar