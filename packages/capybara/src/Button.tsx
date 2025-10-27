import { ReactNode, CSSProperties } from "react";

export interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
}

const getVariantStyles = (variant: string): CSSProperties => {
  switch (variant) {
    case "secondary":
      return {
        backgroundColor: "#6c757d",
        color: "white",
      };
    case "danger":
      return {
        backgroundColor: "#dc3545",
        color: "white",
      };
    default:
      return {
        backgroundColor: "#007bff",
        color: "white",
      };
  }
};

const getSizeStyles = (size: string): CSSProperties => {
  switch (size) {
    case "small":
      return {
        padding: "0.25rem 0.5rem",
        fontSize: "0.875rem",
      };
    case "large":
      return {
        padding: "0.75rem 1.5rem",
        fontSize: "1.25rem",
      };
    default:
      return {
        padding: "0.5rem 1rem",
        fontSize: "1rem",
      };
  }
};

export function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseStyles: CSSProperties = {
    border: "none",
    borderRadius: "4px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 500,
    transition: "all 0.2s ease-in-out",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
  };

  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);

  const buttonStyles: CSSProperties = {
    ...baseStyles,
    ...variantStyles,
    ...sizeStyles,
  };

  return (
    <button style={buttonStyles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
