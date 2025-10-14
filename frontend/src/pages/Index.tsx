import React from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { PartnersCarousel } from '@/components/PartnersCarousel';
import { PDFViewer } from '@/components/PDFViewer';
import { SlidingCategories } from '@/components/SlidingCategories';
import { CategoriesElegant } from '@/components/CategoriesElegant';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ContactElegant } from '@/components/ContactElegant';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/*<PDFViewer />*/}
      <CategoriesElegant />
      <FeaturedProducts />
      <SlidingCategories />
      <PartnersCarousel />
      <ContactElegant />
      <Footer />
    </div>
  );
};

export default Index;