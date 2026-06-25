"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, Github, Linkedin, MapPin, Calendar, Briefcase, GraduationCap, Code, ExternalLink, Download } from 'lucide-react';

const skills = {
  languages: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'PHP'],
  dataEngineering: ['ETL pipelines', 'Data modelling', 'Query optimisation', 'Data quality', 'Microservices'],
  databases: ['MySQL', 'MongoDB', 'SQL Server', 'PostgreSQL'],
  cloudDevOps: ['Docker', 'AWS', 'GCP', 'Git', 'GitHub', 'Postman'],
  backendTools: ['Node.js', 'Express.js', 'Laravel', 'CodeIgniter', 'REST APIs'],
  analyticsML: ['NumPy', 'TensorFlow', 'Scikit-learn', 'Statistical modelling', 'Excel'],
  testing: ['Jest', 'Playwright', 'Unit tests', 'Integration tests', 'E2E testing']
};

const projects = [
  {
    title: "Hotel & Restaurant POS System",
    description: "Real-time data flows across role-based access layers with hardware integration",
    tech: ['Next.js', 'SQL', 'Real-time Data'],
    link: "https://github.com/crizanp"
  },
  {
    title: "Inventory Management System",
    description: "Full POS system with product and stock tracking backed by MySQL reporting",
    tech: ['Laravel', 'MySQL', 'Reporting'],
    link: "https://github.com/crizanp"
  },
  {
    title: "School Management System",
    description: "Automated attendance, student records management, and SMS notification pipelines",
    tech: ['Laravel', 'Automation', 'APIs'],
    link: "https://github.com/crizanp"
  },
  {
    title: "E-Commerce Websites",
    description: "Responsive storefronts for international clients with data integration",
    tech: ['Next.js', 'MongoDB', 'Integration'],
    link: "https://github.com/crizanp"
  }
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 max-w-7xl mx-auto">
      {/* Sidebar */}
      <aside className="lg:w-80  bg-white border-r border-gray-200 flex flex-col items-center px-4 py-8 lg:py-12 lg:sticky lg:top-0 lg:h-[1200px] overflow-y-auto">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg mb-4 lg:mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center relative">
          <Image
            src="/images/sideimg_sri.png"
            alt="Srijan Pokhrel"
            fill
            className="object-contain rounded-full"
            priority
          />
        </div>

        {/* Name and Title */}
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 text-center">Srijan Pokhrel</h1>
        <p className="text-blue-600 font-medium mb-1 lg:mb-2 text-center text-sm lg:text-base">Senior Data Engineer</p>
        <p className="text-gray-500 text-xs lg:text-sm mb-6 lg:mb-8 text-center">Python & SQL | Data Pipelines & ETL</p>

        {/* Contact Info */}
        <div className="w-full mb-6 lg:mb-8 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-blue-600"><Phone size={16} /></span>
            <span>+977 981 057 0014</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 break-all">
            <span className="text-blue-600"><Mail size={16} /></span>
            <span className="text-xs">srijanpokhrel1@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-blue-600"><MapPin size={16} /></span>
            <span>Kathmandu, Nepal</span>
          </div>
        </div>

        {/* Download Resume Button */}
        <a
          href="/resume.pdf"
          download="Srijan_Pokhrel_Resume.pdf"
          className="w-full mb-6 lg:mb-8 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          <Download size={18} />
          Download Resume
        </a>

        {/* Navigation */}
        <nav className="w-full mb-8 lg:mb-12 hidden lg:block">
          <ul className="space-y-1">
            {['ABOUT', 'EXPERIENCE', 'EDUCATION', 'SKILLS', 'PROJECTS', 'CERTIFICATIONS'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => scrollToSection(e, item.toLowerCase())}
                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    item === 'ABOUT' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="flex gap-4 mb-6 lg:mb-8">
          <a href="https://linkedin.com/in/srijanpokhrel" className="text-gray-400 hover:text-blue-600 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com/crizanp" className="text-gray-400 hover:text-gray-900 transition-colors">
            <Github size={20} />
          </a>
          <a href="mailto:srijanpokhrel1@gmail.com" className="text-gray-400 hover:text-blue-600 transition-colors">
            <Mail size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400 text-center mt-auto hidden lg:block">
          © Copyright 2026<br/>All rights reserved
        </p>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Hero Section */}
          <section id="about" className={`mb-12 lg:mb-16 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">About Me</h2>
            <div className="space-y-4 lg:space-y-6">
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                Data-focused Full-Stack Engineer with 3+ years building scalable systems, data pipelines, and REST APIs across multiple products. Currently serving as CTO at Foxbeep Technology, architecting backend infrastructure for data-intensive applications.
              </p>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                I'm experienced in Python, SQL, Node.js, and database optimisation with hands-on exposure to data analytics, statistical modelling, and distributed system design. Passionate about turning raw data into reliable, high-performance infrastructure that drives product decisions.
              </p>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                As a licensed computer engineer in Nepal, I'm committed to continuous learning and building solutions that make a real impact.
              </p>
            </div>
          </section>

          {/* Professional Summary */}
          <section id="summary" className="mb-12 lg:mb-16 bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Professional Summary</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>CTO at Foxbeep Technology (Nov 2025 - Present):</strong> Designing end-to-end data architecture, managing data pipelines and ETL processes, defining data quality standards</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>3+ years in Full-Stack & Data Engineering:</strong> Building scalable systems connecting products, payment gateways, CRM platforms, and external APIs</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Expertise:</strong> ETL pipelines, data modelling, query optimisation, microservices architecture, and REST API design</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Licensed Engineer:</strong> Registered Licensed Computer Engineer with Nepal Engineering Council</span>
              </li>
            </ul>
          </section>

          {/* Experience */}
          <section id="experience" className="mb-12 lg:mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8 flex items-center gap-2 lg:gap-3">
              <Briefcase className="text-blue-600" />
              Professional Experience
            </h3>
            
            <div className="space-y-6 lg:space-y-8">
              {/* CTO */}
              <div className="relative pl-8 lg:pl-10 border-l-2 border-blue-300">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-gray-50"></div>
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-blue-600 font-semibold mb-2">
                    <Calendar size={16} />
                    <span>Nov 2025 - Present</span>
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">Chief Technical Officer</h4>
                  <p className="text-gray-600 font-medium mb-3 lg:mb-4 text-sm lg:text-base">Foxbeep Technology - Kathmandu</p>
                  <ul className="space-y-2 text-gray-600 text-sm lg:text-base">
                    <li>• Design and own end-to-end data architecture for multiple products, ensuring scalability, reliability, and performance</li>
                    <li>• Build and maintain data pipelines and ETL processes connecting product systems, payment gateways, CRM platforms, and external APIs</li>
                    <li>• Define data quality standards, consistency checks, and automated testing across the engineering team</li>
                    <li>• Lead backend and frontend architecture using PHP, Node.js, and React</li>
                  </ul>
                </div>
              </div>

              {/* Software Developer */}
              <div className="relative pl-8 lg:pl-10 border-l-2 border-blue-300">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-gray-50"></div>
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-blue-600 font-semibold mb-2">
                    <Calendar size={16} />
                    <span>Jul 2025 - Sep 2025</span>
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">Software Developer - Full-Stack & Integrations</h4>
                  <p className="text-gray-600 font-medium mb-3 lg:mb-4 text-sm lg:text-base">Foxbeep Technology - Kathmandu</p>
                  <ul className="space-y-2 text-gray-600 text-sm lg:text-base">
                    <li>• Built data dashboards and reporting tools connecting frontend interfaces with backend data sources</li>
                    <li>• Designed REST APIs for structured data exchange between products and third-party services</li>
                    <li>• Optimised SQL database queries and data pipelines, improving system throughput significantly</li>
                    <li>• Integrated marketing analytics tools and external data APIs to create unified data views</li>
                  </ul>
                </div>
              </div>

              {/* Data Analytics Intern */}
              <div className="relative pl-8 lg:pl-10 border-l-2 border-blue-300">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-gray-50"></div>
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-blue-600 font-semibold mb-2">
                    <Calendar size={16} />
                    <span>May 2024 - Aug 2024</span>
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">Data Analytics Intern</h4>
                  <p className="text-gray-600 font-medium mb-3 lg:mb-4 text-sm lg:text-base">Arihant Multifibres / Arihant Poly-Packs Ltd - On-Site</p>
                  <ul className="space-y-2 text-gray-600 text-sm lg:text-base">
                    <li>• Analysed production datasets to identify process inefficiencies, reducing raw material waste by 10%</li>
                    <li>• Built statistical models using Python (NumPy) and SQL to track product defect rates</li>
                    <li>• Delivered management-ready data visualisations and reports using Excel and Python</li>
                  </ul>
                </div>
              </div>

              {/* Junior Backend Developer */}
              <div className="relative pl-8 lg:pl-10 border-l-2 border-blue-300">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-gray-50"></div>
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-blue-600 font-semibold mb-2">
                    <Calendar size={16} />
                    <span>Feb 2024 - Apr 2024</span>
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">Junior Backend Developer</h4>
                  <p className="text-gray-600 font-medium mb-3 lg:mb-4 text-sm lg:text-base">Nxtechhosting Solution - On-Site</p>
                  <ul className="space-y-2 text-gray-600 text-sm lg:text-base">
                    <li>• Designed microservices architecture improving system scalability by 40%</li>
                    <li>• Developed server-side applications with Node.js and Express.js, improving performance by 30%</li>
                    <li>• Managed MongoDB and MySQL database operations including schema design and query optimisation</li>
                    <li>• Built RESTful APIs for frontend consumption and third-party service integrations</li>
                  </ul>
                </div>
              </div>

              {/* Full-Stack Developer */}
              <div className="relative pl-8 lg:pl-10 border-l-2 border-blue-300">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-gray-50"></div>
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-blue-600 font-semibold mb-2">
                    <Calendar size={16} />
                    <span>Jul 2023 - Feb 2024</span>
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">Full-Stack Developer</h4>
                  <p className="text-gray-600 font-medium mb-3 lg:mb-4 text-sm lg:text-base">IGH Digital Dubai - Remote</p>
                  <ul className="space-y-2 text-gray-600 text-sm lg:text-base">
                    <li>• Built REST APIs and full-stack web applications for international clients</li>
                    <li>• Integrated marketing analytics tools and developed data pipelines for lead generation campaigns</li>
                    <li>• Delivered technical solutions aligned with business and reporting goals</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          <section id="education" className="mb-12 lg:mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8 flex items-center gap-2 lg:gap-3">
              <GraduationCap className="text-blue-600" />
              Education
            </h3>
            
            <div className="space-y-6 lg:space-y-8">
              {/* MSc */}
              <div className="relative pl-8 lg:pl-10 border-l-2 border-blue-300">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-gray-50"></div>
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-blue-600 font-semibold mb-2">
                    <Calendar size={16} />
                    <span>2025 - Present</span>
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">MSc - Informatics & Intelligent System Engineering</h4>
                  <p className="text-gray-600 font-medium mb-2 text-sm lg:text-base">Tribhuvan University, Thapathali Campus - Kathmandu</p>
                  <p className="text-gray-600 text-sm">Courses: Computer Vision, Numerical Analysis, Computational Intelligence, Information Theory</p>
                </div>
              </div>

              {/* Bachelor's */}
              <div className="relative pl-8 lg:pl-10 border-l-2 border-blue-300">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-gray-50"></div>
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-blue-600 font-semibold mb-2">
                    <Calendar size={16} />
                    <span>2020 - 2024</span>
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">Bachelor of Engineering - Computer Engineering</h4>
                  <p className="text-gray-600 font-medium mb-2 text-sm lg:text-base">Tribhuvan University, Purwanchal Campus - Dharan</p>
                  <p className="text-gray-600 text-sm">Courses: Data Mining, Database Management Systems, Computer Networks & Security, Software Engineering, OOP, Statistics</p>
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className="mb-12 lg:mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8 flex items-center gap-2 lg:gap-3">
              <Code className="text-blue-600" />
              Technical Skills
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm lg:text-base capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200 hover:border-blue-400 hover:bg-blue-100 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="mb-12 lg:mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">Featured Projects</h3>
            
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                  <div className="p-4 lg:p-6">
                    <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{project.title}</h4>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-blue-50 text-xs text-blue-700 font-medium rounded-full border border-blue-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section id="certifications" className="mb-12 lg:mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">Certifications & Achievements</h3>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm lg:text-base">Supervised Machine Learning: Regression & Classification</h4>
                    <p className="text-gray-600 text-xs lg:text-sm">Stanford University / DeepLearning.AI</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm lg:text-base">Full Stack Development with MERN Stack</h4>
                    <p className="text-gray-600 text-xs lg:text-sm">Professional Certification</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm lg:text-base">SQL - Udemy Certification</h4>
                    <p className="text-gray-600 text-xs lg:text-sm">Comprehensive SQL training and certification</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm lg:text-base">Registered Licensed Computer Engineer</h4>
                    <p className="text-gray-600 text-xs lg:text-sm">Nepal Engineering Council</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm lg:text-base">1st Place - Web Development Competition</h4>
                    <p className="text-gray-600 text-xs lg:text-sm">Achievement & Recognition</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm lg:text-base">Organised 3-day Robotics & Arduino Training</h4>
                    <p className="text-gray-600 text-xs lg:text-sm">ACES Coordinator</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contact" className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-center text-white shadow-xl mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Want to Work Together?</h3>
            <p className="text-blue-100 mb-6 lg:mb-8 max-w-2xl mx-auto text-base lg:text-lg">
              I'm always open to discussing new projects, data engineering challenges, or opportunities to collaborate on scalable systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:srijanpokhrel1@gmail.com" 
                className="inline-flex items-center justify-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-sm lg:text-base"
              >
                Get In Touch
                <Mail size={18} />
              </a>
              <a 
                href="/resume.pdf" 
                download="Srijan_Pokhrel_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-lg text-sm lg:text-base"
              >
                Download Resume
                <Download size={18} />
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Phone({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
}
