'use client';
import { useEffect } from 'react';
import Image from 'next/image';

interface SectionProps {
    title: string;
    image: string;
    content: string;
}

const Section = ({ title, image, content }: SectionProps) => {
 
    return (
        <div className="flex justify-center p-2">
            <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                {/* <div className="relative w-full mb-6">
                    <iframe
                        src={image}
                        title={title}
                        className="w-full h-64 rounded-lg"
                    />
                </div> */}
                <div className="relative w-full mb-6">
                    <Image
                        src={image}
                        title={title}
                        className="w-full h-64 rounded-lg"
                        alt={title}
                        layout="responsive"
                        objectFit="cover"
                        width={500}
                        height={300}
                    />
                </div>
                <p className="text-lg leading-relaxed">{content}</p>
            </div>
        </div>
    );
};

export default Section;