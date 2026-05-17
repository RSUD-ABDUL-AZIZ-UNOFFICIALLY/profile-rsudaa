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
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={() => setPreviewOpen(false)} // Tutup saat klik background (di luar gambar)
                >
                    {/* Tombol Tutup (X) */}
                    <button
                        className="absolute top-6 right-6 text-white hover:text-gray-300 text-5xl leading-none z-[60] transition-colors"
                        onClick={() => setPreviewOpen(false)}
                        aria-label="Tutup pratinjau"
                    >
                        &times;
                    </button>

                    {/* Wrapper Gambar (hentikan event klik agar tidak menutup modal saat gambar diklik) */}
                    <div
                        className="relative flex flex-col items-center justify-center w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={image}
                            alt="Pratinjau Dokumen"
                            className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                        />

                        {/* Hint Text */}
                        <p className="text-white/80 mt-6 text-sm md:text-base font-light tracking-wide bg-black/30 px-4 py-2 rounded-full">
                            Klik di luar atau tekan <kbd className="font-sans bg-white/20 px-2 py-0.5 rounded text-white">Esc</kbd> untuk menutup
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ArtikelPage;