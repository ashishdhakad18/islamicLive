import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavigationDropdown from "@/components/ui/NavigationDropdown";

import { headerNavigationData } from "@/data/headerData";
import { Button } from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { ProjectNavigationItem } from "@/lib/pages/sustainable-projects/getAllSustainableProjects";

interface PrimaryHeaderProps {
  sustainableProjects?: ProjectNavigationItem[];
}

const PrimaryHeader = ({ sustainableProjects = [] }: PrimaryHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  // Merge dynamic sustainable projects into the navigation data
  const navigationData = React.useMemo(() => {
    return headerNavigationData.map((section) => {
      if (section.label === "Our Impact") {
        return {
          ...section,
          items: section.items?.map((item) => {
            if (item.label === "Sustainable Projects") {
              return {
                ...item,
                items: sustainableProjects.map((project) => ({
                  label: project.title,
                  href: `/sustainable-projects/${project.slug}`,
                })),
              };
            }
            return item;
          }),
        };
      }
      return section;
    });
  }, [sustainableProjects]);

  // Handle accordion toggle - only one dropdown open at a time
  const handleDropdownToggle = (index: number) => {
    setOpenDropdownIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Container>
        <div className="flex justify-between items-center h-[70px]">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src="/Images/Logo/Group.svg"
                alt="Logo"
                width={150}
                height={70}
                className="py-2 w-[150px] h-[70px]"
              />
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center p-1 gap-6">
              {navigationData.map((item, index) => (
                <React.Fragment key={index}>
                  {item.items && item.items.length > 0 ? (
                    <NavigationDropdown
                      label={item.label}
                      items={item.items}
                      href={item.href}
                    />
                  ) : (
                    <a
                      href={item.href || "#"}
                      className="flex cursor-pointer items-center gap-3 type-btn-1 text-white focus:outline-none uppercase"
                    >
                      <span>{item.label}</span>
                    </a>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Desktop Button */}
          <div className="hidden lg:block ml-6">
            <Button
              className="h-[70px]"
              variant="solid"
              color="yellow"
              rounded={false}
              size="lg"
              href="/donate"
              startIcon={
                <Image
                  src="/Icons/Header-Icons/Yellow-Heart.svg"
                  alt="Donate"
                  width={26}
                  height={26}
                />
              }
            >
              Donate Now
            </Button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden flex items-center">
            <button
              className="p-2 text-white hover:text-royal-light transition-colors focus:outline-none"
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Image src="/Icons/Menu.svg" alt="Menu" width={26} height={26} />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-100 flex justify-end transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`relative w-[90%] max-w-[450px] h-full bg-royal-dark flex flex-col 
  shadow-2xl
  transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]
  ${
    isMobileMenuOpen
      ? "translate-x-0 opacity-100"
      : "translate-x-full opacity-0"
  }`}
        >
          {/* Drawer Header */}
          <div className="flex justify-between items-center p-6 border-b border-grey-divider">
            <div className="w-[140px]">
              <Link href="/">
                <Image
                  src="/Images/Logo/Group.svg"
                  alt="Logo"
                  width={140}
                  height={50}
                  className="w-full h-auto"
                />
              </Link>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {navigationData.map((item, index) => (
              <div key={index} className="space-y-3">
                {item.items && item.items.length > 0 ? (
                  <div className="block">
                    <NavigationDropdown
                      label={item.label}
                      items={item.items}
                      href={item.href}
                      isMobile={true}
                      isOpen={openDropdownIndex === index}
                      onToggle={() => handleDropdownToggle(index)}
                    />
                  </div>
                ) : (
                  <a
                    href={item.href || "#"}
                    className="block text-white font-semibold type-btn-1 uppercase hover:text-royal-light transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Drawer Footer (Donate Button) */}
          <div className="p-6 border-t border-grey-divider ">
            <Button
              className="w-full h-[50px] md:h-[60px]  rounded-sm md:rounded-lg"
              color="yellow"
           
              size="lg"
              href="/donate"
              onClick={() => {
                setIsMobileMenuOpen(false);
              
              }}
              startIcon={
                <Image
                  src="/Icons/Header-Icons/Yellow-Heart.svg"
                  alt="Donate"
                  width={24}
                  height={24}
                />
              }
            >
              Donate Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrimaryHeader;
