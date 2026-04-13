"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useLocale, useTranslations } from "next-intl";

type Tour = {
    id: number;
    image: string;
    price: number | null;
    [key: string]: any;
};

export default function TourSlider({ tours }: { tours: Tour[] }) {
    const locale = useLocale();
    const m = useTranslations("More");
    const t = useTranslations("Tours");

    const stripHtml = (html: string) =>
        html ? html.replace(/<[^>]+>/g, "") : "";

    const getLocalized = (tour: any, field: string) =>
        tour[`${field}_${locale}`] ||
        tour[`${field}_en`] ||
        tour[`${field}_tk`] ||
        "";

    const getImageUrl = (path: string) => {
        if (!path) return "";
        return (
            process.env.NEXT_PUBLIC_API_URL!.replace(/\/+$/, "") +
            "/" +
            path.replace(/\\/g, "/").replace(/^\/+/, "")
        );
    };

    return (
        <Swiper
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5 },
            }}
            grabCursor={true}
        >
            {tours.map((tour, index) => (
                <SwiperSlide key={tour.id}>
                    <div className="relative h-[420px] rounded-2xl overflow-hidden group">
                        <Image
                            src={getImageUrl(tour.image)}
                            alt={stripHtml(getLocalized(tour, "title"))}
                            fill
                            priority={index === 0}
                            className="object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <h3 className="text-lg font-semibold mb-2">
                                {stripHtml(getLocalized(tour, "title"))}
                            </h3>

                            <p className="text-sm opacity-90">
                                {stripHtml(getLocalized(tour, "duration"))}
                            </p>

                            {tour.price && tour.price > 0 ? (
                                <p className="text-sm mb-4 opacity-90">
                                    ${tour.price}
                                </p>
                            ) : (
                                <p className="text-sm mb-4 opacity-90 font-semibold">
                                    {t("tours-price_contact")}
                                </p>
                            )}

                            <Link
                                href={`/${locale}/tours/${tour.id}`}
                                className="inline-block bg-white text-black text-sm px-5 py-2 rounded-full hover:bg-gray-200 transition"
                            >
                                {m("read-more")}
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}