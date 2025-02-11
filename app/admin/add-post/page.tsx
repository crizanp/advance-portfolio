"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import slugify from "slugify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/github.css";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (title) {
      setSlug(slugify(title, { lower: true, strict: true }));
    }
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    const postData = {
      title,
      content,
      imageUrl,
      slug,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (res.ok) {
      router.push("/admin");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
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
    "indent",
    "align",
    "script",
    "blockquote",
    "link",
    "image",
    "video",
    "code-block",
  ];

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Post</h1>
      <form onSubmit={handleSubmit} className="mx-auto bg-white p-8 shadow-md rounded-md">
        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Post Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the post title"
            required
          />
        </div>

        {/* Slug Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Slug (Auto-generated, but editable)</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Post URL slug"
          />
        </div>

        {/* Image URL Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter an image URL for the post"
          />
        </div>

        {/* HTML Content Field with React Quill */}
        <div className="mb-16">
          <label className="block text-gray-700">Content</label>
          <ReactQuill
            className="w-full h-60"
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="Write the content of your post, including code snippets..."
          />
        </div>

        {/* Category Field */}
        <div className="mb-6 mt-6">
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Tags (comma-separated)</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags (comma-separated)"
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}
