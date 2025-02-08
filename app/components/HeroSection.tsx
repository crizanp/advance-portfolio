import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RiPagesLine } from 'react-icons/ri';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import CVTemplate from './CVTemplate'; // Import your CVTemplate component
import Modal from './Model';

const TitleSection = () => {
  const titles = [
    'Creative Developer',
    'Next.js Developer',
    'Telegram Bot Developer',
    'Discord Bot Developer',
    'AI Agent Developer',
    'SEO Expert',
    'Blockchain Enthusiast',
    'Novel Reader',
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
    }, 3000); // Change title every 3 seconds

    return () => clearInterval(titleInterval); // Clean up the interval when component unmounts
  }, []);

  return (
    <section className="text-center py-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent py-6">
          I am {currentTitle}
        </h1>
        <p className="text-xl text-purple-700 max-w-2xl mx-auto mb-8">
          Turning ideas into digital experiences through code and creativity
        </p>

        <div className="flex justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/projects"
              className="px-8 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <RiPagesLine className="text-xl" />
              View Work
            </Link>
          </motion.div>

          <motion.div >
            <button
              // onClick={() => setShowCV(true)} // Display the CV when clicked
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              View CV
            </button>
             {/* Conditional rendering for CV popup */}
             <Modal show={showCV} onClose={() => setShowCV(false)}>
              <div className="modal-content" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <CVTemplate />
              </div>
            </Modal>
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <a href="https://www.linkedin.com/in/srijanpokhrel/" target="_blank" rel="noopener" className="p-2 text-purple-600 hover:text-purple-700 transition-colors">
            <FaLinkedin className="text-3xl" />
          </a>
          <a href="https://github.com/crizanp" target="_blank" rel="noopener" className="p-2 text-purple-600 hover:text-purple-700 transition-colors">
            <FaGithub className="text-3xl" />
          </a>
        </div>
      </motion.div>

    </section>
  );
};

export default TitleSection;
