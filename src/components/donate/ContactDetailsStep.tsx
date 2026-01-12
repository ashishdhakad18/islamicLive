"use client";
import React, { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setStep,
  updateUserDetails,
  saveDonationDraft,
  setValidationErrors,
} from "@/store/slices/donationSlice";
import { donationSchema } from "@/data/donationSchema";
import { DynamicInput } from "@/components/Forms/DynamicInput";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

const ContactDetailsStep = () => {
  const {
    userDetails,
    isLoading,
    isDraftSaved,
    lastSavedAt,
    validationErrors,
  } = useAppSelector((state) => state.donation);
  const dispatch = useAppDispatch();
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty, touchedFields },
    trigger,
  } = useForm({
    defaultValues: userDetails,
    mode: "onBlur", // Only validate when user leaves the field
  });

  const watchedValues = watch();

  // Auto-save functionality
  useEffect(() => {
    if (isDirty && !isLoading) {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }

      autoSaveTimerRef.current = setTimeout(() => {
        dispatch(updateUserDetails(watchedValues));
        dispatch(
          saveDonationDraft({
            userDetails: watchedValues,
            currentStep: "details",
          })
        );
      }, 500); // Auto-save after 2 seconds of inactivity
    }

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [watchedValues, isDirty, isLoading, dispatch]);

  const onFormSubmit = async (data: any) => {
    try {
      dispatch(updateUserDetails(data));
      dispatch(setValidationErrors([]));

      // Save final data
      await dispatch(
        saveDonationDraft({
          userDetails: data,
          currentStep: "review",
        })
      );

      dispatch(setStep("review"));
      // toast.success("Contact details saved successfully!");
    } catch (error: any) {
      // toast.error("Please fix the errors before continuing");
    }
  };

  const handleBack = () => {
    // Save current progress before going back
    dispatch(updateUserDetails(watchedValues));
    dispatch(
      saveDonationDraft({
        userDetails: watchedValues,
        currentStep: "funds",
      })
    );
    dispatch(setStep("funds"));
  };

  const getFieldError = (fieldId: string) => {
    return (
      errors[fieldId]?.message ||
      validationErrors.find((err) => err.field === fieldId)?.message
    );
  };

  // Handler for when user has prefilled data and just wants to continue
  const handleContinueWithPrefill = () => {
    // Save current data and proceed to review
    dispatch(updateUserDetails(userDetails));
    dispatch(
      saveDonationDraft({
        userDetails: userDetails,
        currentStep: "review",
      })
    );
    dispatch(setStep("review"));
  };

  return (
    <div className="flex flex-col mx-auto">
      <div className="mb-2 flex flex-col gap-2 lg:px-12 px-4 md:px-8">
        <h5 className="type-h5 uppercase font-black tracking-tight">
          LOGIN DETAILS
        </h5>

        <p className="md:type-body-2 type-body-4 text-grey-grey">
          Choose how you'd like to contribute
        </p>
      </div>
      <div className="w-full h-[2px] bg-grey-divider" />

      <form
        id="donation-contact-form"
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-8 md:px-8 px-4 lg:px-12 lg:py-6 py-3"
      >
        {donationSchema.map((section) => (
          <div key={section.id} className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {section.fields.map((field) => {
                let widthClass = "w-full";
                if (field.width === "half")
                  widthClass = "md:w-[calc(50%-8px)] w-full";

                return (
                  <div key={field.id} className={cn(widthClass, "grow")}>
                    <DynamicInput
                      field={{
                        ...field,
                      }}
                      register={register}
                      errors={errors}
                      touchedFields={touchedFields}
                      setValue={setValue}
                      watch={watch}
                      showPhoneSelector={false}
                      placeholderOnly={true}
                      inputClassName="border-grey-divider"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default ContactDetailsStep;
