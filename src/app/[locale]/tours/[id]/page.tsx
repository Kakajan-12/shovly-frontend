'use client';

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Booking from "@/components/TourPerPage/Booking";
import Route from "@/components/TourPerPage/Route";
import Includes from "@/components/TourPerPage/Includes";
import Gallery from "@/components/TourPerPage/Gallery";

interface Tour {
    id: number;
    title_en: string;
    title_ru: string;
    title_tk: string;
    price: number;
    image: string;
    duration_en: string;
    duration_ru: string;
    duration_tk: string;
    [key: string]: any;
}

const TourPage = () => {
    const params = useParams();
    const id = params?.id;
    const t = useTranslations('TourDetail');
    const [tour, setTour] = useState<Tour | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const bookingRef = useRef(null);
    const routeRef = useRef(null);
    const includesRef = useRef(null);
    const galleryRef = useRef(null);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${id}`);
                if (!res.ok) throw new Error(t('error-loading'));
                const data = await res.json();
                setTour(data);
            } catch (err: any) {
                setError(err.message || t('error-generic'));
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchTour();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#C87941] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-gray-600 font-nunito text-lg">{t('loading')}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                         style={{ background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)' }}>
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <p className="text-gray-900 text-xl font-raleway font-bold mb-2">{t('error-loading')}</p>
                    <p className="text-gray-600 font-nunito">{error}</p>
                </div>
            </div>
        );
    }

    if (!tour) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                         style={{ background: 'linear-gradient(135deg, #2A4393 0%, #3E74B4 100%)' }}>
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <p className="text-gray-900 text-xl font-raleway font-bold mb-2">{t('not-found')}</p>
                    <p className="text-gray-600 font-nunito">The tour you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Hero Section with Booking */}
            <div ref={bookingRef}>
                <Booking tour={tour} />
            </div>

            {/* Gallery Section */}
            <div ref={galleryRef}>
                <Gallery tour={tour}/>
            </div>

            {/* Route/Itinerary Section */}
            <motion.div
                ref={routeRef}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gradient-to-b from-white to-gray-50 py-20 md:py-16 scroll-mt-24"
            >
                <Route tour={tour} />
            </motion.div>

            {/* Includes/Excludes Section */}
            <motion.div
                ref={includesRef}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gradient-to-b from-gray-50 to-white scroll-mt-24"
            >
                <Includes tour={tour}/>
            </motion.div>
        </div>
    );
};

export default TourPage;
