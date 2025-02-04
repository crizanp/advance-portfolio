"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PuffLoader from "react-spinners/PuffLoader"; 

type Project = {
  id: number;
  title: string;
  mockup: string;
  description: string;
  details: {
    text: string;
    link?: string;
  }[];
};

export default function PortfolioShowcase() {
  const [projects, setProjects] = useState<Project[]>([]); // Store projects
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate fetching projects (replace with actual API call)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data for 9 projects
        const mockProjects: Project[] = [
          {
            id: 1,
            title: "E-Services Platform",
            mockup: "/images/1.png",
            description: "Full-stack online shopping platform with payment integration",
            details: [
              { text: "React", link: "" },
            ],
          },
          {
            id: 2,
            title: "Personal Portfolio",
            mockup: "/images/portfolio_my_mockup.png",
            description: "Showcasing my skills, projects, and passion as a developer",
            details: [
              { text: "React", link: "" },
            ],
          },
          {
            id: 3,
            title: "Clean Blogging Platform",
            mockup: "/images/blogging_my_mockup.png",
            description: "A personal blogging platform to share insights, ideas, and tutorials.",
            details: [
              { text: "Next js", link: "" },
            ],
          },
          
          {
            id: 4,
            title: "Science Experiment Platform",
            mockup: "/images/2.png",
            description: "Interactive platform for conducting and sharing science experiments.",
            details: [
              { text: "PHP", link: "" },
            ],
          },
          {
            id: 5,
            title: "College Website",
            mockup: "/images/fsu-portfolio.png",
            description: "A fully-responsive website for a college, providing information about courses, faculty, events, and admissions.",
            details: [
              { text: "Core PHP", link: "" },
            ],
          },
          {
            id: 6,
            title: "Notes and Documentation",
            mockup: "/images/onlinelearnal.png",
            description: "Platform to organize, share, and manage notes and documentation for educational purposes.",
            details: [
              { text: "HTML CSS JS", link: "" },
              { text: "PHP", link: "" },
            ],
          }
          // Add 8 more projects here...
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <PuffLoader color="#6b46c1" size={150} />
      </div>
    );
  }

  return (
    <main className="p-6 sm:p-8 lg:p-12 bg-white min-h-screen">
      {/* Introduction Section */}
      <section className="mb-12 text-center px-4">
        {/* <h1 className="text-4xl font-bold mb-6 text-gray-800">My Project Showcase</h1> */}
        <div className="mx-auto text-gray-700 space-y-4 leading-relaxed max-w-3xl">
         
          <p>
            From full-stack applications to innovative experiments, these projects showcase my skills, creativity, and passion for building meaningful solutions. Dive in and explore!
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map((project) => (
            <motion.div
              key={project.id}
              className="cursor-pointer bg-white border-2 border-purple-300 rounded-lg p-2 shadow-lg hover:shadow-xl transition-all ease-in-out duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {/* Mockup Image */}
              <div className="relative h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img
                  src={project.mockup}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Logo */}
              <div className="flex items-center mb-4 space-x-3">
                <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">{project.description}</p>

              {/* Details Links */}
              <div className="flex flex-wrap gap-2">
                {project.details.map((detail, index) =>
                  detail.link ? (
                    <Link
                      key={index}
                      href={detail.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-500 transition-colors"
                    >
                      {detail.text}
                    </Link>
                  ) : (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full text-sm cursor-not-allowed"
                    >
                      {detail.text}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-1 sm:col-span-2 lg:col-span-3">
            No projects found
          </p>
        )}
      </div>
    </main>
  );
}
