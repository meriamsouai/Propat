import { useState } from "react";
import { Upload, Type, Image, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface TextLogoStepProps {
  textType: "text" | "logo" | "design" | null;
  textContent: string;
  textStyle: "Helvetica" | "Balmoral" | "Script" | "Manuel" | null;
  logoFile: File | null;
  fontSize: string | null; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (updates: any) => void;
}

export const TextLogoStep = ({
  textType,
  textContent,
  textStyle,
  logoFile,
  fontSize, // 👈 added here
  onUpdate,
}: TextLogoStepProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
      onUpdate({ logoFile: files[0] });
    }
  };

  const textStyles = [
    { name: "Helvetica", preview: "Propat", description: "Police moderne et claire", italic: false },
    { name: "Balmoral", preview: "Propat", description: "Police élégante avec empattements", italic: false },
    { name: "Script", preview: "Propat", description: "Police cursive et artistique", italic: false },
    { name: "Manuel", preview: "Propat", description: "Police manuscrite personnalisée", italic: false },
    { name: "Italique Elegant", preview: "Propat", description: "Style italique élégant pour chocolat", italic: true },
    { name: "Italique Classique", preview: "Propat", description: "Italique classique pour chocolat", italic: true },
    { name: "Italique Moderne", preview: "Propat", description: "Italique moderne pour chocolat", italic: true },
    { name: "Italique Artisanal", preview: "Propat", description: "Italique artisanal pour chocolat", italic: true },
  ];

  const fontSizes = [
    { label: "Très petit", value: "12px" },
    { label: "Petit", value: "14px" },
    { label: "Moyen", value: "18px" },
    { label: "Grand", value: "22px" },
    { label: "Très grand", value: "28px" },
    { label: "Énorme", value: "36px" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-accent mb-2 italic">
          Texte, Logo ou Dessin à reproduire
        </h2>
        <p className="text-muted-foreground italic">
          Choisissez comment personnaliser vos plaquettes
        </p>
      </div>

      {/* Type Selection */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card
          className={`p-6 cursor-pointer transition-all hover:shadow-md border-2 ${
            textType === "text"
              ? "border-blueg bg-blueg/20"
              : "border-border hover:border-blueg/50"
          }`}
          onClick={() => onUpdate({ textType: "text" })}
        >
          <div className="text-center space-y-3">
            <Type className="w-8 h-8 mx-auto text-blueg" />
            <h3 className="font-medium text-blueg italic">Texte personnalisé</h3>
            <p className="text-sm text-blueg italic">
              Ajoutez votre propre texte
            </p>
          </div>
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all hover:shadow-md border-2 ${
            textType === "logo"
              ? "border-blueg/80 bg-blueg/20"
              : "border-border hover:border-blueg/50"
          }`}
          onClick={() => onUpdate({ textType: "logo" })}
        >
          <div className="text-center space-y-3">
            <Image className="w-8 h-8 mx-auto text-blueg" />
            <h3 className="font-medium text-blueg italic">Logo</h3>
            <p className="text-sm text-blueg italic">
              Importez votre logo
            </p>
          </div>
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all hover:shadow-md border-2 ${
            textType === "design"
              ? "border-blueg/80 bg-blueg/20"
              : "border-border hover:border-blueg/50"
          }`}
          onClick={() => onUpdate({ textType: "design" })}
        >
          <div className="text-center space-y-3">
            <Palette className="w-8 h-8 mx-auto text-blueg" />
            <h3 className="font-medium text-blueg italic">Dessin personnalisé</h3>
            <p className="text-sm text-blueg italic">
              Design sur mesure
            </p>
          </div>
        </Card>
      </div>

      {/* Text Input */}
      {textType === "text" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="textContent" className="text-sm font-medium italic">
              Votre texte personnalisé
            </Label>
            <Textarea
              id="textContent"
              placeholder="Entrez votre texte ici... (maximum 68 caractères)"
              value={textContent}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 68) {
                  onUpdate({ textContent: value });
                }
              }}
              className="min-h-[100px] focus-visible:ring-blueg"
              maxLength={68}
            />
            <p className="text-xs text-muted-foreground italic">
              {textContent.length}/68 caractères
            </p>
          </div>
{/* Font Size Selection */}
<div className="space-y-4">
  <Label className="text-sm font-medium italic">Taille du texte</Label>
  <Select
    value={fontSize || ""}
    onValueChange={(value) => onUpdate({ fontSize: value })}
  >
    <SelectTrigger className="w-[200px] focus:ring-blueg">
      <SelectValue placeholder="Choisir une taille" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="12px">Très petit</SelectItem>
      <SelectItem value="14px">Petit</SelectItem>
      <SelectItem value="18px">Moyen</SelectItem>
      <SelectItem value="22px">Grand</SelectItem>
      <SelectItem value="28px">Très grand</SelectItem>
      <SelectItem value="36px">Énorme</SelectItem>
    </SelectContent>
  </Select>
</div>
          {/* Font Family Selection */}
          <div className="space-y-4">
            <Label className="text-sm font-medium italic">Style d'écriture</Label>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {textStyles.map((style) => (
                <Card
                  key={style.name}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md border-2 ${
                    textStyle === style.name
                      ? "border-blueg/80 bg-blueg/20"
                      : "border-border hover:border-blueg/50"
                  }`}
                  onClick={() => onUpdate({ textStyle: style.name })}
                >
                  <div className="text-center space-y-2">
                    <div
                      className="text-lg font-medium text-blueg"
                      style={{
                        fontFamily:
                          style.name === "Helvetica"
                            ? "Arial, sans-serif"
                            : style.name === "Balmoral"
                            ? "serif"
                            : style.name === "Script"
                            ? "cursive"
                            : style.name === "Manuel"
                            ? "monospace"
                            : "Georgia, serif",
                        fontStyle: style.italic ? "italic" : "normal",
                        transform: style.italic ? "skew(-5deg, 0)" : "none"
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
      {textType === "logo" && (
        <div className="space-y-4">
          <Label className="text-sm font-medium italic">
            Téléchargez votre logo
          </Label>

          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 mx-auto text-blueg mb-4" />
            <div className="space-y-2">
              <p className="text-sm font-medium italic">
                Glissez-déposez votre logo ou cliquez pour parcourir
              </p>
              <p className="text-xs text-muted-foreground italic">
                Formats acceptés: PNG, JPG, SVG (max 5MB)
              </p>
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-4 border-blueg/50"
            />
          </div>

          {logoFile && (
            <div className="flex items-center gap-3 p-3 bg-muted/10 rounded-lg">
              <div className="w-10 h-10 bg-accent/10 rounded flex items-center justify-center">
                <Image className="w-5 h-5 text-accent" />
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

      {/* Design Option */}
      {textType === "design" && (
        <div className="text-center p-8 bg-muted/10 rounded-lg">
          <Palette className="w-12 h-12 mx-auto text-blueg mb-4" />
          <h3 className="text-lg font-medium text-blueg mb-2 italic">
            Dessin personnalisé
          </h3>
          <p className="text-muted-foreground italic mb-4">
            Vous souhaitez un design unique ? Notre équipe créera un dessin
            personnalisé selon vos spécifications.
          </p>
          <p className="text-sm text-muted-foreground italic">
            Décrivez votre idée dans les informations complémentaires ou
            contactez-nous directement.
          </p>
        </div>
      )}
    </div>
  );
};
