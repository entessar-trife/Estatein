import { useState } from "react";
import type { CustomFormData } from "../types/Form";

type FormErrors = Partial<Record<keyof CustomFormData | "agreed", string>>;

export function useFormHandler(initialValues?: Partial<CustomFormData>) {
  const [formData, setFormData] = useState<CustomFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    preferredContact: "phone",
    inquiryType: "",
    hearAboutUs: "",
    ...initialValues,
  });

  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, preferredContact: value }));
    setErrors((prev) => ({
      ...prev,
      preferredContact: undefined,
      email: undefined,
      phone: undefined,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const requiredFields: (keyof CustomFormData)[] = ["firstName", "lastName"];
    requiredFields.forEach((key) => {
      if (!formData[key]) {
        const label = key
          .replace(/([a-z])([A-Z])/g, "$1 $2") 
          .replace(/^./, (str) => str.toUpperCase()); 

        newErrors[key] = `${label} is required`;
      }
    });

    if (!formData.preferredContact) {
      newErrors.preferredContact = "Please select a preferred contact method";
    } else {
      if (formData.preferredContact === "email" && !formData.email) {
        newErrors.email = "Email is required";
      }
      if (formData.preferredContact === "phone" && !formData.phone) {
        newErrors.phone = "Phone is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (
    onSubmit?: (data: CustomFormData) => void | Promise<void>
  ) => {
    return async () => {
      if (!agreed) {
        setErrors((prev) => ({
          ...prev,
          agreed: "You must agree to the terms",
        }));
        return false;
      }

      if (!validateForm()) {
        return false;
      }

      await onSubmit?.(formData); 
      return true;
    };
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      preferredContact: "phone",
      inquiryType: "",
      hearAboutUs: "",
      ...initialValues,
    });
    setAgreed(false);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleRadioChange,
    handleSubmit,
    resetForm,
    agreed,
    setAgreed,
    errors,
  };
}
