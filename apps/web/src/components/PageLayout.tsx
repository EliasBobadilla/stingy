import { ReactNode } from "react";
import LocaleSwitcher from "./LocaleSwitcher";

type Props = {
  children?: ReactNode;
  title: string;
};
// TODO: check styles
export default function PageLayout({ children, title }: Props) {
  return (
    <>
      <h1>{title}</h1>
      {children}
      <div style={{ marginTop: 24 }}>
        <LocaleSwitcher />
      </div>
    </>
  );
}
