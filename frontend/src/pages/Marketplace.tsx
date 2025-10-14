import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Filter, Grid3X3, Grid, X, Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  'Équipements Pâtisserie',
  'Chocolaterie', 
  'Décorations Gâteaux',
  'Ingrédients Spécialisés',
  'Machines Professionnelles',
  'Moules et Accessoires'
];

const products = [
  {
    id: 1,
    name: 'Moule Silicone Professionnel',
    price: 45.99,
    category: 'Moules et Accessoires',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1556909114-9b9bb5d5a67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    inStock: true,
    badge: 'Bestseller'
  },
  {
    id: 2,
    name: 'Chocolat Valrhona Premium',
    price: 28.50,
    category: 'Chocolaterie',
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    inStock: true,
    badge: 'Nouveau'
  },
  {
    id: 3,
    name: 'Embouts de Bûche Personnalisés',
    price: 12.99,
    category: 'Décorations Gâteaux',
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    inStock: false,
    badge: 'Sur Commande'
  },
  {
    id: 4,
    name: 'Pâte à Sucre Colorée',
    price: 8.75,
    category: 'Ingrédients Spécialisés',
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    inStock: true,
    badge: null
  },
  {
    id: 5,
    name: 'Machine Tempéreuse Chocolate',
    price: 1299.99,
    category: 'Machines Professionnelles',
    rating: 4.9,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1556909114-9b9bb5d5a67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    inStock: true,
    badge: 'Premium'
  },
  {
    id: 6,
    name: 'Perles Neutres Décoratives',
    price: 15.30,
    category: 'Décorations Gâteaux',
    rating: 4.5,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    inStock: true,
    badge: null
  }
];

const Marketplace = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [gridView, setGridView] = useState('3x3');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(true);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 2000]);
    setInStockOnly(false);
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const stockMatch = !inStockOnly || product.inStock;
    return categoryMatch && priceMatch && stockMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 pt-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold italic text-accent">Marketplace</h1>
            
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 italic">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="rating">Note</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={gridView === '3x3' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setGridView('3x3')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={gridView === '6x6' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setGridView('6x6')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden italic"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-80 shrink-0`}>
              <Card className="elegant-shadow border-0 sticky top-28">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold italic text-accent">Filtres</h3>
                    <Button variant="ghost" onClick={clearFilters} className="italic text-sm">
                      <X className="h-4 w-4 mr-2" />
                      Effacer
                    </Button>
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h4 className="font-semibold italic text-foreground mb-4">Prix (TND)</h4>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={2000}
                      step={10}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground italic">
                      <span>{priceRange[0]} TND</span>
                      <span>{priceRange[1]} TND</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-8">
                    <h4 className="font-semibold italic text-foreground mb-4">Catégories</h4>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <label
                            htmlFor={category}
                            className="text-sm italic text-foreground cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-stock"
                        checked={inStockOnly}
                        onCheckedChange={(checked) => setInStockOnly(checked === true)}
                      />
                      <label
                        htmlFor="in-stock"
                        className="text-sm italic text-foreground cursor-pointer"
                      >
                        En stock uniquement
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className={`grid gap-6 ${
                gridView === '3x3' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
              }`}>
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <Card className="group hover:shadow-lg smooth-transition elegant-shadow border-0 cursor-pointer">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full aspect-square object-cover group-hover:opacity-0 smooth-transition"
                          />
                          <img
                            src={product.hoverImage}
                            alt={product.name}
                            className="w-full aspect-square object-cover absolute inset-0 opacity-0 group-hover:opacity-100 smooth-transition"
                          />
                          {product.badge && (
                            <Badge className="absolute top-2 left-2 italic">
                              {product.badge}
                            </Badge>
                          )}
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-muted/80 flex items-center justify-center">
                              <span className="text-muted-foreground italic font-medium">
                                Rupture de stock
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <h3 className={`font-semibold italic text-foreground mb-2 ${
                            gridView === '6x6' ? 'text-sm' : 'text-base'
                          }`}>
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground italic ml-1">
                              ({product.reviews})
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary italic">
                              {product.price} TND
                            </span>
                            {gridView === '3x3' && (
                              <Button
                                size="icon"
                                variant="outline"
                                className="opacity-0 group-hover:opacity-100 smooth-transition"
                                onClick={(e) => {
                                  e.preventDefault();
                                  // Add to cart logic
                                }}
                              >
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground italic text-lg">
                    Aucun produit trouvé avec ces filtres.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Marketplace;