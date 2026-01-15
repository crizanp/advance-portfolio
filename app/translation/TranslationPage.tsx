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
const keyboardRef = useRef<HTMLDivElement>(null);
const [showAboutPopup, setShowAboutPopup] = useState(false);
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
    const targetRef = inputMode === "direct" ? inputRef : outputRef;
    const textArea = targetRef.current;
    
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
          // For roman mode, we need to update both fields
          const segments = romanInput.split(/(\([^)]*\))/g);
          const converted = segments.map(segment => {
            if (segment.startsWith('(') && segment.endsWith(')')) {
              return segment.slice(1, -1);
            }
            return Sanscript.t(segment, "itrans", "devanagari");
          }).join('');
          
          setUnicodeOutput(newText);
          // Update roman input as well by converting back if possible
          // This is a simplified approach - in reality, you might need a more sophisticated conversion
          setRomanInput(romanInput.slice(0, romanInput.length - 1));
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
          // Update roman input - removing the corresponding part
          const beforeLength = romanInput.length;
          const selectionLength = end - start;
          const newRomanInput = romanInput.slice(0, romanInput.length - selectionLength);
          setRomanInput(newRomanInput);
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
        // For roman mode, append the character to the roman input
        setRomanInput(romanInput + char);
      }
      
      // Set cursor position after inserted character
      setTimeout(() => {
        textArea.selectionStart = start + char.length;
        textArea.selectionEnd = start + char.length;
        textArea.focus();
      }, 0);
    }
  }, [inputMode, romanInput]);
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
        className="bg-white rounded-xl p-6 max-w-md w-full border border-blue-100 shadow-lg" 
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Share This Page</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out this amazing Nepali Unicode Converter!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-blue-50 text-gray-800 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FaTwitter className="w-5 h-5 text-blue-500" />
            <span>Share on Twitter</span>
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopyMessage("Link copied!");
              setTimeout(() => setCopyMessage(null), 3000);
            }}
            className="flex items-center gap-2 p-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaLink className="w-5 h-5 text-blue-500" />
            <span>Copy Link</span>
          </button>
        </div>
        {copyMessage && (
          <div className="mt-4 bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-center">
            {copyMessage}
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 border-4 border-gray-500 border-t-transparent rounded-full mx-auto mb-6"
          />
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-400"
          >
            Loading Nepali Unicode Converter...
          </motion.h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
     {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/herobgindex.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white opacity-90"></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 text-center">
            Nepali Unicode Converter
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 max-w-3xl text-center mx-auto">
            Convert Romanized Nepali to Unicode with ease. Type, copy, and share your Nepali text seamlessly!
          </p>
        </div>
      </div>

    <div className="max-w-5xl mx-auto py-12 sm:px-6 lg:px-8" id="converter">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white sm:rounded-2xl shadow-2xl shadow-gray-200/50 p-6 sm:p-8 mb-8 border border-gray-200"
        >
          {loadedWordsCount > 0 && loadedWordsCount < totalWords && (
            <div className="mb-8 relative mx-auto max-w-md">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-gray-400 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.round((loadedWordsCount / totalWords) * 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Loading dictionary: {loadedWordsCount} of {totalWords} words
                ({Math.round((loadedWordsCount / totalWords) * 100)}%)
              </p>
            </div>
          )}

          {copyMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-gray-50 text-gray-800 px-4 py-3 rounded-lg mb-4 text-center border border-gray-200"
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
                    ? "bg-gray-300 text-gray-900" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <FaKeyboard className="h-5 w-5" />
                <span>{inputMode === "direct" ? "Direct Input Mode" : "Romanized Input Mode"}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowKeyboard(!showKeyboard);
                  if (!showKeyboard) {
                    setTimeout(() => {
                      keyboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 w-full sm:w-auto justify-center"
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
                  <label className="block text-sm font-medium text-gray-700">
                    Type Romanized Nepali
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAboutPopup(true)}
                    className="flex items-center text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-full hover:bg-gray-100 cursor-pointer"
                  >
                    <LightBulbIcon className="h-4 w-4 mr-1" />
                    <span>Tips </span>
                  </motion.button>
                </div>
                <div className="relative">
                  <motion.textarea
                    initial={{ boxShadow: "0 0 0 0 rgba(167, 139, 250, 0)" }}
                    whileFocus={{ boxShadow: "0 0 0 3px rgba(167, 139, 250, 0.3)" }}
                    ref={inputRef}
                    className="w-full p-4 border-2 border-gray-300 bg-white rounded-xl 
                             focus:border-gray-500 focus:ring-0 focus:outline-none
                             resize-none text-lg text-gray-900 placeholder-gray-400 transition-all"
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
                          className="bg-white/90 text-gray-800 px-3 py-1 rounded-full shadow-sm border 
                                   border-gray-300 hover:bg-gray-50"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type Directly in Nepali
                </label>
                <motion.textarea
                  initial={{ boxShadow: "0 0 0 0 rgba(167, 139, 250, 0)" }}
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(167, 139, 250, 0.3)" }}
                  ref={inputRef}
                  className="w-full p-4 border-2 border-gray-300 bg-white rounded-xl
                           focus:border-gray-500 focus:ring-0 focus:outline-none
                           resize-none text-lg text-gray-900 placeholder-gray-400 transition-all"
                  placeholder="यहाँ सिधै नेपाली मा टाइप गर्नुहोस्..."
                  value={romanInput}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            )}

           <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nepali Unicode Output
              </label>
              <div className="relative">
                <motion.textarea
                  initial={{ boxShadow: "0 0 0 0 rgba(167, 139, 250, 0)" }}
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(167, 139, 250, 0.3)" }}
                  ref={outputRef}
                  className={`w-full p-4 border-2 border-gray-300 rounded-xl
                            ${inputMode === "roman" ? "bg-gray-100" : "bg-white"}
                            text-lg resize-none font-sans text-gray-900 focus:ring-0 focus:outline-none
                            focus:border-gray-500 transition-all`}
                  placeholder="कस्तो छ (hello) हलखबर..."
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
                    className="p-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-900 shadow-lg transition-all"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={shareContent}
                    className="p-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-900 shadow-lg transition-all"
                  >
                    <ShareIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {showKeyboard && (
              <motion.div
                ref={keyboardRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                <NepaliKeyboard 
                  onKeyPress={handleKeyboardInput} 
                  className="overflow-x-auto"
                />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* About Unicode Popup */}
        {showAboutPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAboutPopup(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">About Nepali Unicode</h3>
                <button
                  onClick={() => setShowAboutPopup(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  Nepali Unicode is the standard encoding system for representing Nepali text in digital formats.
                </p>
                <p className="flex items-start">
                  <span className="bg-gray-200 text-gray-900 px-2 py-0.5 rounded text-xs font-bold mr-2 mt-0.5">TIP</span>
                  <span className="text-xs">Text inside parentheses ( ) won't be converted.</span>
                </p>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs">
                  This converter uses ITRANS standard with 10,000+ Nepali words for accurate conversions.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
      {showShare && <ShareButton />}
    </div>
  );
};

export default TranslationPage;