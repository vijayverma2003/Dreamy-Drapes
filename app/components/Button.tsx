import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
  Component?: IconType;
}

const Button = ({ label, Component, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-600 px-4 py-3 text-xs rounded-full flex items-center gap-2 ${className}`}
      {...props}
    >
      <span>{label}</span> {Component ? <Component size={16} /> : null}
    </button>
  );
};

export default Button;
