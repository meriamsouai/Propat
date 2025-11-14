import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { CustomizationPreview } from "@/components/customization/CustomizationPreview";
import { PrintTypeStep } from "@/components/customization/PrintTypeStep";
import { ChocolateTypeStep } from "@/components/customization/ChocolateTypeStep";
import { ShapeSelectionStep } from "@/components/customization/ShapeSelectionStep";
import { QuantityStep } from "@/components/customization/QuantityStep";
import { ColorSelectionStep } from "@/components/customization/ColorSelectionStep";
import { TextLogoStep } from "@/components/customization/TextLogoStep";
import { CustomerInfoStep } from "@/components/customization/CustomerInfoStep";
import { generateReference } from "@/utils/referenceGenerator";
import { getAuthHeadersForFormData } from "@/config/api";
import { API_ENDPOINTS, getAuthHeaders } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PDFViewer } from "@/components/PDFViewer";



export interface CustomizationData {
  chocolateBase: 'pate-a-glasse' | 'couverture' | 'valrhona' | 'sans-chocolat' | null;
  chocolateColor: 'blanc' | 'noir' | null;
  shape: {
    category: string;
    name: string;
    dimensions: string;
    posesPerSheet: number;
  } | null;
  quantity: number;
  printType: 'feuilles-imprimees' | 'thermoformed' | null;
  colorSelection: {
    type: '1color' | '2color' | null;
    colors: string[];
  };
  textType: 'text' | 'logo' | null;
  textContent: string;
  textStyle: 'Helvetica' | 'Balmoral' | 'Script' | 'Manuel' | null;
  fontSize?: string; 
  logoFile: File | null;
  customerInfo: {
    nom: string;
    prenom: string;
    codePostal: string;
    ville: string;
    pays: string;
    email: string;
    telephone: string;
  };
}

const Customization = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [customizationData, setCustomizationData] = useState<CustomizationData>({
    chocolateBase: null,
    chocolateColor: null,
    shape: null,
    quantity: 90,
    printType: null,
    colorSelection: {
      type: null,
      colors: []
    },
    textType: null,
    textContent: '',
    textStyle: null,
    logoFile: null,
    customerInfo: {
      nom: '',
      prenom: '',
      codePostal: '',
      ville: '',
      pays: '',
      email: '',
      telephone: ''
    }
  });

  const steps = [
    'Type de production',
    'Forme & Dimensions',
    'Type de chocolat',
    'Couleur d\'impression',
    'Quantité',
    'Vos informations'
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateCustomizationData = (updates: Partial<CustomizationData>) => {
    setCustomizationData(prev => ({ ...prev, ...updates }));
  };

const canProceedToNext = () => {
    switch (currentStep) {
      case 0:
        return customizationData.printType !== null;
      case 1:
        return customizationData.shape !== null;
      case 2:
        return customizationData.chocolateBase !== null && customizationData.chocolateColor !== null;
      case 3:
        return customizationData.colorSelection.type !== null && customizationData.colorSelection.colors.length > 0 &&
               customizationData.textType !== null && 
               (customizationData.textContent !== '' || customizationData.logoFile !== null);
      case 4:
        return customizationData.quantity >= 90;
      case 5: {
        const { customerInfo } = customizationData;
        return customerInfo.nom && customerInfo.prenom && 
         customerInfo.codePostal && customerInfo.ville && customerInfo.pays && 
         customerInfo.email && customerInfo.telephone;
      }
    }
  };


  const handleNext = () => {
    if (currentStep < steps.length - 1 && canProceedToNext()) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const { toast } = useToast();
  
  const currentReference = generateReference(customizationData, currentStep);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      
    // Generate final reference with timestamp
    const finalReference = generateReference(customizationData, currentStep + 1);
      formData.append('reference', finalReference);
      formData.append('chocolateBase', customizationData.chocolateBase || '');
      formData.append('chocolateColor', customizationData.chocolateColor || '');
      formData.append('shape', JSON.stringify(customizationData.shape));
      formData.append('quantity', customizationData.quantity.toString());
      formData.append('printType', customizationData.printType || '');
      formData.append('colorSelection', JSON.stringify(customizationData.colorSelection));
      formData.append('textType', customizationData.textType || '');
      formData.append('textContent', customizationData.textContent);
      formData.append('textStyle', customizationData.textStyle || '');
      formData.append('customerInfo', JSON.stringify(customizationData.customerInfo));
      
      if (customizationData.logoFile) {
        formData.append('logoFile', customizationData.logoFile);
      }

      const response = await fetch(API_ENDPOINTS.CUSTOMIZATION.CREATE, {
        method: 'POST',
        headers: getAuthHeadersForFormData(),
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Commande envoyée!",
          description: `Votre commande ${finalReference} a été envoyée avec succès.`,
        });
        
       // Reset form
        setCustomizationData({
          chocolateBase: null,
          chocolateColor: null,
          shape: null,
          quantity: 90,
          printType: null,
          colorSelection: {
            type: null,
            colors: []
          },
          textType: null,
          textContent: '',
          textStyle: null,
          logoFile: null,
          customerInfo: {
            nom: '', prenom: '', codePostal: '',
            ville: '', pays: '', email: '', telephone: ''
          }
        });
        setCurrentStep(0);
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
        console.error('Order submission error:', errorData);
        throw new Error(errorData.message || 'Erreur lors de l\'envoi de la commande');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible d'envoyer la commande. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

    const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PrintTypeStep 
            printType={customizationData.printType}
            onUpdate={(updates) => updateCustomizationData(updates)}
          />
        );
      case 1:
        return (
          <ShapeSelectionStep 
            selectedShape={customizationData.shape}
            onShapeSelect={(shape) => updateCustomizationData({ shape })}
          />
        );
      case 2:
        return (
          <ChocolateTypeStep 
            selectedBase={customizationData.chocolateBase}
            selectedColor={customizationData.chocolateColor}
            onUpdate={(updates) => updateCustomizationData(updates)}
          />
        );
      case 3:
        return (
          <ColorSelectionStep 
            colorSelection={customizationData.colorSelection}
            textType={customizationData.textType}
            textContent={customizationData.textContent}
            textStyle={customizationData.textStyle}
            logoFile={customizationData.logoFile}
            onUpdate={(updates) => updateCustomizationData(updates)}
          />
        );
      case 4:
        return (
          <QuantityStep 
            quantity={customizationData.quantity}
            customerInfo={customizationData.customerInfo}
            onUpdate={(updates) => updateCustomizationData(updates)}
          />
        );
      case 5:
        return (
          <CustomerInfoStep 
            customerInfo={customizationData.customerInfo}
            onUpdate={(customerInfo) => updateCustomizationData({ customerInfo })}
          />
        );
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navbar/>
      {/* Modern Header with Progress */}
      <div className="border-b bg-gradient-to-r from-foreground/5 via-foreground/3 to-foreground/5 pt-24 pb-8 page-transition">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-accent mb-3">
              Personnalisez votre décoration
            </h1>
            <p className="text-muted-foreground italic">
              Créez votre plaquette personnalisée en quelques étapes simples
            </p>
          </div>
          
          {/* Modern Step Indicators */}
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Progress value={progress} className="h-2.5 progress-bar" />
            </div>
            <div className="flex justify-between items-center relative">
              {/* Connecting line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10" />
              {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                return (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 smooth-transition relative z-10 ${
                        isActive
                          ? 'step-active'
                          : isCompleted
                          ? 'step-completed'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <span className="text-white">✓</span>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 text-center max-w-[80px] transition-all duration-300 ${
                        isActive
                          ? 'text-primary font-semibold'
                          : isCompleted
                          ? 'text-foreground/70'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Customization Form */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="p-6 md:p-8 card-hover modern-shadow">
              <div className="page-transition">
                {renderStep()}
              </div>
            </Card>

            {/* Modern Navigation Buttons */}
            <div className="flex justify-between items-center pt-4 gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-6 rounded-xl smooth-transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                <ChevronLeft size={18} />
                Précédent
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceedToNext()}
                  className="flex items-center gap-2 px-8 py-6 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold smooth-transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-glow"
                  size="lg"
                >
                  <span className="text-lg">Envoyer la commande</span>
                  <ChevronRight size={18} />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  className="flex items-center gap-2 px-8 py-6 rounded-xl bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white font-semibold smooth-transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  Suivant
                  <ChevronRight size={18} />
                </Button>
              )}
            </div>
          </div>

          {/* Modern Preview Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
            {/* Reference Code Card */}
            <Card className="p-6 card-hover soft-shadow border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h3 className="text-lg font-semibold text-primary italic">
                  Référence de votre commande
                </h3>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-xl border border-primary/20">
                <code className="text-xl font-mono font-bold text-primary block text-center tracking-wider">
                  {currentReference || 'REF-XXXXXX'}
                </code>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center italic">
                Cette référence est générée automatiquement selon vos choix
              </p>
            </Card>
            
            {/* Preview Card */}
            <div className="page-transition">
              <CustomizationPreview 
                data={customizationData} 
                editable={currentStep !== 5} 
              />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Customization;