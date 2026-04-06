'use client';

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Blog } from "@/types/blog";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Image from "next/image";

const BlogDetail = () => {
    const { id } = useParams();
    const lang = useLocale();
    const zoomRef = useRef(null);
    const captionsRef = useRef(null);
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const galleryRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const contentInView = useInView(contentRef, { once: true, margin: "-100px" });
    const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" });

    const [gallery, setGallery] = useState<any[]>([]);
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState<number | false>(false);

    useEffect(() => {
        if (!id) return;

        async function fetchBlog() {
            try {
                const [blogRes, galleryRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog-gallery`),
                ]);
                const blogData = await blogRes.json();
                const galleryData = await galleryRes.json();

                setBlog(blogData[0]);
                setGallery(galleryData.filter((item: any) => item.blog_id === Number(id)));
            } catch (err) {
                console.error("Error loading blog:", err);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        }

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#C87941] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-nunito">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 text-xl font-raleway">Article not found</p>
                </div>
            </div>
        );
    }

    const title = blog[`title_${lang}` as keyof Blog] as string;
    const text = blog[`text_${lang}` as keyof Blog] as string;

    return (
        <div>
            <section ref={heroRef} className="relative min-h-[70vh] flex items-end overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0"
                         style={{
                             background: 'linear-gradient(135deg, #C87941 0%, #E8B887 50%, #2A4393 100%)'
                         }}>
                        <div className="absolute inset-0 opacity-10"
                             style={{
                                 backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.08) 15px, rgba(255,255,255,0.08) 30px)`
                             }}></div>
                    </div>

                    <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl"
                         style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}></div>
                    <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
                         style={{ background: 'radial-gradient(circle, #2A4393 0%, transparent 70%)' }}></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 pb-16 md:pb-20 pt-32">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md"
                                 style={{
                                     background: 'rgba(255, 255, 255, 0.2)',
                                     border: '1px solid rgba(255, 255, 255, 0.3)'
                                 }}>
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                <span className="text-white text-sm tracking-[0.2em] uppercase font-medium font-raleway">
                                    Travel Story
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight font-raleway"
                                dangerouslySetInnerHTML={{__html: title}} />

                            <div className="flex items-center gap-3 text-white/90">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-lg font-nunito">
                                    {new Date(blog.date).toLocaleDateString(
                                        lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "tk-TM",
                                        { year: 'numeric', month: 'long', day: 'numeric' }
                                    )}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article ref={contentRef} className="py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4 my-container">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={contentInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Content Card */}
                        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl mb-16"
                             style={{ boxShadow: '0 20px 60px rgba(200, 121, 65, 0.08)' }}>
                            {/* Decorative Accent */}
                            <div className="w-20 h-1 rounded-full mb-8"
                                 style={{ background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)' }}></div>

                            {/* Article Text */}
                            <div className="prose prose-lg max-w-none font-nunito
                                          prose-headings:font-raleway prose-headings:text-gray-900
                                          prose-p:text-gray-700 prose-p:leading-relaxed
                                          prose-a:text-[#2A4393] prose-a:no-underline hover:prose-a:underline
                                          prose-strong:text-gray-900 prose-strong:font-bold
                                          prose-ul:text-gray-700 prose-ol:text-gray-700"
                                 dangerouslySetInnerHTML={{__html: text}} />
                        </div>
                    </motion.div>

                    {/* Gallery Section */}
                    {gallery.length > 0 && (
                        <motion.div
                            ref={galleryRef}
                            initial={{ opacity: 0, y: 40 }}
                            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="max-w-6xl mx-auto"
                        >
                            {/* Section Header */}
                            <div className="text-center mb-12">
                                <span className="text-[#C87941] text-sm tracking-[0.3em] uppercase font-medium font-raleway">
                                    Photo Gallery
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900 font-raleway">
                                    Visual Journey
                                </h2>
                                <div className="w-20 h-1 mx-auto rounded-full"
                                     style={{ background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)' }}></div>
                            </div>

                            {/* Gallery Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {gallery.map((img, index) => {
                                    const imgUrl = `${process.env.NEXT_PUBLIC_API_URL}/${img.image.replace(/\\/g, "/")}`;
                                    return (
                                        <motion.div
                                            key={img.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
                                            onClick={() => setOpen(index)}
                                        >
                                            <Image
                                                src={imgUrl}
                                                fill
                                                alt={`Gallery ${index + 1}`}
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            {/* Zoom Icon */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                                                     style={{ backgroundColor: 'rgba(200, 121, 65, 0.9)' }}>
                                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Image Number */}
                                            <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold font-raleway"
                                                 style={{
                                                     background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)'
                                                 }}>
                                                {index + 1}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    <Lightbox
                        open={open !== false}
                        close={() => setOpen(false)}
                        index={open === false ? 0 : open}
                        plugins={[Zoom, Captions, Download, Share]}
                        zoom={{ref: zoomRef}}
                        captions={{ref: captionsRef}}
                        slides={gallery.map((img) => ({
                            src: `${process.env.NEXT_PUBLIC_API_URL}/${img.image.replace(/\\/g, "/")}`,
                        }))}
                    />
                </div>
            </article>
        </div>
    );
};

export default BlogDetail;
