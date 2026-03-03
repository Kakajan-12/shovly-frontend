'use client';

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

interface VisaItem {
    id: number;
    title_tk: string;
    title_en: string;
    title_ru: string;
    text_tk: string;
    text_en: string;
    text_ru: string;
}

export default function Visas() {
    const [visas, setVisas] = useState<VisaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const lang = useLocale();

    useEffect(() => {
        async function fetchVisas() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visa`);
                const data = await res.json();
                setVisas(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchVisas();
    }, []);

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!visas.length) return <p className="text-center py-10">No data</p>;

    return (
        <div className="container mx-auto px-4 py-20 space-y-16">
            {visas.map((visa, index) => {
                const title = visa[`title_${lang}` as keyof VisaItem] as string;
                const text = visa[`text_${lang}` as keyof VisaItem] as string;

                const number = String(index + 1).padStart(2, "0");

                return (
                    <div
                        key={visa.id}
                        className="bg-[url('/visa.png')] bg-right bg-contain bg-no-repeat"
                    >
                        <div className="max-w-4xl">
                            <div className="flex items-start gap-4">

                                <div className="visa-num font-raleway opacity-20 font-extrabold text-4xl md:text-7xl">
                                    {number}
                                </div>

                                <div className="pt-2 md:pt-4 space-y-2">
                                    <h5
                                        className="font-nunito font-extrabold text-base md:text-2xl"
                                        dangerouslySetInnerHTML={{ __html: title }}
                                    />

                                    <div
                                        className="font-nunito font-medium text-sm md:text-base text-gray-600"
                                        dangerouslySetInnerHTML={{ __html: text }}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}