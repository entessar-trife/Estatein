import type React from "react"

export type InputProps = {
  label: string
  name: string
  value?: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  className?: string
}

export type SelectProps = {
  label?: string
  name: string
  value: string
  error?: string
  placeholder?: string
  onChange: (value: string) => void 
  options: string[]
  classExtra?: string
  classNameCustom?: string
  classIcon?: string
  children?: React.ReactNode
}


export type TextareaProps = {
  label: string
  name: string
  value?: string
  error?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export type CheckboxProps = {
  label: string
  checked: boolean
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type CustomFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  inquiryType?: string
  hearAboutUs?: string
  selectedProperty?: string
  location?: string
  propertyType?: string
  bathrooms?: string
  bedrooms?: string
  budget?: string
  message: string
  preferredContact?: string
}

export type ContactMethod = {
   type: "email" | "tel";
   name: keyof CustomFormData;
   placeholder: string;
   icon: React.ComponentType<any>;
 };
 
export type SelectField = {
  label: string;
  name: keyof CustomFormData; 
  placeholder: string;
  options: string[];
  classNameWrapper?: string;
};

export type FormType = "inquiry" | "property" | "contact";


