import { Metadata } from 'next';
import Link from "next/link";
import { LicenseQuizModal } from "../components/LicenseExamModal";
import { BookOpenIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { ClipboardListIcon } from "lucide-react";
import { constructMetadata, siteStructuredData } from '../lib/metadata';

const engineeringSubjects = [
  {
    name: "Basic Electrical",
    icon: "⚡",
    description: "Fundamentals of circuit theory and electronics",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Electronics",
    icon: "⚡",
    description: "Fundamentals of AC Amplifier and semiconductors",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Digital Logic",
    icon: "🖥️",
    description: "Boolean algebra, combinational and sequential circuits",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Microprocessor",
    icon: "💻",
    description: "Architecture and programming of microprocessor systems",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "C Programming",
    icon: "📟",
    description: "Structured programming and low-level memory management",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Object Oriented Programming",
    icon: "🎯",
    description: "Encapsulation, inheritance, polymorphism, and design patterns",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Computer Organization",
    icon: "🧩",
    description: "CPU design, memory hierarchy, and I/O systems",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Operating Systems",
    icon: "🖲️",
    description: "Process management, memory allocation, and file systems",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Data Structures & Algorithms",
    icon: "📊",
    description: "Efficient data organization and computational methods",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Database Systems",
    icon: "🗃️",
    description: "Relational models, SQL, and transaction management",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Computer Networks",
    icon: "🌐",
    description: "Network protocols and architecture (OSI/TCP-IP models)",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Software Engineering",
    icon: "🛠️",
    description: "SDLC models, requirements analysis, and testing",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Artificial Intelligence",
    icon: "🧠",
    description: "Machine learning algorithms and neural networks",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
  {
    name: "Embedded Systems",
    icon: "🔌",
    description: "Real-time systems and hardware-software integration",
    color: "bg-white hover:bg-gray-50 border-2 border-gray-200"
  },
];

export const metadata: Metadata = constructMetadata({
  title: 'Computer Engineering License Exam Preparation | NEC License | Srijan Pokhrel',
  description: 'Prepare for Computer Engineering License Exam with 15 specialized modules, adaptive practice tests, and real-time performance tracking. Trusted by top engineering firms in Nepal.',
  canonicalUrl: 'https://srijanpokhrel.com.np/engineering-license',
  keywords: ['Computer Engineering License Exam', 'NEC License', 'Engineering Preparation', 'Computer Engineering Syllabus', 'Practice Tests', 'License Exam Nepal', 'Engineering Certification'],
  ogImage: 'https://srijanpokhrel.com.np/images/engineering-license.jpg',
});

export default function EngineeringLicensePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl text-gray-900 mb-6"
            >
              Computer Engineering License Exam Preparation
            </h1>
            <p
              className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto"
            >
              Trusted by 85% of top engineering firms for licensure preparation. Access 15 specialized modules with adaptive practice tests and real-time performance tracking.
            </p>
          </div>
        </div>

        {/* Subject Categories */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl text-black text-center mb-12">
            Choose Your Study Module
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringSubjects.map((subject) => (
              <div
                key={subject.name}
                className={`${subject.color} p-6 transition-all `}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {subject.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {subject.description}
                </p>
                <button className="bg-white hover:bg-blue-100 border border-blue-700 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Start Practice
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources
        <div className="bg-gray-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Enhanced Preparation Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpenIcon className="w-12 h-12 text-blue-600" />,
                  title: "NEC Computer Syllabus",
                  text: "Comprehensive coverage of topics with structured modules",
                  buttonText: "View Syllabus →",
                  href: "/nec-license-exam-computer-engineering-syllabus.pdf"
                },
                {
                  icon: <DocumentTextIcon className="w-12 h-12 text-blue-600" />,
                  title: "Reference Notes",
                  text: "Well-curated notes with key concepts and explanations",
                  buttonText: "Read Notes →",
                  href: "/reference-notes"
                },
                {
                  icon: <ClipboardListIcon className="w-12 h-12 text-blue-600" />,
                  title: "Past Questions",
                  text: "Practice with real exam questions and solutions",
                  buttonText: "Practice Now →",
                  href: "#"
                }
              ].map((resource, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-8 shadow-md border-2 border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">{resource.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{resource.text}</p>
                  <Link
                    href={resource.href}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {resource.buttonText}
                  </Link>
                </div>))}
            </div>
          </div>
      </div> */}
    </div>
  );
}