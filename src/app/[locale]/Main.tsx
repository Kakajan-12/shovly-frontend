'use client'

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Main = () => {
    const [slides, setSlides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const locale = useLocale();
    const t = useTranslations("Tours");

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders`);
                if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
                const data = await response.json();
                setSlides(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSlides();
    }, []);

    const getLocalized = (slide: any, field: "title" | "text") =>
        slide[`${field}_${locale}`] || slide[`${field}_en`] || slide[`${field}_tk`] || "";

    const getFixedImageUrl = (path: string) => {
        if (!path) return "";
        return (
            process.env.NEXT_PUBLIC_API_URL!.replace(/\/+$/, "") +
            "/" +
            path.replace(/\\/g, "/").replace(/^(\.\.\/)+/, "").replace(/^\/+/, "")
        );
    };

    const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#2A4393] to-[#3E74B4]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white font-nunito">Loading experiences...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <p className="text-red-500 text-xl font-raleway">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    dynamicBullets: false,
                }}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop={true}
                speed={1500}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-full"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={slide.id}>
                        <div className="w-full h-full relative">
                            {/* Background Image with Ken Burns effect */}
                            <div className="absolute inset-0 overflow-hidden">
                                <Image
                                    src={getFixedImageUrl(slide.image)}
                                    alt={stripHtml(getLocalized(slide, "title"))}
                                    fill
                                    priority={idx === 0}
                                    className="object-cover scale-110 animate-ken-burns"
                                />
                            </div>

                            {/* Multi-layer Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#2A4393]/40 via-transparent to-[#C87941]/30"></div>

                            {/* Decorative Elements */}
                            <div className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
                                 style={{ background: 'radial-gradient(circle, #E8B887 0%, transparent 70%)' }}></div>
                            <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
                                 style={{ background: 'radial-gradient(circle, #2A4393 0%, transparent 70%)' }}></div>

                            {/* Content Container */}
                            <div className="absolute inset-0 flex items-center pt-20 md:pt-24">
                                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                                    <div className="max-w-4xl">
                                        <AnimatePresence mode="wait">
                                            {activeIndex === idx && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 60 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -60 }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                    className="space-y-4 md:space-y-6"
                                                >
                                                    {/* Eyebrow */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -40 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.8, delay: 0.2 }}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md"
                                                        style={{
                                                            background: 'rgba(255, 255, 255, 0.15)',
                                                            border: '1px solid rgba(255, 255, 255, 0.25)'
                                                        }}
                                                    >
                                                        <svg className="w-4 h-4 text-[#E8B887]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                        </svg>
                                                        <span className="text-white/95 text-xs tracking-[0.2em] uppercase font-medium font-raleway">
                                                            Featured Experience
                                                        </span>
                                                    </motion.div>

                                                    {/* Title */}
                                                    <motion.h1
                                                        initial={{ opacity: 0, y: 40 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.8, delay: 0.3 }}
                                                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] font-raleway"
                                                        style={{
                                                            textShadow: '0 4px 24px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)'
                                                        }}
                                                    >
                                                        {stripHtml(getLocalized(slide, "title"))}
                                                    </motion.h1>

                                                    {/* Decorative Accent */}
                                                    <motion.div
                                                        initial={{ opacity: 0, scaleX: 0 }}
                                                        animate={{ opacity: 1, scaleX: 1 }}
                                                        transition={{ duration: 0.8, delay: 0.4 }}
                                                        className="flex items-center gap-2 origin-left"
                                                    >
                                                        <div className="h-1 w-16 rounded-full"
                                                             style={{ background: 'linear-gradient(90deg, #E8B887 0%, #C87941 100%)' }}></div>
                                                        <div className="h-1 w-8 rounded-full bg-white/60"></div>
                                                        <div className="h-1 w-4 rounded-full bg-white/40"></div>
                                                    </motion.div>

                                                    {/* Description */}
                                                    <motion.p
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.8, delay: 0.5 }}
                                                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-2xl leading-relaxed font-light font-nunito"
                                                        style={{
                                                            textShadow: '0 2px 12px rgba(0,0,0,0.4)'
                                                        }}
                                                    >
                                                        {stripHtml(getLocalized(slide, "text"))}
                                                    </motion.p>

                                                    {/* CTA Button */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.8, delay: 0.6 }}
                                                    >
                                                        <Link
                                                            href={`/${locale}/tours/${slide.tour_id}`}
                                                            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-base backdrop-blur-md transition-all duration-500 hover:gap-5 hover:shadow-2xl font-raleway"
                                                            style={{
                                                                background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)',
                                                                boxShadow: '0 8px 32px rgba(200, 121, 65, 0.4)'
                                                            }}
                                                        >
                                                            <span>{t('view')}</span>
                                                            <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
                                                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                                                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                            </svg>
                                                        </Link>
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Gradient Vignette */}
                            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Pagination Styling */}
            <style jsx global>{`
                .swiper-pagination {
                    bottom: 32px !important;
                    z-index: 100 !important;
                    text-align: center !important;
                }

                .swiper-pagination-bullet {
                    width: 10px !important;
                    height: 10px !important;
                    background: rgba(255, 255, 255, 0.7) !important;
                    opacity: 1 !important;
                    margin: 0 4px !important;
                    border-radius: 50% !important;
                    transition: all 0.3s ease !important;
                    display: inline-block !important;
                    vertical-align: middle !important;
                }

                .swiper-pagination-bullet-active {
                    background: #C87941 !important;
                    width: 30px !important;
                    border-radius: 5px !important;
                }

                @keyframes ken-burns {
                    0% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1.2);
                    }
                }

                .animate-ken-burns {
                    animation: ken-burns 20s ease-out infinite alternate;
                }
            `}</style>
        </div>
    );
};

export default Main;
