"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Sanscript from "@sanskrit-coders/sanscript";
import Trie from "./utils/Trie";
import { wordMappings } from "./utils/wordMappings";
import { 
  ClipboardDocumentIcon, 
  ShareIcon, 
  ArrowPathIcon, 
  BookOpenIcon,
  LightBulbIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { FaTwitter, FaLink, FaKeyboard } from 'react-icons/fa';
import NepaliKeyboard from "../components/NepaliKeyboard";

// Constants for chunked loading
const CHUNK_SIZE = 10000;
const LOADING_INTERVAL = 20000; // 20 seconds

interface NepaliWordsData {
  nepaliWords: string[];
}

const TranslationPage = () => {
  const [romanInput, setRomanInput] = useState("");
  const [unicodeOutput, setUnicodeOutput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadedWordsCount, setLoadedWordsCount] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [inputMode, setInputMode] = useState<"roman" | "direct">("roman");
  const [nepaliDictionaryTrie] = useState(() => new Trie());
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const wordsDataRef = useRef<string[]>([]);
  const loadingIntervalRef = useRef<NodeJS.Timeout>();

  // Initialize with common conversions
  useEffect(() => {
    const initializeBasicDictionary = () => {
      const commonConversions = new Map(Object.entries(wordMappings));
      commonConversions.forEach((nepali, roman) => 
        nepaliDictionaryTrie.insert(roman.toLowerCase(), nepali)
      );
      setIsInitialLoading(false);
    };
    initializeBasicDictionary();
  }, [nepaliDictionaryTrie]);

  // Load dictionary data
  useEffect(() => {
    const loadDictionaryData = async () => {
      try {
        const response = await fetch('./NepaliWords.json');
        const data: NepaliWordsData = await response.json();
        wordsDataRef.current = data.nepaliWords;
        setTotalWords(data.nepaliWords.length);
      } catch (error) {
        console.error("Failed to load dictionary:", error);
      }
    };

    if (!isInitialLoading && loadedWordsCount === 0) {
      loadDictionaryData();
    }
  }, [isInitialLoading, loadedWordsCount]);

  // Progressive loading with interval
  useEffect(() => {
    const loadNextChunk = () => {
      if (loadedWordsCount >= totalWords || !wordsDataRef.current.length) {
        if (loadingIntervalRef.current) {
          clearInterval(loadingIntervalRef.current);
        }
        return;
      }

      const startIndex = loadedWordsCount;
      const endIndex = Math.min(startIndex + CHUNK_SIZE, totalWords);
      const chunk = wordsDataRef.current.slice(startIndex, endIndex);

      chunk.forEach(word => {
        const romanized = Sanscript.t(word, "devanagari", "itrans").toLowerCase();
        nepaliDictionaryTrie.insert(romanized, word);
      });

      setLoadedWordsCount(endIndex);
    };

    if (totalWords > 0 && loadedWordsCount < totalWords) {
      loadNextChunk(); // Load first chunk immediately
      loadingIntervalRef.current = setInterval(loadNextChunk, LOADING_INTERVAL);
    }

    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
      }
    };
  }, [totalWords, loadedWordsCount, nepaliDictionaryTrie]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setRomanInput(input);
    
    if (inputMode === "roman") {
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
      const trieSuggestions = lastWord ? nepaliDictionaryTrie.search(lastWord).slice(0, 3) : [];
      setSuggestions(trieSuggestions);
    } else {
      setUnicodeOutput(input);
    }
  }, [nepaliDictionaryTrie, inputMode]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    const words = romanInput.trim().split(/\s+/);
    words[words.length - 1] = suggestion;
    const newInput = words.join(" ") + " ";
    setRomanInput(newInput);
    
    if (inputMode === "roman") {
      const segments = newInput.split(/(\([^)]*\))/g);
      const converted = segments.map(segment => {
        if (segment.startsWith('(') && segment.endsWith(')')) {
          return segment.slice(1, -1);
        }
        return Sanscript.t(segment, "itrans", "devanagari");
      }).join('');
      
      setUnicodeOutput(converted);
    } else {
      setUnicodeOutput(newInput);
    }
    
    setSuggestions([]);
    inputRef.current?.focus();
  }, [romanInput, inputMode]);

  const handleKeyboardInput = useCallback((char: string) => {
    const textArea = inputMode === "direct" ? inputRef.current : outputRef.current;
    
    if (!textArea) return;
    
    const start = textArea.selectionStart || 0;
    const end = textArea.selectionEnd || 0;
    
    if (char === "BACKSPACE") {
      if (start === end && start > 0) {
        // Delete one character backward
        const newText = textArea.value.slice(0, start - 1) + textArea.value.slice(end);
        
        if (inputMode === "direct") {
          setRomanInput(newText);
          setUnicodeOutput(newText);
        } else {
          setUnicodeOutput(newText);
        }
        
        // Set cursor position
        setTimeout(() => {
          textArea.selectionStart = start - 1;
          textArea.selectionEnd = start - 1;
          textArea.focus();
        }, 0);
      } else if (start !== end) {
        // Delete selected text
        const newText = textArea.value.slice(0, start) + textArea.value.slice(end);
        
        if (inputMode === "direct") {
          setRomanInput(newText);
          setUnicodeOutput(newText);
        } else {
          setUnicodeOutput(newText);
        }
        
        // Set cursor position
        setTimeout(() => {
          textArea.selectionStart = start;
          textArea.selectionEnd = start;
          textArea.focus();
        }, 0);
      }
    } else {
      // Insert character
      const newText = textArea.value.slice(0, start) + char + textArea.value.slice(end);
      
      if (inputMode === "direct") {
        setRomanInput(newText);
        setUnicodeOutput(newText);
      } else {
        setUnicodeOutput(newText);
      }
      
      // Set cursor position after inserted character
      setTimeout(() => {
        textArea.selectionStart = start + char.length;
        textArea.selectionEnd = start + char.length;
        textArea.focus();
      }, 0);
    }
  }, [inputMode]);

  const toggleInputMode = useCallback(() => {
    if (inputMode === "roman") {
      setInputMode("direct");
      setShowKeyboard(true);
    } else {
      setInputMode("roman");
    }
  }, [inputMode]);

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={() => setShowShare(false)}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-indigo-500/30" 
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Share This Page</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out this amazing Nepali Unicode Converter!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-indigo-900/50 text-gray-100 rounded-lg hover:bg-indigo-800 transition-colors"
          >
            <FaTwitter className="w-5 h-5 text-indigo-400" />
            <span>Share on Twitter</span>
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopyMessage("Link copied!");
              setTimeout(() => setCopyMessage(null), 3000);
            }}
            className="flex items-center gap-2 p-3 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <FaLink className="w-5 h-5 text-indigo-400" />
            <span>Copy Link</span>
          </button>
        </div>
        {copyMessage && (
          <div className="mt-4 bg-indigo-900/50 text-indigo-100 px-4 py-2 rounded-lg text-center">
            {copyMessage}
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-6"
          />
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-indigo-100"
          >
            Loading Nepali Unicode Converter...
          </motion.h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-2xl shadow-2xl shadow-indigo-500/20 p-6 sm:p-8 mb-8 border border-indigo-500/30"
        >
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-4 flex items-center justify-center">
                <BookOpenIcon className="h-8 w-8 sm:h-10 sm:w-10 inline-block mr-3 text-indigo-300" />
                Nepali Unicode Converter
              </h1>
            </motion.div>
            <p className="text-gray-300 text-lg">
              Convert Romanized Nepali to Unicode Devanagari instantly
            </p>
            {loadedWordsCount > 0 && loadedWordsCount < totalWords && (
              <div className="mt-4 relative mx-auto max-w-md">
                <div className="h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-2 bg-indigo-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.round((loadedWordsCount / totalWords) * 100)}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Loading dictionary: {loadedWordsCount} of {totalWords} words
                  ({Math.round((loadedWordsCount / totalWords) * 100)}%)
                </p>
              </div>
            )}
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center p-4 bg-indigo-900/50 rounded-lg text-gray-300 border border-indigo-800/50"
              >
                <ArrowPathIcon className="h-6 w-6 text-indigo-400 mr-3 flex-shrink-0" />
                <span>Real-time conversion with smart suggestions</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center p-4 bg-indigo-900/50 rounded-lg text-gray-300 border border-indigo-800/50"
              >
                <ClipboardDocumentIcon className="h-6 w-6 text-indigo-400 mr-3 flex-shrink-0" />
                <span>Preserve text in parentheses (like this)</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center p-4 bg-indigo-900/50 rounded-lg text-gray-300 border border-indigo-800/50"
              >
                <FaKeyboard className="h-6 w-6 text-indigo-400 mr-3 flex-shrink-0" />
                <span>On-screen Nepali keyboard</span>
              </motion.div>
            </div>
          </div>

          {copyMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-indigo-900/50 text-indigo-100 px-4 py-3 rounded-lg mb-4 text-center border border-indigo-500/30"
            >
              {copyMessage}
            </motion.div>
          )}

          <div className="space-y-6 relative">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleInputMode}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center ${
                  inputMode === "direct" 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <FaKeyboard className="h-5 w-5" />
                <span>{inputMode === "direct" ? "Direct Input Mode" : "Romanized Input Mode"}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowKeyboard(!showKeyboard)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-indigo-300 rounded-lg hover:bg-gray-600 w-full sm:w-auto justify-center"
              >
                {showKeyboard ? (
                  <>
                    <ChevronUpIcon className="h-5 w-5" />
                    <span>Hide Keyboard</span>
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="h-5 w-5" />
                    <span>Show Keyboard</span>
                  </>
                )}
              </motion.button>
            </div>

            {inputMode === "roman" ? (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Type Romanized Nepali
                  </label>
                  <div className="flex items-center text-sm text-indigo-300 bg-gray-700/50 px-3 py-1 rounded-full">
                    <LightBulbIcon className="h-4 w-4 mr-1" />
                    <span>Example: namaste = नमस्ते</span>
                  </div>
                </div>
                <div className="relative">
                  <motion.textarea
                    initial={{ boxShadow: "0 0 0 0 rgba(129, 140, 248, 0)" }}
                    whileFocus={{ boxShadow: "0 0 0 3px rgba(129, 140, 248, 0.5)" }}
                    ref={inputRef}
                    className="w-full p-4 border-2 border-indigo-500/30 bg-gray-700/50 rounded-xl 
                             focus:border-indigo-500 focus:ring-0 focus:outline-none
                             resize-none text-lg text-gray-100 placeholder-gray-400 transition-all"
                    placeholder="kasto chha (hello) halkhabar..."
                    value={romanInput}
                    onChange={handleInputChange}
                    rows={3}
                  />
                  {suggestions.length > 0 && (
                    <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-2">
                      {suggestions.map((suggestion, index) => (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="bg-indigo-900/70 text-indigo-200 px-3 py-1 rounded-full shadow-sm border 
                                   border-indigo-700 hover:bg-indigo-800"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type Directly in Nepali
                </label>
                <motion.textarea
                  initial={{ boxShadow: "0 0 0 0 rgba(129, 140, 248, 0)" }}
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(129, 140, 248, 0.5)" }}
                  ref={inputRef}
                  className="w-full p-4 border-2 border-indigo-500/30 bg-gray-700/50 rounded-xl
                           focus:border-indigo-500 focus:ring-0 focus:outline-none
                           resize-none text-lg text-gray-100 placeholder-gray-400 transition-all"
                  placeholder="यहाँ सिधै नेपाली मा टाइप गर्नुहोस्..."
                  value={romanInput}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nepali Unicode Output
              </label>
              <div className="relative">
                <motion.textarea
                  initial={{ boxShadow: "0 0 0 0 rgba(129, 140, 248, 0)" }}
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(129, 140, 248, 0.5)" }}
                  ref={outputRef}
                  className={`w-full p-4 border-2 border-indigo-500/30 rounded-xl
                            ${inputMode === "roman" ? "bg-gray-700/70" : "bg-gray-700/50"}
                            text-lg resize-none font-sans text-gray-100 focus:ring-0 focus:outline-none
                            focus:border-indigo-500 transition-all`}
                  value={unicodeOutput}
                  readOnly={inputMode === "roman"}
                  onChange={inputMode === "direct" ? undefined : handleInputChange}
                  rows={3}
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={copyToClipboard}
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white shadow-lg transition-all"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={shareContent}
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white shadow-lg transition-all"
                  >
                    <ShareIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {showKeyboard && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6 p-4 bg-gray-700/50 rounded-xl border border-indigo-500/30"
              >
                <NepaliKeyboard 
                  onKeyPress={handleKeyboardInput} 
                  className="overflow-x-auto"
                />
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-2xl shadow-2xl shadow-indigo-500/20 p-6 sm:p-8 border border-indigo-500/30"
        >
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">About Nepali Unicode</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Nepali Unicode is the standard encoding system for representing Nepali text in digital
              formats. Unlike traditional font-based systems, Unicode allows for consistent
              representation across all devices and platforms.
            </p>
            <p className="flex items-start">
              <span className="bg-indigo-500 text-white px-2 py-1 rounded text-sm font-bold mr-2 mt-0.5">TIP</span>
              <span>Text inside parentheses ( ) won't be converted, making it
              perfect for keeping English words or special notations in your text.</span>
            </p>
            <p className="bg-indigo-900/50 p-4 rounded-lg border border-indigo-800">
              This converter uses the ITRANS standard and contains over 10,000+ Nepali words in its
              dictionary for accurate conversions. Use the on-screen keyboard for direct input in Nepali!
            </p>
          </div>
        </motion.div>
      </div>
      {showShare && <ShareButton />}
    </div>
  );
};

export default TranslationPage;