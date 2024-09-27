import React from "react";

type PasswordInputProps = {
  password: string;
  setPassword: (password: string) => void;
};

export default function PasswordInput({ password, setPassword }: PasswordInputProps) {
  return (
    <div className="mb-6">
      <label className="block text-gray-600 mb-2">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Enter your password"
      />
    </div>
  );
}
