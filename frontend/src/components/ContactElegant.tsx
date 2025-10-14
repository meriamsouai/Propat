import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, HelpCircle, Instagram, MessageCircle } from 'lucide-react';

const instagramPosts = [
  '/INSTA-1.png',
  '/INSTA-2.png',
  '/INSTA-3.png',
  '/INSTA-4.png',
  '/INSTA-5.png',
  '/INSTA-6.png',
];

export const ContactElegant = () => {
  return (
  <section className="relative py-20 bg-secondary/50 overflow-hidden">
  {/* Decorative background images */}
  <img 
    src="/minibg131.png" 
    alt="" 
    className="absolute top-0 left-0 w-48 md:w-64 opacity-20 pointer-events-none select-none"
  />
  
  <img 
    src="/minibg132.png" 
    alt="" 
    className="absolute bottom-0 right-0 w-48 md:w-80 opacity-20 pointer-events-none select-none"
  />



      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold italic text-accent mb-4">
            Contactez-Nous
          </h2>
          <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
            Notre équipe d'experts est à votre disposition pour vous conseiller
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="elegant-shadow border-0 bg-accent/10">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold italic text-accent mb-2">Adresse</h4>
                    <p className="text-muted-foreground italic">
                      Rue lac oubeira a coté de l'ambassade d'indonésie <br/> Les berges du lac, 1053
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-shadow border-0 bg-accent/10">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold italic text-accent mb-2">Téléphone</h4>
                    <p className="text-muted-foreground italic">
                      +216 71 965 554 <br />
                      +216 26 823 001
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-shadow border-0 bg-accent/10">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold italic text-accent mb-2">Email</h4>
                    <p className="text-muted-foreground italic">
                      info@propat.com.tn
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-shadow border-0 bg-accent/10">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold italic text-accent mb-2">Horaires</h4>
                    <p className="text-muted-foreground italic">
                      Lun - Ven: 8h30 - 17h30<br />
                      Sam: 8h30 - 13h30<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
<div className="flex flex-col space-y-8">
  {/* Contact Card */}
  <Card className="elegant-shadow border-0 bg-accent/10">
    <CardContent className="p-8">
      <div className="flex items-center">
        <MessageCircle className="h-8 w-8 text-primary mr-4" />
        <h3 className="text-2xl font-bold italic text-accent">
          Envoyez-nous un Message
        </h3>
      </div>
      <Button 
        className="w-full mt-6 bg-primary hover:bg-primary/85 text-primary-foreground italic"
      >
        Contactez-Nous
      </Button>
    </CardContent>
  </Card>
  {/* FAQ Card */}
  <Card className="elegant-shadow border-0 bg-accent/10">
    <CardContent className="p-8">
      <div className="flex items-center mb-6">
        <HelpCircle className="h-8 w-8 text-primary mr-4" />
        <h3 className="text-2xl font-bold italic text-accent">
          Questions Fréquentes
        </h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold italic text-foreground mb-2">
            Livrez-vous en Tunisie ?
          </h4>
          <p className="text-muted-foreground italic text-sm">
            Oui, nous livrons dans toute la Tunisie avec des délais de 2-5 jours ouvrables.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold italic text-foreground mb-2">
            Puis-je personnaliser mes commandes ?
          </h4>
          <p className="text-muted-foreground italic text-sm">
            Absolument ! Nous proposons des services de personnalisation pour les décorations.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold italic text-foreground mb-2">
            Quels sont vos délais de livraison ?
          </h4>
          <p className="text-muted-foreground italic text-sm">
            Les délais varient selon les produits : 24-48h pour les articles en stock.
          </p>
        </div>
      </div>
      
      <Button 
        className="w-full mt-6 bg-accent hover:bg-accent/85 text-primary-foreground italic"
      >
        Voir toutes les FAQ
      </Button>
    </CardContent>
  </Card>
</div>








          {/* Instagram Section */}
          <div className="space-y-6">
            <Card className="elegant-shadow border-0 bg-gradient-to-tr from-pink-200 to-purple-200 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Instagram className="h-8 w-8 text-primary mr-4" />
                  <h3 className="text-2xl font-bold italic text-accent">
                    Suivez-Nous
                  </h3>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {instagramPosts.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-sm overflow-hidden cursor-pointer group "
                    >
                      <img
                        src={image}
                        alt={`Instagram post ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 "
                      />
                    </div>
                  ))}
                </div>
                <a href="https://www.instagram.com/propat_tunisie" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white italic">
                  @propat_tunisie
                </Button></a>

              </CardContent>
            </Card>
                <img src='/separator.png' />
          </div>
        </div>
      </div>
    </section>
  );
};