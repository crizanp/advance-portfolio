"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function EngineeringNotes() {
  const [semesters, setSemesters] = useState([]);  
  const [selectedSemester, setSelectedSemester] = useState("");  
  const [subjects, setSubjects] = useState([]);    
  useEffect(() => {
    async function fetchSemesters() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/semesters`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setSemesters(data); 
      } else {
        console.error("Error fetching semesters");
      }
    }
    fetchSemesters();
  }, []);
  useEffect(() => {
    if (selectedSemester) {
      const semester = semesters.find((sem) => sem._id === selectedSemester);
      if (semester && semester.subjects) {
        setSubjects(semester.subjects);
      } else {
        setSubjects([]);
      }
    }
  }, [selectedSemester, semesters]);
  return (
    <div className="container mx-auto p-8 text-black">
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
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Select a Semester</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {semesters.map((semester) => (
            <button
              key={semester._id}
              onClick={() => setSelectedSemester(semester._id)}
              className={`p-4 bg-gray-200 hover:bg-blue-400 text-center rounded-lg ${
                selectedSemester === semester._id ? "bg-blue-500 text-white" : ""
              }`}
            >
              {semester.name}
            </button>
          ))}
        </div>
      </div>
      {}
      {selectedSemester && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Subjects for {semesters.find((sem) => sem._id === selectedSemester)?.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <Link href={`/engineering-notes/subject/${subject._id}`} key={subject._id}>
                  <div className="p-4 bg-gray-200 hover:bg-green-400 text-center rounded-lg">
                    {subject.name}
                  </div>
                </Link>
              ))
            ) : (
              <p>No subjects available for this semester.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}