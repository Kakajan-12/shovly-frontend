'use client';

import {useTranslations} from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = ()=>{
    const t = useTranslations('About')
    const h = useTranslations('Header')
    const m = useTranslations('More')

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div className="my-container py-24 md:py-32 overflow-hidden" ref={ref}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                >
                    <span className="text-sm md:text-base tracking-[0.3em] uppercase font-medium"
                          style={{ color: '#C87941' }}>
                        {h('about')}
                    </span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-7 space-y-6 md:space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-raleway"
                            style={{
                                color: '#1a1a1a'
                            }}>
                            {t('hero-subtitle')}
                        </h2>

                        <div className="w-20 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)' }}></div>

                        <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-light max-w-2xl font-nunito">
                            {t('about-main-text')}
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-3 gap-6 pt-6"
                        >
                            <div className="text-center lg:text-left">
                                <div className="text-4xl md:text-5xl font-bold mb-2 font-raleway"
                                     style={{ color: '#C87941' }}>
                                    10+
                                </div>
                                <div className="text-sm text-gray-600 uppercase tracking-wider">{t('stats-years')}</div>
                            </div>
                            <div className="text-center lg:text-left border-l border-gray-200 pl-6">
                                <div className="text-4xl md:text-5xl font-bold mb-2 font-raleway"
                                     style={{ color: '#2A4393' }}>
                                    100+
                                </div>
                                <div className="text-sm text-gray-600 uppercase tracking-wider">{t('stats-travelers')}</div>
                            </div>
                            <div className="text-center lg:text-left border-l border-gray-200 pl-6">
                                <div className="text-4xl md:text-5xl font-bold mb-2 font-raleway"
                                     style={{ color: '#C87941' }}>
                                    24/7
                                </div>
                                <div className="text-sm text-gray-600 uppercase tracking-wider">{t('stats-support')}</div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="pt-4"
                        >
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-medium text-lg transition-all duration-300 hover:gap-5 group font-raleway"
                                style={{
                                    background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)'
                                }}
                            >
                                {m('read-more')}
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:col-span-5 relative hidden lg:block"
                    >
                        <div className="relative h-[600px]">
                            <div className="absolute top-10 -right-10 w-80 h-80 rounded-full opacity-20 blur-3xl"
                                 style={{ background: 'radial-gradient(circle, #C87941 0%, transparent 70%)' }}>
                            </div>

                            {/* Image 1 - Main */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="absolute top-0 left-0 w-72 h-96 rounded-3xl overflow-hidden shadow-2xl"
                                style={{
                                    border: '8px solid white',
                                    transform: 'rotate(-2deg)'
                                }}
                            >
                                <Image
                                    src="/about1.webp"
                                    alt="Turkmenistan Travel"
                                    width={400}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </motion.div>

                            {/* Image 2 - Accent */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="absolute bottom-0 right-0 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl"
                                style={{
                                    border: '8px solid white',
                                    transform: 'rotate(3deg)'
                                }}
                            >
                                <Image
                                    src="/about2.webp"
                                    alt="Ashgabat"
                                    width={350}
                                    height={450}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </motion.div>

                            {/* Decorative Accent Line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ duration: 1, delay: 0.9 }}
                                className="absolute top-1/2 left-1/2 w-40 h-1 origin-left -translate-y-1/2"
                                style={{
                                    background: 'linear-gradient(90deg, #C87941 0%, transparent 100%)',
                                    transform: 'rotate(-45deg)'
                                }}
                            ></motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </div>
    )
}

export default About;
