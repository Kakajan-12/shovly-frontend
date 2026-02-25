'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { FaLinkedin, FaTelegram, FaWhatsapp, FaPhoneSquareAlt } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import WorkingHours from "@/components/WorkingHours";
import Weather from "@/components/Weather";

interface Location {
    id: number;
    location_ru: string;
    location_tk: string;
    location_en: string;
}

interface Phone {
    id: number;
    number: string;
    location_id_real: number;
}

interface Mail {
    id: number;
    mail: string;
    location_id_real: number;
}

interface Messenger {
    id: number;
    icon: string;
    url: string;
}

const Footer = () => {
    const t = useTranslations("Footer");
    const h = useTranslations("Header");
    const locale = useLocale();

    const [locations, setLocations] = useState<Location[]>([]);
    const [phones, setPhones] = useState<Phone[]>([]);
    const [mails, setMails] = useState<Mail[]>([]);
    const [messengers, setMessengers] = useState<Messenger[]>([]);
    const [weather, setWeather] = useState({ temp: 22, condition: "Sunny" });
    const [currentTime, setCurrentTime] = useState("16:40");

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "";

                const [resLoc, resPhone, resMail, resMess] = await Promise.all([
                    fetch(`${base}/api/contact-location`),
                    fetch(`${base}/api/contact-numbers`),
                    fetch(`${base}/api/contact-mails`),
                    fetch(`${base}/api/links`),
                ]);

                const [locData, phoneData, mailData, messData] = await Promise.all([
                    resLoc.json(),
                    resPhone.json(),
                    resMail.json(),
                    resMess.json(),
                ]);

                if (Array.isArray(locData)) setLocations(locData);
                if (Array.isArray(phoneData)) setPhones(phoneData);
                if (Array.isArray(mailData)) setMails(mailData);
                if (Array.isArray(messData)) setMessengers(messData);
            } catch (err) {
                console.error("Ошибка при загрузке контактов:", err);
            }
        };

        fetchContacts();
    }, [locale]);

    const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");

    const renderMessengerIcons = () =>
        messengers.map((item) => {
            const iconType = item.icon?.toLowerCase();
            const icons: Record<string, React.ElementType> = {
                telegram: FaTelegram,
                linkedin: FaLinkedin,
                instagram: GrInstagram,
                whatsapp: FaWhatsapp,
                facebook: FiFacebook,
                twitter: FaXTwitter,
                tiktok: FaTiktok
            };

            const Icon = icons[iconType];
            if (!Icon) return null;

            return (
                <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                >
                    <Icon className="w-5 h-5" />
                </a>
            );
        });

    return (
        <footer className="py-20 relative overflow-hidden my-container main-background">
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

            <div className="container relative mx-auto px-4">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 text-white">
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="text-3xl md:text-4xl font-bold font-montserrat leading-tight">
                            Shovly travel
                        </h3>
                        <p className="text-sm opacity-90 max-w-md">
                            {t("text")}
                        </p>
                        <div className="flex space-x-3 pt-2">
                            {renderMessengerIcons()}
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-xl font-bold mb-4">{t('quick-links')}:</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm hover:underline">{h('main')}</Link></li>
                            <li><Link href="/tours" className="text-sm hover:underline">{h('tours')}</Link></li>
                            <li><Link href="/about" className="text-sm hover:underline">{h('about')}</Link></li>
                            <li><Link href="/faq" className="text-sm hover:underline">FAQ</Link></li>
                            <li><Link href="/contact" className="text-sm hover:underline">{h('contacts')}</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-xl font-bold mb-4">{t('contacts')}:</h4>

                        {locations.map((loc) => {
                            const localizedAddress =
                                locale === "ru" ? loc.location_ru :
                                    locale === "tk" ? loc.location_tk :
                                        loc.location_en;

                            const locPhones = phones.filter((p) => p.location_id_real === loc.id);
                            const locMails = mails.filter((m) => m.location_id_real === loc.id);

                            return (
                                <div key={loc.id} className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <IoLocationOutline className="w-5 h-5 mt-1 flex-shrink-0"/>
                                        <p className="text-sm">{stripHtml(localizedAddress)}</p>
                                    </div>

                                    {locPhones.map((phone) => (
                                        <div key={phone.id} className="flex items-center gap-2">
                                            <FaPhoneSquareAlt className="w-4 h-4 flex-shrink-0"/>
                                            <a href={`tel:${phone.number}`} className="text-sm hover:underline">
                                                {phone.number}
                                            </a>
                                        </div>
                                    ))}

                                    {locMails.map((mail) => (
                                        <div key={mail.id} className="flex items-center gap-2">
                                            <MdOutlineAlternateEmail className="w-4 h-4 flex-shrink-0"/>
                                            <a href={`mailto:${mail.mail}`} className="text-sm hover:underline">
                                                {mail.mail}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>

                    <div className="lg:col-span-3 space-y-4">
                        <Weather />

                        <WorkingHours/>
                    </div>
                </div>

                <hr className="border-white/20 my-8"/>

                <div
                    className="relative z-10 flex flex-col sm:flex-row justify-between items-center text-white/80 text-sm">
                    <p>© {new Date().getFullYear()} All rights reserved</p>
                    <div className="flex items-center gap-1 mt-2 sm:mt-0">
                        <span>Powered by</span>
                        <Image
                            src="/logo.svg"
                            alt="Hebent Tech"
                            width={20}
                            height={20}
                        />
                        <Link
                            href="https://hebent.tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Hebent Tech
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;