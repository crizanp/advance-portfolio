"use client"

import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, MapPin, Calendar, Briefcase, GraduationCap, Code, ExternalLink } from 'lucide-react';

const skills = {
  frontend: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  backend: ['Node.js', 'PHP', 'Python', 'MongoDB', 'PostgreSQL'],
  platforms: ['WordPress', 'Magento', 'Shopify', 'AWS'],
  tools: ['Git', 'Docker', 'Webpack', 'Jest', 'CI/CD']
};

const projects = [
  {
    title: "Toolbox Pro",
    description: "Transform, convert, and optimize your files with this free online tools",
    tech: ['React', 'Node.js', 'Tailwind'],
    link: "https://toobox-pro.vercel.app/"
  },
  {
    title: "Nepali Currency Recognition System",
    description: "Final year project developed by 4 teams for currency detection",
    tech: ['JAVA', 'AI', 'NLP'],
    link: "https://github.com/crizanp/currencydetection"
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
      <aside className="lg:w-80  bg-white border-r border-gray-200 flex flex-col items-center px-4 py-8 lg:py-12 lg:sticky lg:top-0 lg:h-[900px] overflow-y-auto">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg mb-4 lg:mb-6">
          <img 
            src="/images/sideimg.jpg" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Title */}
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 text-center">Srijan Pokhrel</h1>
        <p className="text-blue-600 font-medium mb-6 lg:mb-8 text-center text-sm lg:text-base">SENIOR FULL STACK DEVELOPER</p>

        {/* Navigation */}
        <nav className="w-full mb-8 lg:mb-12 hidden lg:block">
          <ul className="space-y-1">
            {['HOME', 'ABOUT', 'SKILLS', 'EDUCATION', 'CERTIFICATIONS', 'EXPERIENCE', 'PROJECTS', 'CONTACT'].map((item) => (
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
            <h2 className="text-xl lg:text-2xl text-gray-900 mb-4 lg:mb-6">About Me</h2>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-4 lg:mb-6">
              Hello! I'm a software developer with a passion for creating innovative solutions and sharing knowledge with the tech community. With expertise in web development, I focus on building accessible, responsive, and elegant web applications.
            </p>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              My journey in tech began with a fascination for how software can solve real-world problems. Today, I continue to explore new technologies while helping others learn and grow in the field.
            </p>
          </section>

          {/* Tech Stack */}
          <section id="skills" className="mb-12 lg:mb-16">
            <h3 className="text-xl lg:text-2xl text-gray-900 mb-4 lg:mb-6 flex items-center gap-2 lg:gap-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {['React', 'Next.js', 'JavaScript', 'TypeScript', 'Node.js', 'Tailwind CSS', 'MongoDB', 'AWS'].map((tech) => (
                <span 
                  key={tech} 
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Experience & Education Timeline */}
          <section id="experience" className="mb-12 lg:mb-16">
            <h3 className="text-xl lg:text-2xl text-gray-900 mb-6 lg:mb-8 flex items-center gap-2 lg:gap-3">
              Experience & Education
            </h3>
            
            <div className="space-y-6 lg:space-y-8">
              {/* Experience Item */}
              <div className="relative pl-8 lg:pl-10 border-l-2 border-blue-200">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-gray-50"></div>
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-blue-600 font-semibold mb-2">
                    <Calendar size={16} />
                    <span>2021 - Present</span>
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">Senior Full Stack Developer</h4>
                  <p className="text-gray-600 font-medium mb-2 lg:mb-3 text-sm lg:text-base">IGH Digital Dubai</p>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    Leading development efforts, mentoring junior developers, and architecting scalable solutions for enterprise applications.
                  </p>
                </div>
              </div>

              {/* Experience Item */}
              <div className="relative pl-8 lg:pl-10 border-l-2 border-blue-200">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-gray-50"></div>
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-blue-600 font-semibold mb-2">
                    <Calendar size={16} />
                    <span>2018 - 2020</span>
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">Web Developer</h4>
                  <p className="text-gray-600 font-medium mb-2 lg:mb-3 text-sm lg:text-base">Nxtech Hosting Itahari</p>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    Built responsive web applications and implemented modern frontend frameworks.
                  </p>
                </div>
              </div>

              {/* Education Item */}
              <div id="education" className="relative pl-8 lg:pl-10 border-l-2 border-blue-200">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-gray-50"></div>
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-blue-600 font-semibold mb-2">
                    <GraduationCap size={16} />
                    <span>2018 - 2023</span>
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">BSc Computer Engineering</h4>
                  <p className="text-gray-600 font-medium mb-2 lg:mb-3 text-sm lg:text-base">Institute Of Engineering (TU)</p>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    Specialized in software development and computer systems.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section id="projects" className="mb-12 lg:mb-16">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">Featured Projects</h3>
            
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  
                  <div className="p-4 lg:p-6">
                    <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{project.title}</h4>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-gray-50 text-xs text-gray-600 font-medium rounded-full border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 text-sm group-hover:gap-3 transition-all"
                    >
                      View Project
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section id="contact" className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-center text-white shadow-xl">
            <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Want to Work Together?</h3>
            <p className="text-blue-100 mb-6 lg:mb-8 max-w-2xl mx-auto text-base lg:text-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <a 
              href="mailto:srijanpokhrel1@gmail.com" 
              className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-sm lg:text-base"
            >
              Get In Touch
              <ExternalLink size={18} />
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}