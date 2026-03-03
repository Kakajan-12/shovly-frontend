'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
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

interface GalleryItem {
    id: number;
    image: string;
    hotel_id: number;
}

export default function HotelDetails() {
    const params = useParams();
    const id = Number(params.id);
    const lang = useLocale();

    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [assets, setAssets] = useState<HotelAsset[]>([]);
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [hotelRes, assetsRes, galleryRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotels/${id}`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel-assets`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel-gallery`)
                ]);

                const hotelData = await hotelRes.json();
                const assetsData = await assetsRes.json();
                const galleryData = await galleryRes.json();

                setHotel(hotelData);
                setAssets(assetsData.filter((a: HotelAsset) => a.hotel_id == id));
                setGallery(galleryData.filter((g: GalleryItem) => g.hotel_id == id));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    const getIconComponent = (iconName: string) => {
        if (FaIcons[iconName as keyof typeof FaIcons])
            return FaIcons[iconName as keyof typeof FaIcons];

        if (MdIcons[iconName as keyof typeof MdIcons])
            return MdIcons[iconName as keyof typeof MdIcons];

        return FaStar;
    };

    if (loading) return <p className="text-center py-20">Loading...</p>;
    if (!hotel) return <p className="text-center py-20">Hotel not found</p>;

    const title = hotel[`title_${lang}` as keyof Hotel] as string;
    const text = hotel[`text_${lang}` as keyof Hotel] as string;
    const location = hotel[`location_${lang}` as keyof Hotel] as string;
    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${hotel.image.replace(/\\/g, "/")}`;

    return (
        <div className="container mx-auto px-4 pb-10 pt-44 space-y-10">

            <div className="flex flex-col md:flex-row gap-8">

                <div className="relative md:w-1/2 h-[350px] overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 space-y-4">

                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={
                                    i < hotel.rating
                                        ? "text-yellow-400"
                                        : "text-gray-200"
                                }
                                size={20}
                            />
                        ))}
                    </div>

                    <h1
                        className="text-3xl font-bold text-gray-900"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />

                    <p className="text-gray-500">{location}</p>

                    <div
                        className="text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: text }}
                    />

                    {assets.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            {assets.map((asset) => {
                                const Icon = getIconComponent(asset.icon);
                                const assetText =
                                    asset[`text_${lang}` as keyof HotelAsset] as string;

                                return (
                                    <div key={asset.id} className="flex items-center gap-2">
                                        <Icon size={20} className="text-gray-600" />
                                        <span className="text-gray-700">
                                            {assetText}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                </div>
            </div>

            {gallery.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.map((item) => {
                        const img = `${process.env.NEXT_PUBLIC_API_URL}/${item.image.replace(/\\/g, "/")}`;

                        return (
                            <div
                                key={item.id}
                                className="relative h-[300px] rounded-xl overflow-hidden"
                            >
                                <Image
                                    src={img}
                                    alt="Gallery"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}