import HeroSection from './components/landing/Hero';
import Navbar from './components/Navbar/Navbar';
import FeaturesSection from './components/landing/Features';
import TestimonialSection from './components/landing/Testimonials';
import PricingSection from './components/landing/Pricing';
import FAQSection from './components/landing/FAQSection';
import Footer from './components/landing/Footer';


export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
