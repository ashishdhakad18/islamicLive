"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import VolunteerForm from "@/components/Forms/VolunteerForm";
import { volunteerFormSchema } from "@/data/volunteerFormSchema";
import { Button } from "@/components/ui/Button";

interface VolunteerModalTriggerProps {
  buttonText: string;
  className?: string;
}

export default function VolunteerModalTrigger({
  buttonText,
  className,
}: VolunteerModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        color="yellow"
        rounded
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <VolunteerForm schema={volunteerFormSchema} />
      </Modal>
    </>
  );
}
