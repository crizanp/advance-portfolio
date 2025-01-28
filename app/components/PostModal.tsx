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
import React from "react"; // Add missing React import
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
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [similarPosts, setSimilarPosts] = useState([]);
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
        
        // Fetch all posts
        const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
        if (!postsResponse.ok) throw new Error("Failed to fetch posts");
        const allPosts = await postsResponse.json();

        // Find current post
        const currentPost = allPosts.find(p => p.slug === slug);
        if (!currentPost) throw new Error("Post not found");
        setPost(currentPost);

        // Set latest and similar posts
        setLatestPosts(allPosts.slice(0, 5));
        setSimilarPosts(allPosts.filter(p => 
          p.category === currentPost.category && p.slug !== currentPost.slug
        ).slice(0, 2));

        // Generate TOC
        const headingList = [];
        parse(currentPost.content, customParseOptions(headingList, handleGenerateCard));
        setTableOfContents(headingList);

        // Fetch categories and tags
        const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const tagsSet = new Set();
        allPosts.forEach(post => post.tags?.forEach(tag => tagsSet.add(tag)));
        setTags(Array.from(tagsSet));

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900">
      <FloatingBubbles />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative min-h-screen p-4 sm:p-6 lg:p-10"
      >
        <button
          onClick={onClose}
          className="fixed top-4 right-4 text-gray-400 hover:text-white z-50"
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
          <div className="lg:flex lg:space-x-5">
            <main className="lg:w-3/4">
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

              {similarPosts.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-3xl font-bold mb-5">Similar Posts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {similarPosts.map(similarPost => (
                      <Link key={similarPost._id} href={`/blog/${similarPost.slug}`}>
                        <div className="bg-gray-800 p-5 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-200">
                          <h3 className="text-xl font-semibold">{similarPost.title}</h3>
                          <p className="text-gray-400">{formatDate(similarPost.createdAt)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </main>

            <aside className="lg:w-1/4 lg:sticky lg:top-10 lg:self-start mt-10 lg:mt-0">
              <div className="bg-gray-800 p-5 rounded-lg shadow-lg space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">Categories</h2>
                  <ul className="space-y-2">
                    {categories.map(category => (
                      <li key={category._id}>
                        <Link
                          href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600 transition-all duration-200"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                        className="bg-gray-700 text-gray-400 px-2 py-1 rounded-md text-sm hover:text-white transition-all duration-200"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">Latest Posts</h2>
                  <ul className="space-y-2">
                    {latestPosts.map(post => (
                      <li key={post._id}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="block bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600 transition-all duration-200"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </aside>
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