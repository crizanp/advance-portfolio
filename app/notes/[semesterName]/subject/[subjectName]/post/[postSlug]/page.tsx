"use client";
import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import parse, { domToReact } from "html-react-parser";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css"; // Dark theme Prism color scheme
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLink, 
  faCalendarAlt, 
  faDotCircle, 
  faCheckCircle,
  faChevronRight 
} from "@fortawesome/free-solid-svg-icons";
import PuffLoader from "react-spinners/PuffLoader";
import Link from "next/link";

const FloatingBubbles = () => {
  const colors = ["#6D28D9", "#9333EA", "#4338CA"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {colors.map((color, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1], 
            scale: [0.5, 1, 0.5],
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: index * 1 
          }}
          className="absolute rounded-full blur-xl opacity-10"
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: color
          }}
        />
      ))}
    </div>
  );
};

const getRawTextFromDomNode = (node) => {
  if (typeof node === "string") return node.trim();
  if (Array.isArray(node)) {
    const text = node.map(getRawTextFromDomNode).join("").trim();
    return text;
  }
  if (node?.props?.children) {
    const text = getRawTextFromDomNode(node.props.children).trim();
    return text;
  }
  return "";
};

export default function NotesDetailPage() {
  const { semesterName, subjectName, postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [completedListItems, setCompletedListItems] = useState(new Set());

  const customParseOptions = () => {
    const headings = [];
    
    return {
      replace: (domNode) => {
        // Custom Heading Parsing (existing code)
        if (["h1", "h2", "h3"].includes(domNode.name)) {
          const headingText = getRawTextFromDomNode(domToReact(domNode.children));
          
          if (!headingText) return null;

          const headingId = headingText.toLowerCase().replace(/\s+/g, "-");

          const headingStyles = {
            h1: "text-3xl sm:text-4xl font-black text-gray-100  pb-2 mb-4 tracking-tight",
            h2: "text-2xl sm:text-3xl font-extrabold text-gray-200  pb-1 mb-3 tracking-tight",
            h3: "text-xl sm:text-2xl font-bold text-gray-300 border-l-4 border-gray-500 pl-3 mb-2 tracking-tight"
          };

          headings.push({ text: headingText, id: headingId, level: domNode.name });

          return (
            <div className="w-full">
              {React.createElement(
                domNode.name,
                { 
                  id: headingId, 
                  className: `group relative ${headingStyles[domNode.name]} ${
                    domNode.name === 'h1' ? 'mt-6' : 
                    domNode.name === 'h2' ? 'mt-4' : 
                    domNode.name === 'h3' ? 'mt-3' : ''
                  }` 
                },
                <>
                  {domToReact(domNode.children)}
                  <a 
                    href={`#${headingId}`} 
                    className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400 hover:text-gray-400"
                  >
                    <FontAwesomeIcon icon={faLink} className="ml-2" />
                  </a>
                </>
              )}
            </div>
          );
        }

        // Custom List Item Parsing
        if (domNode.name === 'li') {
          const itemText = getRawTextFromDomNode(domToReact(domNode.children));
          const itemId = itemText.toLowerCase().replace(/\s+/g, "-");

          const toggleItemCompletion = () => {
            setCompletedListItems(prev => {
              const newSet = new Set(prev);
              if (newSet.has(itemId)) {
                newSet.delete(itemId);
              } else {
                newSet.add(itemId);
              }
              return newSet;
            });
          };

          return (
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`
                group relative pl-6 py-1 rounded-lg transition-all duration-300 
                ${completedListItems.has(itemId) ? 'bg-gray-900/30 line-through text-gray-400' : 'hover:bg-gray-900/20'}
                flex items-center space-x-2
              `}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleItemCompletion}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center"
              >
                {completedListItems.has(itemId) ? (
                  <FontAwesomeIcon 
                    icon={faCheckCircle} 
                    className="text-gray-400 group-hover:text-gray-500" 
                  />
                ) : (
                  <FontAwesomeIcon 
                    icon={faChevronRight} 
                    className="text-gray-500 group-hover:text-gray-600" 
                  />
                )}
              </motion.button>
              <span>{domToReact(domNode.children)}</span>
            </motion.li>
          );
        }

        return undefined;
      },
      system: () => headings
    };
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const postResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/semesters/${semesterName}/subjects/${subjectName}/posts/${postSlug}`
        );
        if (!postResponse.ok) throw new Error("Post not found");
        const postData = await postResponse.json();
        setPost(postData);

        const parseOptions = customParseOptions();
        parse(postData.content, parseOptions);
        const headings = parseOptions.system();
        
        setTableOfContents(headings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [semesterName, subjectName, postSlug]);

  useEffect(() => {
    if (post) {
      Prism.highlightAll();
    }
  }, [post]);

  const breadcrumbItems = [
    { name: "Engineering Notes", href: "/notes" },
    { 
      name: (subjectName as string).split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '), 
      href: `/notes/${semesterName}/subject/${subjectName}`
    },
    post && { name: post.title, href: `/notes/${semesterName}/subject/${subjectName}/post/${postSlug}` },
  ].filter(Boolean);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <PuffLoader color="#6D28D9" size={120} />
      </div>
    );
  }

  if (error) return <p className="text-red-400 text-center">Error: {error}</p>;
  if (!post) return notFound();

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100 p-3 sm:p-4 lg:p-6 overflow-hidden">
      <FloatingBubbles />

      <nav className="mb-6 relative z-10">
        <ul className="flex flex-wrap text-gray-300 text-xs space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link 
                href={item.href} 
                className="hover:text-gray-400 transition-colors duration-300"
              >
                {item.name.replace(/%20/g, " ")}
              </Link>
              {index < breadcrumbItems.length - 1 && (
                <span className="mx-1 text-gray-600">/</span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-blue-500"
      >
        {post.title}
      </motion.h1>

      <main className="max-w-3xl mx-auto">
        <p className="text-gray-400 mb-6 text-center flex items-center justify-center space-x-2">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
          <span className="font-medium text-sm">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric', 
              month: 'long', 
              day: 'numeric'
            })}
          </span>
        </p>

        {tableOfContents.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 bg-gray-800 p-4 rounded-xl shadow-lg border-l-4 border-gray-600"
          >
            <h2 className="text-xl font-bold text-gray-100 mb-3 border-b-2 border-gray-700 pb-1">
              Table of Contents
            </h2>
            <ul className="space-y-1 pl-2">
              {tableOfContents.map((heading, index) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <FontAwesomeIcon 
                    icon={faDotCircle} 
                    className={`text-gray-400 ${
                      heading.level === 'h1' ? 'text-base' :
                      heading.level === 'h2' ? 'text-sm' :
                      'text-xs'
                    }`} 
                  />
                  <a 
                    href={`#${heading.id}`} 
                    className={`text-blue-300 hover:text-gray-400 transition-colors duration-300 font-medium ${
                      heading.level === 'h1' ? 'text-base' :
                      heading.level === 'h2' ? 'text-sm' :
                      'text-xs pl-3'
                    }`}
                  >
                    {heading.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        <article className="prose prose-invert lg:prose-xl mx-auto text-gray-200 leading-relaxed">
          {parse(post.content, customParseOptions())}
        </article>
      </main>
    </div>
  );
}