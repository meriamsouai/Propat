import React from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        
        style={{
          backgroundImage: `url('/bg-plaq.png')`,
          filter: 'sepia(40%) saturate(90%)'
        }}
      >           

        <div className="absolute inset-0 bg-accent/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white/85 max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold italic mb-6 mt-20 leading-tight">
          Les Professionnels des
          <br />
          <span className="text-6xl md:text-8xl ">Métiers de Bouches</span>
        </h1>
        
        <p className="text-xl md:text-1xl italic mb-8 opacity-90">
          Créativité • Innovation • Tendance
        </p>
        <a href="/customization">
        <Button 
          size="lg" 
          className="bg-primary text-primary-foreground px-8 py-4 text-lg italic font-medium elegant-shadow btn-animate relative z-10"
        >
          Personnalisez Votre Décoration
        </Button>
        </a>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};