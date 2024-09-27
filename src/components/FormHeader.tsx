import React from "react";

type FormHeaderProps = {
  title: string;
};

export default function FormHeader({ title }: FormHeaderProps) {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
    </div>
  );
}
