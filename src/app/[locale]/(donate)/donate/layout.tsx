import DonationHeader from "@/components/layout/Header/DonationHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate - Islamic Relief",
  description: "Make a donation to Islamic Relief",
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Your custom donate header */}
      <div className="sticky top-0 z-50">
        <DonationHeader />
      </div>

      {/* Main content */}
      <main className="flex-1 relative bg-grey-bg-dark min-h-[calc(100vh-75px)]">
        {/* <div className="absolute inset-0 bg-[url('/Images/BackgroundGrain.png')] bg-cover bg-center opacity-50 bg-repeat -z-10 pointer-events-none" /> */}
        {children}
      </main>

      {/* Your custom donate footer (if needed) */}
      {/* <footer className="bg-primary-dark text-white"> */}
      {/* Custom footer content for donate page */}
      {/* </footer> */}
    </>
  );
}
