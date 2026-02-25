import {useTranslations} from "next-intl";
import Link from "next/link";
import Image from "next/image";

const About = ()=>{
    const t = useTranslations('About')
    const h = useTranslations('Header')
    const m = useTranslations('More')
    return (
        <div className="my-container py-16 flex items-center">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center space-y-8  mx-auto">
                    <div className="space-y-4 md:space-y-10 max-w-md">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 font-nunito">{h('about')}</h2>
                        <p className="text-sm md:text-md font-medium font-nunito">{t('about-main-text')}</p>
                        <div className="flex justify-center md:justify-start">
                            <Link href="/about" className="text-white main-background px-8 py-2 rounded-full font-nunito">{m('read-more')}</Link>
                        </div>
                    </div>
                    <div className="justify-end w-full hidden lg:flex">
                        <Image src="/icon.png" alt="about"
                               width={600}
                               height={400}
                        className="opacity-30 max-w-md"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;