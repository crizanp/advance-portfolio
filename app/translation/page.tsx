// app/translation/page.tsx
"use client";

import React, { useRef, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Sanscript from "@sanskrit-coders/sanscript";
import Trie from "./utils/Trie";
import { wordMappings } from "./utils/wordMappings";
import nepaliWordsData from './utils/nepaliWords.json';
interface NepaliWordsData {
  nepaliWords: string[];
}
const TranslationPage = () => {
  const [romanInput, setRomanInput] = useState("");
  const [unicodeOutput, setUnicodeOutput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const words: NepaliWordsData = nepaliWordsData as NepaliWordsData;

  // Precompute common conversions
  const commonConversions = useMemo(() => new Map(Object.entries(wordMappings)), []);

  const nepaliDictionaryTrie = useMemo(() => {
    const trie = new Trie();
    // Add common words first for priority
    commonConversions.forEach((nepali, roman) => trie.insert(roman, nepali));
    // Add words from JSON data
    words.nepaliWords.forEach((word) => {
      const romanizedWord = Sanscript.t(word, "devanagari", "itrans").toLowerCase();
      if (!commonConversions.has(romanizedWord)) {
        trie.insert(romanizedWord, word);
      }
    });
    return trie;
  }, [commonConversions]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setRomanInput(input);

    // Process suggestions in chunks
    const lastWord = input.split(/\s+/).pop()?.toLowerCase() || "";
    const trieSuggestions = lastWord ? nepaliDictionaryTrie.search(lastWord).slice(0, 6) : [];
    setSuggestions(trieSuggestions);

    // Batch output updates
    setUnicodeOutput(input ? Sanscript.t(input, "itrans", "devanagari") : "");
  }, [nepaliDictionaryTrie]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    const words = romanInput.trim().split(/\s+/);
    words[words.length - 1] = suggestion;
    const newInput = words.join(" ") + " ";
    setRomanInput(newInput);
    setSuggestions([]);
    inputRef.current?.focus();
    setUnicodeOutput(Sanscript.t(newInput, "itrans", "devanagari"));
  }, [romanInput]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(unicodeOutput);
    setCopyMessage("Text Copied");
    setTimeout(() => setCopyMessage(null), 3000);
  }, [unicodeOutput]);

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center p-5">
     
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl z-10 border-2 border-purple-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
          Romanized Nepali to Unicode Converter
        </h1>

        {copyMessage && (
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg mb-4 text-center border border-purple-200">
            {copyMessage}
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg cursor-pointer 
                         hover:bg-purple-100 border border-purple-200 transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="romanInput" className="block text-gray-600 font-semibold mb-2">
            Type Romanized Nepali
          </label>
          <textarea
            id="romanInput"
            ref={inputRef}
            className="w-full p-3 border-2 border-purple-200 bg-white rounded-lg 
                     text-gray-800 focus:outline-none focus:border-purple-400
                     placeholder-gray-400 resize-none"
            placeholder="e.g., kasto chha halkhabar"
            value={romanInput}
            onChange={handleInputChange}
            rows={4}
          />
        </div>

        <div className="relative">
          <label htmlFor="unicodeOutput" className="block text-gray-600 font-semibold mb-2">
            Nepali Unicode Output
          </label>
          <textarea
            id="unicodeOutput"
            className="w-full p-3 border-2 border-purple-200 bg-white rounded-lg 
                     text-gray-800 focus:outline-none focus:border-purple-400
                     placeholder-gray-400 resize-none"
            value={unicodeOutput}
            placeholder="e.g., कस्तो छ हालखबर"
            readOnly
            rows={4}
          />
          <button
            onClick={copyToClipboard}
            className="absolute top-8 right-3 bg-purple-600 hover:bg-purple-700 text-white 
                      px-4 py-2 rounded-md shadow-sm transition-colors"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslationPage;