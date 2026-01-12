import { Locale } from "@/config/i18n.config";

// Cause definition
export interface Cause {
  id: string;
  name: string;
}

// Labels for the donation flow UI
export interface DonationLabels {
  selectFundsTitle: string;
  selectFundsSubtitle: string;
  chooseAmountTitle: string;
  chooseAmountSubtitle: string;
  addToCart: string;
  updateCart: string;
  seeAllActions: string;
  enterOtherAmount: string;
  paymentDetailsTitle: string;
  paymentDetailsSubtitle: string;
  summaryTitle: string;
  total: string;
  contactDetailsTitle: string;
  contactDetailsSubtitle: string;
  frequencyOneTime: string;
  frequencyOneTimeSub: string;
  frequencyMonthly: string;
  frequencyMonthlySub: string;
  frequencyTitle: string;
  frequencySubtitle: string;
  twint: string;
  otherPaymentMethods: string;
  allActionsTitle: string;
  cancel: string;
  validate: string;
  startDonation: string;
  // Intro step
  introTitle: string;
  introSubtitle: string;
  introStepFrequency: string;
  introStepFrequencySub: string;
  introStepFunds: string;
  introStepFundsSub: string;
  introStepDetails: string;
  introStepDetailsSub: string;
  introStepReview: string;
  introStepReviewSub: string;
}

// Category for All Actions Modal
export interface ActionCategory {
  value: string;
  label: string;
}

// Full content structure for a locale
export interface DonationContent {
  causes: Cause[];
  labels: DonationLabels;
  amounts: number[];
  allActionsCategories: ActionCategory[];
  allActions: Record<string, Cause[]>;
}

// Translation data for each locale
const translations: Record<Locale, DonationContent> = {
  en: {
    causes: [
      { id: "sadaqah", name: "SADAQAH" },
      { id: "zakat", name: "ZAKAT" },
      { id: "waqf", name: "WAQF" },
      { id: "sudan", name: "SUDAN EMERGENCY" },
      { id: "palestine", name: "PALESTINE EMERGENCY" },
      { id: "water", name: "WATER FOR LIFE" },
      { id: "interest", name: "INTEREST FUND" },
      { id: "most-needed", name: "WHERE MOST NEEDED" },
    ],
    labels: {
      selectFundsTitle: "SELECT FUNDS & AMOUNT",
      selectFundsSubtitle: "Choose how you'd like to contribute",
      chooseAmountTitle: "CHOOSE DONATION AMOUNT",
      chooseAmountSubtitle: "Choose how you'd like to contribute",
      addToCart: "ADD TO CART",
      updateCart: "UPDATE CART",
      seeAllActions: "SEE ALL ACTIONS",
      enterOtherAmount: "$ ENTER OTHER AMOUNT",
      paymentDetailsTitle: "PAYMENT DETAILS",
      paymentDetailsSubtitle: "Choose how you'd like to contribute",
      summaryTitle: "Summary of your donation",
      total: "Total",
      contactDetailsTitle: "LOGIN DETAILS",
      contactDetailsSubtitle: "Choose how you'd like to contribute",
      frequencyOneTime: "ONE-TIME DONATION",
      frequencyOneTimeSub: "Make a single, impactful contribution",
      frequencyMonthly: "MONTHLY GIVING",
      frequencyMonthlySub: "Provide ongoing support every month",
      frequencyTitle: "SELECT FREQUENCY",
      frequencySubtitle: "Choose how you'd like to contribute",
      twint: "TWINT",
      otherPaymentMethods: "OTHER PAYMENT METHODS",
      allActionsTitle: "ALL OUR ACTIONS",
      cancel: "CANCEL",
      validate: "VALIDATE",
      startDonation: "Start Donation",
      introTitle: "MAKE A DIFFERENCE TODAY",
      introSubtitle:
        "Your donation helps provide food, healthcare, education, and emergency relief to vulnerable communities around the world. Choose how you'd like to give and support those most in need.",
      introStepFrequency: "FREQUENCY",
      introStepFrequencySub:
        "Begin your giving journey by choosing how you'd like to donate.",
      introStepFunds: "FUNDS & AMOUNT",
      introStepFundsSub:
        "Choose the cause or program you wish to support with your donation.",
      introStepDetails: "DETAILS",
      introStepDetailsSub:
        "Enter your information securely to complete your donation.",
      introStepReview: "REVIEW",
      introStepReviewSub: "Review and confirm your donation details.",
    },
    amounts: [10, 20, 30, 50, 100],
    allActionsCategories: [
      { value: "emergencies", label: "EMERGENCIES" },
      { value: "zakatsadaqa", label: "ZAKAT & SADAQA" },
      { value: "sustainable", label: "SUSTAINABLE IMPACT" },
      { value: "special", label: "SPECIAL PROJECTS" },
    ],
    allActions: {
      emergencies: [
        { id: "syria", name: "Syria Emergency" },
        { id: "lebanon", name: "Lebanon Emergency" },
        { id: "gaza", name: "Gaza Emergency" },
        { id: "sudan", name: "Sudan Emergency" },
        { id: "most-needed", name: "Where Most Needed" },
      ],
      zakatsadaqa: [
        { id: "sadaqa", name: "Sadaqa" },
        { id: "sadaqa-jariya", name: "Sadaqa Jariya" },
        { id: "zakat-al-maal", name: "Zakat al Maal" },
        { id: "fidya", name: "Fidya" },
        { id: "kaffara", name: "Kaffara" },
      ],
      sustainable: [
        { id: "nutrition", name: "Nutrition" },
        { id: "health", name: "Health" },
        { id: "education", name: "Education" },
        { id: "water", name: "Water & Sanitation" },
      ],
      special: [
        { id: "gaza-bakery", name: "Gaza Bakery" },
        { id: "orphan-sponsorship", name: "Orphan Sponsorship" },
      ],
    },
  },
  fr: {
    causes: [
      { id: "sadaqah", name: "SADAQAH" },
      { id: "zakat", name: "ZAKAT" },
      { id: "waqf", name: "WAQF" },
      { id: "sudan", name: "URGENCE SOUDAN" },
      { id: "palestine", name: "URGENCE PALESTINE" },
      { id: "water", name: "L'EAU POUR LA VIE" },
      { id: "interest", name: "FONDS D'INTÉRÊTS" },
      { id: "most-needed", name: "LÀ OÙ C'EST LE PLUS NÉCESSAIRE" },
    ],
    labels: {
      selectFundsTitle: "SÉLECTIONNER LES FONDS ET LE MONTANT",
      selectFundsSubtitle: "Choisissez comment vous souhaitez contribuer",
      chooseAmountTitle: "CHOISIR LE MONTANT DU DON",
      chooseAmountSubtitle: "Choisissez comment vous souhaitez contribuer",
      addToCart: "AJOUTER AU PANIER",
      updateCart: "METTRE À JOUR",
      seeAllActions: "VOIR TOUTES LES ACTIONS",
      enterOtherAmount: "$ ENTRER UN AUTRE MONTANT",
      paymentDetailsTitle: "DÉTAILS DU PAIEMENT",
      paymentDetailsSubtitle: "Choisissez comment vous souhaitez contribuer",
      summaryTitle: "Résumé de votre don",
      total: "Total",
      contactDetailsTitle: "DÉTAILS DE CONNEXION",
      contactDetailsSubtitle: "Choisissez comment vous souhaitez contribuer",
      frequencyOneTime: "DON PONCTUEL",
      frequencyOneTimeSub: "Faites une contribution unique et significative",
      frequencyMonthly: "DON MENSUEL",
      frequencyMonthlySub: "Offrez un soutien continu chaque mois",
      frequencyTitle: "SÉLECTIONNER LA FRÉQUENCE",
      frequencySubtitle: "Choisissez comment vous souhaitez contribuer",
      twint: "TWINT",
      otherPaymentMethods: "AUTRES MOYENS DE PAIEMENT",
      allActionsTitle: "TOUTES NOS ACTIONS",
      cancel: "ANNULER",
      validate: "VALIDER",
      startDonation: "Commencer le don",
      introTitle: "FAITES LA DIFFÉRENCE AUJOURD'HUI",
      introSubtitle:
        "Votre don aide à fournir nourriture, soins de santé, éducation et aide d'urgence aux communautés vulnérables du monde entier. Choisissez comment vous souhaitez donner et soutenir ceux qui en ont le plus besoin.",
      introStepFrequency: "FRÉQUENCE",
      introStepFrequencySub:
        "Commencez votre parcours de don en choisissant comment vous souhaitez donner.",
      introStepFunds: "FONDS & MONTANT",
      introStepFundsSub:
        "Choisissez la cause ou le programme que vous souhaitez soutenir avec votre don.",
      introStepDetails: "DÉTAILS",
      introStepDetailsSub:
        "Entrez vos informations en toute sécurité pour compléter votre don.",
      introStepReview: "RÉVISION",
      introStepReviewSub: "Vérifiez et confirmez les détails de votre don.",
    },
    amounts: [10, 20, 30, 50, 100],
    allActionsCategories: [
      { value: "emergencies", label: "URGENCES" },
      { value: "zakatsadaqa", label: "ZAKAT & SADAQA" },
      { value: "sustainable", label: "IMPACT DURABLE" },
      { value: "special", label: "PROJETS SPÉCIAUX" },
    ],
    allActions: {
      emergencies: [
        { id: "syria", name: "Urgence Syrie" },
        { id: "lebanon", name: "Urgence Liban" },
        { id: "gaza", name: "Urgence Gaza" },
        { id: "sudan", name: "Urgence Soudan" },
        { id: "most-needed", name: "Là où c'est le plus nécessaire" },
      ],
      zakatsadaqa: [
        { id: "sadaqa", name: "Sadaqa" },
        { id: "sadaqa-jariya", name: "Sadaqa Jariya" },
        { id: "zakat-al-maal", name: "Zakat al Maal" },
        { id: "fidya", name: "Fidya" },
        { id: "kaffara", name: "Kaffara" },
      ],
      sustainable: [
        { id: "nutrition", name: "Nutrition" },
        { id: "health", name: "Santé" },
        { id: "education", name: "Éducation" },
        { id: "water", name: "Eau & Assainissement" },
      ],
      special: [
        { id: "gaza-bakery", name: "Boulangerie de Gaza" },
        { id: "orphan-sponsorship", name: "Parrainage d'Orphelin" },
      ],
    },
  },
  de: {
    causes: [
      { id: "sadaqah", name: "SADAQAH" },
      { id: "zakat", name: "ZAKAT" },
      { id: "waqf", name: "WAQF" },
      { id: "sudan", name: "SUDAN NOTFALL" },
      { id: "palestine", name: "PALÄSTINA NOTFALL" },
      { id: "water", name: "WASSER FÜR DAS LEBEN" },
      { id: "interest", name: "ZINSFONDS" },
      { id: "most-needed", name: "WO AM MEISTEN GEBRAUCHT" },
    ],
    labels: {
      selectFundsTitle: "FONDS & BETRAG AUSWÄHLEN",
      selectFundsSubtitle: "Wählen Sie, wie Sie beitragen möchten",
      chooseAmountTitle: "SPENDENBETRAG WÄHLEN",
      chooseAmountSubtitle: "Wählen Sie, wie Sie beitragen möchten",
      addToCart: "IN DEN WARENKORB",
      updateCart: "AKTUALISIEREN",
      seeAllActions: "ALLE AKTIONEN ANZEIGEN",
      enterOtherAmount: "$ ANDEREN BETRAG EINGEBEN",
      paymentDetailsTitle: "ZAHLUNGSDETAILS",
      paymentDetailsSubtitle: "Wählen Sie, wie Sie beitragen möchten",
      summaryTitle: "Zusammenfassung Ihrer Spende",
      total: "Gesamt",
      contactDetailsTitle: "ANMELDEDETAILS",
      contactDetailsSubtitle: "Wählen Sie, wie Sie beitragen möchten",
      frequencyOneTime: "EINMALIGE SPENDE",
      frequencyOneTimeSub:
        "Leisten Sie einen einmaligen, wirkungsvollen Beitrag",
      frequencyMonthly: "MONATLICHES SPENDEN",
      frequencyMonthlySub:
        "Bieten Sie jeden Monat kontinuierliche Unterstützung",
      frequencyTitle: "HÄUFIGKEIT AUSWÄHLEN",
      frequencySubtitle: "Wählen Sie, wie Sie beitragen möchten",
      twint: "TWINT",
      otherPaymentMethods: "ANDERE ZAHLUNGSMETHODEN",
      allActionsTitle: "ALLE UNSERE AKTIONEN",
      cancel: "ABBRECHEN",
      validate: "BESTÄTIGEN",
      startDonation: "Spende starten",
      introTitle: "MACHEN SIE HEUTE EINEN UNTERSCHIED",
      introSubtitle:
        "Ihre Spende hilft, Nahrung, Gesundheitsversorgung, Bildung und Nothilfe für gefährdete Gemeinschaften auf der ganzen Welt bereitzustellen. Wählen Sie, wie Sie geben und die Bedürftigsten unterstützen möchten.",
      introStepFrequency: "HÄUFIGKEIT",
      introStepFrequencySub:
        "Beginnen Sie Ihren Spendenweg, indem Sie wählen, wie Sie spenden möchten.",
      introStepFunds: "FONDS & BETRAG",
      introStepFundsSub:
        "Wählen Sie die Ursache oder das Programm, das Sie mit Ihrer Spende unterstützen möchten.",
      introStepDetails: "DETAILS",
      introStepDetailsSub:
        "Geben Sie Ihre Informationen sicher ein, um Ihre Spende abzuschließen.",
      introStepReview: "ÜBERPRÜFUNG",
      introStepReviewSub: "Überprüfen und bestätigen Sie Ihre Spendendetails.",
    },
    amounts: [10, 20, 30, 50, 100],
    allActionsCategories: [
      { value: "emergencies", label: "NOTFÄLLE" },
      { value: "zakatsadaqa", label: "ZAKAT & SADAQA" },
      { value: "sustainable", label: "NACHHALTIGE WIRKUNG" },
      { value: "special", label: "SPEZIELLE PROJEKTE" },
    ],
    allActions: {
      emergencies: [
        { id: "syria", name: "Syrien Notfall" },
        { id: "lebanon", name: "Libanon Notfall" },
        { id: "gaza", name: "Gaza Notfall" },
        { id: "sudan", name: "Sudan Notfall" },
        { id: "most-needed", name: "Wo am meisten gebraucht" },
      ],
      zakatsadaqa: [
        { id: "sadaqa", name: "Sadaqa" },
        { id: "sadaqa-jariya", name: "Sadaqa Jariya" },
        { id: "zakat-al-maal", name: "Zakat al Maal" },
        { id: "fidya", name: "Fidya" },
        { id: "kaffara", name: "Kaffara" },
      ],
      sustainable: [
        { id: "nutrition", name: "Ernährung" },
        { id: "health", name: "Gesundheit" },
        { id: "education", name: "Bildung" },
        { id: "water", name: "Wasser & Sanitär" },
      ],
      special: [
        { id: "gaza-bakery", name: "Gaza Bäckerei" },
        { id: "orphan-sponsorship", name: "Waisenpatenschaft" },
      ],
    },
  },
};

/**
 * Get donation content for a specific locale.
 * Falls back to English if locale is not found.
 */
export function getDonationContent(locale: Locale): DonationContent {
  return translations[locale] || translations.en;
}

// Default export for backwards compatibility
export const causes = translations.en.causes;
export const amounts = translations.en.amounts;
