import { getTranslations } from "next-intl/server";
import TourSlider from "@/components/Tours/TourSlider";

async function getLatestTours() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tours`,
        { cache: "no-store" } // или revalidate: 60
    );

    const data = await res.json();

    return data
        .sort((a: any, b: any) => b.id - a.id)
        .slice(0, 5);
}

export default async function Tour() {
    const t = await getTranslations("Tour");
    const tours = await getLatestTours();

    return (
        <section className="py-20">
            <div className="container mx-auto px-4 lg:my-container">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-[35%] lg:pl-20">
                        <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide font-raleway">
                            {t("main-title")}
                        </h2>

                        <p className="text-gray-600 mb-8 font-nunito">
                            {t("main-text")}
                        </p>
                    </div>

                    <div className="lg:w-[65%]">
                        <TourSlider tours={tours} />
                    </div>
                </div>
            </div>
        </section>
    );
}