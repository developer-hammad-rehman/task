import React from "react";

type FormActionsProps = {
  handleSubmit: () => void;
  handleCancel: () => void;
};

export default function FormActions({ handleSubmit, handleCancel }: FormActionsProps) {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition duration-300"
      >
        Create User
      </button>
      <button
        onClick={handleCancel}
        className="px-4 py-2 bg-gray-400 text-white rounded-md shadow hover:bg-gray-500 transition duration-300"
      >
        Cancel
      </button>
    </div>
  );
}
