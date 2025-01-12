"use client";
import type { ReactNode } from "react";

type IProps = {
  image: string;
  title: string;
  children: ReactNode;
};

export const LoginAndRegisterLayout = ({ children, title, image }: IProps) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl w-full">
      <figure className="lg:w-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt="Random image"
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body lg:w-1/2">
        <h2 className="card-title text-2xl font-bold mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};
