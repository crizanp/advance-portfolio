"use client";
import React, { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Sanscript from "@sanskrit-coders/sanscript";
import Trie from "./utils/Trie";
import { wordMappings } from "./utils/wordMappings";
import { ClipboardDocumentIcon, ShareIcon, ArrowPathIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { FaTwitter, FaFacebook, FaLinkedin, FaLink } from 'react-icons/fa';

interface NepaliWordsData {
  nepaliWords: string[];
}
const TranslationPage = () => {
  const [romanInput, setRomanInput] = useState("");
  const [unicodeOutput, setUnicodeOutput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nepaliDictionaryTrie, setNepaliDictionaryTrie] = useState<Trie | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const loadData = async () => {
      const commonConversions = new Map(Object.entries(wordMappings));
      const trie = new Trie();
      commonConversions.forEach((nepali, roman) => trie.insert(roman, nepali));
      setNepaliDictionaryTrie(trie);
      setIsLoading(false); 
      try {
        const response = await fetch('./NepaliWords.json');
        const words: NepaliWordsData = await response.json();
        words.nepaliWords.forEach((word) => {
          const romanizedWord = Sanscript.t(word, "devanagari", "itrans").toLowerCase();
          if (!commonConversions.has(romanizedWord)) {
            trie.insert(romanizedWord, word);
          }
        });
        setNepaliDictionaryTrie(trie);
      } catch (error) {
        console.error("Failed to load additional data:", error);
      }
    };
    loadData();
  }, []);
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setRomanInput(input);
    const segments = input.split(/(\([^)]*\))/g);
    const converted = segments.map(segment => {
      if (segment.startsWith('(') && segment.endsWith(')')) {
        return segment.slice(1, -1); 
      }
      return Sanscript.t(segment, "itrans", "devanagari");
    }).join('');
    setUnicodeOutput(converted);
    const words = input.split(/\s+/); 
    const lastWord = words[words.length - 1]?.toLowerCase().replace(/[()]/g, '') || "";
    const trieSuggestions = lastWord && nepaliDictionaryTrie 
      ? nepaliDictionaryTrie.search(lastWord).slice(0, 3) 
      : [];
    setSuggestions(trieSuggestions);
  }, [nepaliDictionaryTrie]);
  const handleSuggestionClick = useCallback((suggestion: string) => {
    const words = romanInput.trim().split(/\s+/);
    words[words.length - 1] = suggestion;
    const newInput = words.join(" ") + " ";
    setRomanInput(newInput);
    const segments = newInput.split(/(\([^)]*\))/g);
    const converted = segments.map(segment => {
      if (segment.startsWith('(') && segment.endsWith(')')) {
        return segment.slice(1, -1); 
      }
      return Sanscript.t(segment, "itrans", "devanagari");
    }).join('');
    setUnicodeOutput(converted);
    setSuggestions([]);
    inputRef.current?.focus();
  }, [romanInput]);
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(unicodeOutput);
    setCopyMessage("Copied to clipboard!");
    setTimeout(() => setCopyMessage(null), 3000);
  }, [unicodeOutput]);
  const shareContent = useCallback(() => {
    setShowShare(true);
  }, []);
  const ShareButton = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      onClick={() => setShowShare(false)}
    >
      <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Share This Page</h3>
        <div className="grid grid-cols-2 gap-4">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out this amazing Nepali Unicode Converter!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-blue-100 text-gray-600 rounded-lg hover:bg-blue-100"
          >
            <FaTwitter className="w-5 h-5 text-blue-500" />
            <span>Share on Twitter</span>
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex items-center gap-2 p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <FaLink className="w-5 h-5 text-gray-600" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100"
        >
          {}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-purple-600 mb-4">
              <BookOpenIcon className="h-10 w-10 inline-block mr-3" />
              Nepali Unicode Converter
            </h1>
            <p className="text-gray-600 text-lg">
              Convert Romanized Nepali (like "kasto") to Unicode Devanagari (कस्तो) instantly
            </p>
          </div>
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="flex items-center p-4 bg-purple-50 rounded-lg text-gray-600">
                <ArrowPathIcon className="h-6 w-6 text-purple-600 mr-3" />
                <span>Real-time conversion with smart suggestions</span>
              </div>
              <div className="flex items-center p-4 bg-blue-50 rounded-lg text-gray-600">
                <ClipboardDocumentIcon className="h-6 w-6 text-blue-600 mr-3" />
                <span>Preserve text in parentheses (like this)</span>
              </div>
            </div>
          </div>
          {copyMessage && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 text-center">
              {copyMessage}
            </div>
          )}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type Romanized Nepali
              </label>
              <div className="relative">
                <textarea
                  ref={inputRef}
                  className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 
                           focus:ring-2 focus:ring-purple-200 resize-none text-lg text-gray-600"
                  placeholder="kasto chha (hello) halkhabar..."
                  value={romanInput}
                  onChange={handleInputChange}
                  rows={3}
                />
                {suggestions.length > 0 && (
                  <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="bg-white text-purple-600 px-3 py-1 rounded-full shadow-sm border 
                                 border-purple-200 hover:bg-purple-50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nepali Unicode Output
              </label>
              <div className="relative">
                <textarea
                  className="w-full p-4 border-2 border-purple-200 rounded-xl bg-gray-50 text-lg 
                           resize-none font-sans text-gray-600"
                  value={unicodeOutput}
                  readOnly
                  rows={3}
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={shareContent}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                  >
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Nepali Unicode</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Nepali Unicode is the standard encoding system for representing Nepali text in digital
              formats. Unlike traditional font-based systems, Unicode allows for consistent
              representation across all devices and platforms.
            </p>
            <p>
              <strong>Pro Tip:</strong> Text inside parentheses ( ) won't be converted, making it
              perfect for keeping English words or special notations in your text.
            </p>
            <p className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              This converter uses the ITRSANS standard and contains over 10,000+ Nepali words in its
              dictionary for accurate conversions.
            </p>
          </div>
        </div>
      </div>
      {showShare && <ShareButton />}
    </div>
  );
};
export default TranslationPage;