"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { RichTextRenderer } from "./RichTextRenderer";
import { locales } from "@/config/i18n.config";

import { JoinUsCard } from "@/types/join-us.types";

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JoinUsCard | null;
}

const CLOSE_TEXT_MAP: Record<string, string> = {
  en: "CLOSE",
  fr: "FERMER",
  de: "SCHLIESSEN",
};

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  isOpen,
  onClose,
  job,
}) => {
  const pathname = usePathname();
  const currentLocale =
    locales.find((l) => pathname.startsWith(`/${l}`)) || "en";
  const closeText = CLOSE_TEXT_MAP[currentLocale] || CLOSE_TEXT_MAP.en;

  if (!job) return null;
  console.log("Job Data", job);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[750px]">
      <div className="p-8 md:p-12">
        <div className="flex flex-col gap-6">
          {/* Header */}
          {/* <div className="flex flex-col gap-2">
            <h2 className="type-h3 text-grey-black uppercase font-bold leading-tight">
              {job.title}
            </h2>
            <div className="flex flex-col gap-1">
              <p className="type-body-3 text-grey-grey italic">
                {job.category},{job.date}
              </p>
              <p className="type-body-2 text-grey-black font-bold">
                Type de contrat : {job.type}
              </p>
            </div>
          </div> */}

          {/* Dynamic Content from Backend (Rich Text) */}
          {job.cardDetails && job.cardDetails.length > 0 ? (
            <div className="flex flex-col gap-2">
              <RichTextRenderer content={job.cardDetails} />
            </div>
          ) : (
            <>
              {/* Fallback to legacy fields if cardDetails is empty */}
              {/* <div className="flex flex-col gap-4">
                <h3 className="type-h6 text-grey-black font-bold">
                  Missions principales :
                </h3>
                <div className="type-body-2 text-grey-grey flex flex-col gap-4">
                  <ul className="list-disc pl-5 flex flex-col gap-2">
                    {job.missions.map((mission, index) => (
                      <li key={index}>{mission}</li>
                    ))}
                  </ul>
                </div>
              </div> */}

              {/* Profile sought */}
              {/* <div className="flex flex-col gap-4">
                <h3 className="type-h6 text-grey-black font-bold">
                  Profil recherché et compétences requises:
                </h3>
                <ul className="list-disc pl-5 flex flex-col gap-2 type-body-2 text-grey-grey">
                  {job.qualifications.map((qual, index) => (
                    <li key={index}>{qual}</li>
                  ))}
                </ul>
              </div> */}
            </>
          )}

          {/* Contact / Interest */}
          {/* <div className="flex flex-col gap-4 pt-6 border-t border-grey-divider">
            <div className="type-body-2 text-grey-black flex flex-col gap-2">
              <p className="font-bold">
                Intéressée ? Merci d&apos;envoyer votre dossier de candidature
                (CV, lettre de motivation, portfolio éventuel) à :
              </p>
              <a
                href={`mailto:${job.contactEmail}`}
                className="text-primary hover:underline font-bold text-lg"
              >
                {job.contactEmail}
              </a>
              <p className="font-bold">{job.applicationInstructions}</p>
            </div>
          </div> */}

          {/* Footer Action */}
          <div className="flex justify-end mt-6">
            <Button
              variant="solid"
              color="yellow"
              rounded
              className="px-8 py-2 uppercase font-bold text-grey-black h-auto!"
              onClick={onClose}
            >
              {closeText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
