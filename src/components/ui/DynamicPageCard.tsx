import React from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaYoutube,
  FaWhatsapp,
  FaHeart,
} from "react-icons/fa";
import { IconType } from "react-icons";

interface DynamicPageCardProps {
  post: {
    id: number;
    platform: string;
    username: string;
    likes: number;
    comments: number;
    image: string;
    title: string;
    description: string;
  };
}

const platformMeta: Record<string, { Icon: IconType; label: string; accentClass: string }> = {
  instagram: { Icon: FaInstagram, label: "Instagram", accentClass: "text-primary" },
  tiktok: { Icon: FaTiktok, label: "TikTok", accentClass: "text-grey-black" },
  facebook: { Icon: FaFacebook, label: "Facebook", accentClass: "text-primary-dark" },
  youtube: { Icon: FaYoutube, label: "YouTube", accentClass: "text-red" },
  whatsapp: { Icon: FaWhatsapp, label: "WhatsApp", accentClass: "text-green" },
};

const DynamicPageCard: React.FC<DynamicPageCardProps> = ({ post }) => {
  const meta = platformMeta[post.platform?.toLowerCase()] ?? {
    Icon: FaHeart,
    label: post.platform || "Social",
    accentClass: "text-grey-grey",
  };
  const Icon = meta.Icon as React.ComponentType<{ className?: string }>;

  return (
    <div className="bg-white dark:bg-grey-bg-dark border border-grey-divider rounded-xl shadow-sm flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-grey-divider bg-white dark:bg-grey-bg-dark">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center justify-center w-9 h-9 rounded-full bg-grey-bg-light ${meta.accentClass}`}
          >
            <Icon className="text-lg" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="type-btn-2 text-grey-black dark:text-white">{post.username}</span>
            <span className="type-body-5 text-grey-grey">{meta.label}</span>
          </div>
        </div>
        <Icon className={`text-xl ${meta.accentClass}`} />
      </div>
      <div className="relative w-full h-52 md:h-60 bg-grey-bg-light dark:bg-grey-bg-light">
        <Image
          src={post.image}
          alt={post.title}
          fill
          style={{ objectFit: "cover" }}
          priority={post.id === 1}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <h3 className="type-h4 text-grey-black dark:text-white mb-2">{post.title}</h3>
        <p className="type-body-3 text-grey-grey flex-1 mb-4">{post.description}</p>
        <div className="flex items-center justify-between text-xs">
          <span className="text-grey-inactive">
            By @
            {post.username}
          </span>
          <div className="flex gap-4">
            <span className="text-grey-grey">
              ❤
              {post.likes}
            </span>
            <span className="text-grey-grey">
              💬
              {post.comments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPageCard;
