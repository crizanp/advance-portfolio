"use client";
import React, { useState, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";
import { motion } from "framer-motion";
import parse, { domToReact } from "html-react-parser";
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import Link from "next/link";
import PuffLoader from "react-spinners/PuffLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faTimes, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import QuoteCardModal from "./QuoteCardModal";
import { FaFacebook, FaTwitter, FaLinkedin, FaLink } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
const getRawTextFromDomNode = (node) => {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(getRawTextFromDomNode).join("");
  if (node?.props?.children) return getRawTextFromDomNode(node.props.children);
  return "";
};

const CopyableQuote = ({ quoteContent, children, handleGenerateCard }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(quoteContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-50 rounded-lg my-5 shadow-md border border-gray-200">
      <FontAwesomeIcon
        icon={faQuoteLeft}
        className="text-blue-500 text-2xl absolute -top-3 left-3 bg-white p-1 rounded-full"
      />
      <blockquote className="text-lg italic text-gray-800 pl-10 pr-5 py-4">
        {children}
      </blockquote>
      <div className="flex justify-center mt-3 pb-2">
        <button
          className={`text-center text-xs px-3 mr-1 py-2 rounded-md font-semibold shadow-sm transition-colors duration-200 ${copied ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          onClick={handleCopyQuote}
        >
          {copied ? "Copied!" : "Copy Quote"}
        </button>
        <button
          className="text-center text-xs px-3 py-2 ml-1 rounded-md font-semibold shadow-sm transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleGenerateCard(quoteContent, "Author Name")}
        >
          Make Card
        </button>
      </div>
    </div>
  );
};

const customParseOptions = (headingList, handleGenerateCard) => ({
  replace: (domNode) => {
    if (["h1", "h2", "h3"].includes(domNode.name)) {
      const headingText = getRawTextFromDomNode(domToReact(domNode.children));
      if (!headingText.trim()) return null;
      const headingId = headingText.toLowerCase().replace(/\s+/g, "-");

      if (!headingList.some(item => item.id === headingId)) {
        headingList.push({ id: headingId, text: headingText, tag: domNode.name });
      }

      return React.createElement(
        domNode.name,
        {
          id: headingId,
          className: `font-bold my-4 text-gray-800 ${domNode.name === "h1" ? "text-3xl sm:text-4xl" : domNode.name === "h2" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`,
        },
        domToReact(domNode.children)
      );
    }

    if (domNode.name === "ul") {
      return (
        <ul className="list-disc pl-6 my-4 text-gray-800">
          {domToReact(domNode.children)}
        </ul>
      );
    }

    if (domNode.name === "li") {
      return <li className="text-gray-800">{domToReact(domNode.children)}</li>;
    }

    if (domNode.name === "p") {
      return (
        <p className="text-gray-700 leading-relaxed my-4">
          {domToReact(domNode.children)}
        </p>
      );
    }

    if (domNode.name === "a") {
      const href = domNode.attribs?.href || "#";
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:text-purple-800 transition-colors"
        >
          {domToReact(domNode.children)}
        </a>
      );
    }

    if (domNode.name === "blockquote") {
      const quoteContent = getRawTextFromDomNode(domToReact(domNode.children));
      return (
        <CopyableQuote quoteContent={quoteContent} handleGenerateCard={handleGenerateCard}>
          {domToReact(domNode.children)}
        </CopyableQuote>
      );
    }

    if (domNode.attribs?.class === "ql-syntax") {
      const codeContent = getRawTextFromDomNode(domToReact(domNode.children));
      const language = domNode.attribs["data-language"] || "javascript";
      const highlightedCode = Prism.highlight(codeContent, Prism.languages[language], language);

      const CopyableCode = () => {
        const [copied, setCopied] = useState(false);

        return (
          <div className="relative bg-gray-50 p-4 rounded-lg mb-6 shadow-sm border border-gray-200 overflow-x-auto">
            <pre className="text-sm font-mono text-gray-700 leading-relaxed whitespace-pre-wrap">
              <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
            <button
              className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-md font-semibold shadow-sm transition-colors duration-200 ${copied ? "bg-blue-100 text-blue-800" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onClick={() => {
                navigator.clipboard.writeText(codeContent);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        );
      };

      return <CopyableCode />;
    }
  },
});


export default function BlogDetail({ params }) {
  const { slug } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedQuote, setSelectedQuote] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/slug/${slug}`);
        if (!response.ok) throw new Error("Post not found");
        const postData = await response.json();

        const headingList = [];
        parse(postData.content, customParseOptions(headingList, handleGenerateCard));

        setPost(postData);
        setTableOfContents(headingList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleGenerateCard = (quote, author) => {
    setSelectedQuote(quote);
    setSelectedAuthor(author || "Author");
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PuffLoader color="#3B82F6" size={100} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-3xl my-4 text-gray-800">Post Not Found</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <main className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="mb-8 text-gray-600 hover:text-gray-800 text-sm font-medium"
        >
          ← Back to Posts
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold my-6 text-gray-900">
          {post.title}
        </h1>
        {post.createdAt && (
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Published {formatDate(post.createdAt)}
          </p>
        )}
        <div className="relative">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-10"
          >
            <div className="flex flex-col gap-4 items-center bg-white p-3 rounded-2xl shadow-lg">
              <span className="text-sm font-medium text-purple-600 flex items-center gap-1">
                <FiShare2 /> Share
              </span>
              <div className="flex flex-col gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(`${window.location.origin}/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800 transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`);
                  }}
                  className="text-gray-600 hover:text-gray-700 transition-colors"
                >
                  <FaLink size={20} />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="md:hidden mb-4">
            <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-md">
              <span className="text-sm font-medium text-purple-600 flex items-center gap-1">
                <FiShare2 /> Share
              </span>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                >
                  <FaTwitter size={24} />
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`);
                  }}
                  className="text-gray-600 hover:text-gray-700 transition-colors"
                >
                  <FaLink size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {post.imageUrl && (
          <div className="mb-8">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-sm cursor-zoom-in border border-gray-200"
              onClick={() => setSelectedImage(post.imageUrl)}
            />
          </div>
        )}

        {tableOfContents.length > 0 && (
          <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Table of Contents</h2>
            <ul className="space-y-2">
              {tableOfContents.map((heading, index) => (
                <li key={index} className="flex items-center">
                  <FontAwesomeIcon icon={faLink} className="text-blue-500 mr-2 text-sm" />
                  <a
                    href={`#${heading.id}`}
                    className="text-gray-700 hover:text-blue-600 text-sm sm:text-base"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <article className="prose prose-gray max-w-none">
          {parse(post.content, customParseOptions([], handleGenerateCard))}
        </article>

        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="relative max-w-4xl w-full">
              <div className="bg-white p-2 rounded-lg shadow-xl">
                <img
                  src={selectedImage}
                  alt="Enlarged preview"
                  className="max-w-full max-h-[90vh] object-contain rounded"
                />
              </div>
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-200"
                onClick={() => setSelectedImage("")}
              >
                <FontAwesomeIcon icon={faTimes} size="2x" />
              </button>
            </div>
          </div>
        )}

        <QuoteCardModal
          quote={selectedQuote}
          author={selectedAuthor}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
}