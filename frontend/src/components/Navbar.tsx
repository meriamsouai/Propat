import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext'; 

import logo from "/logo-propat.png"; 

export const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Notre Marque', path: '/marque' },
    { name: 'Partenaires', path: '/partenaires' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Décoration personalisée', path: '/customization' },
    { name: 'Produits', path: '/marketplace' }, 
    { name: 'Contact', path: '/contact' }
  ];

  // Modern Navbar background logic
  const navbarClasses = () => {
    if (location.pathname !== "/") {
      return "bg-foreground shadow-lg";
    }
    return isScrolled ? "navbar-glass" : "bg-transparent";
  };

  // Modern Nav text color logic
  const navTextClasses = () => {
    if (location.pathname !== "/") {
      return "text-white/90 hover:text-white";
    }
    return isScrolled
      ? "text-foreground hover:text-primary"
      : "text-white/90 hover:text-white";
  };

  // Modern Icon color logic
  const iconClasses = () => {
    if (location.pathname !== "/") {
      return "text-white hover:text-primary";
    }
    return isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white";
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarClasses()}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src={logo} 
                alt="Propat Logo" 
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.name} to={item.path}>
                    <Button
                      variant="ghost"
                      className={`italic font-medium smooth-transition nav-item relative px-3 py-2
                        ${navTextClasses()}
                        ${isActive ? "text-primary" : ""}
                      `}
                    >
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`smooth-transition hover:bg-white/10 rounded-lg ${iconClasses()}`}
                onClick={() => setShowSearch(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Link to={isAuthenticated ? "/account" : "/auth"}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`smooth-transition hover:bg-white/10 rounded-lg ${iconClasses()}`}
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cart">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`relative smooth-transition hover:bg-white/10 rounded-lg ${iconClasses()}`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse-glow">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden smooth-transition ${iconClasses()}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-foreground/98 backdrop-blur-xl animate-fadeIn">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.name} to={item.path}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start italic font-medium smooth-transition
                        ${isActive ? "text-primary bg-primary/10" : "text-white/90 hover:text-white hover:bg-white/5"}
                      `}
                    >
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Modern Search Overlay */}
      {showSearch && (
        <div className="search-overlay" onClick={() => setShowSearch(false)}>
          <div className="max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-20 text-2xl pl-16 pr-20 bg-background/95 backdrop-blur-xl text-foreground italic border-2 border-primary/20 focus:border-primary rounded-2xl input-focus"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-primary/10 rounded-full"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <p className="text-center mt-4 text-white/80 italic text-sm">
              Appuyez sur ESC pour fermer
            </p>
          </div>
        </div>
      )}
    </>
  );
};
