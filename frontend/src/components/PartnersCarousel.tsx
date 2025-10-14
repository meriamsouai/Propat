import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const partners = [
  {
    name: 'Valrhona',
    handle: '@valrhona_imea',
    description: 'Chocolatier français de renom mondial, créateur de chocolats d\'exception depuis 1922.',
    video: '/valrhona-vid.mp4',
    instagramUrl: 'https://instagram.com/valrhona_imea',
    logo:'/valrhona-logo.png' 
  },
  {
    name: 'Pavoni Italia',
    handle: '@pavonitalia',
    description: 'Moules et équipements professionnels pour la pâtisserie moderne et l\'innovation culinaire.',
    video: '/pavoni-vid.mp4',
    instagramUrl: 'https://instagram.com/pavonitalia',
    logo:'/pavoni-logo.png'
  },
  {
    name: 'Lubeca Marzipan',
    handle: '@lubeca_marzipan',
    description: 'Spécialiste allemand du massepain de qualité supérieure pour les professionnels.',
    video: '/lubeca-vid.mp4',
    instagramUrl: 'https://instagram.com/lubeca_marzipan',
    logo:'/lubeca-logo.png'
  },
  {
    name: 'Sasa De Marle',
    handle: '@sasademarle',
    description: 'Tapis de cuisson et moules en silicone de haute performance pour la pâtisserie professionnelle.',
    video: 'sasa-vid.mp4',
    instagramUrl: 'https://instagram.com/sasademarle',
    logo:'sasa-logo.png'
  },
  {
    name: 'Sosa Ingredients',
    handle: '@sosaingredients',
    description: 'Ingrédients innovants et techniques modernes pour la gastronomie d\'avant-garde.',
    video: 'sosa-vid.mp4',
    instagramUrl: 'https://instagram.com/sosaingredients',
    logo:'sosa-logo.png'
  },
  {
    name: 'Selmi Chocolate Machinery',
    handle: '@selmi_chocolate_machinery',
    description: 'Machines professionnelles pour le travail du chocolat et la confiserie industrielle.',
    video: 'selmi-vid.mp4',
    instagramUrl: 'https://instagram.com/selmi_chocolate_machinery',
    logo:'/selmi-logo.png'
  }
];


export const PartnersCarousel = () => {
  return (
    <section className="relative py-20 bg-secondary overflow-hidden">
      {/* Decorative background images */}
      <img 
        src="/minibg10.png" 
        alt="" 
        className="absolute top-0 left-0 w-48 md:w-80 opacity-20 pointer-events-none select-none"
      />
      <img 
        src="/minibg10.png" 
        alt="" 
        className="absolute bottom-0 right-0 w-48 md:w-80 opacity-20 pointer-events-none select-none"
      />




      <div className="container mx-auto px-4 relative  z-10">

        <h2 className="text-4xl font-bold italic text-center mb-4 text-accent">
          Nos Partenaires d'Excellence
        </h2>
        <p className="text-center text-muted-foreground mb-12 italic text-lg">
          Agents exclusifs de marques internationales reconnues en Tunisie
        </p>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {partners.map((partner, index) => (
              <CarouselItem key={index}>
                <Card className="border-0 elegant-shadow">
<CardContent className="p-0">
  <div className="relative h-96 overflow-hidden">
    {partner.video.endsWith('.mp4') ? (
      <video
        src={partner.video}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    ) : (
      <img
        src={partner.video}
        alt={partner.name}
        className="w-full h-full object-cover"
      />
    )}

    <div className="absolute inset-0 bg-gradient-to-t from-accent/80 to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
      <h3 className="text-3xl font-bold italic mb-2">{partner.name}</h3>
        <p className="text-sm opacity-80 mb-3">
          <a href={partner.instagramUrl} target="_blank" rel="noopener noreferrer" 
              className="hover:underline">{partner.handle}
          </a>
        </p>    
    </div>
  </div>
</CardContent>

                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>

                {/* Logos Section */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner, index) => (
            <img 
              key={index} 
              src={partner.logo} 
              alt={partner.name} 
              className="h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          ))}
        </div>

      </div>
    </section>
  );
};