"use client";
import useWindowDimensions from "@/hooks/window-hooks";
import { type ReactNode, useEffect, useRef, useState } from "react";

type IProps = {
  image: string;
  title: string;
  children: ReactNode;
};

export const LoginAndRegisterLayout = ({ children, title, image }: IProps) => {
  // this state is used to center the card vertically
  const [margin, setMargin] = useState(0);
  const { height } = useWindowDimensions();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setMargin((height - ref.current.clientHeight) / 2);
    }
  }, [height]);

  return (
    <div
      ref={ref}
      className="card lg:card-side bg-base-100 shadow-xl max-w-4xl w-full"
      style={{ marginTop: `${margin}px` }}
    >
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
