import { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import { CustomizationData } from "@/pages/Customization";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";



interface CustomizationPreviewProps {
  data: CustomizationData;
  editable: boolean;
}

export const CustomizationPreview = ({ data, editable }: CustomizationPreviewProps) => {
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationStartAngle, setRotationStartAngle] = useState(0);
  const [rotationStartRotation, setRotationStartRotation] = useState(0);
  const [textSize, setTextSize] = useState({ width: 120, height: 50 });
  const [logoSize, setLogoSize] = useState({ width: 100, height: 100 });
  const previewRef = useRef<HTMLDivElement | null>(null);
  const rndRef = useRef<HTMLDivElement | null>(null);
  const [parentSize, setParentSize] = useState({ width: 300, height: 220 });

  const downloadPreview = async () => {
    if (!previewRef.current) return;
    
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: '#f5f5f5',
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = 'plaquette-preview.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading preview:', error);
    }
  };

  useEffect(() => {
    if (previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();
      setParentSize({ width: rect.width, height: rect.height });
    }
  }, [data.shape]);

  // Handle rotation with mouse drag
  const handleRotateMouseDown = (e: React.MouseEvent) => {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    
    // Find the Rnd container by traversing up the DOM
    let element: HTMLElement | null = e.currentTarget as HTMLElement;
    while (element && element.parentElement) {
      element = element.parentElement;
      // Rnd component creates a div with position: absolute
      if (element.style.position === 'absolute' || getComputedStyle(element).position === 'absolute') {
        break;
      }
    }
    
    if (!element) return;
    
    setIsRotating(true);
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    setRotationStartAngle(startAngle);
    setRotationStartRotation(rotation);
    rndRef.current = element;
  };

  useEffect(() => {
    if (!isRotating || !rndRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!rndRef.current) return;
      
      const rect = rndRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      const angleDiff = currentAngle - rotationStartAngle;
      setRotation((rotationStartRotation + angleDiff + 360) % 360);
    };

    const handleMouseUp = () => {
      setIsRotating(false);
      rndRef.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isRotating, rotationStartAngle, rotationStartRotation, rotation]);

  const getShapeStyle = () => {

    const baseStyle = {
      backgroundColor:
        data.chocolateColor === "blanc"
          ? "#FFF1BB"
          : data.chocolateColor=== "noir"
          ? "#45260B"
          : "#E5E5E5",
      border: "2px dashed rgba(107, 114, 128, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative" as const,
      overflow: "hidden" as const,
    };

    switch (data.shape?.category) {
      case "rond":
        return { ...baseStyle, width: "180px", height: "180px", borderRadius: "50%" };
      case "carre":
        return { ...baseStyle, width: "180px", height: "180px", borderRadius: "8px" };
      case "ovale":
        return { ...baseStyle, width: "280px", height: "160px", borderRadius: "50% / 60%" };
      case "rectangle":
      case "etiquette":
        return { ...baseStyle, width: "240px", height: "120px", borderRadius: "8px" };
      default:
        return { ...baseStyle, width: "200px", height: "160px", borderRadius: "8px" };
    }
  };

 const getTextColor = () => {
    if (!data.colorSelection.colors.length) return '#000000';
    
    const colorMap: { [key: string]: string } = {
      'OR': '#FFD700',
      'BL': '#FFFFFF', 
      'RG': '#DC143C',
      'NR': '#000000',
      'BZ': '#CD7F32',
      'AG': '#C0C0C0',
      'VR': '#228B22',
      'RZ': '#FF69B4',
      'JN': '#FFFF00'
    };
    
    // For preview, use the first selected color
    return colorMap[data.colorSelection.colors[0]] || '#000000';
  };

  const getTextStyle = () => {
    const isItalicStyle = data.textStyle?.includes("Italique");
    return {
      color: getTextColor(),
      fontSize: data.fontSize || "18px",
      fontWeight: "500",
      textAlign: "center" as const,
      wordBreak: "break-word" as const,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily:
        data.textStyle === "Helvetica"
          ? "Arial, sans-serif"
          : data.textStyle === "Balmoral"
          ? "serif"
          : data.textStyle === "Script"
          ? "cursive"
          : data.textStyle === "Manuel"
          ? "monospace"
          : isItalicStyle
          ? "Georgia, serif"
          : "sans-serif",
      fontStyle: isItalicStyle ? "italic" : "normal",
      transform: isItalicStyle ? "skew(-5deg, 0)" : "none",
      pointerEvents: "none" as const,
    };
  };

const getSpecialShapeImage = () => {
  if (!data.shape) return null;

  // Define shape variants (white & black images)
const specialShapeImages: Record<string, { blanc: string; noir: string }> = {
  DIS1: { blanc: "/diskb.png", noir: "/diskn.png" },
  DIS2: { blanc: "/diskb.png", noir: "/diskn.png" },
  ETQ1: { blanc: "/etiqb.png", noir: "/etiqn.png" },
  ETQ2: { blanc: "/etiqb.png", noir: "/etiqn.png" },
  EVT1: { blanc: "/eventailb1.png", noir: "/eventailn.png" },
  TAM1: { blanc: "/tamponb.png", noir: "/tamponn.png" },
  FEU1: { blanc: "/feuilleb.png", noir: "/feuillen.png" },
  LUT1: { blanc: "/lunetteb.png", noir: "/lunetten.png" },
  COE1: { blanc: "/heart1b.png", noir: "/heart1n.png" },
  COE2: { blanc: "/heart2b.png", noir: "/heart2n.png" },
  COE3: { blanc: "/heart3b.png", noir: "/heart3n.png" },
  COE4: { blanc: "/heart4b.png", noir: "/heart4n.png" },
  ECL1: { blanc: "/eclairb.png", noir: "/eclairn.png" },
  TRN1: { blanc: "/traineaub.png", noir: "/traineaun.png" },
  TRN2: { blanc: "/traineau_xlb.png", noir: "/traineau_xln.png" },
  EMB1: { blanc: "/embout1b.png", noir: "/embout1n.png" },
  EMB2: { blanc: "/embout2b.png", noir: "/embout2n.png" },
  SAP1: { blanc: "/sapinb.png", noir: "/sapinn.png" },
  ETO1: { blanc: "/etoileb.png", noir: "/etoilen.png" },
};


  const shape = specialShapeImages[data.shape.name];
  if (!shape) return null;

  return data.chocolateColor === "noir" ? shape.noir : shape.blanc;
};


  const specialShapeImage = getSpecialShapeImage();

  return (
    <div className="bg-gradient-to-br from-white via-white to-muted/20 rounded-2xl border border-primary/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-primary/60 animate-pulse shadow-lg" />
          <h3 className="text-xl font-semibold text-primary italic tracking-wide">
            Aperçu de votre plaquette
          </h3>
        </div>
        <Button
          onClick={downloadPreview}
          variant="outline"
          size="sm"
          className="italic smooth-transition hover:scale-105 hover:bg-gradient-to-r hover:from-primary hover:to-primary/90 hover:text-primary-foreground border-primary/30 hover:border-primary shadow-sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Télécharger
        </Button>
      </div>
      
      {/* Modern Preview section */}
      <div ref={previewRef} className="bg-gradient-to-br from-muted/40 via-background to-muted/20 p-8 rounded-2xl flex items-center justify-center min-h-[400px] border border-primary/10 shadow-inner backdrop-blur-sm">
        {data.shape ? (
          <div
            ref={previewRef}
            className="relative flex items-center justify-center w-[300px] h-[220px]"
          >
            {/* Special shape or fallback shape */}
            {specialShapeImage ? (
              <img
                src={specialShapeImage}
                alt={data.shape.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div style={getShapeStyle()}></div>
            )}

            {/* ✅ Draggable + Resizable + Rotatable Text */}
            {data.textType === "text" && data.textContent && (
              <Rnd
                default={{ x: 50, y: 50, width: textSize.width, height: textSize.height }}
                bounds="parent"
                lockAspectRatio={false}
                disableDragging={!editable || isRotating}
                enableResizing={editable && !isRotating}
                onResizeStop={(e, direction, ref, d, position) => {
                  setTextSize({ width: ref.offsetWidth, height: ref.offsetHeight });
                }}
                style={{
                  pointerEvents: editable ? "auto" : "none",
                  border: editable ? "1px solid #3B82F6" : "none",
                  padding: "0px",
                }}
              >
                <div
                  className="w-full h-full relative flex items-center justify-center"
                  style={{ 
                    transform: `rotate(${rotation}deg)`,
                    padding: "0px",
                    margin: "0px"
                  }}
                >
                  <span style={{
                    ...getTextStyle(), 
                    fontSize: `${Math.min(textSize.width, textSize.height) * 0.25}px`,
                    padding: "0px",
                    margin: "0px",
                    lineHeight: "1.2"
                  }}>
                    {data.textContent}
                  </span>

                  {/* 🔄 Rotate Button (only if editable) */}
                  {editable && (
                    <button
                      onMouseDown={handleRotateMouseDown}
                      className="absolute -top-5 -right-5 w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing z-10 transition-all hover:scale-110"
                      title="Maintenez et glissez pour tourner"
                    >
                      ↻
                    </button>
                  )}
                </div>
              </Rnd>
            )}

            {/* ✅ Draggable + Resizable + Rotatable Logo */}
            {data.textType === "logo" && data.logoFile && (
              <Rnd
                default={{ x: 40, y: 40, width: logoSize.width, height: logoSize.height }}
                bounds="parent"
                lockAspectRatio
                maxWidth={parentSize.width}
                maxHeight={parentSize.height}
                disableDragging={!editable || isRotating}
                enableResizing={editable && !isRotating}
                onResizeStop={(e, direction, ref, d, position) => {
                  setLogoSize({ width: ref.offsetWidth, height: ref.offsetHeight });
                }}
                style={{
                  pointerEvents: editable ? "auto" : "none",
                  border: editable ? "1px solid #3B82F6" : "none",
                }}
              >
                <div
                  className="w-full h-full relative flex items-center justify-center"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <img
                    src={URL.createObjectURL(data.logoFile)}
                    alt="Logo personnalisé"
                    className="w-full h-full object-contain pointer-events-none"
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />

                  {/* 🔄 Rotate Button (only if editable) */}
                  {editable && (
                    <button
                      onMouseDown={handleRotateMouseDown}
                      className="absolute -top-5 -right-5 w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing z-10 transition-all hover:scale-110"
                      title="Maintenez et glissez pour tourner"
                    >
                      ↻
                    </button>
                  )}
                </div>
              </Rnd>
            )}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <div className="w-48 h-48 border-2 border-dashed border-primary/30 rounded-xl flex items-center justify-center mb-4 bg-white/50">
              <span className="text-sm italic text-primary/70">Choisissez une forme</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Modern Details Section */}
      <div className="mt-6 space-y-3 text-sm bg-gradient-to-br from-muted/40 to-muted/20 p-5 rounded-2xl border border-primary/10 shadow-inner">
        <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
          <span className="font-semibold text-foreground">Type de chocolat:</span>
          <span className="italic text-primary font-medium">
            {data.chocolateBase ? 
              (data.chocolateBase === 'pate-a-glasse' ? 'Pâte à glacer' :
               data.chocolateBase === 'couverture' ? 'Couverture' :
               data.chocolateBase === 'valrhona' ? 'Valrhona' : 'Sans chocolat') + 
              (data.chocolateColor ? ` ${data.chocolateColor}` : '') :
              'Non sélectionné'
            }
          </span>
        </div>

        {data.shape && (
          <>
            <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
              <span className="font-semibold text-foreground">Forme:</span>
              <span className="italic text-primary font-medium">{data.shape.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
              <span className="font-semibold text-foreground">Dimensions:</span>
              <span className="italic text-primary font-medium">{data.shape.dimensions}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
              <span className="font-semibold text-foreground">Poses par feuille:</span>
              <span className="italic text-primary font-medium">{data.shape.posesPerSheet}</span>
            </div>
          </>
        )}

        <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
          <span className="font-semibold text-foreground">Quantité:</span>
          <span className="italic text-primary font-medium">
            {data.quantity} feuilles ({Math.ceil(data.quantity / 15)} boîte{Math.ceil(data.quantity / 15) > 1 ? 's' : ''})
          </span>
        </div>

        {data.printType && (
          <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
            <span className="font-semibold text-foreground">Type de production:</span>
            <span className="italic text-primary font-medium">
              {data.printType === 'feuilles-imprimees' ? 'Feuilles imprimées' : 'Thermoformé'}
            </span>
          </div>
        )}

        {data.colorSelection.colors.length > 0 && (
          <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
            <span className="font-semibold text-foreground">Couleurs d'impression:</span>
            <span className="italic text-primary font-medium">
              {data.colorSelection.colors.join(', ')} ({data.colorSelection.type?.replace('color', ' couleur')})
            </span>
          </div>
        )}

        {data.textType && (
          <div className="flex justify-between items-center py-2">
            <span className="font-semibold text-foreground">Type de personnalisation:</span>
            <span className="italic text-primary font-medium">
              {data.textType === 'text' && 'Texte personnalisé'}
              {data.textType === 'logo' && 'Logo personnalisé'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
