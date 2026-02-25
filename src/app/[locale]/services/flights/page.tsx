import Image from "next/image";

export default function Flights(){
    return (
        <div className="pt-30 md:pt-40 pb-10">
            <div className="my-container">
                <div className="flex flex-col lg:flex-row">
                    <div className="container mx-auto px-4 w-full w-1/2">
                        <h4 className="font-raleway main-color font-extrabold text-2xl sm:text-3xl md:text-4xl pb-4">Flight Booking Made Easy</h4>
                        <p className="font-nunito text-sm sm:text-base">At our travel agency, we offer a full spectrum of flight services designed to meet the needs of every traveler. Whether you’re planning a short business trip, a romantic getaway, or an adventurous vacation, we ensure that you have access to the best flights available. From budget-friendly options to premium services, we cater to every type of traveler.
                            Our team works with top global airlines to provide a wide selection of flights, including direct routes, connecting flights, and multi-destination options. We offer flights to major cities around the world, as well as more remote locations, giving you flexibility and choice when it comes to your travel plans.
                            We understand that booking a flight can be a complex task, especially with fluctuating prices and varying schedules. That’s why our travel experts are here to assist you every step of the way. We’ll help you find the most convenient flight times, the best prices, and any additional services you might need, such as seat upgrades or extra luggage allowances.
                            Additionally, our agency is committed to offering flexible booking options, ensuring peace of mind in case of changes to your travel plans. We also provide comprehensive support for any issues that may arise before, during, or after your flight, ensuring that your experience is smooth and stress-free.</p>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <Image src="/flight-mobile.png" alt="aircraft" width={900} height={900}
                        className="w-full lg:hidden" />
                        <Image src="/flight-desktop.png" alt="aircraft" width={900} height={900}
                        className="hidden lg:block" />
                    </div>
                </div>

            </div>
        </div>
    )
}