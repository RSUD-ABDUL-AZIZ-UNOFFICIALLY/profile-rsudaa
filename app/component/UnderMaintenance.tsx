import Image from 'next/image'
import React from 'react'
import MaintenanceLogo from "../../public/icon/Maintenance.gif";
const UnderMaintenance = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className="min-h-[30vh] p-14">
                <div className="flex justify-center">
                    <Image alt='' src={MaintenanceLogo} className='h-56 w-fit' />
                </div>
                <div className="text-center font-bold text-primary text-3xl">
                    PAGE UNDER MAINTENANCE
                </div>
            </div>
        </div>
    )
}

export default UnderMaintenance