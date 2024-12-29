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
      <div
        style={{
          boxSizing: "border-box",
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1.5,
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 510 }}>
          <h1>{title}</h1>
          {children}
          <div style={{ marginTop: 24 }}>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
