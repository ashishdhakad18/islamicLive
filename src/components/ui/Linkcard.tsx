"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LinkcardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
  className?: string;
  titleClassName?: string;
}

export default function Linkcard({
  icon,
  title,
  description,
  link,
  linkText,
  className,
  titleClassName,
}: LinkcardProps) {
  return (
    <div
      className={cn(
        "bg-primary-lighter p-6 md:py-0 md:pr-0 md:pl-6 border-l-0 md:border-l border-primary-main w-full h-full flex flex-col gap-6 ",
        className
      )}
    >
      <Image
        src={icon}
        alt={title}
        width={32}
        height={32}
        className="object-contain"
      />
      <div className="flex flex-col gap-4 flex-1">
        <h6 className={cn("type-h6 text-grey-black uppercase", titleClassName)}>
          {title}
        </h6>
        <p className="type-body-2 text-grey-grey hidden md:block leading-6 ">
          {description}
        </p>
      </div>
     <Link
  href={link}
  className="group type-btn-1 text-primary-main uppercase flex items-center gap-2 hover:text-primary-main"
>
  <span>{linkText}</span>

  <Image
    src="/Icons/linkicon.png"
    alt={title}
    width={12}
    height={12}
    className="
      object-contain
      transition-transform
      duration-300
      ease-in-out
      pb-1.5
      group-hover:rotate-45
    "
  />
</Link>

    </div>
  );
}
