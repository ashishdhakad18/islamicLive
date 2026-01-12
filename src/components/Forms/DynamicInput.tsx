import { FormField } from "@/types/formTypes";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

interface DynamicInputProps {
  field: FormField;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  touchedFields?: Partial<Record<string, boolean>>; // Track which fields have been touched
  setValue: (name: string, value: any) => void;
  watch: (name: string) => any;
  validation?: any;
  placeholderOnly?: boolean; // Hide labels and use simpler styling
  inputClassName?: string; // Custom className for input elements
  showPhoneSelector?: boolean; // Show country code selector for tel inputs (default: true)
}

const COUNTRY_CODES = [
  { code: "+33", label: "France (+33)" },
  { code: "+41", label: "Switzerland (+41)" },
  { code: "+32", label: "Belgium (+32)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+39", label: "Italy (+39)" },
  { code: "+34", label: "Spain (+34)" },
  { code: "+351", label: "Portugal (+351)" },
  { code: "+1", label: "USA/Canada (+1)" },
  { code: "+212", label: "Morocco (+212)" },
  { code: "+213", label: "Algeria (+213)" },
  { code: "+216", label: "Tunisia (+216)" },
  { code: "+221", label: "Senegal (+221)" },
  { code: "+225", label: "Ivory Coast (+225)" },
  { code: "+237", label: "Cameroon (+237)" },
  { code: "+20", label: "Egypt (+20)" },
  { code: "+90", label: "Turkey (+90)" },
  { code: "+961", label: "Lebanon (+961)" },
  { code: "+962", label: "Jordan (+962)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+966", label: "Saudi Arabia (+966)" },
].sort((a, b) => a.label.localeCompare(b.label));

export const DynamicInput: React.FC<DynamicInputProps> = ({
  field,
  register,
  errors,
  touchedFields,
  setValue,
  watch,
  validation,
  placeholderOnly = false,
  inputClassName,
  showPhoneSelector = true,
}) => {
  // Only show error if field has been touched (user interacted and left the field)
  const isTouched = touchedFields?.[field.id] ?? false;
  const error = isTouched
    ? (errors[field.id]?.message as string | undefined)
    : undefined;
  // const error = errors[field.id]?.message as string | undefined;
  const value = watch(field.id);

  const baseInputClass = placeholderOnly
    ? `w-full px-4 py-3 border rounded-[4px] bg-grey-bg-dark type-btn-2 placeholder:text-grey-grey placeholder:font-bold text-grey-black focus:outline-none focus:ring-1 h-[48px] transition-all ${
        error
          ? "border-red ring-1 ring-red focus:ring-red"
          : "border-transparent focus:border-primary focus:ring-primary"
      }`
    : `w-full px-4 py-2 border rounded-[4px] bg-grey-bg-dark type-btn-2 placeholder:h-[16px] font-bold! text-grey-grey focus:outline-none focus:ring-1 h-[36px] transition-all normal-case! ${
        error
          ? "border-red ring-1 ring-red focus:ring-red"
          : "border-transparent focus:border-primary focus:ring-primary"
      }`;

  const renderInput = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "date":
        return (
          <input
            type={field.type}
            placeholder={placeholderOnly ? field.label : field.placeholder}
            className={cn(`${baseInputClass} block`, inputClassName)}
            {...register(field.id, {
              required: field.required ? "Ce champ est obligatoire" : false,
              ...validation,
            })}
            onClick={(e) => {
              if (field.type === "date") {
                try {
                  (e.target as any).showPicker();
                } catch (err) {}
              }
            }}
          />
        );

      case "tel":
        // If showPhoneSelector is false, render as simple number input
        if (!showPhoneSelector) {
          return (
            <input
              type="tel"
              placeholder={placeholderOnly ? field.label : field.placeholder}
              className={cn(`${baseInputClass} block`, inputClassName)}
              {...register(field.id, {
                required: field.required ? "Ce champ est obligatoire" : false,
                ...validation,
              })}
            />
          );
        }

        // Default: render with country code selector
        return (
          <div className="flex w-full gap-4">
            <div className="relative w-[150px] shrink-0">
              <select
                className={cn(
                  `${baseInputClass} appearance-none cursor-pointer pr-8 text-grey-grey`,
                  inputClassName
                )}
                {...register(`${field.id}_code`)}
                defaultValue="+33"
              >
                {COUNTRY_CODES.map((c) => (
                  <option
                    key={`${c.code}-${c.label}`}
                    value={c.code}
                    className="text-grey-grey!"
                  >
                    {c.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="#62636C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <input
              type="tel"
              placeholder={placeholderOnly ? field.label : field.placeholder}
              className={cn(`${baseInputClass} flex-1`, inputClassName)}
              {...register(field.id, {
                required: field.required ? "Ce champ est obligatoire" : false,
                ...validation,
              })}
            />
          </div>
        );

      case "textarea":
        return (
          <textarea
            placeholder={placeholderOnly ? field.label : field.placeholder}
            className={cn(
              `${baseInputClass} h-32! py-3 resize-none`,
              inputClassName
            )}
            {...register(field.id, {
              required: field.required ? "Ce champ est obligatoire" : false,
              ...validation,
            })}
          />
        );

      case "select":
        return (
          <div className="relative">
            <select
              className={cn(
                `${baseInputClass} appearance-none cursor-pointer pr-8`,
                inputClassName
              )}
              defaultValue={field.label}
              {...register(field.id, {
                required: field.required ? "Ce champ est obligatoire" : false,
                ...validation,
              })}
            >
              <option value="" disabled>
                {placeholderOnly
                  ? field.label
                  : field.placeholder || "Select an option"}
              </option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="#62636C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        );

      case "radio":
        return (
          <div className="flex flex-row gap-8 items-center">
            {field.options?.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center w-[20px] h-[20px] rounded-full border border-grey-grey bg-grey-bg-dark transition-colors">
                  <input
                    type="radio"
                    value={option.value}
                    {...register(field.id, {
                      required: field.required
                        ? "Ce champ est obligatoire"
                        : false,
                      ...validation,
                    })}
                    className="appearance-none w-full h-full rounded-full cursor-pointer absolute inset-0 z-10"
                  />
                  {value === option.value && (
                    <div className="w-[10px] h-[10px] rounded-full border border-grey-grey" />
                  )}
                </div>
                <span className="type-body-4 text-grey-grey">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        const isGrid = (field.options?.length || 0) > 4;

        return (
          <div
            className={`grid ${
              isGrid ? "grid-cols-2 md:grid-cols-3" : "flex flex-col"
            } gap-x-8 gap-y-4`}
          >
            {field.options?.map((option) => {
              const isChecked = Array.isArray(value)
                ? value.includes(option.value)
                : value === option.value;

              return (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="relative flex items-center justify-center w-4 h-4 rounded-[4px] border border-[rgba(0,0,0,0.1)] bg-grey-bg-dark shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                    <input
                      type="checkbox"
                      value={option.value}
                      {...register(field.id, {
                        required: field.required
                          ? "Ce champ est obligatoire"
                          : false,
                        ...validation,
                      })}
                      className="appearance-none w-full h-full cursor-pointer absolute inset-0 z-10"
                    />
                    {isChecked && (
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="pointer-events-none relative z-0"
                      >
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="#62636C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="type-body-4 text-grey-grey">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex flex-col gap-1">
        {!field.hideLabel && (
          <label className="type-body-2 font-bold! text-grey-grey border-b border-grey-divider pb-2 mb-2 uppercase">
            {field.label}
          </label>
        )}
        {field.helpText && (
          <p className="type-body-4 text-grey-grey">{field.helpText}</p>
        )}
      </div>
      {renderInput()}
      {error && <p className="text-red type-body-4">{error}</p>}
    </div>
  );
};
