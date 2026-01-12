"use client";

import React, { useState } from "react";
import { FormSchema, FormData } from "@/types/formTypes";
import { DynamicInput } from "./DynamicInput";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";

interface VolunteerFormProps {
  schema: FormSchema;
  onSubmit?: (data: FormData) => void;
}

export default function VolunteerForm({ schema, onSubmit }: VolunteerFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onFormSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <div className="w-full max-w-[615px] bg-white rounded-[12px] p-8 border border-grey-inactive">
      <div className="mb-10 flex flex-col gap-4">
        <h5 className="type-h5 text-grey-black uppercase">
          Pour devenir bénévole
        </h5>
        <p className="type-body-2 text-grey-grey">
          Veuillez remplir le formulaire ci-dessous en prenant soin de bien
          compléter l’ensemble des champs obligatoires.
        </p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-6">
        {schema.map(section => (
          <div key={section.id} className="flex flex-col gap-4">
            {section.title && (
              <p className="type-body-2 text-grey-grey font-bold! pb-2 border-b border-grey-divider">
                {section.title}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              {section.fields.map((field) => {
                let widthClass = "w-full";
                if (field.width === "half") widthClass = "w-[calc(50%-8px)]";
                if (field.width === "third") widthClass = "w-[calc(33.33%-10.6px)]";
                if (field.width === "quarter") widthClass = "w-[calc(25%-12px)]";

                // Validation rules
                let validation: any = { ...field.validation };
                if (field.type === "email") {
                  validation = {
                    ...validation,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Veuillez entrer une adresse email valide",
                    },
                  };
                }
                if (field.id === "confirmEmail") {
                  validation = {
                    ...validation,
                    validate: (value: string) =>
                      value === watch("email")
                      || "Les adresses email ne correspondent pas",
                  };
                }

                return (
                  <div
                    key={field.id}
                    className={`${widthClass} grow min-w-[150px]`}
                  >
                    <DynamicInput
                      field={field}
                      register={register}
                      errors={errors}
                      setValue={setValue}
                      watch={watch}
                      validation={validation}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-2 flex justify-end">
          <Button
            type="submit"
            color="yellow"
            className="w-full h-[38px] md:w-auto px-12 font-bold text-grey-black uppercase"
            rounded
            size="lg"
          >
            S'INSCRIRE
          </Button>
        </div>
      </form>
    </div>
  );
}
