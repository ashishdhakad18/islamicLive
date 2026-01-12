import Image from "next/image";

interface LatestNewsCardProps {
  image: string;
  title: string;
  read: string;
  date: string;
  categories: string[];
  link: string;
  className?: string;
}

export default function LatestNewsCard({
  image,
  title,
  read,
  date,
  categories,
  className,
}: LatestNewsCardProps) {
  return (
    <div
      className={` bg-primary-main overflow-hidden  transition flex flex-col gap-6 max-w-full ${className}`}
    >
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className="object-cover w-full "
      />

      <div className=" flex flex-col grow  items-start ">
        <div className="flex gap-2">
          <p className="type-body-4 text-yellow font-bold!">{read}</p>
          <span className="type-body-4 text-yellow font-bold!">|</span>

          <p className="type-body-4 text-yellow font-bold!">{date}</p>
        </div>

        <h3 className="type-body-1 font-bold! text-white mt-4 ">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-4">
        {categories.map((category, index) => (
          <span
            key={index}
            className={`type-btn-4 h-6 flex items-center justify-center rounded-sm px-3 pt-1 cursor-pointer ${
              category.toLowerCase() === "article"
                ? "bg-[#FEF9D2] text-primary-dark" // Yellow background for Article
                : "bg-[#F3F2F0] text-primary-dark" // Grey background for Fundraiser/Others
            }`}
          >
            {category.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
