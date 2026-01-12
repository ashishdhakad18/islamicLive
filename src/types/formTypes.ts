export type FormFieldType =
  | "text"
  | "number"
  | "email"
  | "select"
  | "radio"
  | "checkbox"
  | "textarea"
  | "date"
  | "tel";

export interface FormOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  options?: FormOption[]; // For select, radio, checkbox
  required?: boolean;
  helpText?: string; // For additional instructions below label
  hideLabel?: boolean; // If true, label is hidden visually (used for placeholder-only fields)
  validation?: {
    pattern?: {
      value: RegExp;
      message: string;
    };
    min?: {
      value: number | string;
      message: string;
    };
    max?: {
      value: number | string;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    validate?: (value: any) => boolean | string | Promise<boolean | string>;
    required?: string | boolean;
  };
  width?: "full" | "half" | "third" | "quarter"; // For layout control
  hidden?: boolean;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export type FormSchema = FormSection[];

export interface FormData {
  [key: string]: string | number | boolean | string[];
}
