export const donationFormData = {
  type: "donationForm",
  title: "Together We're Stronger. Donate Today",
  subtitle: "The people's resilience—struggle and survival.",
  fields: [
    {
      id: "fund",
      type: "select",
      label: "Select a fund",
      required: true,
      options: [
        {
          label: "Fund 1",
          value: "fund-1",
        },
        {
          label: "Fund 2",
          value: "fund-2",
        },
        {
          label: "Fund 3",
          value: "fund-3",
        },
      ],
    },
    {
      id: "donation_frequency",
      type: "toggle",
      label: "Donation Frequency",
      options: [
        {
          label: "Give Once",
          value: "once",
          default: true,
        },
        {
          label: "Monthly",
          value: "monthly",
        },
      ],
    },
    {
      id: "donation_amount",
      type: "amount_selector",
      currency: "USD",
      preset_amounts: [68, 125, 253, 515],
      allow_custom_amount: true,
    },
  ],
  actions: [
    {
      id: "donate_now",
      type: "primary_button",
      label: "Donate Now",
      icon: "arrow-right",
    },
    {
      id: "other_ways",
      type: "link",
      label: "See other ways to donate or support us",
    },
  ],
  styles: {
    theme: "light",
    primary_color: "#0052cc",
    accent_color: "#ffd200",
  },
};
