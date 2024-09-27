"use client"
import React, { useState } from "react";
import FormHeader from "./FormHeader";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import FormActions from "./FormActions";

export default function CreateUser() {
  // State variables to manage form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to handle form submission success or error
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    const user = { name, email, password };

    try {
      const response = await fetch("http://localhost:8000/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setMessage("User created successfully!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        throw new Error("Failed to create user.");
      }
    } catch (error:any) {
      setMessage(error.message);
    }
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setPassword("");
    setMessage(null);
  };

  return (
    <div className="flex flex-col items-center py-10 min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <FormHeader title="Create a New User" />

        <NameInput name={name} setName={setName} />
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />

        {/* Display any success or error message */}
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        <FormActions handleSubmit={handleSubmit} handleCancel={handleCancel} />
      </div>
    </div>
  );
}
