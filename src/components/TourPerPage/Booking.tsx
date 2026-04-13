'use client';

import {useTranslations, useLocale} from "next-intl";
import {FaRegMap} from "react-icons/fa6";
import {MdOutlineAccessTime} from "react-icons/md";
import {HiTranslate} from "react-icons/hi";
import {VscTypeHierarchySub} from "react-icons/vsc";
import Image from "next/image";

interface Tour {
    id: number;
    image: string;
    price: number;

    [key: string]: any;
}

const Booking = ({tour}: { tour: Tour }) => {
    const t = useTranslations('Tours');
    const lang = useLocale();

    const stripHTML = (text?: string) => text?.replace(/<[^>]*>/g, "") || "";

    const langKey = lang === "ru"
        ? "ru"
        : lang === "tk"
            ? "tk"
            : "en";

    const title = stripHTML(tour[`title_${langKey}`]);
    const duration = stripHTML(tour[`duration_${langKey}`]);
    const destination = stripHTML(tour[`destination_${langKey}`]);
    const language = stripHTML(tour[`lang_${langKey}`]);
    const type = stripHTML(tour[`type_${langKey}`]);
    const text = stripHTML(tour[`text_${langKey}`]);

    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${tour.image.replace(/\\/g, "/")}`;

    return (
        <div className="w-full bg-white">
            <div className="container px-4 mx-auto mt-20 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Image Column */}
                    <div className="flex flex-col">
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={500}
                            height={500}
                            className="w-full aspect-square rounded-xl object-cover shadow-md"
                            priority
                        />
                    </div>

                    {/* Content Column */}
                    <div className="flex flex-col space-y-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                {title}
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {text}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="border-t border-b border-gray-200 py-6">
                            {tour.price && tour.price > 0 ? (
                                <div>
                                    <p className="text-gray-600 text-sm uppercase tracking-wide mb-2">{t("price-per-person")}</p>
                                    <p className="text-5xl md:text-6xl font-bold text-gray-900">
                                        ${tour.price}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-2xl font-semibold text-[#C87941]">
                                    {t("tours-price_contact")}
                                </p>
                            )}
                        </div>

                        {/* Tour Details Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-600 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                                    <FaRegMap color="#336B7B" size={16}/>
                                    {t("destination")}
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {destination}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                                    <MdOutlineAccessTime color="#336B7B" size={16}/>
                                    {t("duration")}
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {duration} {t('days')}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                                    <HiTranslate color="#336B7B" size={16}/>
                                    {t("language")}
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {language}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                                    <VscTypeHierarchySub color="#336B7B" size={16}/>
                                    {t("tour-type")}
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {type}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
