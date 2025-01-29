import type { ReactNode } from "react";

interface IProps {
  styleClass: string;
  children: ReactNode;
}

export const ErrorText = ({ styleClass, children }: IProps) => {
  return <p className={`text-center  text-error ${styleClass}`}>{children}</p>;
};
