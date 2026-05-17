'use client';
import Image from 'next/image';

interface SectionProps {
    title: string;
    image: string;
    content: string;
    createdAt: Date;
}

const Section = ({ title, image, content, createdAt }: SectionProps) => {
    return (
        <div className="flex justify-center p-2">
            <div className="max-w-3xl w-full">
                <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
                <div className="relative w-full mb-6">
                    <Image
                        src={image}
                        title={title}
                        alt={title}
                        width={500}
                        height={300}
                        sizes="(max-width: 768px) 100vw, 768px"
                        // w-full makes it span the container, h-auto keeps the aspect ratio
                        className="w-full h-auto rounded-lg"
                    />
                </div>

                <p className="text-lg leading-relaxed justify-center">{content}</p>
            </div>
        </div>
    );
};

export default Section;