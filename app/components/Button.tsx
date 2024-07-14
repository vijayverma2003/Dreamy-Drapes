import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { GoPlus } from "react-icons/go";

interface ButtonProps {
  label: string;
  Component?: IconType;
}

const Button = ({ label, Component }: ButtonProps) => {
  return (
    <button className="bg-blue-600 px-4 py-3 text-xs rounded-full flex items-center gap-2">
      <span>{label}</span> {Component ? <Component size={16} /> : null}
    </button>
  );
};

export default Button;
