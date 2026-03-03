import Visas from "@/components/Visa/Visas";
import {useTranslations} from "next-intl";

export default function Visa (){
    const t = useTranslations('Services')
    return (
        <div className="pt-30 md:pt-40 pb-10">
            <div className="my-container">
                <div className="container mx-auto px-4 w-full w-1/2">
                    <h4 className="font-raleway main-color font-extrabold text-2xl sm:text-3xl md:text-4xl pb-4">{t('visa-main-title')}</h4>
                    <p className="font-nunito text-sm sm:text-base">{t('visa-main-text')}</p>
                </div>
                <div className="container mx-auto px-4">
                    <Visas/>
                </div>
            </div>
        </div>
    )
}