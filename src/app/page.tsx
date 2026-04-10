import DestinationsSection from "./HomePage/Destinationssection";
import  NatureTrailsHero from "./HomePage/Naturetrailshero"
import ServicesSection from "./HomePage/Servicessection";
import TestimonialsSection from "./HomePage/Testimonialssection";
import WhyChooseUs from "./HomePage/Whychooseus";
import ContactSection from "./HomePage/Contactsection";
import GallerySection from "./HomePage/Gallerysection";
import BlogSection from "./HomePage/Blogsection";


export default function Home() {
  return (
    <>
      <NatureTrailsHero />
      <ServicesSection />
      <WhyChooseUs />
      <DestinationsSection />
      <GallerySection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}