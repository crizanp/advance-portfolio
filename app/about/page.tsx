"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const COMMANDS = {
  help: 'Available commands:\n\n' +
    'about        - View my professional summary\n' +
    'skills       - List technical skills\n' +
    'projects     - View major projects\n' +
    'contact      - Get contact information\n' +
    'experience   - Show work experience\n' +
    'education    - Show educational background\n' +
    'clear        - Clear terminal\n' +
    'gui          - Switch to GUI mode',

  about: "Senior Full Stack Developer with expertise in web applications, trading systems, and automation solutions.",

  skills: "Technical Skills:\n\n" +
    "Frontend: React.js, Next.js, TypeScript\n" +
    "Backend: Node.js, PHP, MongoDB\n" +
    "Platforms: WordPress, Magento, Shopify\n" +
    "Tools: Git, Docker, AWS",

  projects: "Major Projects:\n\n" +
    "1. E-commerce Platform\n" +
    "2. Trading Bot System\n" +
    "3. Telegram Mini Apps\n" +
    "4. Investment Research Tools\n" +
    "5. Custom Admin Panel\n" +
    "6. Professional Blog Platform\n\n" +
    "Type 'project <number>' for details",

  contact: "Email: srijanpokhrel1@gmail.com\nGitHub: github.com/crizanp\nLinkedIn: linkedin.com/in/srijanpokhrel",

  experience: "Senior Full Stack Developer at IGH Digital\n2020 - Present\n\n" +
    "- Led development of enterprise applications\n" +
    "- Built trading systems and automation tools\n" +
    "- Developed custom e-commerce solutions",

  education: "Bachelor of Computer Engineering\nGraduated with Honors",
};

const PROJECT_DETAILS = {
  1: "E-commerce Platform\n\n" +
    "A scalable e-commerce solution with:\n" +
    "- Advanced inventory management\n" +
    "- Real-time analytics\n" +
    "- Payment integration\n\n" +
    "Tech: Next.js, Node.js, MongoDB, Stripe",

  2: "Trading Bot System\n\n" +
    "Automated trading system featuring:\n" +
    "- Real-time market analysis\n" +
    "- Risk management\n" +
    "- Performance tracking\n\n" +
    "Tech: Node.js, WebSocket, Trading APIs",
};

const skills = {
  frontend: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  backend: ['Node.js', 'PHP', 'Python', 'MongoDB', 'PostgreSQL'],
  platforms: ['WordPress', 'Magento', 'Shopify', 'AWS'],
  tools: ['Git', 'Docker', 'Webpack', 'Jest', 'CI/CD']
};

const projects = [
  {
    title: "E-commerce Platform",
    description: "Scalable online shopping solution with real-time analytics",
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    title: "Trading Bot System",
    description: "Automated trading platform",
    tech: ['Node.js', 'WebSocket', 'TensorFlow', 'AWS']
  },
  {
    title: "Telegram Mini Apps",
    description: "Suite of productivity tools within Telegram",
    tech: ['React.js', 'TypeScript', 'Node.js', 'WebSocket']
  },
  {
    title: "Investment Research Tools",
    description: "Financial analysis and visualization platform",
    tech: ['Python', 'Django', 'React.js', 'Pandas']
  }
];

export default function About() {
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState(['Welcome! Type "help" for available commands']);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const [mainCmd, ...args] = cleanCmd.split(' ');

    let response = '';

    if (mainCmd === 'clear') {
      setTerminalHistory([]);
      return;
    }

    if (mainCmd === 'gui') {
      setIsTerminalMode(false);
      return;
    }

    if (mainCmd === 'project' && args[0]) {
      response = PROJECT_DETAILS[args[0]] || 'Project not found. Type "projects" to see available projects.';
    } else {
      response = COMMANDS[mainCmd] || 'Command not found. Type "help" for available commands.';
    }

    setTerminalHistory(prev => [...prev, `$ ${cmd}`, response]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand);
      setCurrentCommand('');
    }
  };
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Gradient header accent */}
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero section */}
        <section className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter">
              About Me
            </h1>
            <div className="mt-2 h-1 w-32 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
              Passionate developer & tech enthusiast creating tools and sharing knowledge.
            </p>
          </div>
        </section>

        {/* Bio section */}
        <section className="grid md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2 flex justify-center">
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-purple-500 shadow-lg shadow-purple-500/20">
              {/* Replace with your actual profile image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-3xl text-purple-400 font-bold">
                CP
              </div>
              {/* Uncomment if you have an actual image */}
              <Image 
                src="/images/pp.png" 
                alt="Crizan P" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="mb-4 text-gray-300">
              Hello! I'm a software developer with a passion for creating innovative solutions and sharing knowledge with the tech community. With expertise in web development, I focus on building accessible, responsive, and elegant web applications.
            </p>
            <p className="mb-8 text-gray-300">
              My journey in tech began with a fascination for how software can solve real-world problems. Today, I continue to explore new technologies while helping others learn and grow in the field.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-200 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {['React', 'Next.js', 'JavaScript', 'TypeScript', 'Node.js', 'Tailwind CSS'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-gray-800 text-purple-300 text-sm rounded-full border border-gray-700">
                  {tech}
                </span>
              ))}
            </div>
            
           
          </div>
        </section>

        {/* Experience & Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-purple-400 mb-8">Experience & Education</h2>
          
          <div className="space-y-8">
            {/* Timeline item */}
            <div className="relative pl-8 border-l-2 border-gray-700">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
              <div className="mb-1">
                <span className="text-purple-300 font-medium">2021 - Present</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-200">Senior Developer</h3>
              <p className="text-gray-400">IGH Digital Dubai</p>
              <p className="mt-2 text-gray-300">
                Leading development efforts, mentoring junior developers, and architecting scalable solutions.
              </p>
            </div>

            {/* Timeline item */}
            <div className="relative pl-8 border-l-2 border-gray-700">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
              <div className="mb-1">
                <span className="text-purple-300 font-medium">2018 - 2020</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-200">Web Developer</h3>
              <p className="text-gray-400">Nxtech Hosting Itahari</p>
              <p className="mt-2 text-gray-300">
                Built responsive web applications and implemented modern frontend frameworks.
              </p>
            </div>

            {/* Timeline item */}
            <div className="relative pl-8 border-l-2 border-gray-700">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
              <div className="mb-1">
                <span className="text-purple-300 font-medium">2018 - 2023</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-200">BSc Computer Science</h3>
              <p className="text-gray-400">Institute Of Engineering (TU)</p>
              <p className="mt-2 text-gray-300">
                Specialized in software development and computer systems.
              </p>
            </div>
          </div>
        </section>

        {/* Projects section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-purple-400 mb-8">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Project card */}
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-purple-500/10 transition">
              <div className="h-48 bg-gradient-to-br from-purple-900 to-gray-800 flex items-center justify-center">
                <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-200 mb-2">Toolbox Pro </h3>
                <p className="text-gray-400 mb-4">
                Transform, convert, and optimize your files with this free online tools
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Node.js', 'Tailwind'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-700 text-xs text-purple-300 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href="https://toobox-pro.vercel.app/" className="text-purple-400 font-medium hover:text-purple-300 inline-flex items-center">
                  View Project
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Project card */}
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-purple-500/10 transition">
              <div className="h-48 bg-gradient-to-br from-purple-900 to-gray-800 flex items-center justify-center">
                <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-200 mb-2">Nepali Currency Recognization System</h3>
                <p className="text-gray-400 mb-4">
                 its the final year project developed by 4 teams 
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['JAVA', 'AI', 'NLP'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-700 text-xs text-purple-300 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href="https://github.com/crizanp/currencydetection" className="text-purple-400 font-medium hover:text-purple-300 inline-flex items-center">
                  View Project
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Want to Work Together?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-purple-600/20">
            Get In Touch
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </section>
      </main>

      {/* Footer accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>
    </div>
  );
}