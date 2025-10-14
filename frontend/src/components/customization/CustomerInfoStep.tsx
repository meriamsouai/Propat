import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Edit2 } from "lucide-react";
import { useState, useEffect } from "react";


interface CustomerInfo {
  nom: string;
  prenom: string;
  raisonSociale: string;
  codePostal: string;
  ville: string;
  pays: string;
  email: string;
  telephone: string;
}

interface CustomerInfoStepProps {
  customerInfo: CustomerInfo;
  onUpdate: (customerInfo: CustomerInfo) => void;
}

export const CustomerInfoStep = ({ customerInfo, onUpdate }: CustomerInfoStepProps) => {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(!isAuthenticated);

  // Auto-fill user details when component mounts if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user && !customerInfo.nom) {
      onUpdate({
        nom: user.nom || user.lastName || '',
        prenom: user.prenom || user.firstName || '',
        raisonSociale: user.companyName || '',
        codePostal: user.zipCode || '',
        ville: user.city || '',
        pays: user.country || '',
        email: user.email || '',
        telephone: user.phone || ''
      });
    }
  }, [isAuthenticated, user, customerInfo.nom, onUpdate]);

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    onUpdate({
      ...customerInfo,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-accent mb-2 italic">
          Vos informations
        </h2>
        <p className="text-muted-foreground italic">
          Complétez vos informations pour finaliser votre commande personnalisée
        </p>
      </div>

      <div className="bg-muted/10 rounded-lg ">
        <p className="text-sm text-foreground italic">
           Vos informations sont sécurisées et ne seront utilisées que pour traiter votre commande personnalisée. <br/> <span className="text-primary">*</span> Champs obligatoires.
        </p>
      </div>
      {isAuthenticated && !isEditing && (
        <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg mb-6">
          <div>
            <p className="text-sm font-medium">Informations pré-remplies</p>
            <p className="text-xs text-muted-foreground">Vos informations de compte ont été automatiquement remplies</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Modifier
          </Button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nom" className="text-sm font-medium italic ">
            Nom *
          </Label>
          <Input
            id="nom"
            value={customerInfo.nom}
            onChange={(e) => handleInputChange('nom', e.target.value)}
            placeholder="Votre nom"
            disabled={isAuthenticated && !isEditing}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prenom" className="text-sm font-medium italic">
            Prénom *
          </Label>
          <Input
            id="prenom"
            value={customerInfo.prenom}
            onChange={(e) => handleInputChange('prenom', e.target.value)}
            placeholder="Votre prénom"
            disabled={isAuthenticated && !isEditing}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="raisonSociale" className="text-sm font-medium italic">
            Raison sociale *
          </Label>
          <Input
            id="raisonSociale"
            value={customerInfo.raisonSociale}
            onChange={(e) => handleInputChange('raisonSociale', e.target.value)}
            placeholder="Nom de votre entreprise"
            className="focus-visible:ring-accent"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="codePostal" className="text-sm font-medium italic">
            Code postal *
          </Label>
          <Input
            id="codePostal"
            value={customerInfo.codePostal}
            onChange={(e) => handleInputChange('codePostal', e.target.value)}
            placeholder="Code postal"
            disabled={isAuthenticated && !isEditing}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ville" className="text-sm font-medium italic">
            Ville *
          </Label>
          <Input
            id="ville"
            value={customerInfo.ville}
            onChange={(e) => handleInputChange('ville', e.target.value)}
            placeholder="Votre ville"
            disabled={isAuthenticated && !isEditing}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pays" className="text-sm font-medium italic">
            Pays *
          </Label>
          <Input
            id="pays"
            value={customerInfo.pays}
            onChange={(e) => handleInputChange('pays', e.target.value)}
            placeholder="Votre pays"
            disabled={isAuthenticated && !isEditing}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium italic">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="votre.email@exemple.com"
            disabled={isAuthenticated && !isEditing}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telephone" className="text-sm font-medium italic">
            Téléphone *
          </Label>
          <Input
            id="telephone"
            type="tel"
            value={customerInfo.telephone}
            onChange={(e) => handleInputChange('telephone', e.target.value)}
            placeholder="+216 XX XXX XXX"
            disabled={isAuthenticated && !isEditing}
            required
          />
        </div>
      </div>


    </div>
  );
};