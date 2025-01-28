// components/PostModal.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import parse, { domToReact } from "html-react-parser";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import Link from "next/link";
import PuffLoader from "react-spinners/PuffLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faTimes, faQuoteLeft, faCopy } from "@fortawesome/free-solid-svg-icons";
import QuoteCardModal from "./QuoteCardModal";
import React from "react";

const FloatingBubbles = () => {
  const colors = ["#4C51BF", "#ED64A6", "#9F7AEA"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            backgroundColor: colors[index % colors.length],
            width: `${Math.random() * 80 + 40}px`,
            height: `${Math.random() * 80 + 40}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.2,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [0.5, 1, 0.5],
            transition: { duration: Math.random() * 5 + 3, repeat: Infinity },
          }}
        />
      ))}
    </div>
  );
};

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
    <div className="relative bg-gray-800 p-4 rounded-lg my-5 shadow-lg">
      <FontAwesomeIcon
        icon={faQuoteLeft}
        className="text-blue-400 text-2xl absolute -top-3 left-3"
      />
      <blockquote className="text-lg italic text-gray-200 pl-10">
        {children}
      </blockquote>
      <div className="flex justify-center mt-3">
        <button
          className={`text-center text-xs px-3 mr-1 py-2 rounded-md font-semibold shadow-sm transition-colors duration-200 ${
            copied ? "bg-blue-300 text-gray-800 hover:bg-blue-500" : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
          onClick={handleCopyQuote}
        >
          {copied ? "Copied!" : "Copy Quote"}
        </button>
        <button
          className="text-center text-xs px-3 py-2 ml-1 rounded-md font-semibold shadow-sm transition-colors duration-200 bg-blue-500 text-white"
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
          className: `font-bold my-2 ${
            domNode.name === "h1" ? "text-4xl" : 
            domNode.name === "h2" ? "text-3xl" : "text-2xl"
          }`
        },
        domToReact(domNode.children)
      );
    }

    if (domNode.attribs?.class === "ql-syntax") {
      const codeContent = getRawTextFromDomNode(domToReact(domNode.children));
      const language = domNode.attribs["data-language"] || "javascript";
      const highlightedCode = Prism.highlight(codeContent, Prism.languages[language], language);

      const CopyableCode = () => {
        const [copied, setCopied] = useState(false);

        return (
          <div className="relative bg-[#282c34] p-5 rounded-lg mb-6 shadow-lg overflow-x-auto">
            <pre className="text-sm font-mono text-gray-200 leading-relaxed whitespace-pre-wrap">
              <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
            <button
              className={`absolute top-1.5 right-2 text-xs px-2 py-2 rounded-md font-semibold shadow-sm transition-colors duration-200 ${
                copied ? "bg-blue-300 text-gray-800 hover:bg-blue-500" : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
              onClick={() => {
                navigator.clipboard.writeText(codeContent);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
        );
      };

      return <CopyableCode />;
    }

    if (domNode.name === "blockquote") {
      const quoteContent = getRawTextFromDomNode(domToReact(domNode.children));
      return (
        <CopyableQuote quoteContent={quoteContent} handleGenerateCard={handleGenerateCard}>
          {domToReact(domNode.children)}
        </CopyableQuote>
      );
    }
  },
});

export default function PostModal({ slug, isOpen, onClose }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const postResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/posts/slug/${slug}`
          );
          if (!postResponse.ok) throw new Error("Post not found");
          const currentPost = await postResponse.json();
          
          setPost(currentPost);
    

        const headingList = [];
        parse(currentPost.content, customParseOptions(headingList, handleGenerateCard));
        setTableOfContents(headingList);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, slug]);

  const handleGenerateCard = (quote, author) => {
    setSelectedQuote(quote);
    setSelectedAuthor(author || "Cizan");
    setIsQuoteModalOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? "Invalid Date" 
      : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  if (!isOpen) return null;

  return (
    <div className="w-full max-w-full sm:max-w-[75%] fixed inset-0 z-50 overflow-y-auto bg-gray-900">
    <FloatingBubbles />
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-800 rounded-lg shadow-xl p-6 sm:p-10 relative mx-auto my-20" // Added margin for spacing
    >
      {/* Close Button - Now properly positioned inside modal */}
      <button
        onClick={onClose}
        className="absolute -top-10 right-0 text-gray-400 hover:text-white z-50"
        aria-label="Close"
      >
        <FontAwesomeIcon icon={faTimes} size="2x" />
      </button>

        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <PuffLoader color="#36D7B7" size={150} />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <h1 className="text-5xl mb-4">OOPS!</h1>
            <h2 className="text-gray-400 text-xl mb-4">{error}</h2>
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Go Back
              </button>
            </div>
          </div>
        ) : post && (
          <div>
            <main>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-center">
                {post.title}
              </h1>
              <p className="text-gray-400 mb-5 text-center">{formatDate(post.createdAt)}</p>

              {post.imageUrl && (
                <div className="mb-10 text-center">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="max-w-xs md:max-w-md mx-auto rounded-lg shadow-md cursor-pointer"
                    onClick={() => {
                      setSelectedImage(post.imageUrl);
                      setIsImageModalOpen(true);
                    }}
                  />
                </div>
              )}

              {tableOfContents.length > 0 && (
                <div className="mb-10 bg-gray-800 p-5 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-white mb-4">Table of Contents</h2>
                  <ul className="space-y-2 list-disc list-inside">
                    {tableOfContents.map((heading, index) => (
                      <li key={index} className="flex items-center">
                        <FontAwesomeIcon icon={faLink} className="text-blue-400 mr-2" />
                        <a href={`#${heading.id}`} className="text-blue-500 hover:text-blue-700">
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <article className="prose lg:prose-xl dark:prose-invert mx-auto">
                {parse(post.content, customParseOptions([], handleGenerateCard))}
              </article>
            </main>
          </div>
        )}

        {isImageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative max-w-4xl">
              <img
                src={selectedImage}
                alt="Enlarged content"
                className="max-w-full max-h-screen rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white bg-gray-900 p-2 rounded hover:bg-gray-800"
                onClick={() => setIsImageModalOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} size="2x" />
              </button>
            </div>
          </div>
        )}

        <QuoteCardModal
          quote={selectedQuote}
          author={selectedAuthor}
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
        />
      </motion.div>
    </div>
  );
}