"use client";
import React, { useState, useEffect } from "react";
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
    { id: "space", label: "Space", width: "w-32", action: () => onKeyPress(" ") },
    { id: "backspace", label: "Backspace", width: "w-24", action: () => onKeyPress("BACKSPACE") },
    { id: "shift", label: shiftMode ? "Shift ✓" : "Shift", width: "w-20", 
      action: () => setShiftMode(!shiftMode), isActive: shiftMode },
    { id: "enter", label: "Enter", width: "w-20", action: () => onKeyPress("\n") }
  ];

  const handleKeyboardInput = (char: string) => {
    onKeyPress(char);
    if (shiftMode) {
      setShiftMode(false);
    }
  };

  return (
    <div className={`bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl shadow-lg p-3 ${className}`}>
      {/* Keyboard tabs */}
      <div className="flex space-x-1 mb-3">
        {(["consonants", "vowels", "numbers", "symbols"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === tab
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white/70 text-gray-700 hover:bg-white"
            }`}
          >
            {tab === "consonants" ? "व्यञ्जन" : 
             tab === "vowels" ? "स्वर" : 
             tab === "numbers" ? "अंक" : "चिन्ह"}
          </button>
        ))}
      </div>

      {/* Key rows */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-inner">
        {keyboardLayout[activeTab].map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-1 mb-1">
            {row.map((key, keyIndex) => (
              <motion.button
                key={`${rowIndex}-${keyIndex}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleKeyboardInput(key)}
                className="w-10 h-10 bg-white rounded-lg shadow hover:bg-purple-50 
                          active:bg-purple-100 flex items-center justify-center 
                          text-gray-700 font-medium"
              >
                {key}
              </motion.button>
            ))}
          </div>
        ))}

        {/* Special keys row */}
        <div className="flex justify-center space-x-2 mt-2">
          {specialKeys.map((key) => (
            <motion.button
              key={key.id}
              whileTap={{ scale: 0.95 }}
              onClick={key.action}
              className={`${key.width} h-10 bg-gradient-to-r ${
                key.isActive 
                  ? "from-purple-400 to-purple-500 text-white" 
                  : "from-gray-100 to-gray-200 text-gray-700"
              } rounded-lg shadow hover:brightness-105 flex items-center justify-center font-medium`}
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