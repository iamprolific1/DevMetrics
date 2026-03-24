"use client";
import HeroSection from './components/landing/Hero';
import Navbar from './components/Navbar/Navbar';
import FeaturesSection from './components/landing/Features';
import TestimonialSection from './components/landing/Testimonials';
import PricingSection from './components/landing/Pricing';
import FAQSection from './components/landing/FAQSection';
import Footer from './components/landing/Footer';
import { useAuth } from './providers/Auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);
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
