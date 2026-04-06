'use client';

import { useEffect, useState } from "react";
import {useLocale, useTranslations} from "next-intl";
import BlogFilter from "@/components/Blogs/Filter";
import {Blog} from "@/types/blog"
import BlogList from "@/components/Blogs/BlogList";

export default function Blogs() {
    const t = useTranslations('Blog');
    const b = useTranslations('Blog');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const locale = useLocale();


    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
                const data = await res.json();
                setBlogs(data);
                setFilteredBlogs(data);
            } catch (err) {
                console.error("Ошибка загрузки:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    return (
        <div>
            {/* Hero Banner - Editorial Magazine Style */}
            <div className="relative w-full min-h-[60vh] md:min-h-[65vh] overflow-hidden">
                {/* Background with Diagonal Split Effect */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{backgroundImage: "url('/surf.webp')"}}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#C87941]/85 via-[#E8B887]/65 to-[#2A4393]/75"></div>
                    </div>

                    {/* Decorative Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10"
                         style={{
                             backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)`
                         }}></div>

                    {/* Floating Orbs */}
                    <div className="absolute top-1/4 right-1/4 w-48 h-48 md:w-72 md:h-72 rounded-full opacity-30 blur-3xl"
                         style={{ background: 'radial-gradient(circle, #2A4393 0%, transparent 70%)' }}></div>
                    <div className="absolute bottom-1/3 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-20 blur-3xl"
                         style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
                    <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-sm"
                             style={{
                                 background: 'rgba(255, 255, 255, 0.15)',
                                 border: '1px solid rgba(255, 255, 255, 0.2)'
                             }}>
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                            <span className="text-white text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase font-medium font-raleway">
                                {b('banner-badge')}
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight font-raleway">
                            {b('banner-title-1')}
                            <br/>
                            <span className="italic font-light">{b('banner-title-2')}</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base md:text-lg lg:text-xl text-white/95 max-w-3xl leading-relaxed font-nunito">
                            {b('banner-subtitle')}
                        </p>

                        {/* Accent Bar */}
                        <div className="flex items-center gap-3 md:gap-4 pt-2">
                            <div className="h-0.5 md:h-1 w-16 md:w-24 rounded-full bg-white"></div>
                            <div className="h-0.5 md:h-1 w-8 md:w-12 rounded-full bg-white/60"></div>
                            <div className="h-0.5 md:h-1 w-6 md:w-8 rounded-full bg-white/30"></div>
                        </div>
                    </div>
                </div>

                {/* Bottom Wave Transition */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-12 md:h-16 lg:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z" fill="white" opacity="0.1"/>
                        <path d="M0,80 Q300,20 600,80 T1200,80 L1200,120 L0,120 Z" fill="white" opacity="0.2"/>
                        <path d="M0,90 Q300,40 600,90 T1200,90 L1200,120 L0,120 Z" fill="white"/>
                    </svg>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 -mt-4 md:-mt-8 relative z-20">
                <div className="p-4 md:p-8">
                    <BlogFilter
                        blogs={blogs}
                        setFilteredBlogs={setFilteredBlogs}
                        setCurrentPage={setCurrentPage}/>

                    <BlogList
                        lang={locale}
                        blogs={filteredBlogs}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}
