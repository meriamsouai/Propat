import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";

interface QuantityStepProps {
  quantity: number;
  customerInfo: {
    nom: string;
    prenom: string;
    codePostal: string;
    ville: string;
    pays: string;
    email: string;
    telephone: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (updates: any) => void;
}

export const QuantityStep = ({ quantity, customerInfo, onUpdate }: QuantityStepProps) => {
  const isFirstOrder = !customerInfo.email || customerInfo.email === '';
  const sheetsPerBox = 15;
  const boxes = Math.ceil(quantity / sheetsPerBox);
  const technicalFee = quantity < 200 && !isFirstOrder ? 150 : 0;
  const minimumForNewClient = isFirstOrder ? 200 : 90;

  const handleQuantityChange = (newQuantity: number) => {
    // Round to nearest multiple of 15 (sheets per box)
    const adjustedQuantity = Math.max(minimumForNewClient, Math.ceil(newQuantity / sheetsPerBox) * sheetsPerBox);
    onUpdate({ quantity: adjustedQuantity });
  };

  const incrementQuantity = () => {
    handleQuantityChange(quantity + sheetsPerBox);
  };

  const decrementQuantity = () => {
    handleQuantityChange(quantity - sheetsPerBox);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-primary mb-2 italic">
          Quantité de feuilles
        </h2>
        <p className="text-muted-foreground italic">
          Choisissez la quantité de feuilles pour votre commande
        </p>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-primary italic">Quantité de feuilles</h3>
        
        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 italic mb-2">
              {isFirstOrder ? 'Première commande' : 'Commande standard'}
            </h4>
            <p className="text-sm text-blue-700 italic">
              {isFirstOrder 
                ? 'Minimum 200 feuilles pour une première commande'
                : 'Minimum 90 feuilles (6 boîtes) pour éviter les frais techniques'
              }
            </p>
          </div>
          
          {technicalFee > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-medium text-amber-800 italic mb-2">Frais techniques</h4>
              <p className="text-sm text-amber-700 italic">
                +{technicalFee}DT pour les commandes &lt; 200 feuilles
              </p>
            </div>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= minimumForNewClient}
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <div className="text-center min-w-[200px]">
              <div className="text-3xl font-bold text-primary italic">{quantity}</div>
              <div className="text-sm text-muted-foreground italic">feuilles</div>
              <div className="text-xs text-muted-foreground italic">
                ({boxes} boîte{boxes > 1 ? 's' : ''} de {sheetsPerBox} feuilles)
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Custom quantity input */}
          <div className="max-w-xs mx-auto">
            <Label htmlFor="customQuantity" className="text-sm font-medium italic">
              Quantité personnalisée (multiples de {sheetsPerBox})
            </Label>
            <Input
              id="customQuantity"
              type="number"
              min={minimumForNewClient}
              step={sheetsPerBox}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || minimumForNewClient)}
              className="text-center"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 bg-muted/10 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm italic">Quantité:</span>
            <span className="font-medium italic">{quantity} feuilles ({boxes} boîte{boxes > 1 ? 's' : ''})</span>
          </div>
          {technicalFee > 0 && (
            <div className="flex justify-between items-center text-amber-700">
              <span className="text-sm italic">Frais techniques:</span>
              <span className="font-medium italic">+{technicalFee} DT</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
