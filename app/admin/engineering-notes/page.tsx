"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
      async function fetchSubjects() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/semesters/${selectedSemester}/subjects`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setSubjects(data);  
        } else {
          console.error("Error fetching subjects");
        }
      }
      fetchSubjects();
    }
  }, [selectedSemester]);
  return (
    <div className="container mx-auto p-8 text-black">
      <h1 className="text-3xl font-bold mb-8 text-center">Engineering Notes</h1>
      {}
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