
export type PropertyDetailType = {
  label?: string;
  icon?: "bed" | "bath" | "villa";
};
export type PropertyType = {
  id: number;
  image: string;
  title: string;
  desc: string;
  details: PropertyDetailType[];
  Price: string;

  descriptionLong?: string;
  gallery?: string[];
  location?: string;
  tags?: string;
  features?: string[];
  additionalFees?: {
    inspection: number;
    insurance: number;
    legalFees: number;
    mortgageFees: number;
    transferTax: number;
  };
  [key: string]: any; 
};

