import React from "react";

type EmailInputProps = {
  email: string;
  setEmail: (email: string) => void;
};

export default function EmailInput({ email, setEmail }: EmailInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 mb-2">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Enter your email"
      />
    </div>
  );
}
