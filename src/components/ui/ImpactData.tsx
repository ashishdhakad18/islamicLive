import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { ImpactData as ImpactDataType } from "@/types/impactData";

interface ImpactDataProps {
  data: ImpactDataType;
  lineColor?: string;
  iconBoxBorderColor?: string;
  iconBoxBackgroundColor?: string;
  iconColor?: string;
  className?: string;
  textColor?: string;
}

export default function ImpactData({
  data,
  lineColor,
  iconBoxBorderColor,
  iconBoxBackgroundColor,
  iconColor,
  className,
  textColor,
}: ImpactDataProps) {
  return (
    <div className={cn("relative pt-12 pb-25", className)}>
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="relative w-full flex justify-center items-start px-48">
          {/* Horizontal connecting line - spans across all items */}
          <div
            className={cn(
              "absolute top-[32px] left-0 right-0 h-px z-0",
              !lineColor && "bg-primary"
            )}
            style={{ backgroundColor: lineColor }}
          />

          {data.stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-start text-left flex-1 px-8 "
            >
              {/* Icon Box */}
              {/* Icon Box */}
              <div
                className={cn(
                  "relative z-10 w-[64px] h-[64px] rounded-sm flex items-center justify-center mb-8 border",
                  !iconBoxBackgroundColor && "bg-primary-lighter",
                  !iconBoxBorderColor && "border-primary"
                )}
                style={{
                  backgroundColor: iconBoxBackgroundColor,
                  borderColor: iconBoxBorderColor,
                }}
              >
                {iconColor ? (
                  <div
                    style={{
                      backgroundColor: iconColor,
                      maskImage: `url(${stat.icon})`,
                      WebkitMaskImage: `url(${stat.icon})`,
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                      width: 32,
                      height: 32,
                    }}
                  />
                ) : (
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                )}
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-8 items-start">
                {stat.value && (
                  <h3
                    className={`type-h5 ${
                      textColor ? textColor : "text-grey-black"
                    } tracking-tight leading-8 h-8`}
                  >
                    {stat.value}
                  </h3>
                )}
                <div className="flex flex-col gap-2 items-start">
                  <h6
                    className={`type-h6 ${
                      textColor ? textColor : "text-grey-grey"
                    } uppercase leading-6`}
                  >
                    {stat.label}
                  </h6>
                  <p
                    className={`type-body-2 ${
                      textColor ? textColor : "text-grey-grey"
                    }`}
                  >
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden px-12">
        <div className="relative flex flex-col">
          {data.stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex items-start gap-3 relative ${
                index !== data.stats.length - 1 ? "pb-8" : ""
              }`}
            >
              {/* Connecting Line */}
              {index !== data.stats.length - 1 && (
                <div
                  className={cn(
                    "absolute left-[32px] top-[32px] w-px z-0",
                    !lineColor && "bg-primary"
                  )}
                  style={{
                    backgroundColor: lineColor,
                    height: "calc(100% + 32px)",
                  }}
                />
              )}

              {/* Icon Box */}
              {/* Icon Box */}
              <div
                className={cn(
                  "relative z-10 w-[64px] h-[64px] rounded-[2px] flex items-center justify-center shrink-0 border",
                  !iconBoxBackgroundColor && "bg-primary-lighter",
                  !iconBoxBorderColor && "border-primary"
                )}
                style={{
                  backgroundColor: iconBoxBackgroundColor,
                  borderColor: iconBoxBorderColor,
                }}
              >
                {iconColor ? (
                  <div
                    style={{
                      backgroundColor: iconColor,
                      maskImage: `url(${stat.icon})`,
                      WebkitMaskImage: `url(${stat.icon})`,
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                      width: 32,
                      height: 32,
                    }}
                  />
                ) : (
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                )}
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-4 items-start pt-1">
                {stat.value && (
                  <h3
                    className={`type-h5 ${
                      textColor ? textColor : "text-grey-black"
                    } tracking-tight`}
                  >
                    {stat.value}
                  </h3>
                )}
                <div className="flex flex-col gap-2">
                  <h6
                    className={`type-h6 ${
                      textColor ? textColor : "text-grey-grey"
                    } uppercase font-semibold text-sm`}
                  >
                    {stat.label}
                  </h6>
                  <p
                    className={`type-body-2 ${
                      textColor ? textColor : "text-grey-grey"
                    } leading-relaxed`}
                  >
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
