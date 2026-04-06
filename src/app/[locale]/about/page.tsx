'use client';

import {useTranslations} from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function About() {
    const t = useTranslations("About");

    const heroRef = useRef(null);
    const storyRef = useRef(null);
    const valuesRef = useRef(null);
    const galleryRef = useRef(null);
    const ctaRef = useRef(null);

    const heroInView = useInView(heroRef, { once: true });
    const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
    const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
    const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" });
    const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

    return (
        <>
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden my-container pt-28 md:pt-32">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #C87941 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={heroInView ? { opacity: 0.15, scale: 1 } : {}}
                    transition={{ duration: 1.2 }}
                    className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, #C87941 0%, transparent 70%)' }}
                ></motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={heroInView ? { opacity: 0.1, scale: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, #2A4393 0%, transparent 70%)' }}
                ></motion.div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-6"
                                  style={{ color: '#C87941' }}>
                                {t('up-text')}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight font-raleway"
                            style={{
                                color: '#1a1a1a'
                            }}
                        >
                            {t('up-title')}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={heroInView ? { opacity: 1, scaleX: 1 } : {}}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="w-32 h-1.5 mx-auto mb-8 rounded-full"
                            style={{ background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)' }}
                        ></motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-3xl mx-auto font-light font-nunito"
                        >
                            {t('down-text')}
                        </motion.p>
                    </div>
                </div>

            </section>

            {/* Story Section */}
            <section ref={storyRef} className="py-24 md:py-32 my-container">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left - Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={storyInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div>
                                <span className="text-sm md:text-base tracking-[0.3em] uppercase font-medium"
                                      style={{ color: '#C87941' }}>
                                    {t('story-label')}
                                </span>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 leading-tight font-raleway"
                                    style={{ color: '#1a1a1a' }}>
                                    {t('title')}
                                </h2>
                                <div className="w-20 h-1 rounded-full mb-8"
                                     style={{ background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)' }}></div>
                            </div>

                            <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-nunito">
                                {t('text')}
                            </p>

                            {/* Feature Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={storyInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="p-6 rounded-2xl"
                                    style={{ background: 'linear-gradient(135deg, #FFF5EE 0%, #FFE8D6 100%)' }}
                                >
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                                         style={{ backgroundColor: '#C87941' }}>
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 font-raleway">
                                        {t('feature1-title')}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{t('feature1-text')}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={storyInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="p-6 rounded-2xl"
                                    style={{ background: 'linear-gradient(135deg, #E8F4FF 0%, #D6EBFF 100%)' }}
                                >
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                                         style={{ backgroundColor: '#2A4393' }}>
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 font-raleway">
                                        {t('feature2-title')}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{t('feature2-text')}</p>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right - Image Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={storyInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <Image
                                src="/sanjar.jpg"
                                alt="Ashgabat International Airport"
                                width={900}
                                height={600}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-3xl"
                            />
                            {/*<div className="relative h-[600px] rounded-3xl overflow-hidden">*/}
                            {/*    /!* Placeholder for user's image *!/*/}
                            {/*    <div className="absolute inset-0 flex items-center justify-center text-center p-8"*/}
                            {/*         style={{*/}
                            {/*             background: 'linear-gradient(135deg, #FFF5EE 0%, #FFE8D6 100%)',*/}
                            {/*             border: '3px dashed #C87941'*/}
                            {/*         }}>*/}
                            {/*        <div>*/}
                            {/*            <svg className="w-16 h-16 mx-auto mb-4" style={{ color: '#C87941' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                            {/*                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />*/}
                            {/*            </svg>*/}
                            {/*            <p className="text-lg font-medium" style={{ color: '#C87941' }}>*/}
                            {/*                Upload Your Story Image Here</p>*/}
                            {/*            <p className="text-sm text-gray-500 mt-2">Recommended: 800x1000px</p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}

                            {/*    /!* Decorative corner accent *!/*/}
                            {/*    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full"*/}
                            {/*         style={{ background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)' }}></div>*/}
                            {/*    <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full"*/}
                            {/*         style={{ background: 'linear-gradient(135deg, #2A4393 0%, #3E74B4 100%)' }}></div>*/}
                            {/*</div>*/}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section ref={valuesRef} className="py-24 md:py-32 relative overflow-hidden"
                     style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)' }}>
                <div className="container mx-auto px-4 my-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <span className="text-sm md:text-base tracking-[0.3em] uppercase font-medium"
                              style={{ color: '#C87941' }}>
                            {t('values-label')}
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-raleway"
                            style={{ color: '#1a1a1a' }}>
                            {t('values-title')}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                titleKey: "value1-title",
                                descriptionKey: "value1-text"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                ),
                                titleKey: "value2-title",
                                descriptionKey: "value2-text"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                ),
                                titleKey: "value3-title",
                                descriptionKey: "value3-text"
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="group p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2"
                                style={{
                                    background: 'white',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                                }}
                            >
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                                     style={{
                                         background: index === 1 ? 'linear-gradient(135deg, #2A4393 0%, #3E74B4 100%)' : 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)',
                                         color: 'white'
                                     }}>
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 font-raleway"
                                    style={{ color: '#1a1a1a' }}>
                                    {t(value.titleKey)}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-nunito">
                                    {t(value.descriptionKey)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section ref={galleryRef} className="py-24 md:py-32 my-container">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <span className="text-sm md:text-base tracking-[0.3em] uppercase font-medium"
                              style={{ color: '#C87941' }}>
                            {t('gallery-label')}
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-raleway"
                            style={{ color: '#1a1a1a' }}>
                            {t('gallery-title')}
                        </h2>
                        <p className="text-lg text-gray-600 font-nunito">
                            {t('gallery-subtitle')}
                        </p>
                    </motion.div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((num, index) => (
                            <motion.div
                                key={num}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={`/about${num}.webp`}
                                    alt={`Turkmenistan ${num}`}
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Hover overlay with icon */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                                         style={{ backgroundColor: 'rgba(200, 121, 65, 0.9)' }}>
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Image number badge */}
                                <div className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold font-raleway"
                                     style={{
                                         background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)',
                                         fontSize: '1.25rem'
                                     }}>
                                    {num}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Image Placeholders */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <Image
                            src="/derveze.webp"
                            alt="Ashgabat International Airport"
                            width={900}
                            height={600}
                            className="w-full h-full rounded-3xl object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <Image
                            src="/yangygala.webp"
                            alt="Ashgabat International Airport"
                            width={900}
                            height={600}
                            className="w-full h-full rounded-3xl object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section ref={ctaRef} className="py-24 md:py-32 relative overflow-hidden"
                     style={{
                         background: 'linear-gradient(135deg, #2A4393 0%, #3E74B4 100%)'
                     }}>
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full"
                         style={{
                             backgroundImage: `radial-gradient(circle at 2px 2px, #E8B887 1px, transparent 0)`,
                             backgroundSize: '60px 60px'
                         }}></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={ctaInView ? { opacity: 0.15, scale: 1 } : {}}
                    transition={{ duration: 1.2 }}
                    className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, #E8B887 0%, transparent 70%)' }}
                ></motion.div>

                <div className="container mx-auto px-4 relative z-10 my-container">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <span className="text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-6 inline-block text-white/80">
                            {t('cta-label')}
                        </span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight font-raleway">
                            {t('cta-title')}
                        </h2>

                        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-nunito">
                            {t('cta-text')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/tours"
                                className="px-10 py-4 rounded-full text-white font-medium text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 font-raleway"
                                style={{
                                    background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)'
                                }}
                            >
                                {t('cta-tours')}
                            </Link>

                            <Link
                                href="/contacts"
                                className="px-10 py-4 rounded-full font-medium text-lg transition-all duration-300 border-2 hover:bg-white hover:text-[#2A4393] font-raleway"
                                style={{
                                    color: 'white',
                                    borderColor: 'white'
                                }}
                            >
                                {t('cta-contact')}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
