import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ContentSection from "./components/ContentSection";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <ContentSection/>
    </div>
  );
}
