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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={() => setShowShare(false)}
    >
      <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Share This Page</h3>
        <div className="grid grid-cols-2 gap-4">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out this amazing Nepali Unicode Converter!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-blue-100 text-gray-600 rounded-lg hover:bg-blue-200"
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

  if (isInitialLoading) {
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
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-purple-600 mb-4">
              <BookOpenIcon className="h-10 w-10 inline-block mr-3" />
              Nepali Unicode Converter
            </h1>
            <p className="text-gray-600 text-lg">
              Convert Romanized Nepali to Unicode Devanagari instantly
            </p>
            {loadedWordsCount > 0 && loadedWordsCount < totalWords && (
              <p className="text-sm text-gray-500 mt-2">
                Loading dictionary: {loadedWordsCount} of {totalWords} words loaded
                ({Math.round((loadedWordsCount / totalWords) * 100)}%)
              </p>
            )}
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 bg-purple-50 rounded-lg text-gray-600">
                <ArrowPathIcon className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
                <span>Real-time conversion with smart suggestions</span>
              </div>
              <div className="flex items-center p-4 bg-blue-50 rounded-lg text-gray-600">
                <ClipboardDocumentIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                <span>Preserve text in parentheses (like this)</span>
              </div>
              <div className="flex items-center p-4 bg-green-50 rounded-lg text-gray-600">
                <FaKeyboard className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                <span>On-screen Nepali keyboard</span>
              </div>
            </div>
          </div>

          {copyMessage && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 text-center">
              {copyMessage}
            </div>
          )}

          <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
              <button
                onClick={toggleInputMode}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  inputMode === "direct" 
                    ? "bg-purple-600 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaKeyboard className="h-5 w-5" />
                <span>{inputMode === "direct" ? "Direct Input Mode" : "Romanized Input Mode"}</span>
              </button>
              
              <button
                onClick={() => setShowKeyboard(!showKeyboard)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
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
              </button>
            </div>

            {inputMode === "roman" ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Type Romanized Nepali
                  </label>
                  <div className="flex items-center text-sm text-purple-600">
                    <LightBulbIcon className="h-4 w-4 mr-1" />
                    <span>Example: namaste = नमस्ते</span>
                  </div>
                </div>
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
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type Directly in Nepali
                </label>
                <textarea
                  ref={inputRef}
                  className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 
                           focus:ring-2 focus:ring-purple-200 resize-none text-lg"
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
                <textarea
                  ref={outputRef}
                  className={`w-full p-4 border-2 border-purple-200 rounded-xl ${
                    inputMode === "roman" ? "bg-gray-50" : "bg-white"
                  } text-lg resize-none font-sans text-gray-600`}
                  value={unicodeOutput}
                  readOnly={inputMode === "roman"}
                  onChange={inputMode === "direct" ? undefined : handleInputChange}
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

            {showKeyboard && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-4"
              >
                <NepaliKeyboard 
                  onKeyPress={handleKeyboardInput} 
                  className="mt-4 overflow-x-auto"
                />
              </motion.div>
            )}
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
              This converter uses the ITRANS standard and contains over 10,000+ Nepali words in its
              dictionary for accurate conversions. Use the on-screen keyboard for direct input in Nepali!
            </p>
          </div>
        </div>
      </div>
      {showShare && <ShareButton />}
    </div>
  );
};

export default TranslationPage;