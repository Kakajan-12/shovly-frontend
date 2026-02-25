import ContactForm from "@/components/Contacts/ContactForm";
import ContactDetails from "@/components/Contacts/ContactDetails";
import Image from "next/image";


const Contact = () => {
    return (
        <section className="py-20 relative overflow-hidden my-container">
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
                    className="text-center space-y-6 max-w-4xl"
                >
                    <p className="">Contact</p>

                    <h1 className="text-2xl md:text-4xl font-bold max-w-lg mx-auto">
                        Get In Touch With Us
                    </h1>
                    <p className="text-[#2D1B0D] text-lg">We are here to help! If you have any questions or feedback,
                        feel free to reach out to us.</p>
                </div>
                <ContactForm/>
                <ContactDetails/>
            </div>
        </section>

    )
}
export default Contact