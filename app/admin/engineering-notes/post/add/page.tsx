"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import dynamic from "next/dynamic"; 
import "react-quill/dist/quill.snow.css"; 
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function AddPostToSubject() {
  const [semesters, setSemesters] = useState([]); 
  const [selectedSemester, setSelectedSemester] = useState(""); 
  const [subjects, setSubjects] = useState([]); 
  const [selectedSubject, setSelectedSubject] = useState(""); 
  const [title, setTitle] = useState(""); 
  const [content, setContent] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const router = useRouter(); 
  useEffect(() => {
    async function fetchSemesters() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/semesters`);
        if (!res.ok) throw new Error("Failed to fetch semesters");
        const data = await res.json();
        setSemesters(data);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    }
    fetchSemesters();
  }, []);
  useEffect(() => {
    if (selectedSemester) {
      const semester = semesters.find((sem) => sem.name === selectedSemester);
      setSubjects(semester?.subjects || []);
    }
  }, [selectedSemester, semesters]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    if (!title || !content || !selectedSemester || !selectedSubject) {
      alert("Please fill all required fields.");
      setLoading(false);
      return;
    }
    const postData = {
      title,
      content,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/semesters/${encodeURIComponent(selectedSemester)}/subjects/${encodeURIComponent(selectedSubject)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      if (!res.ok) throw new Error("Failed to add post");
      alert("Post added successfully!");
      setTitle("");
      setContent("");
      setSelectedSemester("");
      setSelectedSubject("");
      router.push("/admin"); 
    } catch (error) {
      alert("Failed to add post.");
      console.error("Error adding post:", error);
    } finally {
      setLoading(false); 
    }
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }], 
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }], 
      ["blockquote", "code-block"], 
      ["link", "image"], 
      ["clean"], 
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image",
    "code-block",
  ];
  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-md text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Post to Subject</h1>
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
        {}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Select Semester</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem.name} value={sem.name}>
                {sem.name}
              </option>
            ))}
          </select>
        </div>
        {}
        {selectedSemester && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Select Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.name} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {}
        <div className="mb-8">
          <label className="block text-gray-700 font-bold mb-2">Post Content</label>
          <ReactQuill
            className="w-full h-64"
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
          />
        </div>
        {}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 mt-9 px-4 rounded hover:bg-blue-700 transition ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding Post..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}