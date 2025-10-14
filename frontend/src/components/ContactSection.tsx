import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold italic text-accent mb-4">
            Contactez-Nous
          </h2>
          <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
            Notre équipe d'experts est à votre disposition pour vous conseiller
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="elegant-shadow border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold italic text-accent mb-6">
                Envoyez-nous un Message
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block italic">
                      Nom *
                    </label>
                    <Input placeholder="Votre nom" className="italic" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block italic">
                      Prénom *
                    </label>
                    <Input placeholder="Votre prénom" className="italic" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block italic">
                    Email *
                  </label>
                  <Input type="email" placeholder="votre@email.com" className="italic" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block italic">
                    Téléphone
                  </label>
                  <Input placeholder="+216 XX XXX XXX" className="italic" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block italic">
                    Sujet
                  </label>
                  <Input placeholder="Objet de votre message" className="italic" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block italic">
                    Message *
                  </label>
                  <Textarea 
                    placeholder="Décrivez votre demande..."
                    className="min-h-[120px] italic"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground italic text-lg py-3 smooth-transition"
                >
                  Envoyer le Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="elegant-shadow border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold italic text-accent mb-2">Adresse</h4>
                    <p className="text-muted-foreground italic">
                      Avenue de la République<br />
                      Tunis, Tunisie
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-shadow border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold italic text-accent mb-2">Téléphone</h4>
                    <p className="text-muted-foreground italic">
                      +216 71 XXX XXX<br />
                      +216 XX XXX XXX
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-shadow border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold italic text-accent mb-2">Email</h4>
                    <p className="text-muted-foreground italic">
                      contact@propat.tn<br />
                      info@propat.tn
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-shadow border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold italic text-accent mb-2">Horaires</h4>
                    <p className="text-muted-foreground italic">
                      Lun - Ven: 8h00 - 17h00<br />
                      Sam: 8h00 - 12h00<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};