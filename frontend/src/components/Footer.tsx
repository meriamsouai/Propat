import React from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-white relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="w-40 h-10 flex items-center justify-center py-8 transition-transform duration-300 hover:scale-105">
                <img src="/logo-propat.png" alt="Propat Logo" className="h-12 w-auto" />
              </div>
            </Link>
            <p className="text-sm leading-relaxed opacity-90 max-w-xs">
              Les professionnels des métiers de bouches. Spécialiste en équipements et ingrédients pour pâtisserie, cuisine et industrie alimentaire.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-primary italic">Créativité</span>
              <span className="text-white/40">•</span>
              <span className="text-xs font-semibold text-primary italic">Innovation</span>
              <span className="text-white/40">•</span>
              <span className="text-xs font-semibold text-primary italic">Tendance</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold italic mb-6 text-primary">Liens Rapides</h4>
            <ul className="space-y-3">
              {[
                { name: 'Notre Marque', path: '/marque' },
                { name: 'Nos Produits', path: '/marketplace' },
                { name: 'Nos Partenaires', path: '/partenaires' },
                { name: 'Catalogue', path: '/catalogue' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary smooth-transition inline-block hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold italic mb-6 text-primary">Catégories</h4>
            <ul className="space-y-3">
              {[
                'Équipements Pâtisserie',
                'Chocolaterie',
                'Décorations',
                'Ingrédients',
                'Moules Silicone'
              ].map((category) => (
                <li key={category}>
                  <a 
                    href="#" 
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary smooth-transition inline-block hover:translate-x-1"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold italic mb-6 text-primary">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 smooth-transition" />
                <span className="text-sm opacity-90">Tunis, Tunisie</span>
              </div>
              <a href="tel:+21671XXXXXX" className="flex items-start space-x-3 group">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 smooth-transition" />
                <span className="text-sm opacity-90 hover:text-primary smooth-transition">+216 71 XXX XXX</span>
              </a>
              <a href="mailto:contact@propat.tn" className="flex items-start space-x-3 group">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 smooth-transition" />
                <span className="text-sm opacity-90 hover:text-primary smooth-transition break-all">contact@propat.tn</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h5 className="text-sm font-semibold italic mb-4 text-primary">Suivez-nous</h5>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' }
                ].map(({ icon: Icon, href, label }) => (
                  <a 
                    key={label}
                    href={href}
                    aria-label={label}
                    className="bg-white/10 p-3 rounded-lg hover:bg-primary hover:scale-110 smooth-transition group"
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 smooth-transition" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-80 text-center md:text-left">
              © {new Date().getFullYear()} PROPAT. Tous droits réservés. Fondé en 2002.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {['Mentions Légales', 'Politique de Confidentialité', 'CGV'].map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="text-sm opacity-80 hover:opacity-100 hover:text-primary smooth-transition text-center"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};