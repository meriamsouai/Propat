import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const partners = [
  {
    name: 'Valrhona',
    category: 'Chocolat Premium',
    description: 'Leader mondial du chocolat de couverture, Valrhona nous accompagne depuis nos débuts avec des produits d\'exception reconnus par les plus grands chefs.',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    specialties: ['Chocolat de couverture', 'Cacao en poudre', 'Pralinés'],
    founded: '1922',
    country: 'France'
  },
  {
    name: 'Pavoni Italia',
    category: 'Moules & Outils',
    description: 'Fabricant italien de moules en silicone haut de gamme, Pavoni révolutionne l\'art de la pâtisserie avec des designs innovants et une qualité incomparable.',
    image: 'https://images.unsplash.com/photo-1556909114-9b9bb5d5a67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    specialties: ['Moules silicone', 'Outils de décoration', 'Emporte-pièces'],
    founded: '1946',
    country: 'Italie'
  },
  {
    name: 'Sosa Ingredients',
    category: 'Ingrédients Innovants',
    description: 'Pionnier dans les ingrédients techniques pour la haute pâtisserie, Sosa propose des solutions créatives qui repoussent les limites de l\'art culinaire.',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    specialties: ['Texturants', 'Colorants naturels', 'Arômes'],
    founded: '1967',
    country: 'Espagne'
  },
  {
    name: 'Callebaut',
    category: 'Chocolat Artisanal',
    description: 'Maître chocolatier belge depuis 1850, Callebaut perpétue la tradition du chocolat belge avec des recettes authentiques et des saveurs uniques.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    specialties: ['Chocolat belge', 'Pralines', 'Ganaches'],
    founded: '1850',
    country: 'Belgique'
  },
  {
    name: 'Martellato',
    category: 'Équipement Professionnel',
    description: 'Spécialiste italien de l\'équipement pour pâtissiers, Martellato conçoit des outils précis et durables pour les professionnels les plus exigeants.',
    image: 'https://images.unsplash.com/photo-1585747123325-e47e7d5e65e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    specialties: ['Machines à chocolat', 'Outils de finition', 'Accessoires'],
    founded: '1966',
    country: 'Italie'
  },
  {
    name: 'Capfruit',
    category: 'Purées de Fruits',
    description: 'Expert français des purées de fruits surgelées, Capfruit préserve les saveurs authentiques des fruits pour sublimer vos créations pâtissières.',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    specialties: ['Purées de fruits', 'Coulis', 'Compotes'],
    founded: '1981',
    country: 'France'
  }
];

const NosPartenaires = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section 
          className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10 relative overflow-hidden"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1556909114-9b9bb5d5a67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-background/90"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold italic text-accent mb-6">
                Nos Partenaires
              </h1>
              <p className="text-xl text-muted-foreground italic leading-relaxed">
                Découvrez les marques d'exception qui nous font confiance et enrichissent 
                notre catalogue avec leurs produits de qualité supérieure.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold italic text-accent mb-6">
                Une Sélection Rigoureuse
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chez Propat, nous choisissons nos partenaires avec le plus grand soin. 
                Chaque marque que nous représentons partage nos valeurs d'excellence, 
                d'innovation et de respect de la tradition pâtissière.
              </p>
            </div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <Card key={index} className="group hover:shadow-xl smooth-transition elegant-shadow border-0 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-primary text-primary-foreground italic mb-2">
                        {partner.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-white italic">
                        {partner.name}
                      </h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {partner.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Fondée en:</span>
                        <span className="italic">{partner.founded}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Pays:</span>
                        <span className="italic">{partner.country}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Spécialités:</h4>
                      <div className="flex flex-wrap gap-1">
                        {partner.specialties.map((specialty, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="text-xs italic"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold italic text-accent mb-6">
                Pourquoi Ces Partenariats ?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-0 elegant-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="text-xl font-bold italic text-accent mb-4">
                    Excellence Garantie
                  </h3>
                  <p className="text-muted-foreground">
                    Chaque partenaire est sélectionné pour son savoir-faire unique 
                    et sa réputation d'excellence dans son domaine.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 elegant-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="text-xl font-bold italic text-accent mb-4">
                    Diversité Européenne
                  </h3>
                  <p className="text-muted-foreground">
                    Nos partenaires européens apportent leurs traditions et innovations 
                    pour enrichir votre palette créative.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 elegant-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-bold italic text-accent mb-4">
                    Collaboration Durable
                  </h3>
                  <p className="text-muted-foreground">
                    Des relations de confiance construites sur le long terme 
                    pour vous garantir stabilité et innovation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

{/* Numbers Section */}

        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/20">
          {/* Decorative Background Image */}
          <img
            src="/minibg34.png"
            alt=""
            className="absolute top-0 left-56 w-40 md:w-80 opacity-10 pointer-events-none select-none z-0"
          />
          <img
            src="/minibg37.png"
            alt=""
            className="absolute top-0 right-0 w-40 md:w-96 opacity-10 pointer-events-none select-none z-0"
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold italic text-accent mb-6">
                Propat en Chiffres
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold italic text-primary mb-2">
                  20+
                </div>
                <p className="text-muted-foreground italic">
                  Années d'expérience
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold italic text-primary mb-2">
                  5000+
                </div>
                <p className="text-muted-foreground italic">
                  Produits référencés
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold italic text-primary mb-2">
                  1200+
                </div>
                <p className="text-muted-foreground italic">
                  Clients professionnels
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold italic text-primary mb-2">
                  50+
                </div>
                <p className="text-muted-foreground italic">
                  Marques partenaires
                </p>
              </div>
            </div>
          </div>
        </section>

        
      </main>

      <Footer />
    </div>
  );
};

export default NosPartenaires;