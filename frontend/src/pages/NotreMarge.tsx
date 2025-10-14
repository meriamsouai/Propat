import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const NotreMarge = () => {
  const teamImages = [
    {
      src: "/team8.jpg",
      alt: "Compétition de pâtisserie",
      title: "Compétition Nationale",
    },
    {
      src: "/team9.jpg",
      alt: "Workshop chocolaterie",
      title: "Workshop Chocolaterie",
    },
    {
      src: "/team13.jpg",
      alt: "Participation au salon de la pâtisserie",
      title: "Salon International",
    },
    {
      src: "/team11.jpg",
      alt: "Workshop chocolaterie",
      title: "Workshop Chocolaterie",
    },
    {
      src: "/team12.jpg",
      alt: "Participation au salon de la pâtisserie",
      title: "Salon International",
    },
    {
      src: "/team14.jpg",
      alt: "Participation au salon de la pâtisserie",
      title: "Salon International",
    },
        {
      src: "/team15.jpg",
      alt: "Participation au salon de la pâtisserie",
      title: "Salon International",
    },
        {
      src: "/team16.jpg",
      alt: "Participation au salon de la pâtisserie",
      title: "Salon International",
    },
    {
      src: "/team1.jpg",
      alt: "Équipe Propat à l'atelier de formation",
      title: "Formation Professionnelle",
    },
    {
      src: "/team6.jpg",
      alt: "Participation au salon de la pâtisserie",
      title: "Salon International",
    },
    {
      src: "/team10.jpg",
      alt: "Workshop chocolaterie",
      title: "Workshop Chocolaterie",
    },
    {
      src: "/team2.jpg",
      alt: "Participation au salon de la pâtisserie",
      title: "Salon International",
    },
    {
      src: "/team3.jpg",
      alt: "Participation au salon de la pâtisserie",
      title: "Salon International",
    },
  ];

  const featuredWorks = [
    {
      src: "/plaq1.jpg",
      alt: "Plaquettes personnalisées Bonne année 2017",
    },
    {
      src: "/plaq2.jpg",
      alt: "Plaquettes personnalisées Joyeuse fêtes",
    },
    {
      src: "/plaq3.jpg",
      alt: "Kit décoration complet pour pâtisserie Elite",
    },
    {
      src: "/plaq4.jpg",
      alt: "Embouts personnalisés pour pâtisserie Royal",
    },
    {
      src: "/plaq5.jpg",
      alt: "Moules sur mesure pour chocolaterie Premium",
    },
    {
      src: "/plaq6.jpg",
      alt: "Plaquettes de marque pour boulangerie Artisan",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-tr from-accent/30 to-secondary/20 overflow-hidden">
          {/* Decorative Images */}
          <img
            src="/minibg3.png"
            alt=""
            className="absolute top-0 left-0 w-40 md:w-80 opacity-20 pointer-events-none select-none"
          />
          <img
            src="/minibg4.png"
            alt=""
            className="absolute bottom-0 right-0 w-40 md:w-56 opacity-20 pointer-events-none select-none"
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold italic text-accent mb-6">
                Notre Histoire
              </h1>
              <p className="text-xl text-muted-foreground italic leading-relaxed">
                Depuis plus de 20 ans, Propat accompagne les professionnels de
                la pâtisserie dans leur quête d'excellence et de créativité.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section 1 */}
        <section className="py-20 relative overflow-hidden bg-background">
          {/* Decorative Background Image */}
          <img
            src="/minibg25.png"
            alt=""
            className="absolute bottom-0 left-20 w-40 md:w-5/12 opacity-10 pointer-events-none select-none z-0"
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold italic text-accent mb-6">
                  L'Art de la Pâtisserie
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Propat est née de la passion pour l'art pâtissier et du désir
                  de mettre à disposition des professionnels les meilleurs
                  outils et ingrédients pour créer des œuvres d'exception.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Notre entreprise familiale s'est construite autour de valeurs
                  fortes : la qualité, l'innovation et le service client. Chaque
                  produit que nous sélectionnons répond aux exigences les plus
                  strictes des maîtres pâtissiers.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/teampropat.jpg"
                  alt="Atelier de pâtisserie"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

         

        {/* Story Section 2 */}
        <section className="py-20 relative overflow-hidden">

          <div className="container mx-auto px-4 relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                <img
                  src="/chefpropat.jpg"
                  alt="Équipe Propat"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-4xl font-bold italic text-accent mb-6">
                  Notre Mission
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Chez Propat, nous croyons que chaque création pâtissière
                  mérite les meilleurs ingrédients et outils. Notre mission est
                  de démocratiser l'accès aux produits professionnels de haute
                  qualité.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Nous travaillons en étroite collaboration avec les meilleurs
                  fournisseurs européens pour vous proposer une gamme complète :
                  chocolats d'exception, moules innovants, colorants naturels,
                  et bien plus encore.
                </p>
                <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                  <p className="text-accent font-medium italic">
                    "Votre succès est notre fierté. Chaque création réussie avec
                    nos produits nous rappelle pourquoi nous faisons ce métier
                    avec tant de passion."
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    - L'équipe Propat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features and Products Section */}

        <section className="pt-14 relative overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/10">
          {/* Decorative Background Image */}

          <img
            src="/minibg40.png"
            alt=""
            className="absolute top-0 right-0 w-40 md:w-2/6 opacity-15 pointer-events-none select-none z-0"
          />

         <img
            src="/minibg44.png"
            alt=""
            className="absolute bottom-20 left-0 w-40 md:w-3/6 opacity-15 pointer-events-none select-none z-0"
          />

          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold italic text-accent mb-6">
                Nos Spécialités & Services - Plaquettes Personnalisées
              </h2>
              <p className="text-lg text-muted-foreground italic max-w-3xl mx-auto mb-4">
                Leader en Tunisie dans la personnalisation de plaquettes et
                décoration pâtissière, nous offrons des solutions complètes pour
                tous vos besoins professionnels.
              </p>
              <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto mb-8">
                Nous créons des plaquettes sur mesure pour les plus grandes
                pâtisseries de Tunisie, alliant tradition et innovation dans
                chaque création.
              </p>
              <div className="inline-flex items-center bg-primary/10 px-6 py-3 rounded-full">
                <span className="text-primary font-bold text-lg italic">
                  #1 en Tunisie
                </span>
                <span className="ml-2 text-accent font-medium">
                  pour la décoration personnalisée
                </span>
              </div>
            </div>

            <div className="mb-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {featuredWorks.map((work, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-lg elegant-shadow hover-scale"
                  >
                    <img
                      src={work.src}
                      alt={work.alt}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-background">
                        <p className="text-sm font-medium italic">{work.alt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>



{/* Team Slideshow Section */}
        <section className="pt-20 pb-10 relative min-h-screen bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold italic text-accent mb-6">
                Notre Équipe en Action
              </h2>
              <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                Découvrez l'équipe Propat lors d'événements, formations et compétitions où nous partageons notre passion pour la pâtisserie.
              </p>
            </div>

             <div className="w-full h-full">
  <Carousel className="w-full h-full">

                <CarouselContent>
                  {teamImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-[50vh] md:h-[65vh] lg:h-[70vh] object-cover rounded-lg shadow-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-accent/60 to-transparent rounded-lg"></div>
                        <div className="absolute bottom-6 left-6 text-background">
                          <h3 className="text-2xl font-bold italic mb-2">{image.title}</h3>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </div>
        </section>

        
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold italic text-accent mb-6">
                Découvrez Nos Produits
              </h2>
              <p className="text-lg text-muted-foreground mb-8 italic">
                Explorez notre catalogue et trouvez les produits de nos partenaires 
                d'exception pour vos créations pâtissières.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/catalogue"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium italic hover:bg-primary/90 smooth-transition"
                >
                  Voir le Catalogue
                </a>
                <a
                  href="/customization"
                  className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-lg font-medium italic hover:bg-primary hover:text-primary-foreground smooth-transition"
                >
                  Personnaliser
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default NotreMarge;
