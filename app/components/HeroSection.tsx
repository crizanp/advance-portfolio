import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const HeroSection = () => {
  const titles = [
    'Software QA Engineer',
    'React.js Developer',
    'Next.js Developer',
    'Node.js Developer',
    'API Developer',
    'Automation Engineer',
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitleIndex]);

  return (
    <>
       <style>{`
        .dotted {
          background-position: 0px 4px;
          background-size: 8px 8px;
          background-clip: text;
          -webkit-background-clip: text;
          background-image: radial-gradient(
            circle at 2px 2px,
            var(--animated-color) 2px,
            transparent 0
          );
          color: transparent;
        }
        @media (prefers-reduced-motion: no-preference) {
          @property --animated-color {
            syntax: "<color>";
            initial-value: #2563eb;
            inherits: false;
          }
          @keyframes scrollBg {
            50% {
              --animated-color: #1d4ed8;
            }
            100% {
              background-position: -32px 4px;
            }
          }
          .dotted {
            animation: scrollBg 10s linear infinite forwards;
          }
        }
      `}</style>
      
      <div className="bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 order-2 lg:px-4 lg:order-1">
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight">
                  Hi!
                  <br />
                  I'm <span className="text-blue-700">Srijan</span>
                </h1>
              </div>
              <div className="h-10 sm:h-12">
                <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 font-light">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
              <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-md hover:bg-gray-900 hover:text-white transition-all duration-300 group">
                <Download className="w-5 h-5" />
                DOWNLOAD CV
              </button>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm lg:max-w-md">
                <div className="relative flex items-end justify-center">
                  {/* Profile image */}
                  <img 
                    src="/images/sideimg.jpg" 
                    alt="Srijan - Software QA Engineer"
                    className="w-full h-auto object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Animated Dotted Section */}
         
        </div>
      </div> 
    </>
  );
};

export default HeroSection;