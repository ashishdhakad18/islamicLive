"use client";

import React from "react";

interface Block {
  type: string;
  children: any[];
  format?: string;
  level?: number;
  image?: any;
}

interface RichTextRendererProps {
  content: Block[];
  className?: string;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  content,
  className,
}) => {
  if (!content || !Array.isArray(content)) return null;

  const renderText = (children: any[]) => {
    return children.map((child, index) => {
      if (child.type === "text") {
        let text = child.text;
        if (child.bold) text = <strong key={index}>{text}</strong>;
        if (child.italic) text = <em key={index}>{text}</em>;
        if (child.underline) text = <u key={index}>{text}</u>;
        if (child.strikethrough) text = <s key={index}>{text}</s>;
        if (child.code)
          text = (
            <code key={index} className="bg-grey-lighter px-1 rounded">
              {text}
            </code>
          );
        return <React.Fragment key={index}>{text}</React.Fragment>;
      }
      if (child.type === "link") {
        return (
          <a
            key={index}
            href={child.url}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {renderText(child.children)}
          </a>
        );
      }
      return null;
    });
  };

  return (
    <div className={`rich-text-renderer ${className || ""}`}>
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            // Handle empty paragraphs as spacing
            const hasText = block.children.some(
              (child) => child.text && child.text.trim() !== ""
            );
            if (!hasText) return <div key={index} className="h-4" />;
            return (
              <p key={index} className="type-body-2 text-grey-grey mb-4">
                {renderText(block.children)}
              </p>
            );
          case "heading":
            const level = block.level || 1;
            const headingClasses =
              {
                1: "type-h1",
                2: "type-h2",
                3: "type-h3",
                4: "type-h4",
                5: "type-h5",
                6: "type-h6",
              }[level as 1 | 2 | 3 | 4 | 5 | 6] || "type-h4";
            const HeadingTag = `h${level}` as any;
            return (
              <HeadingTag
                key={index}
                className={`${headingClasses} font-bold text-grey-black uppercase mt-6 mb-3`}
              >
                {renderText(block.children)}
              </HeadingTag>
            );
          case "list":
            const ListTag = block.format === "ordered" ? "ol" : "ul";
            const listClasses =
              block.format === "ordered"
                ? "list-decimal ml-6"
                : "list-disc ml-6";
            return (
              <ListTag
                key={index}
                className={`${listClasses} space-y-2 mb-4 text-grey-grey`}
              >
                {block.children.map((item, i) => (
                  <li key={i} className="type-body-2">
                    {renderText(item.children)}
                  </li>
                ))}
              </ListTag>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-primary pl-4 italic bg-grey-lighter py-2 rounded mb-4"
              >
                {renderText(block.children)}
              </blockquote>
            );
          case "image":
            if (!block.image) return null;
            return (
              <div
                key={index}
                className="relative w-full aspect-video rounded-lg overflow-hidden my-4"
              >
                <img
                  src={block.image.url}
                  alt={block.image.alternativeText || ""}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
