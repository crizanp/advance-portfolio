"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import type ReactQuill from 'react-quill';

// Define types
interface PostData {
  title: string;
  content: string;
  slug: string;
}

interface DataTransferItem {
  type: string;
  getAsFile(): File | null;
}

// Dynamic import with types
const ReactQuillComponent = dynamic(
  () => import("react-quill"),
  { 
    ssr: false,
    loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded" />
  }
) as typeof ReactQuill;

// Image compression utility function
const compressImage = async (base64Str: string, maxWidth = 800): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(base64Str);

      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
      resolve(compressedBase64);
    };
  });
};

export default function EditPost() {
  const [post, setPost] = useState<PostData | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const quillRef = useRef<ReactQuill | null>(null);
  const router = useRouter();
  const params = useParams();
  const semesterName = params.semesterName as string;
  const subjectName = params.subjectName as string;
  const slug = params.slug as string;
  const token = Cookies.get("token");

  const handlePaste = useCallback(async (e: ClipboardEvent) => {
    const clipboard = e.clipboardData;
    if (!clipboard || !quillRef.current) return;

    const items = Array.from(clipboard.items) as DataTransferItem[];
    const imageItem = items.find(item => item.type.indexOf('image') !== -1);

    if (imageItem) {
      e.preventDefault();
      const file = imageItem.getAsFile();
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          if (typeof event.target?.result !== 'string') return;
          const compressedBase64 = await compressImage(event.target.result);
          
          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection(true);
          if (range) {
            quill?.insertEmbed(range.index, 'image', compressedBase64);
          }
        } catch (err) {
          setError('Failed to process image. Please try again.');
        }
      };
      
      reader.readAsDataURL(file);
    }
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const container = editor.root;
      
      container.addEventListener('paste', handlePaste);
      
      return () => {
        container.removeEventListener('paste', handlePaste);
      };
    }
  }, [handlePaste]);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    async function fetchPost() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/semesters/${semesterName}/subjects/${subjectName}/posts/${slug}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const error = await res.text();
          throw new Error(error || 'Failed to fetch post');
        }

        const postData = await res.json();
        setPost(postData);
        setTitle(postData.title);
        setContent(postData.content);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [semesterName, subjectName, slug, token, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const contentSize = new Blob([content]).size;
    if (contentSize > 10 * 1024 * 1024) {
      setError("Content size too large. Please reduce image sizes or use fewer images.");
      setIsSubmitting(false);
      return;
    }
    
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/semesters/${semesterName}/subjects/${subjectName}/posts/${slug}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            title: title.trim(), 
            content: content.trim() 
          }),
        }
      );
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to update post');
      }
      
      router.push(`/admin/engineering-notes/post/view`);
    } catch (error) {
      console.error("Update error:", error);
      setError(error instanceof Error ? error.message : 'Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();

          input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = async (e) => {
                try {
                  if (typeof e.target?.result !== 'string') return;
                  const compressedBase64 = await compressImage(e.target.result);
                  const quill = quillRef.current?.getEditor();
                  const range = quill?.getSelection(true);
                  if (range) {
                    quill?.insertEmbed(range.index, 'image', compressedBase64);
                  }
                } catch (err) {
                  setError('Failed to process image. Please try again.');
                }
              };
              reader.readAsDataURL(file);
            }
          };
        }
      }
    },
    clipboard: {
      matchVisual: false,
    }
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
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Post</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex justify-between items-center">
          <span>{error}</span>
          <button 
            onClick={() => setError(null)}
            className="text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {post ? (
        <form onSubmit={handleUpdate} className="mx-auto max-w-4xl">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Post Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-8">
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
              Post Content
            </label>
            <div className="h-96 border rounded">
              <ReactQuillComponent
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="h-full"
                readOnly={isSubmitting}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Tip: You can paste images directly or use the image button to upload them
            </p>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-5 w-5 mr-3 border-b-2 border-white rounded-full" />
                Updating Post...
              </span>
            ) : (
              "Update Post"
            )}
          </button>
        </form>
      ) : (
        <div className="text-center text-gray-600 p-4 bg-gray-50 rounded">
          Post not found
        </div>
      )}
    </div>
  );
}