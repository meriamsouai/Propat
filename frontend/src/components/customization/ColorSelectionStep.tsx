import { useState } from "react";
import { Upload, Type, Image } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ColorSelectionStepProps {
  colorSelection: {
    type: '1color' | '2color' | '3color' | null;
    colors: string[];
  };
  textType: 'text' | 'logo' | null;
  textContent: string;
  textStyle: 'Helvetica' | 'Balmoral' | 'Script' | 'Manuel' | null;
  logoFile: File | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (updates: any) => void;
}

export const ColorSelectionStep = ({ 
  colorSelection,
  textType,
  textContent,
  textStyle,
  logoFile,
  onUpdate 
}: ColorSelectionStepProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const availableColors = [
    { id: 'OR', name: 'Or', value: '#FFD700' },
    { id: 'BL', name: 'Blanc', value: '#FFFFFF' },
    { id: 'RG', name: 'Rouge', value: '#DC143C' },
    { id: 'NR', name: 'Noir', value: '#000000' },
    { id: 'BZ', name: 'Bronze', value: '#CD7F32' },
    { id: 'AG', name: 'Argent', value: '#C0C0C0' },
    { id: 'VR', name: 'Vert', value: '#228B22' },
    { id: 'RZ', name: 'Rose', value: '#FF69B4' },
    { id: 'JN', name: 'Jaune', value: '#FFFF00' }
  ];

  const colorTypes = [
    { id: '1color', name: '1 Couleur', description: 'Impression en une seule couleur' },
    { id: '2color', name: '2 Couleurs', description: 'Impression en deux couleurs' },
    { id: '3color', name: '3 Couleurs', description: 'Impression en trois couleurs' }
  ];

  const textStyles = [
    { name: 'Helvetica', preview: 'Propat', description: 'Police moderne et claire' },
    { name: 'Balmoral', preview: 'Propat', description: 'Police élégante avec empattements' },
    { name: 'Script', preview: 'Propat', description: 'Police cursive et artistique' },
    { name: 'Manuel', preview: 'Propat', description: 'Police manuscrite personnalisée' },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
      onUpdate({ logoFile: files[0] });
    }
  };

  const handleColorTypeChange = (type: '1color' | '2color' | '3color') => {
    onUpdate({ 
      colorSelection: { 
        type, 
        colors: [] 
      }
    });
  };

  const handleColorSelection = (colorId: string) => {
    const maxColors = colorSelection.type === '1color' ? 1 : colorSelection.type === '2color' ? 2 : 3;
    let newColors = [...colorSelection.colors];
    
    if (newColors.includes(colorId)) {
      newColors = newColors.filter(c => c !== colorId);
    } else if (newColors.length < maxColors) {
      newColors.push(colorId);
    }
    
    onUpdate({ 
      colorSelection: { 
        ...colorSelection, 
        colors: newColors 
      }
    });
  };

  const canSelectMoreColors = () => {
    if (!colorSelection.type) return false;
    const maxColors = colorSelection.type === '1color' ? 1 : colorSelection.type === '2color' ? 2 : 3;
    return colorSelection.colors.length < maxColors;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-primary mb-2 italic">
          Couleur d'impression & Contenu
        </h2>
        <p className="text-muted-foreground italic">
          Choisissez d'abord le nombre de couleurs, puis sélectionnez-les et votre contenu
        </p>
      </div>

      {/* Number of colors selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-primary italic">Nombre de couleurs</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {colorTypes.map((type) => (
            <Card
              key={type.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md border-2 ${
                colorSelection.type === type.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleColorTypeChange(type.id as '1color' | '2color' | '3color')}
            >
              <div className="text-center space-y-2">
                <h4 className="font-medium text-primary italic">{type.name}</h4>
                <p className="text-sm text-muted-foreground italic">{type.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Color selection */}
      {colorSelection.type && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-primary italic">
            Sélectionnez vos couleurs ({colorSelection.colors.length}/{colorSelection.type === '1color' ? 1 : colorSelection.type === '2color' ? 2 : 3})
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {availableColors.map((color) => (
              <Card
                key={color.id}
                className={`p-3 cursor-pointer transition-all hover:shadow-md border-2 ${
                  colorSelection.colors.includes(color.id) ? 'border-primary bg-primary/5' : 
                  (!canSelectMoreColors() && !colorSelection.colors.includes(color.id)) ? 'opacity-50 cursor-not-allowed' :
                  'border-border hover:border-primary/50'
                }`}
                onClick={() => (canSelectMoreColors() || colorSelection.colors.includes(color.id)) && handleColorSelection(color.id)}
              >
                <div className="text-center space-y-2">
                  <div 
                    className="w-8 h-8 mx-auto rounded-full border-2 border-border"
                    style={{ backgroundColor: color.value }}
                  ></div>
                  <p className="text-xs font-medium italic">{color.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Content type selection */}
      {colorSelection.colors.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-primary italic">Type de contenu</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card
              className={`p-6 cursor-pointer transition-all hover:shadow-md border-2 ${
                textType === 'text' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onUpdate({ textType: 'text' })}
            >
              <div className="text-center space-y-3">
                <Type className="w-8 h-8 mx-auto text-primary" />
                <h4 className="font-medium text-primary italic">Texte personnalisé</h4>
                <p className="text-sm text-muted-foreground italic">
                  Ajoutez votre propre texte
                </p>
              </div>
            </Card>

            <Card
              className={`p-6 cursor-pointer transition-all hover:shadow-md border-2 ${
                textType === 'logo' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onUpdate({ textType: 'logo' })}
            >
              <div className="text-center space-y-3">
                <Image className="w-8 h-8 mx-auto text-primary" />
                <h4 className="font-medium text-primary italic">Logo</h4>
                <p className="text-sm text-muted-foreground italic">
                  Importez votre logo
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Text Input */}
      {textType === 'text' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="textContent" className="text-sm font-medium italic">
              Votre texte personnalisé
            </Label>
            <Textarea
              id="textContent"
              placeholder="Entrez votre texte ici..."
              value={textContent}
              onChange={(e) => onUpdate({ textContent: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium italic">Style d'écriture</Label>
            <div className="grid md:grid-cols-2 gap-4">
              {textStyles.map((style) => (
                <Card
                  key={style.name}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md border-2 ${
                    textStyle === style.name ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => onUpdate({ textStyle: style.name })}
                >
                  <div className="text-center space-y-2">
                    <div 
                      className="text-lg font-medium text-primary"
                      style={{
                        fontFamily: 
                          style.name === 'Helvetica' ? 'Arial, sans-serif' :
                          style.name === 'Balmoral' ? 'serif' :
                          style.name === 'Script' ? 'cursive' :
                          'monospace'
                      }}
                    >
                      {style.preview}
                    </div>
                    <div>
                      <p className="font-medium text-sm italic">{style.name}</p>
                      <p className="text-xs text-muted-foreground italic">
                        {style.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logo Upload */}
      {textType === 'logo' && (
        <div className="space-y-4">
          <Label className="text-sm font-medium italic">
            Téléchargez votre logo
          </Label>
          
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm font-medium text-amber-800 italic">
              💡 POUR TRAÇAGE POUR UNE MEILLEURE QUALITÉ
            </p>
            <p className="text-xs text-amber-700 italic mt-1">
              Téléchargez un fichier AI (Adobe Illustrator) si possible pour une qualité optimale.
            </p>
          </div>
          
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-sm font-medium italic">
                Glissez-déposez votre logo ou cliquez pour parcourir
              </p>
              <p className="text-xs text-muted-foreground italic">
                Formats acceptés: AI (recommandé), PNG, JPG, SVG (max 5MB)
              </p>
            </div>
            <Input
              type="file"
              accept=".ai,.png,.jpg,.jpeg,.svg"
              onChange={handleFileChange}
              className="mt-4"
            />
          </div>

          {logoFile && (
            <div className="flex items-center gap-3 p-3 bg-muted/10 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                <Image className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium italic">{logoFile.name}</p>
                <p className="text-xs text-muted-foreground italic">
                  {(logoFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUpdate({ logoFile: null })}
                className="ml-auto"
              >
                Supprimer
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};