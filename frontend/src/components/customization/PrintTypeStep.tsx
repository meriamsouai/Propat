import { Card } from "@/components/ui/card";

interface PrintTypeStepProps {
  printType: 'feuilles-imprimees' | 'thermoformed' | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (updates: any) => void;
}

export const PrintTypeStep = ({ printType, onUpdate }: PrintTypeStepProps) => {
  const printTypes = [
    {
      id: 'feuilles-imprimees',
      name: 'Feuilles imprimées',
      ref: 'FPE',
      description: 'Impression directe sur feuilles'
    },
    {
      id: 'thermoformed',
      name: 'Thermoformé',
      ref: 'THE',
      description: 'Moulage par thermoformage'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-primary mb-2 italic">
          Type de production
        </h2>
        <p className="text-muted-foreground italic">
          Choisissez le type de production pour vos plaquettes
        </p>
      </div>

      {/* Print Type Selection */}
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          {printTypes.map((type) => (
            <Card
              key={type.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-md border-2 ${
                printType === type.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onUpdate({ printType: type.id })}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary italic">
                    {type.ref}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-primary italic">
                    {type.name}
                  </h4>
                  <p className="text-sm text-muted-foreground italic mt-1">
                    {type.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

