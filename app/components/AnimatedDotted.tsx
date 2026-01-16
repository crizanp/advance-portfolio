import React from 'react';

const AnimatedDotted = () => {
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
      
      <div className="py-12 bg-white">
        <h1 className="text-center px-8 font-semibold leading-none">
          <span className="block text-4xl sm:text-3xl md:text-3xl lg:text-5xl text-blue-700">
            My focus
          </span>
          <span className="dotted block text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem]">
            Build things that scale.
          </span>
        </h1>
      </div>
    </>
  );
};

export default AnimatedDotted;