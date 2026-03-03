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
                    throw new Error("Ошибка загрузки данных");
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

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

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
        <div className="my-container lang-bg py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 text-center">
                        {t("tours-include")}
                    </h2>
                </div>

                <div
                    className="flex flex-col lg:flex-row gap-10"
                >
                    <div className="flex-1">
                        <p className="text-3xl text-white font-bold mb-4 text-center">
                            {t("include")}
                        </p>
                        <ul className="list-disc pl-6 text-white lg:mx-20 space-y-2">
                            {includesData.map((item, idx) => (
                                <li key={idx} className="text-xl">
                                    {stripHTML(getLangText(item))}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-1">
                        <p className="text-3xl text-white font-bold mb-4 text-center">
                            {t("exclude")}
                        </p>
                        <ul className="list-disc pl-6 text-white lg:mx-20 space-y-2">
                            {excludesData.map((item, idx) => (
                                <li key={idx} className="text-xl">
                                    {stripHTML(getLangText(item))}
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