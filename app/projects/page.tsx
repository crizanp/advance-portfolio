"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Github } from "lucide-react";

// Internal UI Components
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline";
    size?: "default" | "sm";
  }
>(({ className = "", variant = "default", size = "default", ...props }, ref) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors";
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-gray-300 hover:bg-gray-100"
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
    className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    {...props}
  />
);

const Badge = ({ className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-purple-600 text-white",
    secondary: "bg-gray-100 text-gray-800"
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
            featured: true,
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
            featured: true,
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
  );

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
      opacity: 1
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600">Loading amazing projects...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6 sm:p-8 lg:p-12 bg-gray-50 min-h-screen">
      <Card className="mb-12 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Project Showcase
        </h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-3">
          Explore my portfolio of diverse projects spanning web development, design, and innovation.
          Each project represents a unique challenge and solution.
        </p>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8"><b> Commercial project is not showcase here</b></p>
        <div className="flex flex-wrap gap-2 justify-center text-gray-700">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </Card>

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
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={project.mockup}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    {project.featured && (
                      <Badge className="absolute top-2 right-2">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  {hoveredProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center space-x-4"
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
                          className="flex items-center space-x-2 bg-white"
                          onClick={() => window.open(project.sourceCode, '_blank')}
                        >
                          <Github size={16} />
                          <span>Source</span>
                        </Button>
                      )}
                    </motion.div>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.details.map((detail, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
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
        <div className="text-center mt-12">
          <Button
            onClick={() => setVisibleProjects(prev => prev + ITEMS_PER_PAGE)}
            className="flex items-center space-x-2"
          >
            <span>Load More Projects</span>
            <ChevronDown size={16} />
          </Button>
        </div>
      )}
    </main>
  );
}