'use client';

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

// Updated Notes Data Structure with Multiple Download Links
const referenceNotes = [
    {
      semester: "First Semester",
      notes: [
        // {
        //   title: "Applied Mechanics",
        //   description: "Fundamental principles of mechanics and force analysis",
        //   downloadLinks: [
        //     { name: "Full Notes", url: "/notes/applied-mechanics-full.pdf" },
        //     { name: "Chapter Summary", url: "/notes/applied-mechanics-summary.pdf" },
        //     { name: "Problem Set", url: "/notes/applied-mechanics-problems.pdf" }
        //   ],
        //   icon: "🏗️",
        //   subject: "Civil Engineering",
        //   courseCode: "CE 401"
        // },
        {
          title: "Basic Electrical Engineering",
          description: "Introductory electrical engineering concepts and principles",
          downloadLinks: [
            { name: "Complete Textbook", url: "/notes/basic-electrical-engineering-full.pdf" },
            { name: "Lecture Notes", url: "/notes/basic-electrical-engineering-lectures.pdf" },
            { name: "Circuit Diagrams", url: "/notes/basic-electrical-engineering-circuits.pdf" }
          ],
          icon: "⚡",
          subject: "Electrical Engineering",
          courseCode: "EE 401"
        },
        {
          title: "Computer Programming",
          description: "Introduction to programming fundamentals",
          downloadLinks: [
            { name: "Full Course Material", url: "/notes/c/simple-notes.pdf" },
            { name: "Code Examples", url: "/notes/computer-programming-code.pdf" },
            { name: "Assignment Guidebook", url: "/notes/computer-programming-assignments.pdf" }
          ],
          icon: "💻",
          subject: "Computer Technology",
          courseCode: "CT 401"
        }
      ]
    },
    {
      semester: "Second Semester",
      notes: [
        {
          title: "Engineering Mathematics II",
          description: "Advanced mathematical techniques and applications",
          downloadLinks: [
            { name: "Comprehensive Textbook", url: "/notes/engineering-mathematics-2-full.pdf" },
            { name: "Problem Solutions", url: "/notes/engineering-mathematics-2-solutions.pdf" },
            { name: "Quick Reference", url: "/notes/engineering-mathematics-2-quick-ref.pdf" }
          ],
          icon: "📐",
          subject: "Science",
          courseCode: "SH 451"
        },
        {
          title: "Engineering Drawing II",
          description: "Advanced technical drawing and design",
          downloadLinks: [
            { name: "Complete Guidebook", url: "/notes/engineering-drawing-2-full.pdf" },
            { name: "Technical Illustrations", url: "/notes/engineering-drawing-2-illustrations.pdf" },
            { name: "Design Techniques", url: "/notes/engineering-drawing-2-techniques.pdf" }
          ],
          icon: "✏️",
          subject: "Mechanical Engineering",
          courseCode: "ME 451"
        },
        // ... rest of the second semester notes with multiple download links
        {
          title: "Workshop Technology",
          description: "Practical workshop skills and manufacturing processes",
          downloadLinks: [
            { name: "Full Course Material", url: "/notes/workshop-technology-full.pdf" },
            { name: "Safety Guidelines", url: "/notes/workshop-technology-safety.pdf" },
            { name: "Equipment Manual", url: "/notes/workshop-technology-equipment.pdf" }
          ],
          icon: "🛠️",
          subject: "Mechanical Engineering",
          courseCode: "ME 453"
        }
      ]
    },
    {
      semester: "Third Semester",
      notes: [
        {
          title: "Object Oriented Programming",
          description: "Advanced programming concepts and OOP principles",
          downloadLinks: [
            { name: "Complete Textbook", url: "/notes/object-oriented-programming-full.pdf" },
            { name: "Code Repositories", url: "/notes/object-oriented-programming-code.pdf" },
            { name: "Design Patterns", url: "/notes/object-oriented-programming-patterns.pdf" }
          ],
          icon: "💻",
          subject: "Computer Technology",
          courseCode: "CT 501"
        },
        {
          title: "Electric Circuit Theory",
          description: "Comprehensive study of electrical circuits",
          downloadLinks: [
            { name: "Full Course Notes", url: "/notes/electric-circuit-theory-full.pdf" },
            { name: "Circuit Simulation Guide", url: "/notes/electric-circuit-theory-simulation.pdf" },
            { name: "Problem Solving Manual", url: "/notes/electric-circuit-theory-problems.pdf" }
          ],
          icon: "⚡",
          subject: "Electrical Engineering",
          courseCode: "EE 501"
        },
        // ... rest of the third semester notes with multiple download links
        {
          title: "Electromagnetics",
          description: "Electromagnetic field theory and applications",
          downloadLinks: [
            { name: "Comprehensive Textbook", url: "/notes/electromagnetics-full.pdf" },
            { name: "Wave Propagation Notes", url: "/notes/electromagnetics-waves.pdf" },
            { name: "Practical Applications", url: "/notes/electromagnetics-applications.pdf" }
          ],
          icon: "🌐",
          subject: "Electronics",
          courseCode: "EX 503"
        }
      ]
    },
    {
      semester: "Fourth Semester",
      notes: [
        {
          title: "Numerical Method",
          description: "Computational techniques for solving mathematical problems",
          downloadLinks: [
            { name: "Full Textbook", url: "/notes/numerical-method-full.pdf" },
            { name: "Algorithm Implementations", url: "/notes/numerical-method-algorithms.pdf" },
            { name: "Solution Techniques", url: "/notes/numerical-method-solutions.pdf" }
          ],
          icon: "🔢",
          subject: "Science",
          courseCode: "SH 553"
        },
        {
          title: "Data Structure and Algorithm",
          description: "Advanced data organization and algorithmic techniques",
          downloadLinks: [
            { name: "Complete Course Material", url: "/notes/data-structure-algorithm-full.pdf" },
            { name: "Code Implementations", url: "/notes/data-structure-algorithm-code.pdf" },
            { name: "Problem-Solving Guide", url: "/notes/data-structure-algorithm-problems.pdf" }
          ],
          icon: "📊",
          subject: "Computer Technology",
          courseCode: "CT 552"
        },
        // ... rest of the fourth semester notes with multiple download links
        {
          title: "Electrical Machine",
          description: "Design and operation of electrical machines",
          downloadLinks: [
            { name: "Comprehensive Textbook", url: "/notes/electrical-machine-full.pdf" },
            { name: "Design Principles", url: "/notes/electrical-machine-design.pdf" },
            { name: "Operational Techniques", url: "/notes/electrical-machine-operations.pdf" }
          ],
          icon: "⚙️",
          subject: "Electrical Engineering",
          courseCode: "EE 554"
        }
      ]
    },
    {
      semester: "Fifth Semester",
      notes: [
        {
          title: "Software Engineering",
          description: "Principles of software design and development",
          downloadLinks: [
            { name: "Full Course Material", url: "/notes/software-engineering-full.pdf" },
            { name: "Design Methodologies", url: "/notes/software-engineering-design.pdf" },
            { name: "Project Management Guide", url: "/notes/software-engineering-management.pdf" }
          ],
          icon: "💻",
          subject: "Computer Technology",
          courseCode: "CT 601"
        },
        {
          title: "Data Communication",
          description: "Principles of data transmission and networking",
          downloadLinks: [
            { name: "Comprehensive Textbook", url: "/notes/data-communication-full.pdf" },
            { name: "Network Protocols", url: "/notes/data-communication-protocols.pdf" },
            { name: "Security Techniques", url: "/notes/data-communication-security.pdf" }
          ],
          icon: "📡",
          subject: "Computer Technology",
          courseCode: "CT 602"
        },
        // ... rest of the fifth semester notes with multiple download links
        {
          title: "Instrumentation II",
          description: "Advanced measurement and sensing technologies",
          downloadLinks: [
            { name: "Complete Course Notes", url: "/notes/instrumentation-2-full.pdf" },
            { name: "Sensor Technologies", url: "/notes/instrumentation-2-sensors.pdf" },
            { name: "Measurement Techniques", url: "/notes/instrumentation-2-measurement.pdf" }
          ],
          icon: "🔬",
          subject: "Electronics",
          courseCode: "EX 602"
        }
      ]
    },
    {
      semester: "Sixth Semester",
      notes: [
        {
          title: "Artificial Intelligence",
          description: "Principles and applications of artificial intelligence",
          downloadLinks: [
            { name: "Full Textbook", url: "/notes/artificial-intelligence-full.pdf" },
            { name: "Machine Learning Guide", url: "/notes/artificial-intelligence-ml.pdf" },
            { name: "AI Applications", url: "/notes/artificial-intelligence-applications.pdf" }
          ],
          icon: "🤖",
          subject: "Computer Technology",
          courseCode: "CT 653"
        },
        {
          title: "Database Management System",
          description: "Advanced database design and management",
          downloadLinks: [
            { name: "Complete Course Material", url: "/notes/database-management-system-full.pdf" },
            { name: "Query Optimization", url: "/notes/database-management-system-queries.pdf" },
            { name: "Database Design Principles", url: "/notes/database-management-system-design.pdf" }
          ],
          icon: "🗃️",
          subject: "Computer Technology",
          courseCode: "CT 652"
        },
        // ... rest of the sixth semester notes with multiple download links
        {
          title: "Minor Project",
          description: "Practical project application of learned skills",
          downloadLinks: [
            { name: "Project Guidelines", url: "/notes/minor-project-guidelines.pdf" },
            { name: "Project Proposal Template", url: "/notes/minor-project-proposal.pdf" },
            { name: "Evaluation Criteria", url: "/notes/minor-project-evaluation.pdf" }
          ],
          icon: "📋",
          subject: "Computer Technology",
          courseCode: "CT 654"
        }
      ]
    },
    {
      semester: "Seventh Semester",
      notes: [
        {
          title: "Distributed System",
          description: "Principles of distributed computing systems",
          downloadLinks: [
            { name: "Full Course Material", url: "/notes/distributed-system-full.pdf" },
            { name: "Architecture Overview", url: "/notes/distributed-system-architecture.pdf" },
            { name: "Case Studies", url: "/notes/distributed-system-case-studies.pdf" }
          ],
          icon: "🌐",
          subject: "Computer Technology",
          courseCode: "CT 703"
        },
        {
          title: "Computer Networks and Security",
          description: "Network infrastructure and cybersecurity",
          downloadLinks: [
            { name: "Comprehensive Textbook", url: "/notes/computer-networks-security-full.pdf" },
            { name: "Network Protocols", url: "/notes/computer-networks-protocols.pdf" },
            { name: "Cybersecurity Techniques", url: "/notes/computer-networks-cybersecurity.pdf" }
          ],
          icon: "🔒",
          subject: "Computer Technology",
          courseCode: "CT 702"
        },
        // ... rest of the seventh semester notes with multiple download links
        {
          title: "Electives",
          description: "Various specialized advanced topics",
          downloadLinks: [
            { name: "Elective Overview", url: "/notes/electives-overview.pdf" },
            { name: "Advanced Topics Guide", url: "/notes/electives-advanced-topics.pdf" },
            { name: "Elective Selection Criteria", url: "/notes/electives-selection.pdf" }
          ],
          icon: "🎓",
          subject: "Multiple",
          courseCode: "Various"
        }
      ]
    },
    {
      semester: "Eighth Semester",
      notes: [
        {
          title: "Information Systems",
          description: "Design and management of information systems",
          downloadLinks: [
            { name: "Full Course Material", url: "/notes/information-systems-full.pdf" },
            { name: "System Design Principles", url: "/notes/information-systems-design.pdf" },
            { name: "Implementation Strategies", url: "/notes/information-systems-implementation.pdf" }
          ],
          icon: "🖥️",
          subject: "Computer Technology",
          courseCode: "CT 751"
        },
        {
          title: "Internet and Intranet",
          description: "Web technologies and network infrastructure",
          downloadLinks: [
            { name: "Comprehensive Textbook", url: "/notes/internet-intranet-full.pdf" },
            { name: "Web Technologies", url: "/notes/internet-intranet-web-tech.pdf" },
            { name: "Network Configuration", url: "/notes/internet-intranet-network.pdf" }
          ],
          icon: "🌐",
          subject: "Computer Technology",
          courseCode: "CT 754"
        },
        // ... rest of the eighth semester notes with multiple download links
        {
          title: "Project (Part B)",
          description: "Final comprehensive engineering project",
          downloadLinks: [
            { name: "Project Guidelines", url: "/notes/project-part-b-guidelines.pdf" },
            { name: "Final Report Template", url: "/notes/project-part-b-template.pdf" },
            { name: "Presentation Criteria", url: "/notes/project-part-b-presentation.pdf" }
          ],
          icon: "🏆",
          subject: "Computer Technology",
          courseCode: "CT 755"
        }
      ]
    }
];

const NotesDetailsModal = ({ note, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-2">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 rounded-lg max-w-md w-full p-4 relative shadow-xl"
        >
          <button 
            onClick={onClose} 
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
  
          <div className="text-2xl mb-2">{note.icon}</div>
          <h2 className="text-xl font-bold text-white mb-1">{note.title}</h2>
          <p className="text-gray-300 text-sm mb-2">{note.description}</p>
          <p className="text-gray-400 text-xs mb-3 italic">Subject: {note.subject}</p>
  
          <div className="space-y-2">
            {note.downloadLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.url} 
                target="_blank"
                className="w-full bg-purple-700 hover:bg-purple-600 text-white py-2 rounded-md flex items-center justify-center space-x-1 text-sm transition-colors"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };
  
  export default function ReferenceNotesPage() {
    const [selectedNote, setSelectedNote] = useState(null);
    const semesterRefs = useRef<{[key: string]: HTMLElement | null}>({});
  
    const setSemesterRef = useCallback((semester: string) => (el: HTMLElement | null) => {
      semesterRefs.current[semester] = el;
    }, []);
  
    const scrollToSemester = (semester: string) => {
      const sectionElement = semesterRefs.current[semester];
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    return (
      <main className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-2 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
            Engineering Reference Notes
          </h1>
          {/* <div className="sticky top-0 mb-3 z-40 bg-gray-800 shadow-md">
  <div className="max-w-7xl mx-auto px-2 py-2">
    <div className="flex space-x-2 overflow-x-auto">
      {referenceNotes.map((semester) => (
        <button
          key={semester.semester}
          onClick={() => scrollToSemester(semester.semester)}
          className="px-3 py-1.5 bg-gray-700 hover:bg-purple-700 rounded-md 
                     text-xs sm:text-sm md:text-base lg:text-lg 
                     font-medium transition-colors"
        >
          {semester.semester}
        </button>
      ))}
    </div>
  </div>
</div> */}

          {referenceNotes.map((semester) => (
            <section 
              key={semester.semester} 
              ref={setSemesterRef(semester.semester)}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-200 mb-3">
                {semester.semester}
              </h2>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {semester.notes.map((note) => (
                  <motion.div
                    key={note.title}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all border border-gray-700"
                    onClick={() => setSelectedNote(note)}
                  >
                    <div className="text-2xl mb-2">{note.icon}</div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {note.title}
                    </h4>
                    <p className="text-gray-400 mb-1 text-xs">
                      {note.description}
                    </p>
                    <span className="text-xs text-purple-400 font-semibold">
                      {note.subject}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
  
          {/* Notes Details Modal */}
          {selectedNote && (
            <NotesDetailsModal 
              note={selectedNote} 
              onClose={() => setSelectedNote(null)} 
            />
          )}
        </div>
      </main>
    );
  };
