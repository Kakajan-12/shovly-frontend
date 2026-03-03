'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const t = useTranslations('Header');
    const locale = useLocale();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const locales = [
        { code: 'en', label: 'EN' },
        { code: 'ru', label: 'RU' },
        { code: 'tk', label: 'TM' },
    ];

    const getLocalizedPath = (newLocale: string) => {
        const parts = pathname.split('/').filter(Boolean);
        if (locales.some((l) => l.code === parts[0])) {
            parts[0] = newLocale;
        } else {
            parts.unshift(newLocale);
        }
        return '/' + parts.join('/');
    };

    return (
        <header className="fixed top-5 lg:top-8 left-0 w-full z-60 px-4">
            <div className="container mx-auto flex justify-between items-center px-4 py-2 rounded-full shadow-md bg-white">
                <Link href={`/${locale}`} className="cursor-pointer">
                    <Image src="/icon.png" alt="BN Tour logo" width={90} height={90} priority
                           className="w-12"/>
                </Link>

                <nav className="hidden md:flex items-center space-x-4 text-gray-800 font-medium">
                    <Link href={`/${locale}`} className="main-color font-raleway text-lg lg:text-xl">
                        {t('main')}
                    </Link>
                    <Link href={`/${locale}/tours`} className="main-color font-raleway text-lg lg:text-xl">
                        {t('tours')}
                    </Link>
                    <Link href={`/${locale}/blogs`} className="main-color font-raleway text-lg lg:text-xl">
                        {t('blogs')}
                    </Link>
                    <Link href={`/${locale}/services`} className="main-color font-raleway text-lg lg:text-xl">
                        {t('services')}
                    </Link>
                    <Link href={`/${locale}/faq`} className="main-color font-raleway text-lg lg:text-xl">
                        {t('faq')}
                    </Link>
                    <Link href={`/${locale}/about`} className="main-color font-raleway text-lg lg:text-xl">
                        {t('about')}
                    </Link>
                    <Link href={`/${locale}/contacts`} className="main-color font-raleway text-lg lg:text-xl">
                        {t('contacts')}
                    </Link>
                </nav>

                <div className="hidden md:relative md:flex -top-2 -left-4 h-14">
                    <div className="font-raleway">
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="text-white cursor-pointer font-medium lang-bg rounded-bl-md rounded-br-md p-2 h-full w-12"
                        >
                            {locales.find((l) => l.code === locale)?.label}
                        </button>

                        {isLangOpen && (
                            <div className="absolute right-0 mt-1 w-12 bg-white shadow-lg rounded-md border z-50">
                                {locales
                                    .filter((l) => l.code !== locale)
                                    .map((l) => (
                                        <Link
                                            key={l.code}
                                            href={getLocalizedPath(l.code)}
                                            scroll={false}
                                            onClick={() => setIsLangOpen(false)}
                                            className="block px-3 py-2 hover:bg-[#3E74B4] hover:text-white text-sm"
                                        >
                                            {l.label}
                                        </Link>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex md:hidden items-center gap-3">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-md hover:bg-gray-100 transition"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={26} color="#2A4393"/> : <Menu size={26} color="#2A4393"/>}
                    </button>
                </div>
            </div>

            <div
                className={`md:hidden bg-white shadow-lg transition-all duration-300 overflow-hidden mt-2 rounded-xl ${
                    isMenuOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                }`}
            >
                <div className="flex flex-col items-center space-y-3 text-gray-700">
                    <Link href={`/${locale}`} onClick={() => setIsMenuOpen(false)}
                          className="font-raleway main-color text-lg">
                        {t('main')}
                    </Link>
                    <Link href={`/${locale}/tours`} onClick={() => setIsMenuOpen(false)}
                          className="font-raleway main-color text-lg">
                        {t('tours')}
                    </Link>
                    <Link href={`/${locale}/blogs`} onClick={() => setIsMenuOpen(false)}
                          className="font-raleway main-color text-lg">
                        {t('blogs')}
                    </Link>
                    <Link href={`/${locale}/about`} onClick={() => setIsMenuOpen(false)}
                          className="font-raleway main-color text-lg">
                        {t('about')}
                    </Link>

                    <Link href={`/${locale}/faq`} onClick={() => setIsMenuOpen(false)}
                          className="font-raleway main-color text-lg">
                        {t('faq')}
                    </Link>
                    <Link href={`/${locale}/contacts`} onClick={() => setIsMenuOpen(false)}
                          className="font-raleway main-color text-lg">
                        {t('contacts')}
                    </Link>

                    <div className="flex justify-center space-x-3 border-t pt-3">
                        {locales.map((l) => (
                            <Link
                                key={l.code}
                                href={getLocalizedPath(l.code)}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div
                                    className={`font-raleway px-2 py-1 rounded 
                    ${l.code === locale ? 'lang-bg text-white' : ''}`}
                                >
                                    {l.label}
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
