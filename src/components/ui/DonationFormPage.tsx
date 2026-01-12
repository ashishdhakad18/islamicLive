import React from "react";
import DonationForm from "./DonationForm";
import { donationFormData } from "@/types/donationForm";

interface DonationFormPageProps {
  backgroundImage?: string;
}

const DonationFormPage = ({
  backgroundImage = "/Images/FormPageBG.png",
}: DonationFormPageProps) => {
  return (
    <div
      className="w-full relative py-25 md:min-h-[600px] flex items-center justify-center bg-cover bg-center px-2"
      style={{ backgroundImage: `url("${backgroundImage}")` }}
    >
      <div className="w-full h-full absolute inset-0 bg-black/10 pointer-events-none" />
      <div className="z-10 w-full flex justify-center px-4">
        <DonationForm data={donationFormData} />
      </div>
    </div>
  );
};

export default DonationFormPage;
