'use client';

import ContactForm from "@/components/Contacts/ContactForm";
import ContactDetails from "@/components/Contacts/ContactDetails";
import {useTranslations} from "next-intl";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const Contact = () => {
    const t = useTranslations('Contacts');
    const heroRef = useRef(null);
    const formRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const formInView = useInView(formRef, { once: true, margin: "-100px" });

    return (
        <div>
            <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0"
                         style={{
                             background: 'linear-gradient(135deg, #2A4393 0%, #3E74B4 50%, #2A4393 100%)'
                         }}>
                        <div className="absolute inset-0 opacity-10"
                             style={{
                                 backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                 backgroundSize: '48px 48px'
                             }}></div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={heroInView ? { opacity: 0.15, scale: 1 } : {}}
                        transition={{ duration: 1.2 }}
                        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
                        style={{ background: 'radial-gradient(circle, #E8B887 0%, transparent 70%)' }}
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={heroInView ? { opacity: 0.1, scale: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl"
                        style={{ background: 'radial-gradient(circle, #C87941 0%, transparent 70%)' }}
                    ></motion.div>
                </div>

                <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md"
                                 style={{
                                     background: 'rgba(255, 255, 255, 0.15)',
                                     border: '1px solid rgba(255, 255, 255, 0.2)'
                                 }}>
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-white text-sm tracking-[0.25em] uppercase font-medium font-raleway">
                                    {t('hero-badge')}
                                </span>
                            </div>

                            {/* Main Title */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-raleway">
                                {t('title')}
                            </h1>

                            <div className="flex items-center justify-center gap-3">
                                <div className="h-1.5 w-20 rounded-full"
                                     style={{ background: 'linear-gradient(90deg, transparent 0%, #E8B887 50%, transparent 100%)' }}></div>
                                <div className="w-2 h-2 rounded-full bg-white/80"></div>
                                <div className="h-1.5 w-20 rounded-full"
                                     style={{ background: 'linear-gradient(90deg, transparent 0%, #E8B887 50%, transparent 100%)' }}></div>
                            </div>

                            <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed font-nunito">
                                {t('text')}
                            </p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="flex flex-wrap justify-center gap-6 pt-8"
                            >
                                {[
                                    { icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    ), label: "email-us" },
                                    { icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    ), label: "call-us" },
                                    { icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ), label: "visit-us" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-sm"
                                         style={{
                                             background: 'rgba(255, 255, 255, 0.1)',
                                             border: '1px solid rgba(255, 255, 255, 0.2)'
                                         }}>
                                        <div className="text-white">
                                            {item.icon}
                                        </div>
                                        <span className="text-white font-medium font-nunito">{t(item.label)}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={heroInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-white/80 text-sm font-nunito"
                    >
                        <svg className="w-6 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </section>

            <section ref={formRef} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
                     style={{ background: 'radial-gradient(circle, #2A4393 0%, transparent 70%)' }}></div>
                <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full opacity-5 blur-3xl"
                     style={{ background: 'radial-gradient(circle, #C87941 0%, transparent 70%)' }}></div>

                <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 my-container relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={formInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-3"
                        >
                            <ContactForm/>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={formInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-2"
                        >
                            <ContactDetails/>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Contact
