import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext'; 

import logo from "/logo-propat.png"; 

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated } = useAuth();
  const cartCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Notre Marque', path: '/marque' },
    { name: 'Partenaires', path: '/partenaires' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Décoration personalisée', path: '/customization' },
    { name: 'Produits', path: '/marketplace' }, 
    { name: 'Contact', path: '/contact' }
  ];

  // Navbar background logic
const navbarClasses = () => {
  if (location.pathname !== "/") {
    return "bg-foreground";
  }
  return isScrolled ? "navbar-glass" : "bg-transparent";
};

// Nav text color logic
const navTextClasses = () => {
  if (location.pathname !== "/") {
    return "text-white/80 hover:text-white hover:bg-transparent";
  }
  return isScrolled
    ? "text-foreground hover:text-primary hover:bg-transparent"
    : "text-white/80 hover:text-white hover:bg-transparent";
};

// Icon color logic
const iconClasses = () => {
  if (location.pathname !== "/") {
    return "text-white";
  }
  return isScrolled ? "text-foreground" : "text-white/80";
};

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarClasses()}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Propat Logo" className="h-16 w-auto" />
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`italic font-medium smooth-transition nav-item relative pb-1
                      ${navTextClasses()}
                      ${isActive ? "border-b-2 border-primary" : ""}
                    `}
                  >
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`smooth-transition ${iconClasses()}`}
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to={isAuthenticated ? "/account" : "/auth"}>              <Button 
                variant="ghost" 
                size="icon" 
                className={`smooth-transition ${iconClasses()}`}
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <div className="ml-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`relative smooth-transition ${iconClasses()}`}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="search-overlay">
          <div className="max-w-2xl w-full mx-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 text-2xl pl-6 pr-16 bg-background text-foreground italic"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
