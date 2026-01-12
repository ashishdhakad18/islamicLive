import { FormSchema } from "@/types/formTypes";

export const volunteerFormSchema: FormSchema = [
  {
    id: "coordinates",
    title: "Vos coordonnées",
    fields: [
      {
        id: "civility",
        label: "MME, M",
        type: "select",
        width: "quarter",
        options: [
          { label: "Mme", value: "mme" },
          { label: "M.", value: "m" },
        ],
        placeholder: "MME, M",
        hideLabel: true,
        required: true,
      },
      {
        id: "firstName",
        label: "PRÉNOM",
        type: "text",
        width: "third",
        placeholder: "PRÉNOM",
        hideLabel: true,
        required: true,
      },
      {
        id: "lastName",
        label: "NOM",
        type: "text",
        width: "third",
        placeholder: "NOM",
        hideLabel: true,
        required: true,
      },
      {
        id: "dob",
        label: "DATE DE NAISSANCE (DD/MM/YYYY)",
        type: "date", // Using text to allow the specific placeholder format or date if browser support preferred. Figma shows text-like.
        // If we use 'date', placeholder often doesn't show in standard browsers until focused or not at all.
        // Let's stick to text for visual match or 'date'. User said "I see you have misjudged some fields to be labels like date".
        // Use placeholder for the label text.
        width: "full",
        placeholder: "DATE DE NAISSANCE (DD/MM/YYYY)",
        hideLabel: true,
        required: true,
      },
      {
        id: "email",
        label: "EMAIL",
        type: "email",
        width: "half",
        placeholder: "EMAIL",
        hideLabel: true,
        required: true,
      },
      {
        id: "confirmEmail",
        label: "CONFIRMEZ VOTRE EMAIL",
        type: "email",
        width: "half",
        placeholder: "CONFIRMEZ VOTRE EMAIL",
        hideLabel: true,
        required: true,
      },

      {
        id: "phone",
        label: "06 12 34 56 78",
        placeholder: "06 12 34 56 78",
        type: "tel",
        width: "full",
        hideLabel: true,
        required: true,
        validation: {
          pattern: {
            value: /^[0-9\s.-]{8,15}$/,
            message: "Format de numéro de téléphone invalide",
          },
        },
      },
    ],
  },
  {
    id: "about",
    title: "À propos de vous",
    fields: [
      {
        id: "postalCode",
        label: "CODE POSTAL",
        type: "text",
        width: "quarter",
        placeholder: "CODE POSTAL",
        hideLabel: true,
        required: true,
        validation: {
          pattern: {
            value: /^[0-9]{4,10}$/,
            message: "Code postal invalide",
          },
        },
      },
      {
        id: "city",
        label: "VILLE",
        type: "text",
        width: "third",
        placeholder: "VILLE",
        hideLabel: true,
        required: true,
      },
      {
        id: "country",
        label: "PAYS",
        type: "text",
        width: "third",
        placeholder: "PAYS",
        hideLabel: true,
        required: true,
      },
    ],
  },
  {
    id: "languages",
    title: "Langues MAITRISées",
    fields: [
      {
        id: "languages",
        label: "Langues",
        type: "checkbox",
        width: "full",
        hideLabel: true, // Title serves as label
        options: [
          { label: "Français", value: "fr" },
          { label: "Allemand", value: "de" },
          { label: "Anglais", value: "en" },
          { label: "Italien", value: "it" },
          { label: "Albanais", value: "sq" },
          { label: "Turc", value: "tr" },
          { label: "Bosniaque", value: "bs" },
          { label: "Arabe", value: "ar" },
          { label: "Autres", value: "other" },
        ],
      },
    ],
  },
  {
    id: "regular_activities",
    title: "", // No section title, just field label
    fields: [
      {
        id: "regularActivities",
        label: "Souhaitez-vous des activités régulières ?",
        type: "radio",
        helpText: "Exemple: Saisi informatique, Mise sous-pli, Traitement Informatique, Traduction.",
        width: "full",
        options: [
          { label: "Oui", value: "yes" },
          { label: "Non", value: "no" },
        ],
      },
    ],
  },
  {
    id: "punctual_activities",
    title: "",
    fields: [
      {
        id: "punctualActivities",
        label: "Souhaitez-vous des activités ponctuelles ?",
        type: "radio",
        helpText: "Exemples : Distribution flyers, Relais digital, Evénement, Groupe de projet, Fundraising",
        width: "full",
        options: [
          { label: "Oui", value: "yes" },
          { label: "Non", value: "no" },
        ],
      },
    ],
  },
  {
    id: "availability_section",
    title: "",
    fields: [
      {
        id: "availability",
        label: "Vos préférences de disponibilité",
        type: "radio",
        width: "full",
        options: [
          { label: "En semaine", value: "week" },
          { label: "Le week-end", value: "weekend" },
          { label: "Sans préférence", value: "any" },
        ],
      },
    ],
  },
  {
    id: "skills_section",
    title: "",
    fields: [
      {
        id: "skills",
        label: "VOS COMPÉTENCES ET EXPERTISES...",
        type: "textarea",
        width: "full",
        placeholder: "VOS COMPÉTENCES ET EXPERTISES...",
        hideLabel: true,
      },
    ],
  },
];
