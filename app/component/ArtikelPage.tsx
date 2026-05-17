'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ArtikelPageProps {
    title: string;
    image: string;
    content: string;
    createdAt: Date;
}

const ArtikelPage = ({ title, image, content, createdAt }: ArtikelPageProps) => {
    const [previewOpen, setPreviewOpen] = useState(false);

    const formattedDate = new Date(createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    // Close preview on Escape key
    useEffect(() => {
        if (!previewOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setPreviewOpen(false);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [previewOpen]);

    // Prevent body scroll when preview is open
    useEffect(() => {
        document.body.style.overflow = previewOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [previewOpen]);

    return (
        <>
            <article className="min-h-screen bg-white py-16 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Title */}
                    <h1 className="text-4xl md:text-4xl font-bold leading-tight tracking-tight text-primary mb-10">
                        {title}
                    </h1>

                    {/* Hero image — clickable */}
                    <figure className="mb-10 -mx-4 md:-mx-12 overflow-hidden rounded-2xl group">
                        <button
                            type="button"
                            onClick={() => setPreviewOpen(true)}
                            className="relative w-full aspect-[16/9] block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            aria-label="Lihat pratinjau foto"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={image}
                                    alt={title}
                                    title={title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    priority
                                />
                            </div>
                            {/* Hover overlay */}
                            <span className="absolute inset-0  transition-colors duration-300 flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                                    🔍 Lihat foto
                                </span>
                            </span>
                        </button>
                        <figcaption className="mt-3 px-4 text-xs text-gray-500 italic text-center">
                            {title}
                        </figcaption>
                    </figure>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2 mb-10">
                        <span className="w-8 h-px bg-primary" />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="w-8 h-px bg-primary" />
                    </div>

                    {/* Content */}
                    <p className=" text-lg leading-relaxed font-normal whitespace-pre-wrap">
                        {content}
                    </p>

                    {/* Footer */}
                    <footer className="mt-16 pt-8 border-t border-primary flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary">
                        <span className="uppercase tracking-widest">Artikel</span>
                        <span>{formattedDate}</span>
                    </footer>

                </div>
            </article>

            {/* Image Preview Modal */}
            {previewOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Pratinjau foto"
                    className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm p-4 animate-fade-in"
                    onClick={() => setPreviewOpen(false)}
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={() => setPreviewOpen(false)}
                        className="absolute top-4 right-4 text-dark hover:text-primary transition-colors rounded-full w-9 h-9 flex items-center justify-center text-xl font-bold z-10"
                        aria-label="Tutup pratinjau"
                    >
                        ×
                    </button>

                    {/* Image container */}
                    <div
                        className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-[70vh]">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                sizes="100vw"
                                className="object-contain"
                                priority
                            />
                        </div>
                        
                    </div>

                    <p className="absolute bottom-4 text-gray-500 left-1/2 -translate-x-1/2  text-xs">
                        Klik di luar atau tekan Esc untuk menutup
                    </p>
                </div>
            )}
        </>
    );
};

export default ArtikelPage;