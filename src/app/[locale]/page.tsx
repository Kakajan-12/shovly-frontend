import Main from "@/app/[locale]/Main";
import About from "@/app/[locale]/About";
import Gallery from "@/app/[locale]/Gallery";
import Tour from "@/app/[locale]/Tour";

export default function Home() {
    return (
        <>
            <Main/>
            <About/>
            <Tour/>
            <Gallery/>
        </>
    );
}
