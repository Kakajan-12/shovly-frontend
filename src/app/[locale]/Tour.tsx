"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {useTranslations} from "next-intl";

const tours = [
    {
        id: 1,
        title: "Discover the Wonders of Paris",
        duration: "5 days",
        price: "$899",
        image: "/images/paris.jpg",
    },
    {
        id: 2,
        title: "Explore the Beauty of Bali",
        duration: "7 days",
        price: "$1,299",
        image: "/images/bali.jpg",
    },
    {
        id: 3,
        title: "Explore the Beauty of Bali",
        duration: "7 days",
        price: "$1,299",
        image: "/images/bali.jpg",
    },
    {
        id: 4,
        title: "Explore the Beauty of Bali",
        duration: "7 days",
        price: "$1,299",
        image: "/images/bali.jpg",
    },
];

export default function Tour() {
    const t = useTranslations("Tour");
    const m = useTranslations("More")
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 lg:my-container">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-[35%] lg:pl-20">
                        <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide font-raleway">
                            {t('main-title')}
                        </h2>

                        <p className="text-gray-600 mb-8 font-nunito">
                            {t('main-text')}

                        </p>
                    </div>

                    <div className="lg:w-[65%]">
                        <Swiper
                            spaceBetween={24}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 1.5 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 2.5 },
                            }}
                            grabCursor={true}
                            touchRatio={1.5}
                            resistance={true}
                            resistanceRatio={0.85}
                        >
                            {tours.map((tour) => (
                                <SwiperSlide key={tour.id}>
                                    <div className="relative h-[420px] rounded-2xl overflow-hidden group">
                                        <Image
                                            src={tour.image}
                                            alt={tour.title}
                                            fill
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>

                                        <div className="absolute bottom-6 left-6 right-6 text-white">
                                            <h3 className="text-lg font-semibold mb-2">
                                                {tour.title}
                                            </h3>

                                            <p className="text-sm opacity-90">
                                                Duration: {tour.duration}
                                            </p>
                                            <p className="text-sm mb-4 opacity-90">
                                                Price: {tour.price}
                                            </p>

                                            <button
                                                className="bg-white text-black text-sm px-5 py-2 rounded-full hover:bg-gray-200 transition">
                                                {m('read-more')}
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}