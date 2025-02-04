// components/PostModal.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import parse, { domToReact } from "html-react-parser";
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";
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
  const colors = ["#93C5FD", "#F9A8D4", "#C4B5FD"];
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
          className: `font-bold my-4 text-gray-800 ${domNode.name === "h1" ? "text-3xl sm:text-4xl" :
            domNode.name === "h2" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 overflow-y-hidden">
      <div className="w-full  bg-white  shadow-xl overflow-y-auto max-h-[100vh] my-8 custom-scroll">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative"
        >
          <button
            onClick={onClose}
            className="fixed top-1 right-4 z-50 bg-white text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md shadow-sm hover:shadow-md transition-all text-sm font-medium border border-gray-200"
          >
            Close
          </button>
          {loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <PuffLoader color="#3B82F6" size={100} />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] p-6">
              <h1 className="text-3xl mb-4 text-gray-800">OOPS!</h1>
              <h2 className="text-gray-600 text-lg mb-4">{error}</h2>
              <button
                onClick={onClose}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg"
              >
                Go Back
              </button>
            </div>
          ) : post && (
            <div className="p-3 sm:p-8">
              <main className="max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 text-center">
                  {post.title}
                </h1>
                <p className="text-gray-500 mb-6 text-center text-sm sm:text-base">
                  {formatDate(post.createdAt)}
                </p>

                {post.imageUrl && (
                  <div className="mb-8 mx-auto max-w-full px-4">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-auto rounded-lg shadow-sm cursor-zoom-in border border-gray-200"
                      onClick={() => {
                        setSelectedImage(post.imageUrl);
                        setIsImageModalOpen(true);
                      }}
                    />
                  </div>
                )}

                {tableOfContents.length > 0 && (
                  <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Table of Contents</h2>
                    <ul className="space-y-2">
                      {tableOfContents.map((heading, index) => (
                        <li key={index} className="flex items-center">
                          <FontAwesomeIcon
                            icon={faLink}
                            className="text-blue-500 mr-2 text-sm"
                          />
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
              </main>
            </div>
          )}

          {isImageModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4">
              <div className="relative max-w-4xl w-full">
                <div className="bg-white p-2 rounded-lg shadow-xl">
                  <img
                    src={selectedImage}
                    alt="Enlarged content"
                    className="max-w-full max-h-[90vh] object-contain rounded"
                  />
                </div>
                <button
                  className="absolute top-4 right-4 text-white hover:text-gray-200"
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
    </div>
  );
}