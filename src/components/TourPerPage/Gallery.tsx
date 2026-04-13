'use client';

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

interface Tour {
    id: number;
    [key: string]: any;
}

interface GalleryItem {
    id: number;
    tour_id: number;
    image: string;
}

interface GalleryProps {
    tour: Tour;
}

const Gallery: React.FC<GalleryProps> = ({ tour }) => {
    const t = useTranslations("Tours");
    const tourId = tour.id;

    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tour-gallery`);
                if (!res.ok) throw new Error(t('error-loading-gallery'));

                const data: GalleryItem[] = await res.json();
                setImages(data.filter(item => item.tour_id === tourId));
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, [tourId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 my-8">
                <div className="text-center text-red-500">
                    <p className="font-raleway font-bold mb-2">{t('error-loading-gallery')}</p>
                    <p className="font-nunito text-sm">{error}</p>
                </div>
            </div>
        );
    }

    if (!images.length) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full bg-white py-12 md:py-16 lg:py-20"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col mb-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                        {t("gallery")}
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#336B7B] to-[#C87941]"></div>
                </div>

                <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((item, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 aspect-square"
                            >
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${item.image}`}
                                    alt={`gallery-${index}`}
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Gallery;
