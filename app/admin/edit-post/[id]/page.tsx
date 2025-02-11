"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import slugify from "slugify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; 

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const [imageUrl, setImageUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); 
  const [tags, setTags] = useState(""); 
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.imageUrl);
        setSlug(data.slug);
        setCategory(data.category);
        setTags(data.tags ? data.tags.join(", ") : ""); 
      } else {
        console.log("Error fetching post:", res.statusText);
      }
    }

    async function fetchCategories() {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } else {
        console.log("Error fetching categories:", res.statusText);
      }
    }

    fetchPost();
    fetchCategories();
  }, [id]);

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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      console.log("Error updating post:", res.statusText);
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
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Post</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto bg-white p-8 shadow-md rounded-md max-w-xxl"
      >
        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Post Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Slug Field */}
        <div className="mb-4">
          <label className="block text-gray-700">
            Slug (Auto-generated, but editable)
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
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
          />
        </div>

        {/* Category Field */}
        <div className="mb-6">
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
