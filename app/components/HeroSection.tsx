import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { RiPagesLine } from 'react-icons/ri';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import CVTemplate from './CVTemplate';
import Modal from './Model';

const TitleSection = () => {
  const titles = [
    'React.js Developer',
    'Next.js Developer',
    'Node.js Developer',
    'API Developer',
    'Bot Developer',
    'PHP Developer',
  ];
  const categories = [
    { name: "Web Development", icon: "💻", link: "/category/web-development" },
    { name: "Telegram Bots", icon: "🤖", link: "/category/telegram-api" },
    { name: "Reading", icon: "📚", link: "/category/reading" },
    { name: "Research", icon: "🎨", link: "/category/research" },
  ];
  const [currentTitle, setCurrentTitle] = useState(titles[0]);
  const [showCV, setShowCV] = useState(false);

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setCurrentTitle((prevTitle) => {
        const currentIndex = titles.indexOf(prevTitle);
        const nextIndex = (currentIndex + 1) % titles.length;
        return titles[nextIndex];
      });
    }, 3000);

    return () => clearInterval(titleInterval);
  }, []);

  return (
    <section className="relative z-10 py-8 sm:py-12 md:py-24 overflow-hidden bg-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Gradient orbs */}
          <motion.div
            className="absolute w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-purple-600/20 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ top: '10%', left: '5%' }}
          />
          <motion.div
            className="absolute w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-blue-600/20 blur-3xl"
            animate={{
              x: [0, -70, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ top: '30%', right: '10%' }}
          />
          <motion.div
            className="absolute w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-indigo-600/20 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ bottom: '15%', left: '20%' }}
          />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:50px_50px]" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8">
          {/* Text content */}
          <motion.div
            className="md:w-1/2 text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-base sm:text-lg text-gray-300 mb-2 sm:mb-3">Hello, I'm Crijan Pokhrel</h2>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                I'm a{" "}
              </span>
              <motion.span
                key={currentTitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-white inline-block"
              >
                {currentTitle}
              </motion.span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-8 max-w-lg">
              Turning ideas into digital experiences through code and creativity. Specializing in modern web technologies and passionate about creating impactful digital solutions.
            </p>

            <div className="flex flex-nowrap gap-2 sm:gap-4 items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/projects"
                  className="px-3 py-1.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md sm:rounded-lg shadow-md hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-1 sm:gap-2"
                >
                  <RiPagesLine className="text-lg sm:text-xl" />
                  View Work
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => setShowCV(true)}
                  className="px-3 py-1.5 sm:px-6 sm:py-3 text-sm sm:text-base border border-purple-500 text-purple-400 rounded-md sm:rounded-lg hover:bg-purple-500/10 transition-all"
                >
                  View CV
                </button>
              </motion.div>
            </div>

            <div className="mt-4 sm:mt-8 flex gap-2 sm:gap-4">
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                href="https://www.linkedin.com/in/srijanpokhrel/"
                target="_blank"
                rel="noopener"
                className="p-2 sm:p-3 text-gray-300 hover:text-purple-400 bg-gray-800 rounded-full transition-all"
              >
                <FaLinkedin className="text-xl sm:text-2xl" />
              </motion.a>

              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                href="https://github.com/crizanp"
                target="_blank"
                rel="noopener"
                className="p-2 sm:p-3 text-gray-300 hover:text-purple-400 bg-gray-800 rounded-full transition-all"
              >
                <FaGithub className="text-xl sm:text-2xl" />
              </motion.a>
            </div>
          </motion.div>

          {/* Photo section with responsive sizing */}
          <motion.div
            className="md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative overflow-visible">
              {/* Responsive image container */}
              <div className="relative w-64 h-64 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl">
                <Image
                  src="/images/pp.png"
                  alt="Crijan Pokhrel"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>

              {/* Adjusted orbit animations */}
              <motion.div
                className="absolute rounded-full border-2 border-blue-500/50"
                style={{
                  width: 'calc(100% + 8px)',
                  height: 'calc(100% + 8px)',
                  top: '-4px',
                  left: '-4px',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute rounded-full border-2 border-purple-500/30"
                style={{
                  width: 'calc(100% + 16px)',
                  height: 'calc(100% + 16px)',
                  top: '-8px',
                  left: '-8px',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Responsive floating badges */}
              <motion.div
                className="absolute -right-1 sm:-right-2 top-12 bg-gray-800 text-purple-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                React.js
              </motion.div>

              <motion.div
                className="absolute -left-1 sm:-left-2 top-1/3 bg-gray-800 text-blue-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                Next.js
              </motion.div>

              <motion.div
                className="absolute -right-2 sm:-right-4 bottom-1/4 bg-gray-800 text-indigo-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm shadow-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                Node.js
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Categories section with improved responsiveness */}
        <section className="py-8 sm:py-12 md:py-14 relative z-10" id="category">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  className="bg-gray-300 p-3 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-purple-200 hover:border-purple-100 cursor-pointer flex flex-col items-center text-center"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-2xl sm:text-4xl mb-2 sm:mb-4 text-purple-600">{category.icon}</div>
                  <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 hover:text-purple-700 transition-colors">
                    {category.name}
                  </h3>
                  <Link href={category.link} className="text-purple-600 hover:text-purple-800 text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-colors">
                    Explore
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Modal for CV */}
      <div className="z-50 relative">
        <Modal show={showCV} onClose={() => setShowCV(false)}>
          <div className="modal-content" style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <CVTemplate />
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default TitleSection;