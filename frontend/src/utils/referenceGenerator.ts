// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateReference = (data: any, currentStep: number): string => {
  let reference = 'REF-';
  
  // Add chocolate type + color
  if (data.chocolateBase && data.chocolateColor) {
    const chocolateCode = getChocolateCode(data.chocolateBase, data.chocolateColor);
    reference += `${chocolateCode}-`;
  } else if (data.chocolateBase === 'sans-chocolat') {
    reference += 'VID-';
  }
  
  // Add shape info
  if (data.shape) {
    const shapeCode = getShapeCode(data.shape.category, data.shape.name);
    reference += `${shapeCode}-`;
    
    if (data.shape.dimensions) {
      // Remove 'cm' from dimensions
      const dimensions = data.shape.dimensions.replace(/cm/g, '');
      reference += `${dimensions}-`;
    }
  }
  
  // Add box count based on quantity
  if (data.quantity) {
    const boxCount = Math.ceil(data.quantity / 15); // 15 sheets per box
    reference += `${boxCount}B-`;
  }
  
  // Add color selection
  if (data.colorSelection && data.colorSelection.colors.length > 0) {
    const colorCode = getColorSelectionCode(data.colorSelection);
    reference += `${colorCode}-`;
  }
  
  // Add text type
  if (data.textType === 'text') {
    reference += 'T-';
  } else if (data.textType === 'logo') {
    reference += 'L-';
  }
  
  // Add print type
  if (data.printType) {
    const printCode = data.printType === 'feuilles-imprimees' ? 'FPE' : 'THE';
    reference += `${printCode}-`;
  }
  
  // Add company name (first 3 letters)
  if (data.customerInfo && data.customerInfo.raisonSociale) {
    const companyCode = getCompanyCode(data.customerInfo.raisonSociale);
    reference += `${companyCode}-`;
  }
  
  // Add timestamp only at the final step (when order is complete)
  if (currentStep >= 5) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    reference += randomNumber;
  }
  
  return reference;
};

const getShapeCode = (category: string, name: string): string => {
  const shapeMapping: { [key: string]: string } = {
    'ovales': 'OVA',
    'carres': 'CAR', 
    'rectangles': 'REC',
    'rondes': 'RON'
  };
  
  const categoryLower = category.toLowerCase();
  if (shapeMapping[categoryLower]) {
    return shapeMapping[categoryLower];
  }
  
  // For speciale shapes, take first 3 letters of the name
  if (categoryLower === 'speciale') {
    return name.substring(0, 3).toUpperCase();
  }
  
  // For other shapes, take first 3 letters of the name
  return name.substring(0, 3).toUpperCase();
};

const getChocolateCode = (base: string, color: string): string => {
  const baseMap: { [key: string]: string } = {
    'pate-a-glasse': 'PG',
    'couverture': 'CT',
    'valrhona': 'CV'
  };
  
  const colorMap: { [key: string]: string } = {
    'blanc': 'B',
    'noir': 'N'
  };
  
  return `${baseMap[base]}${colorMap[color]}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getColorSelectionCode = (colorSelection: any): string => {
  const colorCount = colorSelection.colors.length;
  const prefix = colorCount.toString();
  const colorString = colorSelection.colors.join('');
  return `${prefix}${colorString}`;
};

// Company code generator with conflict resolution
const usedCompanyCodes = new Set<string>();

export const getCompanyCode = (companyName: string): string => {
  let baseCode = companyName.substring(0, 3).toUpperCase();
  
  // If this code is already used, try with 4 letters
  if (usedCompanyCodes.has(baseCode) && companyName.length > 3) {
    baseCode = companyName.substring(0, 4).toUpperCase();
  }
  
  usedCompanyCodes.add(baseCode);
  return baseCode;
};
