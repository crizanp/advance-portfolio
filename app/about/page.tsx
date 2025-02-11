"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, LayoutGrid } from 'lucide-react';

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
  
  contact: "Email: srijan@example.com\nGitHub: github.com/srijan\nLinkedIn: linkedin.com/in/srijan",
  
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
    description: "Automated cryptocurrency trading platform",
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-2 pb-9">
        

      <div className="max-w-4xl mx-auto px-4">
      <button
        onClick={() => setIsTerminalMode(!isTerminalMode)}
        className="fixed right-6 p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-200 shadow-lg z-50 group"
        aria-label={isTerminalMode ? "Switch to GUI Mode" : "Switch to Terminal Mode"}
      >
        {isTerminalMode ? (
          <LayoutGrid className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        ) : (
          <Terminal className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        )}
      </button>
        {isTerminalMode ? (
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden shadow-xl">
            <div className="bg-gray-800 p-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-400 text-sm ml-2">srijan@portfolio:~</span>
            </div>
            <div 
              ref={terminalRef}
              className="p-4 h-[600px] overflow-y-auto font-mono text-gray-200"
            >
              {terminalHistory.map((line, i) => (
                <div key={i} className="mb-2 whitespace-pre-wrap">{line}</div>
              ))}
              <div className="flex items-center">
                <span className="text-green-400 mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent outline-none"
                  autoFocus
                />
              </div>
            </div>
          </div>
        ) : (
          <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mt-5">
            <header className="p-8 border-b border-gray-200">
              <h1 className="text-4xl font-bold text-gray-900">Srijan Pokhrel</h1>
              <h2 className="text-xl text-gray-600 mt-2">Senior Full Stack Developer</h2>
            </header>
            <div className="p-8">
              <section className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                  Senior Full Stack Developer with extensive experience in building complex web applications, 
                  trading systems, and automation solutions. Specialized in developing scalable e-commerce platforms,
                  custom admin systems, and innovative fintech solutions. Proven expertise in React.js, Next.js, 
                  and Node.js development with strong focus on performance and user experience.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Key Projects</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {projects.map((project, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-gray-50 text-gray-700 rounded-md text-xs border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Technical Expertise</h3>
                <div className="space-y-4">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-gray-700 font-medium capitalize">{category}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-gray-50 text-gray-700 rounded-md text-sm border border-gray-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Professional Experience</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Senior Full Stack Developer</h4>
                    <p className="text-gray-600">IGH Digital | 2020 - Present</p>
                    <ul className="mt-2 space-y-2 text-gray-700 pl-4 list-disc">
                      <li>Architected and developed enterprise-level web applications</li>
                      <li>Built and maintained automated trading systems and financial tools</li>
                      <li>Developed Telegram mini apps and automation solutions</li>
                      <li>Led development of custom e-commerce and CMS solutions</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Education</h3>
                <div>
                  <h4 className="font-semibold text-gray-900">Bachelor of Computer Engineering</h4>
                  <p className="text-gray-600">Tribhuwan University | Graduated with Honors</p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h3>
                <p className="text-gray-700">
                  Available for consulting on complex web applications, trading systems, and automation solutions. 
                  Specialized in building scalable, high-performance applications and innovative technical solutions.
                </p>
              </section>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}