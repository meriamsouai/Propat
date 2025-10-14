import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';

const featuredProduct = {
  id: 'pavoni-premium-001',
  name: 'Moule silicone Volupté individuel',
  category: 'Moules',
  price: '45.000 DT',
  originalPrice: '52.000 DT',
  images: [ 
    '/silicone4.jpg',
    '/silicone2.jpg',
    '/silicone3.jpg',
    '/silicone1.jpg',
  ],
  badge: 'Promotion',
  description: 'Moule professionnel en silicone alimentaire, résistant jusqu\'à 260°C',
  partner: {
    name: 'Pavoni',
    logo: '/pavoni-logo.png'
  }
};

export const FeaturedProducts = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({
      id: featuredProduct.id,
      name: featuredProduct.name,
      price: featuredProduct.price,
      image: featuredProduct.images[0],
      partner: featuredProduct.partner
    });
    toast.success('Produit ajouté au panier!', {
      description: `${featuredProduct.name} a été ajouté à votre panier.`
    });
  };

  const handleViewProduct = () => {
    navigate(`/product/${featuredProduct.id}`);
  };

  const handleViewAllProducts = () => {
    navigate('/marketplace');
  };

  return (
    <section className="relative bg-secondary/50 overflow-hidden">
      {/* Decorative background images */}
      <img 
        src="/minibg1.png" 
        alt="" 
        className="absolute bottom-0 left-0 w-40 md:w-64 opacity-20 pointer-events-none select-none"
      />
      <img 
        src="/minibg9.png" 
        alt="" 
        className="absolute top-0 right-0 w-40 md:w-72 opacity-20 pointer-events-none select-none"
      />

      <div className="container mx-auto relative z-10 pt-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold italic text-accent mb-2">
            Produit le Plus Vendu ce Mois
          </h2>
          <p className="text-lg text-muted-foreground italic max-w-xl mx-auto">
            Découvrez notre best-seller du mois, plébiscité par les professionnels
          </p>
        </div>

        <Card className="max-w-5xl mx-auto overflow-hidden elegant-shadow border-0">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Gallery Section */}
              <div className="relative">
                <div className="relative overflow-hidden">
                  <img
                    src={featuredProduct.images[selectedImageIndex]}
                    alt={featuredProduct.name}
                    className="w-full h-64 md:h-72 object-cover transition-all duration-300"
                  />
                  <Badge 
                    className="absolute top-4 left-4 bg-primary text-primary-foreground italic text-sm px-3 py-1"
                  >
                    {featuredProduct.badge}
                  </Badge>
                </div>
                
                {/* Thumbnail Images */}
                <div className="flex gap-2 p-3 bg-background/80 backdrop-blur">
                  {featuredProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      onMouseEnter={() => setSelectedImageIndex(index)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                        selectedImageIndex === index 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${featuredProduct.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col justify-center bg-background">
                <div className="text-sm text-primary font-medium mb-2 italic uppercase tracking-wide">
                  {featuredProduct.category}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold italic text-accent mb-3 leading-tight">
                  {featuredProduct.name}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {featuredProduct.description}
                </p>
                
                {/* Partner Logo */}
                {featuredProduct.partner && (
                  <div className="flex items-center mb-4 p-2 rounded-lg w-44">
                    <img
                      src={featuredProduct.partner.logo}
                      alt={`Logo ${featuredProduct.partner.name}`}
                      className="h-7 w-auto"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-accent italic">
                      {featuredProduct.price}
                    </span>
                    {featuredProduct.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {featuredProduct.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-accent hover:bg-accent/90 text-primary-foreground italic smooth-transition"
                  >    
                    <ShoppingCart className="w-5 h-5" /> 
                    Ajouter au Panier
                  </Button>
                  <Button 
                    onClick={handleViewProduct}
                    variant="outline"
                    className="flex-1 italic hover:bg-accent hover:text-primary-foreground smooth-transition"
                  >
                    Voir le Produit
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 mb-3">
          <Button 
            onClick={handleViewAllProducts}
            variant="outline"
            size="lg"
            className="px-6 py-2 text-base italic hover:bg-primary hover:text-primary-foreground smooth-transition"
          >
            Voir Tous les Produits
          </Button>
        </div>
      </div>
    </section>
  );
};
