import Image from "next/image";
import Hotels from "@/components/Hotels/Hotels";

export default function Hotel() {
    return (
        <div className="pt-30 md:pt-40 pb-10 relative overflow-hidden">
            <div className="my-container">
                <div className="container mx-auto px-4 w-full w-1/2">
                    <h4 className="font-raleway main-color font-extrabold text-2xl sm:text-3xl md:text-4xl pb-4">Handpicked
                        Hotels for Every Journey</h4>
                    <p className="font-nunito text-sm sm:text-base">Discover a world of comfort, style, and
                        unforgettable experiences with our carefully selected hotels around the globe. From luxury
                        resorts and boutique hotels to family-friendly stays and budget-smart options, we help you
                        find the perfect accommodation for every type of trip.</p>
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
                    <Hotels/>
                </div>
            </div>
        </div>
    )
}