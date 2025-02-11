'use client';

const skills = {
  frontend: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'],
  backend: ['Node.js', 'PHP', 'RESTful APIs', 'MongoDB', 'MySQL'],
  platforms: ['WordPress', 'Magento', 'Shopify', 'Telegram Bot API'],
  tools: ['Git', 'Docker', 'AWS', 'Agile/Scrum', 'CI/CD']
};

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'Built scalable e-commerce solution with advanced inventory management, payment integration, and real-time analytics.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe API']
  },
  {
    title: 'Trading Bot System',
    description: 'Developed automated trading system with real-time market analysis and risk management features.',
    tech: ['Node.js', 'WebSocket', 'Trading APIs', 'MongoDB']
  },
  {
    title: 'Telegram Mini Apps & Automation',
    description: 'Created multiple Telegram mini applications and automation bots for business process optimization.',
    tech: ['Telegram Bot API', 'Node.js', 'MongoDB', 'WebSocket']
  },
  {
    title: 'Investment Research Tools',
    description: 'Engineered comprehensive research platform for investment analysis with data visualization.',
    tech: ['React.js', 'Node.js', 'Financial APIs', 'D3.js']
  },
  {
    title: 'Custom Admin Dashboard',
    description: 'Designed and implemented fully customizable admin panel with role-based access control and analytics.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'JWT']
  },
  {
    title: 'Professional Blogging Platform',
    description: 'Built feature-rich blogging platform with SEO optimization and content management system.',
    tech: ['Next.js', 'MongoDB', 'AWS S3', 'SEO Tools']
  }
];

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header Section */}
          <header className="p-8 border-b border-gray-100">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Srijan Pokhrel</h1>
            <h2 className="text-xl text-gray-600 mt-2">Senior Full Stack Developer</h2>
            <p className="text-gray-600 mt-1">IGH Digital</p>
          </header>

          <div className="p-8">
            {/* Professional Summary */}
            <section className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Senior Full Stack Developer with extensive experience in building complex web applications, 
                trading systems, and automation solutions. Specialized in developing scalable e-commerce platforms,
                custom admin systems, and innovative fintech solutions. Proven expertise in React.js, Next.js, 
                and Node.js development with a strong focus on performance and user experience.
              </p>
            </section>

            {/* Key Projects */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Projects</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <h4 className="font-medium text-gray-900 mb-2">{project.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Expertise */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Expertise</h3>
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

            {/* Professional Experience */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Experience</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Senior Full Stack Developer</h4>
                  <p className="text-gray-600">IGH Digital | 2020 - Present</p>
                  <ul className="mt-2 space-y-2 text-gray-700">
                    <li>• Architected and developed enterprise-level web applications</li>
                    <li>• Built and maintained automated trading systems and financial tools</li>
                    <li>• Developed Telegram mini apps and automation solutions</li>
                    <li>• Led development of custom e-commerce and CMS solutions</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
              <div>
                <h4 className="font-medium text-gray-900">Bachelor of Computer Engineering</h4>
                <p className="text-gray-600">Graduated with Honors</p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect</h3>
              <p className="text-gray-700">
                Available for consulting on complex web applications, trading systems, and automation solutions. 
                Specialized in building scalable, high-performance applications and innovative technical solutions.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}