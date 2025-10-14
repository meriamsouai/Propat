import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    title: 'Équipements Pâtisserie',
    description: 'Machines et petits matériels pour professionnels',
    image: 'https://www.selmi-group.fr/img/bean-to-bar-chocolat-machines.jpg',
    items: ['Batteurs', 'Fours', 'Moules', 'Tapis cuisson']
  },
  {
    title: 'Chocolaterie',
    description: 'Chocolats premium et accessoires spécialisés',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    items: ['Chocolat Valrhona', 'Tempéreuses', 'Moules chocolat', 'Colorants']
  },
  {
    title: 'Décorations Gâteaux',
    description: 'Plaquettes personnalisées et embouts créatifs',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    items: ['Embouts bûche', 'Plaquettes custom', 'Perles déco', 'Figurines']
  },
  {
    title: 'Ingrédients Spécialisés',
    description: 'Pâte à sucre, arômes et additifs professionnels',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    items: ['Pâte à sucre', 'Arômes Sosa', 'Colorants naturels', 'Texturants']
  }
];

export const CategoriesGrid = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold italic text-accent mb-4">
            Nos Catégories de Produits
          </h2>
          <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
            Découvrez notre gamme complète d'équipements et d'ingrédients pour les métiers de bouches
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="group hover:shadow-lg smooth-transition elegant-shadow border-0">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/60 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold italic text-accent mb-3">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground italic mb-4 text-sm">
                    {category.description}
                  </p>
                  
                  <ul className="space-y-1 mb-6">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-foreground flex items-center">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant="outline" 
                    className="w-full italic hover:bg-primary hover:text-primary-foreground smooth-transition"
                  >
                    Explorer la Catégorie
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};