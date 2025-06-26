import React from "react";

const badgeStyles = {
  default: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
  outline: "border border-gray-300 text-gray-800",
};

export const Badge = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  return (
    <span
     
      {...props}
    >
      {children}
    </span>
  );
};
