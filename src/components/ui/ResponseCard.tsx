import { ResponseCardData } from "@/types/responseCard";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ResponseCard = ({
  data,
  reverse,
}: {
  data: ResponseCardData;
  reverse: boolean;
}) => {
  // Desktop only:
  // true  -> row
  // false -> row-reverse
  const desktopLayout = reverse ? "lg:flex-row" : "lg:flex-row-reverse";

  return (
    <div
      className={`bg-white flex flex-col items-center justify-center
      ${desktopLayout}
      lg:border-0 border border-grey-divider
      lg:rounded-none rounded-sm overflow-hidden shadow-card-soft lg:shadow-none`}
    >
      <div className="relative w-full lg:w-[600px] shrink-0 p-4 rounded-sm">
        <Image
          src={data.image}
          alt={data.title}
          width={600}
          height={500}
          className="w-full h-[250px] md:h-[400px] lg:h-[560px] object-cover rounded-sm"
        />
      </div>

      <div className="flex flex-col p-6 lg:p-12 items-start justify-center w-full">
        <h3 className="type-h3 uppercase mb-3">{data.title}</h3>
        <p className="type-body-2 text-grey-grey mb-6">{data.description}</p>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full">
          {data.buttons.map((button, index) => (
            <Link
              key={index}
              href={`/emergencies${button.link}`}
              className={`type-btn-2 font-bold px-8 py-3 rounded-sm flex items-center justify-center gap-2 w-full lg:w-auto uppercase
              bg-${button.bgColor}
              ${
                button.bgColor === "white"
                  ? "border border-royal-dark text-royal-dark"
                  : ""
              }`}
            >
              <span className="h-[12px]">{button.label}</span>
              {/* <Image
                src={`${
                  button.bgColor === "white"
                    ? "/Icons/Arrow-right-primary-dark.svg"
                    : "/Icons/Arrow-right-black.svg"
                }`}
                alt="Arrow"
                width={20}
                height={20}
              /> */}
              <ArrowRight
                color={button.bgColor === "white" ? "#172e6d" : "black"}
                height={20}
                width={20}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;
