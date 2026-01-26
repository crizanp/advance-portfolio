"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function AddSemester() {
  const [semesterName, setSemesterName] = useState("");
  const [semesters, setSemesters] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const fetchSemesters = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/semesters`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to load semesters");
      }
      const data = await res.json();
      setSemesters(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSemesters();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/semesters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: semesterName }),
      });
      if (!res.ok) {
        throw new Error("Failed to add semester");
      }
      alert("Semester added successfully!");
      setSemesterName("");
      fetchSemesters(); 
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="container mx-auto p-6 text-black">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Admin Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/engineering-notes/semester/add">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Add Semester
            </button>
          </Link>
          <Link href="/admin/engineering-notes/semester/view">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              View Semesters
            </button>
          </Link>
          <Link href="/admin/engineering-notes/subject/add">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Add Subject
            </button>
          </Link>
          <Link href="/admin/engineering-notes/subject/view">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              View/Edit Subjects
            </button>
          </Link>
          <Link href="/admin/engineering-notes/post/view">
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
              Manage Posts
            </button>
          </Link>
          <Link href="/admin/engineering-notes/post/add">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Add Post
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Semester</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Semester Name
            </label>
            <input
              type="text"
              value={semesterName}
              onChange={(e) => setSemesterName(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="Enter semester name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Add Semester
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">View All Semesters</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading semesters...</p>
        ) : (
          <ul className="space-y-2">
            {semesters.length > 0 ? (
              semesters.map((semester) => (
                <li
                  key={semester.name}
                  className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition-all"
                >
                  <span className="text-lg font-semibold text-gray-700">{semester.name}</span>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No semesters available</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}