import Image from "next/image";
import {useTranslations} from "next-intl";

export default function Flights(){
    const t = useTranslations('Services')
    return (
        <div className="pt-30 md:pt-40 pb-10">
            <div className="my-container">
                <div className="flex flex-col lg:flex-row">
                    <div className="container mx-auto px-4 w-full w-1/2">
                        <h4 className="font-raleway main-color font-extrabold text-2xl sm:text-3xl md:text-4xl pb-4">{t('flight-main-title')}</h4>
                        <p className="font-nunito text-sm sm:text-base">{t('flight-main-text')}</p>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <Image src="/flight-mobile.png" alt="aircraft" width={900} height={900}
                        className="w-full lg:hidden" />
                        <Image src="/flight-desktop.png" alt="aircraft" width={900} height={900}
                        className="hidden lg:block" />
                    </div>
                </div>

            </div>
        </div>
    )
}