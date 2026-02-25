'use client'
import Image from "next/image";
import FAQAccordion from "@/components/FAQ/faq";
import React from "react";

export default function FAQ(){

    return (
        <div className="pt-30 md:pt-40 pb-10 relative overflow-hidden">
            <div className="my-container">
                <div className="container mx-auto px-4 w-full w-1/2">
                    <h4 className="font-raleway main-color font-extrabold text-2xl sm:text-3xl md:text-4xl pb-4">FAQ</h4>
                </div>
                <div className="absolute top-0 md:-right-40 h-full w-full pointer-events-none opacity-30">
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
                    <FAQAccordion/>
                </div>
            </div>
        </div>
    )
}