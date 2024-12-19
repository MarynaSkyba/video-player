import { Button as ShadcnButton } from "./ui/button";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <ShadcnButton
      className={`bg-[#CAF34E] text-black px-10 py-4 rounded-full  hover:bg-[#A0D300] ${className}`}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;
