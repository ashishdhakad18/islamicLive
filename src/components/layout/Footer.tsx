import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";

const Footer = () => {
  const footerLinks = {
    give: [
      { name: "I Give", href: "#" },
      { name: "Become a Volunteer", href: "/become-volunteer" },
      { name: "Contact Us", href: "/contact-us" },
      { name: "Zakat FAQ", href: "/zakat-al-maal" },
      { name: "Calculate Your Zakat", href: "/calculate-your-zakat" },
      { name: "Zakat Al Maal", href: "/zakat-al-maal" },
    ],
    work: [
      { name: "Orphan Sponsorship", href: "/orphan-sponsorship" },
      { name: "Water", href: "/water" },
      { name: "Ramadan", href: "/ramadan" },
      { name: "Drought", href: "/drought" },
      { name: "Kurban", href: "/kurban" },
    ],
    emergency: [
      { name: "Gaza Emergency", href: "#" },
      { name: "Emergency Lebanon", href: "#" },
      { name: "Emergency Sudan", href: "#" },
      { name: "Famine", href: "#" },
    ],
    about: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "CGU", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-royal-dark text-grey-white select-none">
      <div className="max-w-[1441px] mx-auto px-6 py-6 lg:px-24 lg:py-12">
        {/* Top Section: Logo & Social Icons */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-6 gap-6">
          {/* Logo */}
          <Image
            src="/Images/Logo/Footer-logo.svg"
            alt="Islamic Relief Logo"
            width={178}
            height={90}
            className="object-cover"
          />

          <div className="flex gap-4">
            <Link
              href="#"
              className="w-8 h-8 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Image
                src="/Icons/Facebook.svg"
                alt="Facebook"
                width={32}
                height={32}
              />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Image
                src="/Icons/Instagram.svg"
                alt="Instagram"
                width={32}
                height={32}
              />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Image
                src="/Icons/Youtube.svg"
                alt="Youtube"
                width={32}
                height={32}
              />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-grey-grey w-full" />

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 lg:gap-0 mt-8 lg:mt-0">
          {/* Mobile Divider 1 (Top) */}
          <div className="lg:hidden order-2 col-span-2 h-px bg-grey-grey w-full my-4" />

          {/* 1. Give & Get Involved */}
          <div className="order-3 lg:order-0 col-span-1 lg:col-span-1 flex flex-col gap-4 lg:p-6">
            <h3 className="type-btn-1 font-bold text-grey-white uppercase mb-2">
              Give & Get Involved
            </h3>
            <div className="flex flex-col gap-2">
              {footerLinks.give.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="type-body-4 text-grey-white hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Our Work */}
          <div className="order-4 lg:order-0 col-span-1 lg:col-span-1 flex flex-col gap-4 lg:border-l lg:border-grey-grey lg:mt-0 lg:p-6">
            <h3 className="type-btn-1 font-bold text-grey-white uppercase mb-2">
              Our Work
            </h3>
            <div className="flex flex-col gap-2">
              {footerLinks.work.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="type-body-4 text-grey-white hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Divider 2 (Middle) */}
          <div className="lg:hidden order-5 col-span-2 h-px bg-grey-grey w-full my-4" />

          {/* 3. Emergency Appeals */}
          <div className="order-6 lg:order-0 col-span-1 lg:col-span-1 flex flex-col gap-4 lg:border-l lg:border-grey-grey lg:mt-0 lg:p-6">
            <h3 className="type-btn-1 font-bold text-grey-white uppercase mb-2">
              Emergency Appeals
            </h3>
            <div className="flex flex-col gap-2">
              {footerLinks.emergency.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="type-body-4 text-grey-white hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 4. About Islamic Relief */}
          <div className="order-7 lg:order-0 col-span-1 lg:col-span-1 flex flex-col gap-4 lg:border-l lg:border-grey-grey lg:mt-0 lg:p-6">
            <h3 className="type-btn-1 font-bold text-grey-white uppercase mb-2">
              About Islamic Relief
            </h3>
            <div className="flex flex-col gap-2">
              {footerLinks.about.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="type-body-4 text-grey-white hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Divider 3 (Bottom) */}
          <div className="lg:hidden order-8 col-span-2 h-px bg-grey-grey w-full my-4" />

          {/* 5. Donate Button (Desktop: Row 2, Col 1) - Hidden on Mobile */}
          <div className="hidden lg:flex lg:order-0 col-span-2 lg:col-span-1 flex-col gap-6 lg:p-6 lg:pt-8">
            <h2 className="type-h6 font-bold text-grey-white uppercase leading-tight">
              Together,
              <br />
              We Save Lives
            </h2>
            <Button
              color="yellow"
              size="lg"
              className="w-full lg:w-full rounded-sm"
              endIcon={(
                <Image
                  src="/Icons/Arrow-right-black.svg"
                  alt="Arrow"
                  width={20}
                  height={20}
                />
              )}
            >
              DONATE NOW
            </Button>
          </div>

          {/* 6. Head Office */}
          <div className="order-9 lg:order-0 col-span-1 lg:col-span-1 flex flex-col gap-4 lg:border-l lg:border-grey-grey lg:p-6 lg:pt-8 lg:mt-0 h-full">
            <h3 className="type-btn-1 font-bold text-grey-white uppercase">
              Head Office
            </h3>
            <div className="type-body-4 text-grey-white leading-relaxed">
              <p>Avenue du Bouchet, 18</p>
              <p>1209 Geneva</p>
              <p>Suisse</p>
              <p className="my-2">+41 22 73 202 73</p>
              <a
                href="mailto:contact@islamic-relief.ch"
                className="hover:underline"
              >
                contact@islamic-relief.ch
              </a>
            </div>
          </div>

          {/* 7. Postal Account */}
          <div className="order-10 lg:order-0 col-span-1 lg:col-span-1 flex flex-col gap-4 lg:border-l lg:border-grey-grey lg:p-6 lg:pt-8 lg:mt-0 h-full">
            <h3 className="type-btn-1 font-bold text-grey-white uppercase">
              Postal Account
            </h3>
            <div className="type-body-4 text-grey-white leading-relaxed">
              <p className="mb-2">40-18048-8</p>
              <p className="mb-0.5">CH51 0900 0000 4001</p>
              <p>80488</p>
            </div>
          </div>

          {/* 8. Newsletter (Desktop: Row 2, Col 4. Mobile: Top / order-1) */}
          <div className="order-1 lg:order-0 col-span-2 lg:col-span-1 flex flex-col gap-4 lg:border-l lg:border-grey-grey lg:p-6 lg:pt-8 lg:mt-0 h-full">
            <h3 className="type-btn-1 font-bold text-grey-white uppercase">
              Keep Up To Date
            </h3>
            <form className="flex flex-col gap-3 w-full">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="FIRST NAME"
                  className="w-1/2 bg-white rounded-sm px-3 py-2 text-xs font-bold type-btn-3 text-grey-black placeholder:text-grey-grey/60 placeholder:h-[13px] focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="LAST NAME"
                  className="w-1/2 bg-white rounded-sm px-3 py-2 text-xs font-bold type-btn-3 text-grey-black placeholder:text-grey-grey/60 placeholder:h-[13px] focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-white rounded-sm px-3 py-2 text-xs font-bold type-btn-3 text-grey-black placeholder:text-grey-grey/60 placeholder:h-[13px] focus:outline-none focus:ring-1 focus:ring-primary pr-28"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 bg-grey-inactive hover:bg-grey-inactive/50 text-grey-grey type-btn-3 font-bold px-3 py-2 rounded-sm uppercase tracking-wider transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col lg:flex-row justify-start items-center gap-2 lg:gap-0 mt-8 text-center lg:text-left type-body-4 text-grey-white">
          <span className="lg:mr-2">© Islamic Relief Suisse</span>
          <span className="hidden lg:inline mx-2">|</span>
          <div className="flex items-center justify-center gap-2">
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <span className="mx-1">|</span>
            <Link href="#" className="hover:underline">
              Services License Agreement
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Donate Bar */}
      <div className="lg:hidden bg-white w-full px-6 py-4">
        <Button
          color="yellow"
          size="lg"
          className="w-full rounded-sm"
          endIcon={(
            <Image
              src="/Icons/Arrow-right-black.svg"
              alt="Arrow"
              width={20}
              height={20}
            />
          )}
        >
          DONATE NOW
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
