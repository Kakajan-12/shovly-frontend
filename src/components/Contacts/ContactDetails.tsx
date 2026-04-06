'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import {FaPhone} from "react-icons/fa";

interface Location {
    id: number;
    [key: string]: any;
}

interface Address {
    id: number;
    location_id_real: number;
    iframe: string;
    [key: string]: any;
}

interface NumberItem {
    id: number;
    location_id_real: number;
    number: string;
}

interface Mail {
    id: number;
    location_id_real: number;
    mail: string;
}

interface GroupedData {
    location: Location | null;
    address: Address | null;
    numbers: string[];
    mail: string[];
    iframe: string;
}

const ContactDetails = () => {
    const [data, setData] = useState<GroupedData[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const t = useTranslations('Contacts');
    const lang = useLocale();

    const stripHTML = (text: string) => text?.replace(/<[^>]*>/g, '') || '';
    const getLangKey = (base: string) =>
        `${base}_${lang === 'ru' ? 'ru' : lang === 'tk' ? 'tk' : 'en'}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL;
                if (!baseUrl) throw new Error('NEXT_PUBLIC_API_URL not found');

                const endpoints = [
                    'api/contact-location',
                    'api/contact-address',
                    'api/contact-numbers',
                    'api/contact-mails',
                ];

                const [locationsRes, addressesRes, numbersRes, mailsRes] = await Promise.all(
                    endpoints.map((ep) =>
                        fetch(`${baseUrl}/${ep}`).then((res) => (res.ok ? res.json() : []))
                    )
                );

                const locations: Location[] = Array.isArray(locationsRes) ? locationsRes : [];
                const addresses: Address[] = Array.isArray(addressesRes) ? addressesRes : [];
                const numbers: NumberItem[] = Array.isArray(numbersRes) ? numbersRes : [];
                const mails: Mail[] = Array.isArray(mailsRes) ? mailsRes : [];

                const grouped: GroupedData[] = locations.map((loc) => {
                    const address = addresses.find((a) => a.location_id_real === loc.id) || null;
                    const numberList = numbers
                        .filter((n) => n.location_id_real === loc.id)
                        .map((n) => n.number);
                    const mailList = mails
                        .filter((m) => m.location_id_real === loc.id)
                        .map((m) => m.mail);


                    return {
                        location: loc,
                        address,
                        numbers: numberList,
                        mail: mailList,
                        iframe: address?.iframe || '',
                    };
                });

                setData(grouped);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to load contact data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center py-20 text-gray-600">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
    if (!data.length)
        return <div className="text-center py-20 text-gray-600">No contact data available</div>;

    const active = data[activeIndex];

    return (
        <div className="w-full sticky top-24">
            {/* Section Header */}
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-raleway">
                    Contact Information
                </h2>
                <div className="w-20 h-1 rounded-full"
                     style={{ background: 'linear-gradient(90deg, #C87941 0%, #E8B887 100%)' }}></div>
            </div>

            {/* Location Tabs */}
            {data.length > 1 && (
                <div className="mb-6 flex flex-col gap-3">
                    {data.map((loc, idx) => (
                        <button
                            key={loc.location?.id ?? idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`px-6 py-3 rounded-xl border-2 text-left font-medium transition-all duration-300 focus:outline-none font-raleway ${
                                activeIndex === idx
                                    ? 'text-white border-transparent shadow-lg'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#2A4393] hover:shadow-md'
                            }`}
                            style={activeIndex === idx ? {
                                background: 'linear-gradient(135deg, #2A4393 0%, #3E74B4 100%)'
                            } : {}}
                        >
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {stripHTML(loc.location?.[getLangKey('location')] || '')}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Contact Cards */}
            <div className="space-y-4">
                {/* Address Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                     style={{ boxShadow: '0 8px 24px rgba(42, 67, 147, 0.08)' }}>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                             style={{ background: 'linear-gradient(135deg, #E8F4FF 0%, #D6EBFF 100%)' }}>
                            <IoLocationOutline className="text-[#2A4393]" size={24}/>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 font-raleway">
                                {t('address')}
                            </h3>
                            <p className="text-gray-900 leading-relaxed font-nunito">
                                {stripHTML(active?.address?.[getLangKey('address')] || '')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Email Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                     style={{ boxShadow: '0 8px 24px rgba(200, 121, 65, 0.08)' }}>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                             style={{ background: 'linear-gradient(135deg, #FFF5EE 0%, #FFE8D6 100%)' }}>
                            <MdOutlineAlternateEmail className="text-[#C87941]" size={24}/>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 font-raleway">
                                {t('email')}
                            </h3>
                            <div className="space-y-1">
                                {active?.mail?.map((mail, idx) => (
                                    <a
                                        key={idx}
                                        href={`mailto:${mail}`}
                                        className="block text-gray-900 hover:text-[#C87941] transition-colors font-nunito"
                                    >
                                        {mail}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phone Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                     style={{ boxShadow: '0 8px 24px rgba(42, 67, 147, 0.08)' }}>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                             style={{ background: 'linear-gradient(135deg, #E8F4FF 0%, #D6EBFF 100%)' }}>
                            <FaPhone className="text-[#2A4393]" size={20}/>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 font-raleway">
                                {t('number')}
                            </h3>
                            <div className="space-y-1">
                                {active?.numbers?.map((phone, idx) => (
                                    <a
                                        key={idx}
                                        href={`tel:${phone}`}
                                        className="block text-gray-900 hover:text-[#2A4393] transition-colors font-nunito"
                                    >
                                        {phone}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Business Hours Card */}
            <div className="mt-6 bg-gradient-to-br from-[#2A4393] to-[#3E74B4] rounded-2xl p-6 text-white">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                         style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90 font-raleway">
                            Business Hours
                        </h3>
                        <div className="space-y-1 font-nunito">
                            <p className="text-white/95">Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p className="text-white/95">Saturday: 10:00 AM - 4:00 PM</p>
                            <p className="text-white/95">Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Response Time Banner */}
            <div className="mt-6 bg-gradient-to-r from-[#C87941] to-[#E8B887] rounded-2xl p-6 text-white text-center">
                <svg className="w-10 h-10 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h4 className="font-bold text-lg mb-1 font-raleway">Quick Response Guarantee</h4>
                <p className="text-white/90 text-sm font-nunito">We typically respond within 24 hours</p>
            </div>
        </div>
    );
};

export default ContactDetails;
