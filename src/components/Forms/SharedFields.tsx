import FormInput from "./FormInput";
import type { CustomFormData } from "../../types/Form";

type Props = {
  formData: CustomFormData;
  errors: Partial<Record<keyof CustomFormData, string>>; 
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

function SharedFields({ formData, handleChange, errors }: Props) {
  return (
    <>
      <FormInput
        label="First Name"
        name="firstName"
        placeholder="Enter First Name"
        value={formData.firstName || ""}
        onChange={handleChange}
        error={errors.firstName}
      />
      <FormInput
        label="Last Name"
        name="lastName"
        placeholder="Enter Last Name"
        value={formData.lastName || ""}
        onChange={handleChange}
        error={errors.lastName} 
      />
      <FormInput
        label="Email"
        name="email"
        placeholder="Enter your Email"
        value={formData.email || ""}
        onChange={handleChange}
        error={errors.email}
        type="email"
      />
      <FormInput
        label="Phone"
        name="phone"
        placeholder="Enter Phone Number"
        value={formData.phone || ""}
        onChange={handleChange}
        error={errors.phone}
        type="tel"
      />
    </>
  );
}

export default SharedFields;
