import { motion } from "framer-motion";
import Link from "next/link";

export default function ToolsSection() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video/toolssectionhero.mp4" type="video/mp4" />
        </video>
        {/* White overlay */}
        <div className="absolute inset-0 bg-white/60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl pb-14 bg-gray-900 bg-clip-text text-transparent ">
        Most Useful Tool I've Built
        </h2>

        <motion.div
          className="relative p-8 md:p-12 backdrop-blur-lg bg-gradient-to-br from-pink-50/80 to-gray-50/80 border border-gray-400 transition-all"
          whileHover={{ scale: 1.01 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-200/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-gray-200/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <div className="w-24 h-24 mx-auto bg-black rounded-2xl flex items-center justify-center shadow-2xl">
              <svg
                className="w-14 h-14 text-white/90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5h6m-3 0v14m-4-4h8"
                />
              </svg>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-pink-800 to-gray-900 bg-clip-text text-black font-bold">
                Nepali Unicode Converter
              </h2>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                Easily convert Romanized Nepali text to Nepali script. Type in English and get accurate Nepali text instantly! Perfect for writing, learning, and communication.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full">
                
                <span className="text-gray-700 font-medium">Instant Conversion</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full">
                
                <span className="text-gray-700 font-medium">100% Accurate</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full">
                
                <span className="text-gray-700 font-medium">Free to Use</span>
              </div>
            </div>

            <Link
              href="/translation"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-gray-700 text-white rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              <span>Try Now</span>
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
        

        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-pink-300/30 rounded-full"
              initial={{
                scale: 0,
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%'
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}