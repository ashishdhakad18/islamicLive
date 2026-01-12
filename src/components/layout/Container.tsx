"use client";
import React from "react";
const Container = ({
  children,
  className,
  childrenClassName,
}: {
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
}) => {
  return (
    <main className={`max-w-[1440px] mx-auto md:px-24 px-5 h-full ${className}`}>
      <div className={childrenClassName}>{children}</div>
    </main>
  );
};

export default Container;
