'use client';

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import {Blog} from "@/types/blog"
import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

interface BlogsProps {
    blogs: Blog[];
    loading: boolean;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    lang: string;
}

const BlogList: React.FC<BlogsProps> = ({ blogs, loading, currentPage, setCurrentPage, lang }) => {
    const b = useTranslations("Blog");
    const [itemsPerPage] = useState(6);
    const topRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (topRef.current) {
            const offset = 100;
            const elementPosition = topRef.current.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    }, [currentPage]);

    if (loading) {
        return <p className="text-center py-10 text-gray-500">Loading blogs...</p>;
    }

    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBlogs = blogs.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="space-y-10">
            <div ref={topRef} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentBlogs.map((item, index) => {
                    const title = item[`title_${lang}` as keyof Blog] as string;
                    const text = item[`text_${lang}` as keyof Blog] as string;
                    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${item.image}`;

                    return (
                        <Link key={item.id} href={`/blogs/${item.id}`} className="group">
                            <article className="h-full bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                                     style={{
                                         boxShadow: '0 8px 32px rgba(200, 121, 65, 0.08)'
                                     }}>
                                {/* Image with Overlay */}
                                <div className="relative h-80 overflow-hidden">
                                    <Image
                                        src={imageUrl}
                                        alt={title.replace(/<\/?[^>]+(>|$)/g, "")}
                                        width={400}
                                        height={320}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                                    {/* Date Badge - Positioned Over Image */}
                                    <div className="absolute top-6 left-6">
                                        <div className="px-5 py-3 rounded-2xl backdrop-blur-md font-raleway"
                                             style={{
                                                 background: 'rgba(255, 255, 255, 0.95)',
                                                 boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)'
                                             }}>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold"
                                                     style={{ color: '#C87941' }}>
                                                    {new Date(item.date).getDate()}
                                                </div>
                                                <div className="text-xs uppercase tracking-wider text-gray-600">
                                                    {new Date(item.date).toLocaleDateString('en', { month: 'short' })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-6 right-6">
                                        <div className="px-4 py-2 rounded-full text-xs font-bold text-white backdrop-blur-sm uppercase tracking-wider"
                                             style={{
                                                 background: 'linear-gradient(135deg, #2A4393 0%, #3E74B4 100%)'
                                             }}>
                                            {b('category-travel')}
                                        </div>
                                    </div>

                                    {/* Decorative Corner Accent */}
                                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                         style={{
                                             background: 'linear-gradient(-45deg, #C87941 0%, transparent 70%)'
                                         }}></div>
                                </div>

                                {/* Content */}
                                <div className="p-8 space-y-4">
                                    {/* Title */}
                                    <h3
                                        className="text-2xl font-bold text-gray-900 line-clamp-2 leading-tight font-raleway min-h-[3.5rem] transition-colors duration-300 group-hover:text-[#C87941]"
                                        dangerouslySetInnerHTML={{__html: title}}
                                    />

                                    {/* Decorative Divider */}
                                    <div className="flex items-center gap-2">
                                        <div className="h-px flex-grow transition-all duration-500"
                                             style={{
                                                 background: 'linear-gradient(90deg, #C87941 0%, #E8B887 50%, transparent 100%)'
                                             }}></div>
                                        <div className="w-2 h-2 rounded-full"
                                             style={{ backgroundColor: '#C87941' }}></div>
                                    </div>

                                    {/* Excerpt */}
                                    <p className="text-gray-600 line-clamp-3 leading-relaxed font-nunito"
                                       dangerouslySetInnerHTML={{__html: text}}
                                    />

                                    {/* Read More Link */}
                                    <div className="pt-4">
                                        <div className="inline-flex items-center gap-2 text-[#2A4393] font-semibold group-hover:gap-4 transition-all duration-300 font-raleway">
                                            <span>{b('read-article')}</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="h-1.5 w-full transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                                     style={{
                                         background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)'
                                     }}></div>
                            </article>
                        </Link>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-16 mb-8">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 font-raleway ${
                            currentPage === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-[#C87941] border-2 border-[#C87941] hover:bg-[#C87941] hover:text-white shadow-md hover:shadow-lg"
                        }`}
                    >
                        Prev
                    </button>

                    <div className="flex gap-2">
                        {Array.from({length: totalPages}).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`w-12 h-12 rounded-full text-sm font-bold transition-all duration-300 font-raleway ${
                                    currentPage === index + 1
                                        ? "text-white shadow-lg scale-110"
                                        : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md"
                                }`}
                                style={currentPage === index + 1 ? {
                                    background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)'
                                } : {}}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 font-raleway ${
                            currentPage === totalPages
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-[#C87941] border-2 border-[#C87941] hover:bg-[#C87941] hover:text-white shadow-md hover:shadow-lg"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogList;
