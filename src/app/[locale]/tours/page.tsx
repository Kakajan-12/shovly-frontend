'use client';

import { useEffect, useState } from "react";
import {useLocale, useTranslations} from "next-intl";
import Filter from "@/components/Tours/Filter";
import Tours from "@/components/Tours/Tours";
import {Tour} from "@/types/tour"

export default function TourPage() {
    const t = useTranslations('Tour');
    const [tours, setTours] = useState<Tour[]>([]);
    const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const locale = useLocale();


    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours`);
                const data = await res.json();
                setTours(data);
                setFilteredTours(data);
            } catch (err) {
                console.error("Ошибка загрузки туров:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    return (
        <div>
            {/* Hero Banner - Cinematic Editorial Style */}
            <div className="relative w-full min-h-[60vh] md:min-h-[70vh] overflow-hidden">
                {/* Background Image with Parallax Effect */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{backgroundImage: "url('/tour.webp')"}}
                >
                    {/* Multi-layer Gradient Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2A4393]/85 via-[#2A4393]/65 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Decorative Geometric Elements */}
                    <div className="absolute top-20 right-10 w-48 h-48 md:w-64 md:h-64 rounded-full opacity-20 blur-3xl"
                         style={{ background: 'radial-gradient(circle, #E8B887 0%, transparent 70%)' }}></div>
                    <div className="absolute bottom-20 left-10 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-10 blur-3xl"
                         style={{ background: 'radial-gradient(circle, #C87941 0%, transparent 70%)' }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
                    <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
                        {/* Eyebrow */}
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="h-px w-12 md:w-16 bg-gradient-to-r from-[#C87941] to-transparent"></div>
                            <span className="text-[#E8B887] text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase font-medium font-raleway">
                                {t('banner-eyebrow')}
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight font-raleway">
                            {t('banner-title-1')}<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8B887] to-white">
                                {t('banner-title-2')}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl font-light leading-relaxed font-nunito">
                            {t('banner-subtitle')}
                        </p>

                        {/* Decorative Accent */}
                        <div className="pt-2 md:pt-4">
                            <div className="w-20 md:w-32 h-1 md:h-1.5 rounded-full"
                                 style={{ background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)' }}></div>
                        </div>
                    </div>
                </div>

                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 -mt-8 md:-mt-16 relative z-20">
                <div className="p-4 md:p-8">
                    <Filter
                        tours={tours}
                        setFilteredTours={setFilteredTours}
                        setCurrentPage={setCurrentPage}
                    />
                    <Tours
                        lang={locale}
                        tours={filteredTours}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}
