import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { getAllSustainableProjects } from "@/lib/pages/sustainable-projects/getAllSustainableProjects";

export default async function PagesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const sustainableProjects = await getAllSustainableProjects(locale);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header sustainableProjects={sustainableProjects} />
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-[url('/Images/BackgroundGrain.png')] bg-cover bg-center opacity-50 bg-repeat -z-10 pointer-events-none" />
        {children}
      </main>
      <Footer />
    </div>
  );
}
