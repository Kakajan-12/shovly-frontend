"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";
import Image from "next/image";

interface GalleryItem {
    id: number;
    image: string;
    is_gallery: number;
}

interface ImageItem {
    id: string;
    src: string;
    height: number;
}

export default function Gallery() {
    const t = useTranslations("Gallery");
    const [images, setImages] = useState<ImageItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const [blogRes, tourRes] = await Promise.all([
                    axios.get<GalleryItem[]>(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/blog-gallery`
                    ),
                    axios.get<GalleryItem[]>(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/tour-gallery`
                    ),
                ]);

                const normalize = (items: GalleryItem[], prefix: string) =>
                    items
                        .filter((i) => i.is_gallery === 1)
                        .map((item) => ({
                            id: `${prefix}-${item.id}`,
                            src: `${process.env.NEXT_PUBLIC_API_URL}/${item.image.replace(
                                /\\/g,
                                "/"
                            )}`,
                            // фиксированные размеры как во 2 компоненте
                            height: [300, 350, 400, 420, 450][
                            item.id % 5
                                ],
                        }));

                setImages([
                    ...normalize(blogRes.data, "blog"),
                    ...normalize(tourRes.data, "tour"),
                ]);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchGallery();
    }, []);

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                {t("error")}: {error}
            </div>
        );
    }

    return (
        <section className="py-20 relative overflow-hidden my-container">
            {/* background icon */}
            <div className="absolute top-0 -right-40 h-full w-full pointer-events-none opacity-30">
                <Image
                    src="/icon.png"
                    alt=""
                    width={600}
                    height={600}
                    className="absolute top-0 right-0"
                    aria-hidden
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* TITLE */}
                <div className="flex flex-col items-center gap-8 mb-12">
                    <div className="max-w-5xl text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-raleway">
                            {t("gallery-title")}
                        </h2>

                        <p className="text-gray-600 text-lg font-nunito">
                            {t("gallery-text")}
                        </p>
                    </div>
                </div>

                {/* GALLERY */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="mb-4 break-inside-avoid rounded-lg overflow-hidden
                         cursor-pointer group relative"
                        >
                            <div className="relative overflow-hidden rounded-lg">
                                <Image
                                    src={image.src}
                                    alt="gallery"
                                    width={400}
                                    height={image.height}
                                    className="w-full object-cover transition-transform duration-500
                             group-hover:scale-110"
                                    style={{ height: `${image.height}px` }}
                                />

                                {/* hover overlay */}
                                <div
                                    className="absolute inset-0 bg-black/0
                             group-hover:bg-black/20
                             transition-colors duration-300"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}