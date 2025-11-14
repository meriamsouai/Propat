// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateReference = (data: any, currentStep: number): string => {
  let reference = '';
  
  // 1. Type de production (FPE or THE)
  if (data.printType) {
    const printCode = data.printType === 'feuilles-imprimees' ? 'FPE' : 'THE';
    reference += printCode;
  }
  
  // 2. Shape (GOV, R70, ETQ1, etc.)
  if (data.shape) {
    const shapeCode = getShapeCode(data.shape.category, data.shape.name);
    reference += shapeCode;
  }
  
  // 3. Color code (1OR, 2OB, etc.)
  if (data.colorSelection && data.colorSelection.colors.length > 0) {
    const colorCode = getColorSelectionCode(data.colorSelection);
    reference += colorCode;
  }
  
  // 4. Chocolate type (PGN, PGB, CTN, CTB, CVN, CVB, VID)
  if (data.chocolateBase && data.chocolateColor) {
    const chocolateCode = getChocolateCode(data.chocolateBase, data.chocolateColor);
    reference += chocolateCode;
  } else if (data.chocolateBase === 'sans-chocolat') {
    reference += 'VID';
  }
  
  // 5. Client code (3 first letters of company name or name)
  if (data.customerInfo) {
    const clientCode = getClientCode(data.customerInfo);
    if (clientCode) {
      reference += clientCode;
    }
  }
  
  // 6. Random 3-digit number (only at final step)
  if (currentStep >= 5) {
    const randomNumber = Math.floor(100 + Math.random() * 900); // 3-digit random number (100-999)
    reference += randomNumber.toString();
  }
  
  return reference;
};

const getShapeCode = (category: string, name: string): string => {
  // For special shapes, use the name directly (e.g., ETQ1, COE1, etc.)
  // For regular shapes, we need to check the shape name
  // If it's a special shape name (uppercase with numbers), use it as is
  if (name && name.match(/^[A-Z]{3}\d+$/)) {
    return name;
  }
  
  // For regular shapes, generate code from category and dimensions
  const shapeMapping: { [key: string]: string } = {
    'ovales': 'OVA',
    'carres': 'CAR', 
    'rectangles': 'REC',
    'rondes': 'RON'
  };
  
  const categoryLower = category?.toLowerCase() || '';
  if (shapeMapping[categoryLower]) {
    return shapeMapping[categoryLower];
  }
  
  // For speciale shapes, take first 3 letters of the name
  if (categoryLower === 'speciale' && name) {
    return name.substring(0, 3).toUpperCase();
  }
  
  // Default: use first 3 letters of name
  return name ? name.substring(0, 3).toUpperCase() : '';
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
  if (!colorSelection || !colorSelection.colors || colorSelection.colors.length === 0) {
    return '';
  }
  
  const colorCount = colorSelection.colors.length;
  const colors = colorSelection.colors;
  
  // Color abbreviations mapping
  const colorMap: { [key: string]: string } = {
    'OR': 'OR',
    'BL': 'BL',
    'RG': 'RG',
    'NR': 'NR',
    'BZ': 'BZ',
    'AG': 'AG',
    'VR': 'VR',
    'RZ': 'RZ',
    'JN': 'JN'
  };
  
  if (colorCount === 1) {
    // Single color: 1OR, 1BL, etc.
    const colorAbbr = colorMap[colors[0]] || colors[0];
    return `1${colorAbbr}`;
  } else if (colorCount === 2) {
    // Two colors: 2OB (OR/BLANC), 2OR (OR/ROUGE), etc.
    const color1 = colors[0];
    const color2 = colors[1];
    
    // Two-color combinations mapping based on user's examples
    const twoColorMap: { [key: string]: string } = {
      'ORBL': 'OB',   // OR/BLANC
      'ORRG': 'OR',   // OR/ROUGE
      'NRVR': 'NV',   // NOIR/VERT
      'RGVR': 'RV',   // ROUGE/VERT
      'BLRG': 'RB',   // BLANC/ROUGE
      'NRRG': 'NR',   // NOIR/ROUGE
      'BZVR': 'BV',   // BRONZE/VERT
      'BLRZ': 'BR',   // BLANC/ROSE
      'RZVR': 'VR',   // VIOLET/ROSE (assuming RZ is rose/violet)
      'BLOR': 'BO',   // BLEU/OR (assuming BL could be blue)
      'RZOR': 'RO'    // ROSE/OR
    };
    
    // Try both orders
    const combination1 = `${color1}${color2}`;
    const combination2 = `${color2}${color1}`;
    
    if (twoColorMap[combination1]) {
      return `2${twoColorMap[combination1]}`;
    } else if (twoColorMap[combination2]) {
      return `2${twoColorMap[combination2]}`;
    } else {
      // Default: use first letter of each color abbreviation
      const abbr1 = (colorMap[color1] || color1).substring(0, 1);
      const abbr2 = (colorMap[color2] || color2).substring(0, 1);
      return `2${abbr1}${abbr2}`;
    }
  }
  
  return '';
};

const getClientCode = (customerInfo: any): string => {
  // Try to get company name first (if available), otherwise use name
  // Since we removed raisonSociale, we'll use nom (last name)
  if (customerInfo.nom) {
    return customerInfo.nom.substring(0, 3).toUpperCase();
  }
  
  return '';
};

// Company code generator with conflict resolution (kept for backward compatibility)
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
