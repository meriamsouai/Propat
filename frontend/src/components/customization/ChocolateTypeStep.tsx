import { Card } from "@/components/ui/card";

interface ChocolateTypeStepProps {
  selectedBase: 'pate-a-glasse' | 'couverture' | 'valrhona' | 'sans-chocolat' | null;
  selectedColor: 'blanc' | 'noir' | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (updates: any) => void;
}

  export const ChocolateTypeStep = ({ selectedBase, selectedColor, onUpdate }: ChocolateTypeStepProps) => {
  const chocolateBases = [
    {
      id: 'pate-a-glasse',
      name: 'Pâte à glacer',
      description: 'Qualité standard pour une personnalisation économique'
    },
    {
      id: 'couverture',
      name: 'Couverture',
      description: 'Chocolat de qualité supérieure'
    },
    {
      id: 'valrhona',
      name: 'Valrhona',
      description: 'Chocolat haut de gamme, saveur exceptionnelle'
    },
    {
      id: 'sans-chocolat',
      name: 'Sans chocolat',
      description: 'Support plastique pour décoration uniquement'
    }
  ];

  const chocolateColors = [
    { id: 'blanc', name: 'Blanc', color: '#F5F1E8' },
    { id: 'noir', name: 'Noir', color: '#3E2723' }
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-blueg mb-2 italic">
          Choisissez le type de chocolat
        </h2>
        <p className="text-muted-foreground italic">
          
          
          
                  Sélectionnez d'abord le type de base, puis la couleur
        </p>
      </div>

      {/* Base Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-primary italic">Type de base</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {chocolateBases.map((base) => (
            <Card 
              key={base.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-md border-2 ${
                selectedBase === base.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onUpdate({ chocolateBase: base.id })}
            >
              <div className="space-y-2">
                <h4 className="font-medium text-primary italic">{base.name}</h4>
                <p className="text-sm text-muted-foreground italic">
                  {base.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Color Selection - only show if base is selected and not sans-chocolat */}
      {selectedBase && selectedBase !== 'sans-chocolat' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-primary italic">Couleur du chocolat</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {chocolateColors.map((color) => (
              <Card 
                key={color.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-md border-2 ${
                  selectedColor === color.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onUpdate({ chocolateColor: color.id })}
              >
                <div className="text-center space-y-4">
                  <div 
                    className="w-24 h-24 mx-auto rounded-full border-2 border-border"
                    style={{ backgroundColor: color.color }}
                  ></div>
                  <div>
                    <h4 className="text-lg font-medium text-primary italic">
                      {selectedBase === 'valrhona' ? color.name : `Chocolat ${color.name}`}
                    </h4>
                    <p className="text-sm text-muted-foreground italic mt-1">
                      {color.id === 'blanc' ? 'Parfait pour les textes sombres et colorés' : 'Idéal pour les textes clairs et dorés'}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Sans chocolat selected */}
      {selectedBase === 'sans-chocolat' && (
        <div className="p-4 bg-muted/10 rounded-lg">
          <p className="text-sm text-muted-foreground italic">
            Support plastique transparent sélectionné - aucune couleur de chocolat requise.
          </p>
        </div>
      )}
    </div>
  );
};