"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function AddSubject() {
  const [semesters, setSemesters] = useState([]); 
  const [selectedSemester, setSelectedSemester] = useState(""); 
  const [subjectName, setSubjectName] = useState(""); 
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    async function fetchSemesters() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/semesters`);
        if (!res.ok) throw new Error("Failed to fetch semesters");
        const data = await res.json();
        setSemesters(data);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchSemesters();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/semesters/${selectedSemester}/subject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subjectName }),
        }
      );
      if (res.ok) {
        alert("Subject added successfully!");
        setSubjectName(""); 
      } else {
        throw new Error("Failed to add subject");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false); 
    }
  };
  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-md text-black">
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
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Add Subject to Semester
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Select Semester</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select</option>
            {semesters.map((sem) => (
              <option key={sem.name} value={sem.name}>
                {sem.name}
              </option>
            ))}
          </select>
        </div>
        {}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Subject Name</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        {}
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          }`}
          disabled={loading}
        >
          {loading ? "Adding Subject..." : "Add Subject"}
        </button>
      </form>
    </div>
  );
}