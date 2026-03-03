'use client';

import { useEffect, useState } from "react";
import {useLocale, useTranslations} from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import * as Icons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

interface Hotel {
    id: number;
    image: string;
    title_tk: string;
    title_en: string;
    title_ru: string;
    text_tk: string;
    text_en: string;
    text_ru: string;
    rating: number;
    price?: number;
    location_tk: string;
    location_en: string;
    location_ru: string;
}

interface HotelAsset {
    id: number;
    icon: string;
    text_tk: string;
    text_en: string;
    text_ru: string;
    hotel_id: number;
}

export default function Hotels() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [assets, setAssets] = useState<HotelAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const lang = useLocale();
    const t = useTranslations('More')

    useEffect(() => {
        async function fetchHotels() {
            try {
                const [hotelsRes, assetsRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotels`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel-assets`)
                ]);

                setHotels(await hotelsRes.json());
                setAssets(await assetsRes.json());
            } catch (err) {
                console.error("Ошибка загрузки:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchHotels();
    }, []);

    const getIconComponent = (iconName: string) => {
        if (Icons[iconName as keyof typeof Icons])
            return Icons[iconName as keyof typeof Icons];

        if (MdIcons[iconName as keyof typeof MdIcons])
            return MdIcons[iconName as keyof typeof MdIcons];

        return FaStar;
    };

    if (loading) return <p className="text-center py-10">Загрузка...</p>;
    if (!hotels.length) return <p className="text-center py-10">Нет данных</p>;
    const stripHTML = (html: string) =>
        html.replace(/<[^>]*>?/gm, "");

    const truncateText = (text: string, length = 160) =>
        text.length > length ? text.slice(0, length) + "..." : text;
    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
            {hotels.map((hotel) => {
                const title = hotel[`title_${lang}` as keyof Hotel] as string;
                const rawText = hotel[`text_${lang}` as keyof Hotel] as string;
                const text = truncateText(stripHTML(rawText), 160);
                const location = hotel[`location_${lang}` as keyof Hotel] as string;
                const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${hotel.image.replace(/\\/g, "/")}`;
                const hotelAssets = assets.filter(a => a.hotel_id === hotel.id);

                return (
                    <div
                        key={hotel.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden relative z-50"
                    >
                        <div className="flex flex-col md:flex-row">

                            <div className="relative w-1/2 h-64 md:h-auto">
                                <Image
                                    src={imageUrl}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 p-6 flex flex-col justify-between w-1/2">

                                <div>

                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={
                                                        i < hotel.rating
                                                            ? "text-yellow-400"
                                                            : "text-gray-200"
                                                    }
                                                    size={18}
                                                />
                                            ))}
                                        </div>

                                        {hotel.price && (
                                            <div className="text-right">
                                                <div className="text-xl font-bold text-yellow-500">
                                                    ${hotel.price}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    night
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <h2
                                        className="text-2xl font-semibold text-gray-900 mb-2"
                                        dangerouslySetInnerHTML={{ __html: title }}
                                    />

                                    <p className="text-sm text-gray-500 mb-3">
                                        {location}
                                    </p>

                                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                                        {text}
                                    </p>

                                    {hotelAssets.length > 0 && (
                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            {hotelAssets.map((asset) => {
                                                const IconComponent = getIconComponent(asset.icon);
                                                const assetText =
                                                    asset[`text_${lang}` as keyof HotelAsset] as string;

                                                return (
                                                    <div key={asset.id} className="flex items-center gap-2">
                                                        <IconComponent
                                                            className="text-gray-600"
                                                            size={20}
                                                        />
                                                        <span className="text-sm text-gray-700">
                                                            {assetText}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <Link
                                    href={`/services/hotels/${hotel.id}`}
                                    className="w-fit  text-center px-6 py-3 lang-bg text-white rounded-full hover:bg-indigo-700 transition font-medium"
                                >
                                    {t('read-more')}
                                </Link>

                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}