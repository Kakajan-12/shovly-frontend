'use client';

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    id: number;
    title_tk: string;
    text_tk: string;
    title_en: string;
    text_en: string;
    title_ru: string;
    text_ru: string;
}

export default function FAQAccordion() {
    const [faq, setFaq] = useState<FAQItem[]>([]);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const lang = useLocale();

    useEffect(() => {
        async function fetchFAQ() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faq`);
                const data = await res.json();
                setFaq(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchFAQ();
    }, []);

    const toggle = (id: number) => {
        setActiveId(prev => (prev === id ? null : id));
    };

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!faq.length) return <p className="text-center py-10">No data</p>;

    return (
        <div className="w-full mx-auto bg-white rounded-2xl shadow-md divide-y divide-gray-200 relative z-50">
            {faq.map((item) => {
                const title = item[`title_${lang}` as keyof FAQItem] as string;
                const text = item[`text_${lang}` as keyof FAQItem] as string;
                const isOpen = activeId === item.id;

                return (
                    <div key={item.id}>
                        <button
                            onClick={() => toggle(item.id)}
                            className="flex justify-between items-center w-full px-6 py-4 text-left font-semibold text-gray-800 hover:text-blue-900 transition-colors cursor-pointer"
                        >
                            <span className="text-lg sm:text-xl">
                                {title}
                            </span>

                            <ChevronDown
                                className={`w-5 h-5 transition-transform duration-300 ${
                                    isOpen ? "rotate-180 text-blue-900" : "text-gray-500"
                                }`}
                            />
                        </button>

                        <div
                            className={`grid transition-all duration-300 ease-in-out ${
                                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <div className="overflow-hidden">
                                <p className="px-6 pb-6 text-gray-700 text-sm sm:text-lg leading-relaxed">
                                    {text}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}