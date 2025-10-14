import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Shape category images
import ovalImage from "/ovale1.png";
import squareImage from "/carre.png";
import roundImage from "/rond.png";
import rectangleImage from "/rectg.png";

// Special shapes
import heartImage1 from "/heart1.png";
import heartImage2 from "/heart2.png";
import heartImage3 from "/heart3.png";
import heartImage4 from "/heart4.png";

import starImage from "/star.png";

// Example: add your uploaded images for special shapes
import disque1Image from "/disk1.png";
import disque2Image from "/disk1.png";
import etiquette1Image from "/etiq.png";
import etiquette2Image from "/etiq.png";
import eventailImage from "/eventail.png";
import tamponImage from "/tampon.png";
import feuillesImage from "/feuilles.png";
import lunetteGeoImage from "/lunette_geo.png";
import eclairImage from "/eclair.png";
import traineauImage from "/traineau.png";
import traineauXLImage from "/traineau_xl.png";
import embout1Image from "/embout1.png";
import embout2Image from "/embout2.png";
import sapinImage from "/sapin.png";

interface Shape {
  category: string;
  name: string;
  dimensions: string;
  posesPerSheet: number;
}

interface ShapeSelectionStepProps {
  selectedShape: Shape | null;
  onShapeSelect: (shape: Shape) => void;
}

export const ShapeSelectionStep = ({ selectedShape, onShapeSelect }: ShapeSelectionStepProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ovale');

  const shapeCategories = {
    ovale: [
      { name: 'GOV', dimensions: '5.5×3.7cm', posesPerSheet: 12 },
      { name: 'NOV', dimensions: '5.2×3.5cm', posesPerSheet: 20 },
      { name: 'POV', dimensions: '3.9×2.2cm', posesPerSheet: 32 },
      { name: 'MOV', dimensions: '3.8×2.7cm', posesPerSheet: 28 },
      { name: 'TV2', dimensions: '2.5×1.7cm', posesPerSheet: 56 },
    ],
    carre: [
      { name: 'C45', dimensions: '4.5×4.5cm', posesPerSheet: 12 },
      { name: 'C35', dimensions: '3.5×3.5cm', posesPerSheet: 24 },
      { name: 'C30', dimensions: '3×3cm', posesPerSheet: 28 },
      { name: 'C25', dimensions: '2.5×2.5cm', posesPerSheet: 35 },
      { name: 'C20', dimensions: '2×2cm', posesPerSheet: 54 },
    ],
    rectangle: [
      { name: 'B8553', dimensions: '8.5×5.3cm', posesPerSheet: 6 },
      { name: 'B6040', dimensions: '6×4cm', posesPerSheet: 10 },
      { name: 'B4030', dimensions: '4×3cm', posesPerSheet: 20 },
      { name: 'B6013', dimensions: '6×1.3cm', posesPerSheet: 24 },
      { name: 'B2515', dimensions: '2.5×1.5cm', posesPerSheet: 36 },
      { name: 'B4412', dimensions: '4.4×1.2cm', posesPerSheet: 42 },
      { name: 'B4109', dimensions: '4.1×0.9cm', posesPerSheet: 42 },
      { name: 'B3013', dimensions: '3×1.3cm', posesPerSheet: 48 },
    ],
    rond: [
      { name: 'R70', dimensions: '⌀ 7cm', posesPerSheet: 6 },
      { name: 'R50', dimensions: '⌀ 5cm', posesPerSheet: 11 },
      { name: 'R40', dimensions: '⌀ 4cm', posesPerSheet: 15 },
      { name: 'R35', dimensions: '⌀ 3.5cm', posesPerSheet: 24 },
      { name: 'R30', dimensions: '⌀ 3cm', posesPerSheet: 27 },
      { name: 'R25', dimensions: '⌀ 2.5cm', posesPerSheet: 35 },
      { name: 'R20', dimensions: '⌀ 2cm', posesPerSheet: 54 },
    ],
    special: [
      { name: 'EMB1', dimensions: '9×8.6cm', posesPerSheet: 3 },
      { name: 'EMB2', dimensions: '8.5×7.2cm', posesPerSheet: 20 },
      { name: 'EVT1', dimensions: '4.37×3.53cm', posesPerSheet: 18 },
      { name: 'TAM1', dimensions: '3.3×3.5cm', posesPerSheet: 24 },
      { name: 'FEU1', dimensions: '6×2.75cm', posesPerSheet: 18 },
      { name: 'ETQ1', dimensions: '4×3cm', posesPerSheet: 25 },
      { name: 'ETQ2', dimensions: '2.5×2.5cm', posesPerSheet: 45 },
      { name: 'COE1', dimensions: '15×14cm', posesPerSheet: 2 },
      { name: 'COE2', dimensions: '4×13.1cm', posesPerSheet: 4 },
      { name: 'COE3', dimensions: '3.7×3.6cm', posesPerSheet: 18 },
      { name: 'COE4', dimensions: '1.4×1.3cm', posesPerSheet: 63 },
      { name: 'DIS1', dimensions: '⌀ 12cm', posesPerSheet: 1 },
      { name: 'DIS2', dimensions: '⌀ 6.8cm', posesPerSheet: 2 },
      { name: 'ETO1', dimensions: '7.1×4.6cm', posesPerSheet: 1 },
      { name: 'LUT1', dimensions: '27.5×15cm', posesPerSheet: 1 },
      { name: 'ECL1', dimensions: '12.2×3.2cm', posesPerSheet: 12 },
      { name: 'TRN1', dimensions: '11×4cm', posesPerSheet: 8 },
      { name: 'TRN2', dimensions: '15×10.4cm', posesPerSheet: 2 },
      { name: 'SAP1', dimensions: '12×9.5cm', posesPerSheet: 2 },
    ]
  };

  const specialShapeImages: Record<string, string> = {
    DIS1: disque1Image,
    DIS2: disque2Image,
    ETQ1: etiquette1Image,
    ETQ2: etiquette2Image,
    EVT1: eventailImage,
    TAM1: tamponImage,
    FEU1: feuillesImage,
    LUT1: lunetteGeoImage,
    COE1: heartImage1,
    COE2: heartImage2,
    COE3: heartImage3,
    COE4: heartImage4,
    ECL1: eclairImage,
    TRN1: traineauImage,
    TRN2: traineauXLImage,
    EMB1: embout1Image,
    EMB2: embout2Image,
    SAP1: sapinImage,
    ETO1: starImage,
  };

  const getShapeImage = (category: string, shapeName: string) => {
    if (category === "rond") return roundImage;
    if (category === "carre") return squareImage;
    if (category === "ovale") return ovalImage;
    if (category === "rectangle") return rectangleImage;
    if (category === "special") return specialShapeImages[shapeName] || ovalImage;
    return ovalImage; // fallback
  };

  const categories = [
    { key: 'ovale', label: 'Ovale' },
    { key: 'rond', label: 'Ronde' },
    { key: 'rectangle', label: 'Rectangle' },
    { key: 'carre', label: 'Carré' },
    { key: 'special', label: 'Formes Spéciales' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-blueg mb-2 italic">
          Choisissez la forme et les dimensions
        </h2>
        <p className="text-muted-foreground italic">
          Sélectionnez d'abord une catégorie, puis choisissez la forme exacte
        </p>
      </div>

      {/* Category Selection */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`italic ${
              selectedCategory === category.key
                ? "bg-foreground text-white hover:bg-foreground"
                : "bg-accent hover:bg-accent"
            }`}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Shape Selection */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shapeCategories[selectedCategory as keyof typeof shapeCategories]?.map((shape) => {
          const fullShape = {
            category: selectedCategory,
            name: shape.name,
            dimensions: shape.dimensions,
            posesPerSheet: shape.posesPerSheet
          };

          const isSelected = selectedShape?.name === shape.name &&
                             selectedShape?.category === selectedCategory;

          return (
            <Card
              key={`${selectedCategory}-${shape.name}`}
              className={`p-4 cursor-pointer transition-all hover:shadow-md border-2 ${
                isSelected ? 'border-accent bg-accent/15' : 'border-border hover:border-accent/50'
              }`}
              onClick={() => onShapeSelect(fullShape)}
            >
              <div className="text-center space-y-3">
                <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={getShapeImage(selectedCategory, shape.name)}
                    alt={shape.name}
                    className="w-20 h-16 object-contain"
                  />
                </div>
                <div className="text-sm space-y-1 ">
                  <p className="text-black italic font-sans font-bold">
                    <span className="font-medium text-blueg">Réference:</span> {shape.name}
                  </p>
                  <p className="text-black font-sans font-bold ">
                    <span className="font-medium text-blueg italic">Dimensions:</span> {shape.dimensions}
                  </p>
                  <p className="text-black italic font-sans font-bold">
                    <span className="font-medium text-blueg">Poses:</span> {shape.posesPerSheet} par feuille
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
