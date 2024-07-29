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
      className={`btn btn-info px-5 py-2 text-xs rounded-full flex items-center gap-2 ${className}`}
      {...props}
    >
      <span>{label}</span> {Component ? <Component size={16} /> : null}
    </button>
  );
};

export default Button;
