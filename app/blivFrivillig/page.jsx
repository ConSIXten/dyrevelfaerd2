
import Hero2 from "../../components/hero/Hero2";
import Hero3 from "../../components/hero/Hero3";
import Header from "../../components/header/Header";
import CardsBf from "../../components/cards-bf/CardsBf";
import Nyhedsbrev from "../../components/nyhedsbrev/Nyhedsbrev";
import Footer from "../../components/footer/Footer";

export default async function BlivFrivilligPage() {
    return (
        <div>
            <Header/>
            <Hero2/>
            <CardsBf/>
            <Nyhedsbrev/>
            <Hero3/>
            <Footer/>
        </div>
    );
}