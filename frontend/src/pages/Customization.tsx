import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { CustomizationPreview } from "@/components/customization/CustomizationPreview";
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
    type: '1color' | '2color' | '3color' | null;
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
    raisonSociale: string;
    codePostal: string;
    ville: string;
    pays: string;
    email: string;
    telephone: string;
  };
}

const Customization = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
      raisonSociale: '',
      codePostal: '',
      ville: '',
      pays: '',
      email: '',
      telephone: ''
    }
  });

  const steps = [
    'Forme & Dimensions',
    'Type de chocolat',
    'Couleur d\'impression',
    'Quantité & Type',
    'Vos informations'
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateCustomizationData = (updates: Partial<CustomizationData>) => {
    setCustomizationData(prev => ({ ...prev, ...updates }));
  };

const canProceedToNext = () => {
    switch (currentStep) {
      case 0:
        return customizationData.shape !== null;
      case 1:
        return customizationData.chocolateBase !== null && customizationData.chocolateColor !== null;
      case 2:
        return customizationData.colorSelection.type !== null && customizationData.colorSelection.colors.length > 0 &&
               customizationData.textType !== null && 
               (customizationData.textContent !== '' || customizationData.logoFile !== null);
      case 3:
        return customizationData.quantity >= 90 && customizationData.printType !== null;
      case 4: {
        const { customerInfo } = customizationData;
        return customerInfo.nom && customerInfo.prenom && customerInfo.raisonSociale && 
         customerInfo.codePostal && customerInfo.ville && customerInfo.pays && 
         customerInfo.email && customerInfo.telephone;
      }
    }
  };


  const handleNext = () => {
    if (currentStep < steps.length - 1 && canProceedToNext()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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
            nom: '', prenom: '', raisonSociale: '', codePostal: '',
            ville: '', pays: '', email: '', telephone: ''
          }
        });
        setCurrentStep(0);
      } else {
        throw new Error('Erreur lors de l\'envoi de la commande');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la commande. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

    const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ShapeSelectionStep 
            selectedShape={customizationData.shape}
            onShapeSelect={(shape) => updateCustomizationData({ shape })}
          />
        );
      case 1:
        return (
          <ChocolateTypeStep 
            selectedBase={customizationData.chocolateBase}
            selectedColor={customizationData.chocolateColor}
            onUpdate={(updates) => updateCustomizationData(updates)}
          />
        );
      case 2:
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
      case 3:
        return (
          <QuantityStep 
            quantity={customizationData.quantity}
            printType={customizationData.printType}
            customerInfo={customizationData.customerInfo}
            onUpdate={(updates) => updateCustomizationData(updates)}
          />
        );
      case 4:
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
    <div className="min-h-screen bg-background">
      <Navbar/>
      {/* Header with Progress */}
      <div className="border-b  bg-foreground/5 pt-20 ">
        <div className="container mx-auto px-4 py-6 ">
          <h1 className="text-4xl  font-bold text-accent mb-4 flex justify-center py-10 ">
            Personnalisez votre décoration
          </h1>
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            {steps.map((step, index) => (
              <span 
                key={step}
                className={`italic ${index <= currentStep ? 'text-blueg font-bold' : ''}`}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Customization Form */}
            <div className="lg:col-span-8 space-y-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Précédent
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceedToNext()}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                >
                  Envoyer la commande
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  className="flex items-center gap-2 bg-blueg hover:bg-blueg/80"
                >
                  Suivant
                  <ChevronRight size={16} />
                </Button>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
                        {/* Reference Code */}
            <Card className="p-4">
              <h3 className="text-lg font-medium text-primary mb-2 italic">
                Référence de votre commande
              </h3>
              <div className="bg-muted p-3 rounded-md">
                <code className="text-lg font-mono text-primary">
                  {currentReference || 'REF-XXXXXX'}
                </code>
              </div>
              <p className="text-sm text-muted-foreground mt-2 italic">
                Cette référence est générée automatiquement selon vos choix
              </p>
            </Card>
            
            <CustomizationPreview 
                data={customizationData} 
                editable={currentStep !== 5} 
            />

          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Customization;