'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import {Tour} from "@/types/tour"
import {useTranslations} from "next-intl";

interface ToursProps {
    tours: Tour[];
    loading: boolean;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    lang: string;
}

const Tours: React.FC<ToursProps> = ({ tours, loading, currentPage, setCurrentPage, lang }) => {
    const t = useTranslations("Pagination")
    const tour = useTranslations("Tour")
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
        return <p className="text-center py-10 text-gray-500">Loading tours...</p>;
    }

    const totalPages = Math.ceil(tours.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTours = tours.slice(startIndex, startIndex + itemsPerPage);

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
                {currentTours.map((item) => {
                    const title = item[`title_${lang}` as keyof Tour] as string;
                    const duration = item[`duration_${lang}` as keyof Tour];
                    const type = item[`type_${lang}` as keyof Tour];
                    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${item.image}`;

                    return (
                        <Link key={item.id} href={`/tours/${item.id}`} className="group">
                            <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                                 style={{
                                     boxShadow: '0 4px 24px rgba(42, 67, 147, 0.08)',
                                 }}>
                                {/* Image Container with Overlay */}
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        src={imageUrl}
                                        alt={title.replace(/<\/?[^>]+(>|$)/g, "")}
                                        width={400}
                                        height={300}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Price Badge */}
                                    {item.price && (
                                        <div className="absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-white backdrop-blur-md font-raleway"
                                             style={{
                                                 background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)',
                                                 boxShadow: '0 4px 16px rgba(200, 121, 65, 0.3)'
                                             }}>
                                            <span className="flex items-center gap-1">
                                                <PiCurrencyDollarBold className="text-lg"/>
                                                {item.price}
                                            </span>
                                        </div>
                                    )}

                                    {/* Decorative Corner */}
                                    <div className="absolute bottom-0 left-0 w-24 h-24 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                         style={{
                                             background: 'linear-gradient(45deg, #2A4393 0%, transparent 70%)'
                                         }}></div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4 flex-grow flex flex-col">
                                    {/* Title */}
                                    <h3
                                        className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight font-raleway min-h-[3.5rem]"
                                        dangerouslySetInnerHTML={{__html: title}}
                                    />

                                    {/* Divider */}
                                    <div className="h-px w-20 rounded-full transition-all duration-500 group-hover:w-full"
                                         style={{ background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)' }}></div>

                                    {/* Meta Information */}
                                    <div className="space-y-3 flex-grow">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                                 style={{ background: 'linear-gradient(135deg, #E8F4FF 0%, #D6EBFF 100%)' }}>
                                                <FaRegCalendarAlt className="text-[#2A4393] text-lg"/>
                                            </div>
                                            <span className="font-medium font-nunito">
                                                {duration} {lang === "ru" ? "дн." : lang === "tk" ? "gün" : "days"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 text-gray-600">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                                 style={{ background: 'linear-gradient(135deg, #FFF5EE 0%, #FFE8D6 100%)' }}>
                                                <IoPersonOutline className="text-[#C87941] text-xl"/>
                                            </div>
                                            <span className="text-sm font-nunito">
                                                {type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* View Details Link */}
                                    <div className="pt-2">
                                        <div className="flex items-center gap-2 text-[#2A4393] font-medium group-hover:gap-4 transition-all duration-300 font-raleway">
                                            <span>{tour('view-details')}</span>
                                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                : "bg-white text-[#2A4393] border-2 border-[#2A4393] hover:bg-[#2A4393] hover:text-white shadow-md hover:shadow-lg"
                        }`}
                    >
                        {t('prev')}
                    </button>

                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`w-12 h-12 rounded-full text-sm font-bold transition-all duration-300 font-raleway ${
                                    currentPage === index + 1
                                        ? "text-white shadow-lg scale-110"
                                        : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md"
                                }`}
                                style={currentPage === index + 1 ? {
                                    background: 'linear-gradient(135deg, #2A4393 0%, #3E74B4 100%)'
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
                                : "bg-white text-[#2A4393] border-2 border-[#2A4393] hover:bg-[#2A4393] hover:text-white shadow-md hover:shadow-lg"
                        }`}
                    >
                        {t('next')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Tours;
