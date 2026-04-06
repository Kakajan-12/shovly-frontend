import {Link} from "@/i18n/navigation";
import Image from "next/image";
import {useTranslations} from "next-intl";

export default function Services() {
    const t =useTranslations('Services')
    const m =useTranslations('More')
    return (
        <div>
            {/* Hero Banner - Geometric Modern */}
            <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{backgroundImage: "url('/services.jpg')"}}
                >
                    {/* Overlay with Split Color Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2A4393]/95 via-[#3E74B4]/85 to-[#2A4393]/90"></div>

                    {/* Geometric Patterns */}
                    <div className="absolute inset-0">
                        {/* Diagonal Lines */}
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5"
                             style={{
                                 backgroundImage: `repeating-linear-gradient(
                                     -45deg,
                                     transparent,
                                     transparent 20px,
                                     rgba(255,255,255,0.1) 20px,
                                     rgba(255,255,255,0.1) 22px
                                 )`
                             }}></div>

                        {/* Floating Geometric Shapes */}
                        <div className="absolute top-20 right-40 w-32 h-32 rounded-full opacity-20 blur-2xl"
                             style={{ background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)' }}></div>
                        <div className="absolute bottom-32 left-20 w-48 h-48 opacity-10 blur-3xl"
                             style={{ background: 'linear-gradient(135deg, #E8B887 0%, white 100%)' }}></div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 h-full flex items-center pt-28 md:pt-32">
                    <div className="max-w-4xl space-y-6">
                        {/* Eyebrow with Icon */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                                 style={{
                                     background: 'rgba(255, 255, 255, 0.1)',
                                     border: '1px solid rgba(255, 255, 255, 0.2)'
                                 }}>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-white/90 text-sm md:text-base tracking-[0.25em] uppercase font-medium font-raleway">
                                Premium Services
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-raleway">
                            {t('title')}
                        </h1>

                        {/* Decorative Line */}
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-20 rounded-full"
                                 style={{ background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)' }}></div>
                            <div className="h-1.5 w-12 rounded-full bg-white/40"></div>
                            <div className="h-1.5 w-8 rounded-full bg-white/20"></div>
                        </div>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-white/95 max-w-2xl leading-relaxed font-nunito">
                            {t('text')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Services Cards */}
            <div className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Flights Card */}
                    <div className="group relative">
                        <div className="h-full bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3"
                             style={{ boxShadow: '0 8px 40px rgba(42, 67, 147, 0.1)' }}>
                            {/* Image Container */}
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    src="/flights.webp"
                                    alt="flights"
                                    width={1020}
                                    height={500}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2A4393]/80 via-[#2A4393]/20 to-transparent"></div>

                                {/* Icon Badge */}
                                <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md transition-transform duration-500 group-hover:scale-110"
                                     style={{
                                         background: 'rgba(255, 255, 255, 0.95)',
                                         boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                                     }}>
                                    <svg className="w-8 h-8" style={{ color: '#2A4393' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-4">
                                <h3 className="text-3xl font-bold text-gray-900 font-raleway">
                                    {t('flight-title')}
                                </h3>

                                <div className="h-1 w-16 rounded-full transition-all duration-500 group-hover:w-full"
                                     style={{ background: 'linear-gradient(90deg, #2A4393 0%, #3E74B4 100%)' }}></div>

                                <p className="text-gray-600 leading-relaxed font-nunito min-h-[4.5rem]">
                                    {t('flight-text')}
                                </p>

                                <div className="pt-4">
                                    <Link
                                        href="/services/flights"
                                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:gap-5 hover:shadow-xl font-raleway"
                                        style={{ background: 'linear-gradient(135deg, #2A4393 0%, #3E74B4 100%)' }}
                                    >
                                        {m('view')}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hotels Card */}
                    <div className="group relative">
                        <div className="h-full bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3"
                             style={{ boxShadow: '0 8px 40px rgba(200, 121, 65, 0.1)' }}>
                            {/* Image Container */}
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    src="/awaza.webp"
                                    alt="hotels"
                                    width={1020}
                                    height={500}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#C87941]/80 via-[#C87941]/20 to-transparent"></div>

                                {/* Icon Badge */}
                                <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md transition-transform duration-500 group-hover:scale-110"
                                     style={{
                                         background: 'rgba(255, 255, 255, 0.95)',
                                         boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                                     }}>
                                    <svg className="w-8 h-8" style={{ color: '#C87941' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-4">
                                <h3 className="text-3xl font-bold text-gray-900 font-raleway">
                                    {t('hotel-title')}
                                </h3>

                                <div className="h-1 w-16 rounded-full transition-all duration-500 group-hover:w-full"
                                     style={{ background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)' }}></div>

                                <p className="text-gray-600 leading-relaxed font-nunito min-h-[4.5rem]">
                                    {t('hotel-text')}
                                </p>

                                <div className="pt-4">
                                    <Link
                                        href="/services/hotels"
                                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:gap-5 hover:shadow-xl font-raleway"
                                        style={{ background: 'linear-gradient(135deg, #C87941 0%, #E8B887 100%)' }}
                                    >
                                        {m('view')}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visa Card */}
                    <div className="group relative">
                        <div className="h-full bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3"
                             style={{ boxShadow: '0 8px 40px rgba(42, 67, 147, 0.1)' }}>
                            {/* Image Container */}
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    src="/visa.webp"
                                    alt="visa"
                                    width={1020}
                                    height={500}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2A4393]/80 via-[#2A4393]/20 to-transparent"></div>

                                {/* Icon Badge */}
                                <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md transition-transform duration-500 group-hover:scale-110"
                                     style={{
                                         background: 'rgba(255, 255, 255, 0.95)',
                                         boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                                     }}>
                                    <svg className="w-8 h-8" style={{ color: '#2A4393' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-4">
                                <h3 className="text-3xl font-bold text-gray-900 font-raleway">
                                    {t('visa-title')}
                                </h3>

                                <div className="h-1 w-16 rounded-full transition-all duration-500 group-hover:w-full"
                                     style={{ background: 'linear-gradient(90deg, #2A4393 0%, #3E74B4 100%)' }}></div>

                                <p className="text-gray-600 leading-relaxed font-nunito min-h-[4.5rem]">
                                    {t('visa-text')}
                                </p>

                                <div className="pt-4">
                                    <Link
                                        href="/services/visas"
                                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:gap-5 hover:shadow-xl font-raleway"
                                        style={{ background: 'linear-gradient(135deg, #2A4393 0%, #3E74B4 100%)' }}
                                    >
                                        {m('view')}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}