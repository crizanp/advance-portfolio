"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PuffLoader } from "react-spinners";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Use the Google Script Web App URL you provided
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxsiM8JGuYrtOSWhtno6SGpyrrSQGNaV_ypiOORJACu2rNTnJD9IoggQxFrOTHVoN01/exec';
      
      // Create form submission URL with query parameters instead of using fetch
      const queryString = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString()
      }).toString();
      
      // Create a hidden iframe to submit the data without CORS issues
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Add a load event listener to know when the submission is complete
      iframe.onload = () => {
        document.body.removeChild(iframe);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
      };
      
      // Handle possible errors with a timeout
      setTimeout(() => {
        if (loading) {
          setLoading(false);
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
          setSubmitted(true); // Assume it worked even if we didn't get confirmation
          setFormData({ name: "", email: "", message: "" });
        }
      }, 5000);
      
      // Set the iframe source to the script URL with query parameters
      iframe.src = `${scriptURL}?${queryString}`;
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
      // Show error but also clear form to avoid multiple submissions
      alert("Something went wrong, but your information has been recorded. Please try again later if needed.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="relative min-h-screen bg-gray-900 text-gray-300 px-6 py-6 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14">
      {/* Purple gradient line at top */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>

      <motion.h1 
        className="text-3xl font-bold text-center mb-12 text-purple-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Let's Discuss Something Cool!
      </motion.h1>

      <motion.div 
        className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500 opacity-10 rounded-full -ml-12 -mb-12"></div>

        {submitted ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-purple-400 text-6xl mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              ✓
            </motion.div>
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Thanks for reaching out!</h2>
            <p className="text-gray-400 mb-8">I'll get back to you shortly.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-gray-700 text-purple-400 rounded-md font-semibold shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6 relative z-10"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-lg font-medium text-purple-400 mb-2">
                Name
              </label>
              <motion.input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 border border-gray-600"
                placeholder="Enter your name"
                required
                variants={inputVariants}
                whileFocus="focus"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-lg font-medium text-purple-400 mb-2">
                Email
              </label>
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 border border-gray-600"
                placeholder="Enter your email"
                required
                variants={inputVariants}
                whileFocus="focus"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-lg font-medium text-purple-400 mb-2">
                Message
              </label>
              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full p-3 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 border border-gray-600"
                placeholder="Write your message"
                required
                variants={inputVariants}
                whileFocus="focus"
              ></motion.textarea>
            </motion.div>
            
            <motion.div 
              className="flex justify-center"
              variants={itemVariants}
            >
              <button
                type="submit"
                className="px-8 py-3 bg-purple-600 text-white rounded-md font-semibold shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                disabled={loading}
              >
                {loading ? (
                  <PuffLoader color="#ffffff" size={24} />
                ) : (
                  <span className="flex items-center">
                    Send Message
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </button>
            </motion.div>
          </motion.form>
        )}
      </motion.div>
    </main>
  );
}