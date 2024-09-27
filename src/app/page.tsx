"use client";
import { IUsers } from "@/utils";
import { useEffect, useState } from "react";
import { UserRound, Edit, Trash } from "lucide-react"; // Importing icons
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState<IUsers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which user is being edited
  const [editName, setEditName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");

  const searchQuery = useSearchParams();
  const fromIndex = parseInt(searchQuery.get("from_index") || "1");
  const toIndex = parseInt(searchQuery.get("to_index") || "10");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/users/?from_index=${fromIndex}&to_index=${toIndex}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((val) => {
        setData(val);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [fromIndex, toIndex]);

  const handleUpdate = async (index: number) => {
    const userToUpdate = data[index];
    const updatedUser = { email: userToUpdate.email, new_email: editEmail || userToUpdate.email, name: editName || userToUpdate.name, password: userToUpdate.password };

    try {
      const response = await fetch(`http://localhost:8000/update-user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setData((prevData) => {
          const newData = [...prevData];
          newData[index] = updatedUser;
          return newData;
        });
        setEditIndex(null);
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error:any) {
      setError(error.message);
    }
  };

  const handleDelete = async (index: number) => {
    const userToDelete = data[index];
    try {
      const response = await fetch(`http://localhost:8000/delete-user/${userToDelete.email}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((_, i) => i !== index));
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error:any) {
      setError(error.message);
    }
  };

  if (loading) return <div className="text-center pt-10">Loading users...</div>;
  if (error) return <div className="text-center pt-10 text-red-600">{error}</div>;

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen">
      {/* User Grid */}
      <div className="flex flex-wrap gap-8 justify-center items-center w-3/4">
        {data.map((user, i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center p-6 rounded-lg shadow-lg cursor-pointer bg-white transition-transform transform hover:scale-110 hover:shadow-xl"
          >
            <UserRound size={50} className="text-blue-600" />
            {editIndex === i ? (
              <div className="mt-4">
                {/* Edit Mode */}
                <input
                  type="text"
                  value={editName}
                  placeholder="Name"
                  onChange={(e) => setEditName(e.target.value)}
                  className="border px-2 py-1 mb-2 rounded"
                />
                <input
                  type="email"
                  value={editEmail}
                  placeholder="Email"
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="border px-2 py-1 mb-2 rounded"
                />
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleUpdate(i)}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    onClick={() => setEditIndex(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Display Mode */}
                <p className="mt-4 text-lg font-medium text-gray-700">{user.name}</p>
                <p className="text-md text-gray-500">{user.email}</p>
                <div className="flex gap-2 mt-4">
                  {/* Edit Button */}
                  <button
                    className="bg-blue-500 text-white px-3 py-2 rounded shadow hover:bg-blue-600"
                    onClick={() => {
                      setEditIndex(i);
                      setEditName(user.name);
                      setEditEmail(user.email);
                    }}
                  >
                    <Edit size={16} />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded shadow hover:bg-red-600"
                    onClick={() => handleDelete(i)}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="mt-10 flex gap-6">
        {/* Previous Button */}
        {fromIndex > 1 && (
          <Link
            href={`/?from_index=${Math.max(1, fromIndex - 10)}&to_index=${fromIndex - 1}`}
            className="bg-white text-blue-600 px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Previous
          </Link>
        )}

        {/* Next Button */}
        <Link
          href={`/?from_index=${toIndex + 1}&to_index=${toIndex + 10}`}
          className="bg-white text-blue-600 px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
        >
          Next
        </Link>
      </div>
    </div>
  );
}
