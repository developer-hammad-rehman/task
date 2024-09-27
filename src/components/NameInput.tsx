import React from "react";

type NameInputProps = {
  name: string;
  setName: (name: string) => void;
};

export default function NameInput({ name, setName }: NameInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 mb-2">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Enter your name"
      />
    </div>
  );
}
