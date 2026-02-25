"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';

const galleryImages = [
    {
        id: 1,
        src: "/about1.webp",
        height: 400,
        alt: "Gallery image 1"
    },
    {
        id: 2,
        src: "/about2.webp",
        height: 300,
        alt: "Gallery image 2"
    },
    {
        id: 3,
        src: "/about3.webp",

        height: 450,
        alt: "Gallery image 3"
    },
    {
        id: 4,
        src: "/images/gallery-4.jpg",
        height: 350,
        alt: "Gallery image 4"
    },
    {
        id: 5,
        src: "/images/gallery-5.jpg",
        height: 380,
        alt: "Gallery image 5"
    },
    {
        id: 6,
        src: "/images/gallery-6.jpg",
        height: 420,
        alt: "Gallery image 6"
    },
    {
        id: 7,
        src: "/images/gallery-7.jpg",
        height: 320,
        alt: "Gallery image 7"
    },
    {
        id: 8,
        src: "/images/gallery-8.jpg",
        height: 400,
        alt: "Gallery image 8"
    }
];

export default function Gallery() {
    const t = useTranslations('Gallery');
    return (
        <section className="py-20 relative overflow-hidden my-container">
            <div className="absolute top-0 -right-40 h-full w-full pointer-events-none opacity-30">
                <Image
                    src="/icon.png"
                    alt=""
                    width={600}
                    height={600}
                    className="absolute top-0 right-0"
                    aria-hidden="true"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row justify-center items-start lg:items-end gap-8 mb-12">
                    <div className="max-w-5xl">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-raleway text-center">
                            {t('gallery-title')}
                        </h2>
                        <p className="text-gray-600 text-lg font-nunito text-center">
                            {t('gallery-text')}
                        </p>
                    </div>
                </div>

                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                    {galleryImages.map((image) => (
                        <div
                            key={image.id}
                            className="mb-4 break-inside-avoid rounded-lg overflow-hidden 
                                     cursor-pointer group relative"
                        >
                            <div className="relative overflow-hidden rounded-lg">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={400}
                                    height={image.height}
                                    className="w-full object-cover transition-transform duration-500 
                                             group-hover:scale-110"
                                    style={{ height: `${image.height}px` }}
                                />

                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20
                                              transition-colors duration-300" />
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}