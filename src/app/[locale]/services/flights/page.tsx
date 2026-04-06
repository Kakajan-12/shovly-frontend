'use client';

import Image from "next/image";
import {useTranslations} from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

export default function Flights(){
    const t = useTranslations('Services');
    const heroRef = useRef(null);
    const airlinesRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const airlinesInView = useInView(airlinesRef, { once: true, margin: "-100px" });

    // Airlines that fly to Turkmenistan
    const airlines = [
        { name: "Turkish Airlines", code: "TK", country: "Turkey", path: '/airlines/TK.png' },
        { name: "Lufthansa", code: "LH", country: "Germany", path: '/airlines/LH.png' },
        { name: "Turkmenistan Airlines", code: "T5", country: "Turkmenistan", path: '/airlines/T5.webp' },
        { name: "FlyDubai", code: "FZ", country: "UAE", path: '/airlines/FZ.png'  },
        { name: "Belavia", code: "B2", country: "Belarus", path: '/airlines/B2.png'  },
        { name: "S7 Airlines", code: "S7", country: "Russia", path: '/airlines/S7.png'  },
        { name: "Air India", code: "AI", country: "India", path: '/airlines/AI.png'  },
        { name: "China Southern", code: "CZ", country: "China", path: '/airlines/CZ.png'  },
    ];

    return (
        <div>
            {/* Hero Section - Aviation Theme */}
            <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Background Image Layers */}
                <div className="absolute inset-0">
                    {/* Main airport/plane background */}
                    <div className="absolute inset-0 bg-cover bg-center"
                         style={{ backgroundImage: "url('/flights.webp')" }}>
                        {/* Multi-layer gradient for depth */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2A4393]/95 via-[#2A4393]/75 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {/* Animated geometric elements - simulating flight paths */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={heroInView ? { opacity: 0.15 } : {}}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        {/* Diagonal lines representing flight paths */}
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="flight-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#C87941', stopOpacity: 0.3 }} />
                                    <stop offset="100%" style={{ stopColor: '#E8B887', stopOpacity: 0 }} />
                                </linearGradient>
                            </defs>
                            <path d="M 0 100 Q 400 50 800 80 T 1600 100" stroke="url(#flight-gradient)" strokeWidth="2" fill="none" strokeDasharray="10,5"/>
                            <path d="M 0 300 Q 500 200 1000 250 T 2000 300" stroke="url(#flight-gradient)" strokeWidth="2" fill="none" strokeDasharray="10,5"/>
                        </svg>
                    </motion.div>

                    {/* Floating orbs */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={heroInView ? { opacity: 0.2, scale: 1 } : {}}
                        transition={{ duration: 1.2 }}
                        className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
                        style={{ background: 'radial-gradient(circle, #E8B887 0%, transparent 70%)' }}
                    ></motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 pt-32 pb-[15vh]">
                    <div className="max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            {/* Eyebrow - Flight Info Badge */}
                            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-md"
                                 style={{
                                     background: 'rgba(255, 255, 255, 0.1)',
                                     border: '1px solid rgba(255, 255, 255, 0.2)'
                                 }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                     style={{ background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)' }}>
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-white font-medium text-lg font-raleway">Flight Services</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8B887]"></div>
                                    <span className="text-white/80 text-sm font-nunito">Direct Connections</span>
                                </div>
                            </div>

                            {/* Main Title */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] font-raleway max-w-4xl">
                                {t('flight-main-title')}
                            </h1>

                            {/* Decorative Accent */}
                            <div className="flex items-center gap-4">
                                <div className="h-1.5 w-32 rounded-full"
                                     style={{ background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)' }}></div>
                                <div className="h-1.5 w-16 rounded-full bg-white/50"></div>
                                <div className="h-1.5 w-8 rounded-full bg-white/30"></div>
                            </div>

                            {/* Subtitle/Description */}
                            <p className="text-xl md:text-2xl lg:text-3xl text-white/95 max-w-3xl leading-relaxed font-light font-nunito">
                                {t('flight-main-text')}
                            </p>

                            {/* Feature Pills */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                {[
                                    { icon: "✈️", text: "Direct Flights" },
                                    { icon: "🌍", text: "Global Connections" },
                                    { icon: "⏱️", text: "24/7 Support" },
                                    { icon: "💺", text: "Premium Service" }
                                ].map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                                        className="px-6 py-3 rounded-full backdrop-blur-sm text-white font-medium font-nunito"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)'
                                        }}
                                    >
                                        <span className="mr-2">{feature.icon}</span>
                                        {feature.text}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={heroInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-white text-center"
                    >
                        <div className="text-sm mb-2 opacity-80 font-nunito">Scroll to explore</div>
                        <svg className="w-6 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </section>

            {/* Airport Info Section */}
            <section className="py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {/* Large featured image */}
                                <div className="col-span-2 relative h-80 rounded-3xl overflow-hidden group">
                                    <Image
                                        src="/airlines/airport.webp"
                                        alt="Ashgabat International Airport"
                                        width={900}
                                        height={600}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="text-sm font-medium opacity-90 font-nunito">Ashgabat International</p>
                                        <p className="text-2xl font-bold font-raleway">Main Gateway</p>
                                    </div>
                                </div>

                                {/* Two smaller images */}
                                <div className="relative h-64 rounded-3xl overflow-hidden group">
                                    <Image
                                        src="/airlines/airplane.webp"
                                        alt="Aircraft"
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A4393]/60 to-transparent"></div>
                                </div>
                                <div className="relative h-64 rounded-3xl overflow-hidden group"
                                     style={{
                                         background: 'linear-gradient(135deg, #2A4393 0%, #3E74B4 100%)'
                                     }}>
                                    <div className="absolute inset-0 flex items-center justify-center text-white p-8 text-center">
                                        <div>
                                            <div className="text-5xl font-bold mb-2 font-raleway">50+</div>
                                            <div className="text-sm uppercase tracking-wider opacity-90 font-nunito">Weekly Flights</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 rounded-full opacity-20 blur-3xl"
                                 style={{ background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)' }}></div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div>
                                <span className="text-[#C87941] text-sm tracking-[0.3em] uppercase font-medium font-raleway">
                                    Modern Aviation Hub
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-gray-900 font-raleway">
                                    World-Class Airport Facilities
                                </h2>
                                <div className="w-20 h-1 rounded-full"
                                     style={{ background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)' }}></div>
                            </div>

                            <p className="text-lg text-gray-600 leading-relaxed font-nunito">
                                Ashgabat International Airport serves as the premier gateway to Turkmenistan,
                                featuring state-of-the-art facilities, modern amenities, and seamless connectivity
                                to major global destinations.
                            </p>

                            {/* Features List */}
                            <div className="space-y-4 pt-4">
                                {[
                                    { title: "Modern Terminal", desc: "Contemporary architecture with premium lounges" },
                                    { title: "International Routes", desc: "Direct connections to major world cities" },
                                    { title: "24/7 Operations", desc: "Round-the-clock flight services and support" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                                             style={{ background: 'linear-gradient(135deg, #E8F4FF 0%, #D6EBFF 100%)' }}>
                                            <svg className="w-6 h-6" style={{ color: '#2A4393' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1 font-raleway">{item.title}</h4>
                                            <p className="text-gray-600 text-sm font-nunito">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Airlines Slider Section */}
            <section ref={airlinesRef} className="py-24 relative overflow-hidden"
                     style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)' }}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0"
                         style={{
                             backgroundImage: `radial-gradient(circle at 2px 2px, #2A4393 1px, transparent 0)`,
                             backgroundSize: '40px 40px'
                         }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={airlinesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <span className="text-[#2A4393] text-sm tracking-[0.3em] uppercase font-medium font-raleway">
                            Our Airline Partners
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-gray-900 font-raleway">
                            Flying to Turkmenistan
                        </h2>
                        <div className="w-32 h-1.5 mx-auto mb-6 rounded-full"
                             style={{ background: 'linear-gradient(90deg, #2A4393 0%, #3E74B4 100%)' }}></div>
                        <p className="text-lg text-gray-600 font-nunito">
                            Multiple international carriers connect Turkmenistan to the world
                        </p>
                    </motion.div>

                    {/* Airlines Slider */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={airlinesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={24}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 }
                            }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false
                            }}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true
                            }}
                            loop={true}
                            className="pb-16"
                        >
                            {airlines.map((airline, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="group h-full">
                                        <div className="bg-white rounded-3xl p-8 min-h-[380px] flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-2"
                                             style={{
                                                 boxShadow: '0 8px 32px rgba(42, 67, 147, 0.08)'
                                             }}>
                                            {/* Airline Logo */}
                                            <div className="w-32 h-32 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                                                 style={{
                                                     background: 'linear-gradient(135deg, #E8F4FF 0%, #D6EBFF 100%)'
                                                 }}>
                                                <Image
                                                    src={airline.path}
                                                    alt={`${airline.name} logo`}
                                                    width={128}
                                                    height={128}
                                                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>

                                            {/* Airline Name */}
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 font-raleway min-h-[56px] flex items-center">
                                                {airline.name}
                                            </h3>

                                            {/* Decorative Line */}
                                            <div className="h-1 w-12 rounded-full mb-4 transition-all duration-500 group-hover:w-20"
                                                 style={{ background: 'linear-gradient(90deg, #2A4393 0%, #3E74B4 100%)' }}></div>

                                            {/* Badge */}
                                            <div className="px-4 py-2 rounded-full text-xs font-medium"
                                                 style={{
                                                     background: 'linear-gradient(135deg, #FFF5EE 0%, #FFE8D6 100%)',
                                                     color: '#C87941'
                                                 }}>
                                                Regular Flights
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>

                    {/* Info Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={airlinesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl mx-auto mt-16"
                    >
                        <div className="rounded-3xl p-8 md:p-12 text-center"
                             style={{
                                 background: 'linear-gradient(135deg, #2A4393 0%, #3E74B4 100%)'
                             }}>
                            <svg className="w-16 h-16 mx-auto mb-6 text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-3xl font-bold text-white mb-4 font-raleway">
                                Need Help Booking Your Flight?
                            </h3>
                            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto font-nunito">
                                Our travel experts are available 24/7 to assist you with flight bookings,
                                visa requirements, and travel arrangements to Turkmenistan.
                            </p>
                            <a
                                href="/contacts"
                                className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-[#2A4393] bg-white font-bold transition-all duration-300 hover:gap-5 hover:shadow-2xl font-raleway"
                            >
                                Contact Our Team
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
