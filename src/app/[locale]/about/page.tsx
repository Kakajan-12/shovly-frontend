import {useTranslations} from "next-intl";
import Image from "next/image";

export default function About() {
    const t = useTranslations("About");


    return (
        <section className="pt-30 relative overflow-hidden my-container">
            <div className="absolute top-0 -right-40 h-full w-full pointer-events-none opacity-30">
                <Image
                    src="/icon.png"
                    alt=""
                    width={600}
                    height={600}
                    className="absolute top-0 right-0"
                    aria-hidden="true"
                />
            </div>
            <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                    <div
                        className="py-10 space-y-10 lg:bg-[url('/mobile-map.webp')] bg-no-repeat bg-center bg-cover"
                    >
                        <p
                            className="lg:text-2xl text-lg text-blue-900 font-medium"
                        >
                            {t('up-text')}
                        </p>
                        <h4
                            className="text-3xl lg:text-5xl font-bold"
                        >
                            {t('up-title')}
                        </h4>
                        <p className="leading-8 text-lg">{t('down-text')}</p>
                    </div>
                </div>

            </div>

            <div className="my-container lang-bg py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-4">
                        <h4 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">{t('title')}</h4>
                        <p className="text-white">{t('text')}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 py-5">
                        <Image src="/about1.png" alt="about"
                               width={600} height={600}
                               className="w-full h-full"/>
                        <Image src="/about2.png" alt="about"
                               width={600} height={600}
                               className="w-full h-full"/>
                        <Image src="/about3.png" alt="about"
                               width={600} height={600}
                               className="w-full h-full"/>
                    </div>
                </div>

            </div>

        </section>

    );
}
