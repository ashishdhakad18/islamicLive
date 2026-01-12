import React from "react";
import Image from "next/image";
import { SocialMediaPost } from "@/types/socialmedia";
import { Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialMediaCardProps {
  data: SocialMediaPost;
  className?: string;
}

export default function SocialMediaCard({
  data,
  className,
}: SocialMediaCardProps) {
  return (
    <div
      className={cn(
        "max-w-[300px] w-full  bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100/50 shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-8 h-8 relative rounded-full overflow-hidden border border-gray-200">
            {/* Using a fallback if src implies SVG/Image but for now assuming it works or using a div */}
            {data.organization.logo ? (
              <Image
                src={data.organization.logo}
                alt={data.organization.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary-main"></div>
            )}
          </div>
          {/* Organization Name */}
          <span className="type-btn-2 uppercase text-grey-black tracking-wide">
            {data.organization.name}
          </span>
        </div>

        {/* Social Icon */}
        {/* Social Icon */}
        <a
          href={data.organization.social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0095F6]"
        >
          {(() => {
            const platform = data.organization.social.platform.toLowerCase();
            const iconMap: { [key: string]: string } = {
              instagram: "/Icons/Instagram-1.svg",
              tiktok: "/Icons/Tiktok.svg",
              whatsapp: "/Icons/Whatsapp.svg",
              facebook: "/Icons/Facebook-1.svg",
              youtube: "/Icons/YouTube-1.svg",
            };
            const iconPath = iconMap[platform];

            return iconPath ? (
              <div
                className="w-5 h-5 bg-[#0095F6]"
                style={{
                  maskImage: `url('${iconPath}')`,
                  WebkitMaskImage: `url('${iconPath}')`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
            ) : null;
          })()}
        </a>
      </div>

      {/* Image - fills remaining space */}
      <div className="w-full flex-1 overflow-hidden">
        {data.media.src ? (
          <Image
            src={data.media.src}
            alt={data.media.alt || "Social Media Post"}
            width={294}
            height={200}
            className="min-w-[294px] w-full h-full min-h-[200px] object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Image
              src="/Images/mockImages/cardimage.png"
              alt="Default Content"
             fill
              className="opacity-50 object-cover"
            />
          </div>
        )}
      </div>
      {/* Footer Content */}
      <div className="p-4 shrink-0">
        {/* Caption */}
        <p className="type-body-2 text-grey-grey leading-relaxed mb-6">
          {data.content}
        </p>

        {/* Engagement Stats */}
        <div className="flex items-center gap-5 text-grey-grey">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-current text-grey-grey" />
            <span className="type-body-3  ">{data.engagement.likes}</span>
          </div>
          <div className="h-[20px] w-px bg-grey-inactive"></div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 fill-current text-grey-grey" />
            <span className="type-body-3 ">{data.engagement.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
