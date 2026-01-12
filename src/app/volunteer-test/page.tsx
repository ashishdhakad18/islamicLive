"use client";
import React, { useState } from "react";
import Container from "@/components/layout/Container";
import VolunteerForm from "@/components/Forms/VolunteerForm";
import { volunteerFormSchema } from "@/data/volunteerFormSchema";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export default function VolunteerTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-grey-bg-dark py-12 flex justify-center items-center">
      <Container>
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-grey-black text-3xl font-bold">Volunteer Form Test</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            color="yellow"
            className="px-8 py-3 font-bold uppercase"
            rounded
          >
            Devenir Bénévole
          </Button>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <VolunteerForm schema={volunteerFormSchema} />
          </Modal>
        </div>
      </Container>
    </div>
  );
}
