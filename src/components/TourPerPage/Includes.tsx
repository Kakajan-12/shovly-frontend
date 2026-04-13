'use client';

import {useEffect, useState} from "react";
import {useTranslations, useLocale} from "next-intl";

interface IncludeExclude {
    id: number;
    tour_id: number;
    text_en: string;
    text_ru: string;
    text_tk: string;
}

interface IncludesProps {
    tour: {
        id: number;
    };
}

const stripHTML = (text: string) => text?.replace(/<[^>]*>/g, "") || "";

const Includes: React.FC<IncludesProps> = ({tour}) => {
    const t = useTranslations("Tours");
    const lang = useLocale();

    const [includesData, setIncludesData] = useState<IncludeExclude[]>([]);
    const [excludesData, setExcludesData] = useState<IncludeExclude[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [includesRes, excludesRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/includes`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/excludes`),
                ]);

                if (!includesRes.ok || !excludesRes.ok) {
                    throw new Error(t('error-loading-data'));
                }

                const includesJson = await includesRes.json();
                const excludesJson = await excludesRes.json();

                setIncludesData(includesJson.filter((p: IncludeExclude) => p.tour_id === tour.id));
                setExcludesData(excludesJson.filter((p: IncludeExclude) => p.tour_id === tour.id));
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (tour.id) fetchData();
    }, [tour.id]);

    if (loading) {
        return (
            <div className="my-container lang-bg py-8">
                <div className="flex justify-center items-center min-h-40">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white font-nunito">{t('loading')}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-container lang-bg py-8">
                <div className="flex justify-center">
                    <div className="text-center text-white">
                        <p className="font-raleway font-bold mb-2">{t('error-loading-data')}</p>
                        <p className="text-white/80 font-nunito text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const getLangText = (item: IncludeExclude) => {
        switch (lang) {
            case 'ru':
                return item.text_ru;
            case 'tk':
                return item.text_tk;
            default:
                return item.text_en;
        }
    };

    return (
        <div className="w-full bg-white py-12 md:pb-16 lg:pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                        {t("tours-include")}
                    </h2>
                    <p className="text-gray-600 text-lg">{t("includes-subtitle")}</p>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#336B7B] to-[#C87941] mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Includes Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {t("include")}
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {includesData.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700 text-lg leading-relaxed">
                                        {stripHTML(getLangText(item))}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Excludes Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {t("exclude")}
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {excludesData.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700 text-lg leading-relaxed">
                                        {stripHTML(getLangText(item))}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Includes;
