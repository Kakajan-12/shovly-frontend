import {useTranslations} from "next-intl";
import Image from "next/image";

export default function About() {
    const t = useTranslations("About");


    return (
        <section className="pt-20 relative overflow-hidden my-container">
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
                    className="text-center py-10 space-y-10 lg:bg-[url('/mobile-map.webp')] bg-no-repeat bg-center bg-cover"
                >
                    <p
                        className="max-w-3xl lg:text-lg text-base text-gray-700 mx-auto"
                    >
                        An eye for the out of the ordinary
                    </p>
                    <h4
                        className="text-4xl lg:text-6xl font-bold"
                    >
                        More Than a Destination - A Deeper Journey
                    </h4>
                    <p>We are a dedicated travel agency passionate about creating unforgettable journeys and meaningful travel experiences. With a deep understanding of destinations around the world, we specialize in tailor-made trips that reflect our clients’ interests, lifestyles, and dreams.
                        Our team of experienced travel professionals carefully plans every detail — from flights and accommodations to unique excursions and local experiences. Whether you are looking for a relaxing beach holiday, a cultural adventure, a luxury getaway, or a family-friendly trip, we are here to make your travel seamless and inspiring.</p>
                </div>
            </div>

            <div className="my-container lang-bg py-8">
                <div className="container mx-auto px-4">
                    <h4>Your Trusted Travel Partner</h4>
                    <p>We provide reliable, personalized travel solutions designed around your needs. With attention to
                        detail and a passion for travel, we guide you every step of the way — from planning to
                        unforgettable experiences. Our goal is to make every journey smooth, inspiring, and truly
                        memorable.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 py-5">
                        <Image src="/about1.png" alt="about"
                               width={600} height={600}
                        className="w-full h-full"/>
                        <Image src="/about2.png" alt="about"
                               width={600} height={600}
                               className="w-full h-full"/>
                        <Image src="/about3.png" alt="about"
                               width={600} height={600}
                               className="w-full h-full"/>
                    </div>
                </div>

            </div>

        </section>

    );
}
