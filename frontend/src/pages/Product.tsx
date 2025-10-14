import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ShoppingCart, Heart, Share2, Plus, Minus, Truck, Shield, RotateCcw } from 'lucide-react';

const productData = {
  id: 1,
  name: 'Moule Silicone Professionnel Premium',
  price: 45.99,
  originalPrice: 59.99,
  category: 'Moules et Accessoires',
  rating: 4.8,
  reviews: 124,
  inStock: true,
  badge: 'Bestseller',
  images: [
    'https://images.unsplash.com/photo-1556909114-9b9bb5d5a67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1587668178277-295251f900ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  ],
  description: 'Ce moule silicone professionnel est conçu pour les pâtissiers exigeants. Fabriqué en silicone de qualité alimentaire, il résiste aux hautes températures et garantit un démoulage parfait à chaque utilisation.',
  features: [
    'Silicone alimentaire de haute qualité',
    'Résistant de -40°C à +230°C',
    'Anti-adhérent naturel',
    'Compatible lave-vaisselle',
    'Démoulage facile',
    'Réutilisable des milliers de fois'
  ],
  specifications: {
    'Matériau': 'Silicone platine',
    'Dimensions': '24 x 8 x 7 cm',
    'Poids': '120g',
    'Couleur': 'Rouge Propat',
    'Origine': 'France',
    'Certification': 'FDA & LFGB'
  }
};

const relatedProducts = [
  {
    id: 2,
    name: 'Moule Silicone Mini Tartes',
    price: 32.50,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    rating: 4.7
  },
  {
    id: 3,
    name: 'Kit Moules Cupcakes',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    rating: 4.6
  },
  {
    id: 4,
    name: 'Moule Flexipan Professionnel',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    rating: 4.9
  }
];

const Product = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm italic text-muted-foreground">
            <span>Accueil</span> / <span>Marketplace</span> / <span>{productData.category}</span> / <span className="text-foreground">{productData.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-sm elegant-shadow">
                <img
                  src={productData.images[selectedImage]}
                  alt={productData.name}
                  className="w-full aspect-square object-cover"
                />
                {productData.badge && (
                  <Badge className="absolute top-4 left-4 italic">
                    {productData.badge}
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-sm overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productData.name} ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold italic text-accent mb-2">
                  {productData.name}
                </h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(productData.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground italic">
                    {productData.rating} ({productData.reviews} avis)
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-primary italic">
                    {productData.price} TND
                  </span>
                  {productData.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through italic">
                      {productData.originalPrice} TND
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground italic mb-6">
                  {productData.description}
                </p>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium italic text-foreground">Quantité:</span>
                  <div className="flex items-center border border-border rounded-sm">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decreaseQuantity}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-0 focus:ring-0"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={increaseQuantity}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground italic"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Ajouter au Panier
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={isWishlisted ? 'text-red-500 border-red-500' : ''}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Product Features */}
              <Card className="elegant-shadow border-0">
                <CardContent className="p-6">
                  <h3 className="font-bold italic text-accent mb-4">Avantages Produit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-primary" />
                      <span className="text-sm italic">Livraison rapide</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-sm italic">Garantie 2 ans</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RotateCcw className="h-5 w-5 text-primary" />
                      <span className="text-sm italic">Retour 30 jours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="grid w-full grid-cols-3 italic">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Spécifications</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({productData.reviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card className="elegant-shadow border-0">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold italic text-accent mb-4">Caractéristiques</h3>
                  <ul className="space-y-2 italic">
                    {productData.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-8">
              <Card className="elegant-shadow border-0">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold italic text-accent mb-4">Spécifications Techniques</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 italic">
                    {Object.entries(productData.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border">
                        <span className="font-medium text-muted-foreground">{key}:</span>
                        <span className="text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <Card className="elegant-shadow border-0">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold italic text-accent mb-4">Avis Clients</h3>
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-border pb-6 last:border-0">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                          <span className="font-medium italic text-foreground">Marie D.</span>
                          <span className="text-sm text-muted-foreground italic">Il y a 2 semaines</span>
                        </div>
                        <p className="text-muted-foreground italic">
                          Excellent produit ! La qualité du silicone est remarquable et le démoulage est parfait à chaque fois. Je recommande vivement.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          <div>
            <h2 className="text-3xl font-bold italic text-accent mb-8">Produits Similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg smooth-transition elegant-shadow border-0 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-square object-cover group-hover:scale-105 smooth-transition"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold italic text-foreground mb-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary italic">
                          {product.price} TND
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-muted-foreground italic">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Product;