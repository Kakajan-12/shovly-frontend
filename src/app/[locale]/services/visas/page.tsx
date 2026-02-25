import Visas from "@/components/Visa/Visas";

export default function Visa (){
    return (
        <div className="pt-30 md:pt-40 pb-10">
            <div className="my-container">
                <div className="container mx-auto px-4 w-full w-1/2">
                    <h4 className="font-raleway main-color font-extrabold text-2xl sm:text-3xl md:text-4xl pb-4">How to Obtain Your Visa</h4>
                    <p className="font-nunito text-sm sm:text-base">Obtaining a visa doesn’t have to be complicated. On this page, you’ll find clear guidance on how to apply for a visa and what steps are required to prepare your application correctly.</p>
                </div>
                <div className="container mx-auto px-4">
                    <Visas/>
                </div>
            </div>
        </div>
    )
}