import ContactForm from "@/components/Contacts/ContactForm";
import ContactDetails from "@/components/Contacts/ContactDetails";
import Image from "next/image";
import {useTranslations} from "next-intl";


const Contact = () => {
    const t =useTranslations('Contacts')
    return (
        <section className="pb-20 pt-34 relative overflow-hidden my-container">
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
                <div
                    className="space-y-6 max-w-4xl mb-4"
                >

                    <h4 className="text-2xl md:text-5xl font-extrabold text-blue-900">
                        {t('title')}
                    </h4>
                    <p className="max-w-xl text-lg">{t('text')}</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <ContactForm/>
                    <ContactDetails/>
                </div>

            </div>
        </section>

    )
}
export default Contact