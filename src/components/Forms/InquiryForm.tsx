import { useState } from "react";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";
import { useFormHandler } from "../../hooks/useFormHandler";
import SharedFields from "./SharedFields";
import FormTextarea from "./FormTextarea";
import { LocationIcon } from "../icons/FormIcons";
import MainButton from "../ui/MainButton";
import PreferredContactMethod from "./PreferredContactMethod";
import AlertMessage from "../ui/AlertMessage";
import type { CustomFormData } from "../../types/Form";
import { ref, push, serverTimestamp } from "firebase/database";
import { db } from "../../firebaseConfig";
import { selectFields, contactMethods } from "../../config/formConfig";
import { useAppSelector } from "../../redux/hooks";
import { shallowEqual } from "react-redux";

type InquiryFormProps = {
  type: "inquiry" | "contact" | "property";
  propertyTitle?: string;
  propertyLocation?: string;
};

function InquiryForm({
  type,
  propertyTitle,
  propertyLocation,
}: InquiryFormProps) {
  const {
    formData,
    handleChange,
    handleSubmit,
    resetForm,
    agreed,
    setAgreed,
    handleRadioChange,
    errors,
  } = useFormHandler({
    firstName: "",
    lastName: "",
    location: "",
    propertyType: "",
    bathrooms: "",
    bedrooms: "",
    budget: "",
    preferredContact: "phone",
    email: "",
    phone: "",
    inquiryType: "",
    hearAboutUs: "",
    message: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const { current } = useAppSelector(
        (state) => ({
          current: state.properties.current,
          error: state.properties.error,
          loading: state.properties.loading,
        }),
        shallowEqual
      );
    
  const formPadding =
    type === "property"
      ? "p-5 lg-custom:p-[40px] 2xl:p-[50px] gap-[30px] lg-custom:gap-[40px] 2xl:!gap-[50px]"
      : type === "contact"
      ? "p-5 lg-custom:p-[80px] 2xl:p-[100px] mt-10 xl:mt-[60px] 2xl:mt-[80px] gap-10 lg-custom:gap-[60px] 2xl:gap-[50px]"
      : "p-5 xl:p-[50px] 2xl:p-[100px] mt-10 xl:mt-[60px] 2xl:mt-[80px] gap-[30px] 2xl:!gap-[50px]";

  const gridClass =
    type === "property"
      ? "grid p-0 m-0 grid-cols-1 lg:grid-cols-2 gap-x-[30px] gap-y-[20px]"
      : type === "contact"
      ? "grid p-0 m-0 grid-cols-1 md:grid-cols-3 gap-[20px] md:gap-[30px] 2xl:gap-[50px]"
      : "grid p-0 m-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] 2xl:gap-[50px]";

  const onSubmit = async (data: CustomFormData) => {
    if(propertyTitle != null){
      data.location = current.location;
      data.bathrooms = current.bathrooms;
      data.bedrooms = current.bedrooms;
      data.propertyType = current.type;
      data.budget = current.price;
    }
    const payload = { ...data, type, createdAt: serverTimestamp(), agreed };
    try {
      await push(ref(db, `forms/${type}`), payload);
      await push(ref(db, "notifications"), {
        name: `${data.firstName || ""} ${data.lastName || ""}`.trim() || undefined,
        email: data.email || undefined,
        message: (data.message || data.inquiryType || "").toString().trim(),
        formType: type,
        createdAt: Date.now(),
      });

      setShowAlert(true);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {showAlert && (
        <AlertMessage
          message="All set! Your message is in good hands."
          onClose={() => setShowAlert(false)}
        />
      )}
      <form
        className={`${formPadding} flex flex-col w-full ${
          type === "property" ? "rounded-[10px] 2xl:rounded-xl" : "rounded-xl"
        } border border-white90 dark:border-gray15 relative`}
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit(onSubmit)();
        }}
      >
        <div className={gridClass}>
          <SharedFields
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />

          {/* Render selects dynamically */}
          {selectFields[type]?.map((field) => (
            <div key={field.name} className={field.classNameWrapper || ""}>
              <FormSelect
                label={field.label}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name as keyof CustomFormData] || ""}
                onChange={(val) =>
                  handleChange({
                    target: { name: field.name, value: val },
                  } as any)
                }
                options={field.options}
                error={errors[field.name as keyof CustomFormData] || ""}
                classExtra="bg-white97 dark:bg-gray10 rounded-md 2xl:rounded-lg"
                classNameCustom="py-4 pl-5 pr-10 2xl:py-6 2xl:pr-11 text-gray60/60 dark:text-gray40/60 [@media(min-width:1690px)]:text-lg [@media(min-width:1530px)]:text-[15px] text-sm/[20px]"
                classIcon="right-5"
              />
            </div>
          ))}

          {/* Preferred cntact method (only for inquiry type) */}
          {type === "inquiry" && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2 p-0 m-0 flex flex-col justify-between relative">
              <label className="2xl:mb-4 lg-custom:mb-3.5 mb-2.5 2xl:text-xl text-base/[1.5] text-black dark:text-white font-semibold">
                Preferred Contact Method
              </label>
              <div className="flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:justify-between md:space-x-4 md:space-y-0">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <PreferredContactMethod
                      key={method.name}
                      icon={
                        <Icon
                          className="absolute 2xl:left-6 left-5 top-1/2 
                               2xl:h-6 2xl:w-6 h-5 w-5 
                               -translate-y-1/2 text-black dark:text-white 
                               pointer-events-none group-hover:text-purple60"
                        />
                      }
                      type={method.type as "email" | "tel"}
                      name={method.name as "email" | "phone"}
                      value={
                        formData[method.name as keyof CustomFormData] || ""
                      }
                      placeholder={method.placeholder}
                      onChange={handleChange}
                      onRadioChange={handleRadioChange}
                      checked={formData.preferredContact === method.name}
                    />
                  );
                })}
              </div>

              {errors.preferredContact && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.preferredContact}
                </p>
              )}

              {["phone", "email"].map(
                (field) =>
                  errors[field as keyof CustomFormData] && (
                    <p
                      key={field}
                      className="absolute left-0 top-full mt-1 text-sm text-red-500"
                    >
                      {errors[field as keyof CustomFormData]}
                    </p>
                  )
              )}
            </div>
          )}

          {/* Property preview */}
          {type === "property" && (
            <div className="col-span-full p-0 m-0 flex flex-col justify-between">
              <label className="mb-2.5 lg-custom:mb-3.5 2xl:mb-4 2xl:text-xl text-base/[1.5] text-black dark:text-white font-semibold">
                Selected Property
              </label>
              <div className="flex justify-between rounded-lg border-1 border-white90 bg-white97 2xl:px-5 2xl:py-6 px-5 py-4 2xl:text-xl/[20px] text-sm/[20px] font-medium text-gray15 dark:border-gray15 dark:bg-gray10 dark:text-white90">
                {propertyTitle}, {propertyLocation}
                <LocationIcon className="text-black dark:text-white w-[18px] h-[18px] lg-custom:w-5 lg-custom:h-5 2xl:w-6 2xl:h-6" />
              </div>
            </div>
          )}

          <FormTextarea
            label="Message"
            name="message"
            className="col-span-full p-0 m-0"
            value={formData.message || ""}
            onChange={handleChange}
            error={errors.message}
          />
        </div>

        {/* Footer */}
        <div className="p-0 m-0 gap-5 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="p-0 m-0 flex flex-col relative">
            <FormCheckbox
              label={`I agree with <a href="/under-process" class="underline">Terms of Use</a> and <a href="/under-process" class="underline">Privacy Policy</a>`}
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            {errors.agreed && (
              <p className="absolute left-0 top-full mt-1 text-sm text-red-500">
                {errors.agreed}
              </p>
            )}
          </div>
          <MainButton
            variant="normalPurple"
            className="normalPurple 2xl:py-4.5 2xl:px-11.5 py-3.5 px-8.5 rounded-md 2xl:rounded-lg 2xl:text-lg text-sm"
            type="submit"
          >
            Send Your Message
          </MainButton>
        </div>
      </form>
    </>
  );
}

export default InquiryForm;
