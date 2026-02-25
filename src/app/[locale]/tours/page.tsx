'use client';

import { useEffect, useState } from "react";
import {useLocale, useTranslations} from "next-intl";
import Filter from "@/components/Tours/Filter";
import Tours from "@/components/Tours/Tours";
import {Tour} from "@/types/tour"

export default function TourPage() {
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
            <div
                className="bg-no-repeat relative w-full bg-cover bg-bottom text-white"
                style={{ backgroundImage: "url('/tour.webp')" }}
            >
                <div className="container mx-auto px-2 flex flex-col h-[350px] justify-center space-y-5">
                </div>
            </div>

            <div className="container mx-auto px-2">

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
