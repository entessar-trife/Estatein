// src/config/formConfig.ts

import { PhoneIcon, EmailIcon } from "../components/icons/FormIcons";
import type { FormType, ContactMethod, SelectField } from "../types/Form";




export const selectFields:Record<FormType, SelectField[]> = {
  contact: [
    {
      label: "Inquiry Type",
      name: "inquiryType",
      placeholder: "Select Inquiry Type",
      options: ["General", "Support"],
    },
    {
      label: "How Did You Hear About Us?",
      name: "hearAboutUs",
      placeholder: "Select",
      options: ["Friend", "Social Media", "Search Engine"],
    },
  ],
  inquiry: [
    {
      label: "Preferred Location",
      name: "location",
      placeholder: "Select Location",
      options: ["London", "Paris", "New York"],
    },
    {
      label: "Property Type",
      name: "propertyType",
      placeholder: "Select Property Type",
      options: ["Villa", "Apartment", "Studio"],
    },
    {
      label: "No. of Bathrooms",
      name: "bathrooms",
      placeholder: "Select no. of Bathrooms",
      options: ["1", "2", "3+"],
    },
    {
      label: "No. of Bedrooms",
      name: "bedrooms",
      placeholder: "Select no. of Bedrooms",
      options: ["1", "2", "3+"],
    },
    {
      label: "Budget",
      name: "budget",
      placeholder: "Select Budget",
      options: ["<1000", "1000-2000", ">2000"],
      classNameWrapper:
        "col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2 p-0 m-0",
    },
  ],
  property: [], 
};

export const contactMethods: ContactMethod[] = [
  {
    type: "tel",
    name: "phone",
    placeholder: "Enter Your Number",
    icon: PhoneIcon, 
  },
  {
    type: "email",
    name: "email",
    placeholder: "Enter Your Email",
    icon: EmailIcon,
  },
];
