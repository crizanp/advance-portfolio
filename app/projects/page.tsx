"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Github, Star } from "lucide-react";

// Internal UI Components
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm";
  }
>(({ className = "", variant = "default", size = "default", ...props }, ref) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50";
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20",
    outline: "border border-purple-500 text-purple-500 bg-transparent hover:bg-purple-500/10",
    ghost: "bg-transparent text-purple-400 hover:bg-purple-800/30"
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md"
  };
  
  return (
    <button
      ref={ref}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Card = ({ className = "", ...props }) => (
  <div
    className={`rounded-lg border border-gray-800 bg-gray-900 shadow-xl hover:shadow-purple-900/10 transition-all duration-300 ${className}`}
    {...props}
  />
);

const Badge = ({ className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-purple-600 text-white shadow-lg shadow-purple-500/20",
    secondary: "bg-gray-800 text-gray-300 border border-gray-700"
  };
  
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

type Project = {
  id: number;
  title: string;
  mockup: string;
  description: string;
  category: string;
  featured: boolean;
  sourceCode?: string;
  liveDemo?: string;
  details: {
    text: string;
    link?: string;
  }[];
};

const ITEMS_PER_PAGE = 6;

export default function PortfolioShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(ITEMS_PER_PAGE);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockProjects: Project[] = [
          {
            id: 1,
            title: "E-Services Platform",
            mockup: "/images/1.png",
            description: "Frontend online shopping platform with beautiful design",
            category: "Frontend",
            featured: false,
            liveDemo: "https://ecommercereactapp.vercel.app/",
            details: [
              { text: "React" },
              { text: "Stripe" }
            ],
          },
          {
            id: 2,
            title: "Personal Portfolio",
            mockup: "/images/project/portfolio-homepage.png",
            description: "Modern portfolio with dynamic content loading, and responsive animations.",
            category: "Full Stack",
            featured: true,
            liveDemo: "https://srijanpokhrel.com.np",
            details: [
              { text: "Next Js" },
              { text: "Tailwind" },
              { text: "Framer Motion" },
              { text: "MongoDb" }
            ],
          },
          {
            id: 3,
            title: "Clean Blogging Platform",
            mockup: "/images/project/blogging-platform.png",
            description: "A personal blogging platform with markdown support, SEO optimization, and content management.",
            category: "Full Stack",
            featured: false,
            liveDemo: "https://www.srijanpokhrel.com.np/category/reading",
            details: [
              { text: "Next.js" },
              { text: "MongoDB" },
            ],
          },
          {
            id: 4,
            title: "Science Experiment Platform",
            mockup: "/images/2.png",
            description: "Interactive platform for conducting and sharing science experiments with real-time collaboration.",
            category: "Full Stack",
            featured: false,
            details: [
              { text: "PHP" },
              { text: "MySQL" },
              { text: "jQuery" }
            ],
          },
          {
            id: 5,
            title: "College Website",
            mockup: "/images/fsu-portfolio.png",
            description: "Responsive college website with course management, events calendar, and admission system.",
            category: "Full Stack",
            featured: false,
            liveDemo: "https://github.com/crizanp/college-website-corePHP",
            details: [
              { text: "PHP" },
              { text: "jQuery" },
              { text: "MySQL" }
            ],
          },
          {
            id: 6,
            title: "Nepali Unicode Converter",
            mockup: "/images/project/unicode-nepali.png",
            description: "Convert Romanized Nepali (like kasto to Unicode Devanagari (कस्तो) instantly",
            category: "Tools",
            liveDemo: "https://www.srijanpokhrel.com.np/translation",
            featured: false,
            details: [
              { text: "Next Js" },
              { text: "sanscript" },
              { text: "Word Mapping" }
            ],
          },
          {
            id: 7,
            title: "Notes and Documentation",
            mockup: "/images/project/onlinelearnal.png",
            description: "Collaborative documentation platform with real-time editing and version control.",
            category: "Full Stack",
            liveDemo: "https://github.com/crizanp/onlinelearnal_fullstack-php",
            featured: false,
            details: [
              { text: "Core PHP" },
              { text: "jQuery" },
              { text: "MySQL" }
            ],
          },
          {
            id: 8,
            title: "Tools Hub Pro",
            mockup: "/images/project/tool-collection.png",
            description: "Transform, convert, and optimize your files with this free online tools.",
            category: "Full Stack",
            liveDemo: "https://toobox-pro.vercel.app/",
            featured: true,
            details: [
              { text: "JQuery" },
              { text: "React" },
              { text: "Node JS" },

              { text: "Mongodb" }
            ],
          }
        ];
        setProjects(mockProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ["All", ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = projects.filter(project => 
    selectedCategory === "All" || project.category === selectedCategory
  ).sort((a, b) => {
    // Sort by featured status (featured projects first)
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-purple-400">Loading amazing projects...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6 sm:p-8 lg:p-12 bg-gray-950 min-h-screen text-gray-200">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="mb-12 p-6 border-purple-900/50 backdrop-blur-sm bg-opacity-80 bg-gradient-to-br from-gray-900 to-gray-950">
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white">
                Project Showcase
              </span>
            </motion.h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto my-4 rounded-full"></div>
            <motion.p 
              className="text-gray-400 max-w-3xl mx-auto mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Explore my portfolio of diverse projects spanning web development, design, and innovation.
              Each project represents a unique challenge and solution.
            </motion.p>
            {/* <motion.p 
              className="text-gray-300 max-w-3xl mx-auto font-medium italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Commercial projects are not showcased here
            </motion.p> */}
          </div>
          <motion.div 
            className="flex flex-wrap gap-2 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </Card>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredProjects.slice(0, visibleProjects).map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              className="relative"
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full overflow-hidden border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950">
                <div className="relative group">
                  <div className="relative h-48 bg-gray-900 overflow-hidden">
                    <img
                      src={project.mockup}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                    
                    {project.featured && (
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                          <Star size={12} className="mr-1" /> Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-black/80 backdrop-blur-sm flex items-center justify-center space-x-4"
                      >
                        {project.liveDemo && (
                          <Button
                            size="sm"
                            className="flex items-center space-x-2"
                            onClick={() => window.open(project.liveDemo, '_blank')}
                          >
                            <ExternalLink size={16} />
                            <span>Live Demo</span>
                          </Button>
                        )}
                        {project.sourceCode && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center space-x-2"
                            onClick={() => window.open(project.sourceCode, '_blank')}
                          >
                            <Github size={16} />
                            <span>Source</span>
                          </Button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.details.map((detail, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-800/70 backdrop-blur-sm"
                      >
                        {detail.text}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length > visibleProjects && (
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={() => setVisibleProjects(prev => prev + ITEMS_PER_PAGE)}
            className="flex items-center space-x-2 group"
          >
            <span>Load More Projects</span>
            <ChevronDown size={16} className="transition-transform group-hover:translate-y-1" />
          </Button>
        </motion.div>
      )}
    </main>
  );
}