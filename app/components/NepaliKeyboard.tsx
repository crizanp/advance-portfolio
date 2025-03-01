"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface KeyboardProps {
  onKeyPress: (char: string) => void;
  className?: string;
}

const NepaliKeyboard: React.FC<KeyboardProps> = ({ onKeyPress, className = "" }) => {
  const [activeTab, setActiveTab] = useState<"consonants" | "vowels" | "numbers" | "symbols">("consonants");
  const [shiftMode, setShiftMode] = useState(false);

  // Nepali keyboard layout
  const keyboardLayout = {
    consonants: [
      ["क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ"],
      ["ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न"],
      ["प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श"],
      ["ष", "स", "ह", "क्ष", "त्र", "ज्ञ", "श्र", "ङ्क", "ङ्ख", "ङ्ग"]
    ],
    vowels: [
      ["अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ"],
      ["ा", "ि", "ी", "ु", "ू", "े", "ै", "ो", "ौ", "ं"],
      ["ः", "ँ", "ृ", "ॄ", "ॅ", "ॆ", "ॉ", "ॊ", "्", "ऋ"]
    ],
    numbers: [
      ["१", "२", "३", "४", "५", "६", "७", "८", "९", "०"],
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    ],
    symbols: [
      ["।", "॥", "?", "!", ".", ",", ";", ":", "'", "\""],
      ["(", ")", "[", "]", "{", "}", "@", "#", "$", "%"],
      ["^", "&", "*", "-", "+", "=", "_", "<", ">", "/"],
      ["\\", "|", "~", "`", "…", "॰", "—", "–", "''", ""]
    ]
  };

  // Special keys
  const specialKeys = [
    { id: "backspace", label: "←", width: "", action: () => onKeyPress("BACKSPACE") },
    { id: "space", label: "Space", width: "flex-grow", action: () => onKeyPress(" ") },
    { id: "shift", label: shiftMode ? "↑✓" : "↑", width: "", 
      action: () => setShiftMode(!shiftMode), isActive: shiftMode },
    { id: "enter", label: "↵", width: "", action: () => onKeyPress("\n") }
  ];

  const handleKeyboardInput = (char: string) => {
    onKeyPress(char);
    if (shiftMode) {
      setShiftMode(false);
    }
  };

  return (
    <div className={`bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg p-2 sm:p-3 w-full ${className}`}>
      {/* Keyboard tabs */}
      <div className="flex space-x-1 mb-2 sm:mb-3 overflow-x-auto pb-1 no-scrollbar">
        {(["consonants", "vowels", "numbers", "symbols"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex-shrink-0 ${
              activeTab === tab
                ? "bg-purple-700 text-white shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {tab === "consonants" ? "व्यञ्जन" : 
             tab === "vowels" ? "स्वर" : 
             tab === "numbers" ? "अंक" : "चिन्ह"}
          </button>
        ))}
      </div>

      {/* Key rows */}
      <div className="bg-gray-800 backdrop-blur-sm rounded-lg p-1 sm:p-2 shadow-inner">
        {keyboardLayout[activeTab].map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-1 mb-1">
            {row.map((key, keyIndex) => (
              <motion.button
                key={`${rowIndex}-${keyIndex}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleKeyboardInput(key)}
                className="w-[8vw] h-[8vw] max-w-10 max-h-10 min-w-6 min-h-6 bg-gray-700 rounded-lg shadow 
                           hover:bg-gray-600 active:bg-purple-800 flex items-center justify-center 
                           text-gray-200 text-xs sm:text-base font-medium"
              >
                {key}
              </motion.button>
            ))}
          </div>
        ))}

        {/* Special keys row */}
        <div className="flex justify-between space-x-2 mt-2">
          {specialKeys.map((key) => (
            <motion.button
              key={key.id}
              whileTap={{ scale: 0.95 }}
              onClick={key.action}
              className={`${key.width} px-2 h-10 bg-gradient-to-r ${
                key.isActive 
                  ? "from-purple-700 to-purple-800 text-white" 
                  : "from-gray-600 to-gray-700 text-gray-200"
              } rounded-lg shadow hover:brightness-110 flex items-center justify-center text-xs sm:text-sm font-medium min-w-8`}
            >
              {key.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NepaliKeyboard;