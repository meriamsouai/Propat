import React from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-40 h-10  flex items-center justify-center py-8 ">
                <img src="/logo-propat.png"/>
              </div>
            </div>
            <p className="text-sm italic opacity-90 mb-4 leading-relaxed">
              Les professionnels des métiers de bouches. Spécialiste en équipements et ingrédients pour pâtisserie, cuisine et industrie alimentaire.
            </p>
            <p className="text-sm italic text-primary font-medium">
              Créativité • Innovation • Tendance
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold italic mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              {['Notre Marque', 'Nos Produits', 'Nos Partenaires', 'Nos Actualités', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm italic opacity-80 hover:opacity-100 hover:text-primary smooth-transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold italic mb-4">Catégories</h4>
            <ul className="space-y-2">
              {['Équipements Pâtisserie', 'Chocolaterie', 'Décorations', 'Ingrédients', 'Moules Silicone'].map((category) => (
                <li key={category}>
                  <a href="#" className="text-sm italic opacity-80 hover:opacity-100 hover:text-primary smooth-transition">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold italic mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm italic opacity-90">Tunis, Tunisie</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm italic opacity-90">+216 71 XXX XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm italic opacity-90">contact@propat.tn</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-bold italic mb-3">Suivez-nous</h5>
              <div className="flex space-x-3">
                <a href="#" className="bg-white/10 p-2 rounded-sm hover:bg-primary smooth-transition">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-sm hover:bg-primary smooth-transition">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-sm hover:bg-primary smooth-transition">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm italic opacity-80">
            © 2024 PROPAT. Tous droits réservés. Fondé en 2002.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm italic opacity-80 hover:opacity-100 smooth-transition">
              Mentions Légales
            </a>
            <a href="#" className="text-sm italic opacity-80 hover:opacity-100 smooth-transition">
              Politique de Confidentialité
            </a>
            <a href="#" className="text-sm italic opacity-80 hover:opacity-100 smooth-transition">
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};