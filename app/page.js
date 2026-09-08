import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import CardsFp from "../components/cards-fp/CardsFp";
import Nyhedsbrev from "../components/nyhedsbrev/Nyhedsbrev";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Header />
        <Hero />
        <CardsFp />
        <Nyhedsbrev />
      </main>
    </div>
  );
}