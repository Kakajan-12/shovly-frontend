import {Link} from "@/i18n/navigation";
import Image from "next/image";
import {useTranslations} from "next-intl";

export default function Services() {
    const t =useTranslations('Services')
    const m =useTranslations('More')
    return (
        <div>
            <div
                className="relative w-full bg-cover bg-center text-white before:absolute before:inset-0 before:bg-black/30"
                style={{backgroundImage: "url('/services.jpg')"}}
            >
                <div className="relative z-10 container mx-auto px-2 flex flex-col h-[450px] justify-center space-y-5">
                    <h1 className="text-4xl md:text-5xl font-bold font-raleway">{t('title')}</h1>
                    <p className="text-lg max-w-2xl font-nunito">
                        {t('text')}
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4">

                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="h-56 bg-blue-500 flex items-center justify-center">
                                <Image src="/flights.webp" alt="flights"
                                width={1020} height={500} className="w-full h-full" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3 font-raleway">{t('flight-title')}</h3>
                                <p className="text-gray-600 mb-4 font-nunito">
                                    {t('flight-text')}
                                </p>
                                <Link
                                    href="/services/flights"
                                    className="inline-block main-background text-white px-6 py-2 rounded-full font-raleway"
                                >
                                    {m('view')}
                                </Link>
                            </div>
                        </div>

                        <div
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="h-56 bg-green-500 flex items-center justify-center">
                                <Image src="/awaza.webp" alt="flights"
                                       width={1020} height={500} className="w-full h-full" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3 font-raleway">{t('hotel-title')}</h3>
                                <p className="text-gray-600 mb-4 font-nunito">
                                    {t('hotel-text')}
                                </p>
                                <Link
                                    href="/services/hotels"
                                    className="inline-block main-background text-white px-6 py-2 rounded-full font-raleway"
                                >
                                    {m('view')}
                                </Link>
                            </div>
                        </div>

                        <div
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="h-56 bg-green-500 flex items-center justify-center">
                                <Image src="/visa.webp" alt="flights"
                                       width={1020} height={500} className="w-full h-full"/>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3 font-raleway">{t('visa-title')}</h3>
                                <p className="text-gray-600 mb-4 font-nunito">
                                    {t('visa-text')}
                                </p>
                                <Link
                                    href="/services/visas"
                                    className="inline-block main-background text-white px-6 py-2 rounded-full font-raleway"
                                >
                                    {m('view')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}