import type {Metadata} from "next";
import {Raleway, Nunito} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import Footer from "@/components/Footer";

const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
});

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Shovly Travel",
    description: "Travel to Turkmenistan",
    icons: {
        icon: [
            {url: "/favicon.ico"},
            {url: "/icon.png", type: "image/svg+xml"},
        ],
    }
};

export default async function RootLayout({
                                             children,
                                             params,
                                         }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    return (
        <html lang={locale}>
        <body
            className={`${raleway.variable} ${nunito.variable} antialiased`}
        >
        <NextIntlClientProvider>
            <Header/>
            {children}
            <Footer/>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
