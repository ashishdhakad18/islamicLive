import { FormSchema } from "@/types/formTypes";
import * as yup from "yup";

// Validation schema using Yup
export const donationValidationSchema = yup.object({
  civility: yup.string().required("Civility is required"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Name contains invalid characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must not exceed 200 characters"),
  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters")
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, "City contains invalid characters"),
  country: yup
    .string()
    .required("Country is required")
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must not exceed 50 characters"),
  postalCode: yup
    .string()
    .required("Postal code is required")
    .matches(/^[A-Z0-9\s-]{3,10}$/i, "Please enter a valid postal code"),
});

// Enhanced form schema with validation rules
export const donationSchema: FormSchema = [
  {
    id: "contactDetails",
    title: "CONTACT DETAILS",
    fields: [
      {
        id: "civility",
        label: "Civility",
        type: "select",
        width: "half",
        options: [
          { label: "Mme", value: "mme" },
          { label: "M.", value: "m" },
        ],
        placeholder: "CIVILITY",
        hideLabel: true,
        required: true,
        validation: {
          required: "Please select your civility",
        },
      },
      {
        id: "fullName",
        label: "Full Name",
        type: "text",
        width: "half",
        placeholder: "FULL NAME",
        hideLabel: true,
        required: true,
        validation: {
          required: "Full name is required",
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
          maxLength: {
            value: 50,
            message: "Name must not exceed 50 characters",
          },
          pattern: {
            value: /^[a-zA-ZÀ-ÿ\s'-]+$/,
            message: "Name contains invalid characters",
          },
        },
      },
      {
        id: "email",
        label: "EMAIL",
        type: "email",
        width: "half",
        placeholder: "EMAIL",
        hideLabel: true,
        required: true,
        validation: {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Please enter a valid email address",
          },
          maxLength: {
            value: 100,
            message: "Email must not exceed 100 characters",
          },
        },
      },
      {
        id: "phone",
        label: "Phone No.",
        type: "tel",
        width: "half",
        placeholder: "PHONE NO.",
        hideLabel: true,
        required: true,
        validation: {
          required: "Phone number is required",
          pattern: {
            value: /^[\+]?[1-9][\d]{0,15}$/,
            message: "Please enter a valid phone number",
          },
        },
      },
      {
        id: "address",
        label: "Address",
        type: "text",
        width: "half",
        placeholder: "ADDRESS",
        hideLabel: true,
        required: true,
        validation: {
          required: "Address is required",
          minLength: {
            value: 5,
            message: "Address must be at least 5 characters",
          },
          maxLength: {
            value: 200,
            message: "Address must not exceed 200 characters",
          },
        },
      },
      {
        id: "city",
        label: "City",
        type: "text",
        width: "half",
        placeholder: "CITY",
        hideLabel: true,
        required: true,
        validation: {
          required: "City is required",
          minLength: {
            value: 2,
            message: "City must be at least 2 characters",
          },
          maxLength: {
            value: 50,
            message: "City must not exceed 50 characters",
          },
          pattern: {
            value: /^[a-zA-ZÀ-ÿ\s'-]+$/,
            message: "City contains invalid characters",
          },
        },
      },
      {
        id: "country",
        label: "Country",
        type: "text",
        width: "half",
        placeholder: "COUNTRY",
        hideLabel: true,
        required: true,
        options: [
          { label: "Switzerland", value: "CH" },
          { label: "France", value: "FR" },
          { label: "Germany", value: "DE" },
          { label: "Italy", value: "IT" },
          { label: "Austria", value: "AT" },
          { label: "Other", value: "OTHER" },
        ],
        validation: {
          required: "Please select your country",
        },
      },
      {
        id: "postalCode",
        label: "Postal Code",
        type: "text",
        width: "half",
        placeholder: "POSTAL CODE",
        hideLabel: true,
        required: true,
        validation: {
          required: "Postal code is required",
          pattern: {
            value: /^[A-Z0-9\s-]{3,10}$/i,
            message: "Please enter a valid postal code",
          },
        },
      },
    ],
  },
];

// Validation helper functions
export const validateDonationAmount = (
  amount: number | string
): string | null => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount) || numAmount <= 0) {
    return "Please enter a valid donation amount";
  }

  if (numAmount < 5) {
    return "Minimum donation amount is CHF 5";
  }

  if (numAmount > 50000) {
    return "Maximum donation amount is CHF 50,000";
  }

  return null;
};

export const validateStep = (step: string, data: any): string[] => {
  const errors: string[] = [];

  switch (step) {
    case "frequency":
      if (!data.frequency) {
        errors.push("Please select a donation frequency");
      }
      break;

    case "funds":
      if (!data.cartItems || data.cartItems.length === 0) {
        errors.push("Please select at least one cause to donate to");
      }
      break;

    case "details":
      try {
        donationValidationSchema.validateSync(data.userDetails, {
          abortEarly: false,
        });
      } catch (validationError: any) {
        errors.push(...validationError.errors);
      }
      break;

    case "review":
      if (!data.paymentMethod) {
        errors.push("Please select a payment method");
      }
      break;
  }

  return errors;
};
