import React from 'react';

const AboutMe = () => {
  return (
    <section className="bg-black py-20 relative" id="about-me">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        {/* Two Column Layout */}
        {/* Left Side - Sticky Title */}
        <div className="lg:sticky lg:top-24 self-start h-fit pb-8">
          <div className="flex flex-col">
            <h2 className="text-4xl sm:text-4xl lg:text-5xl font-black text-white leading-none tracking-tight">
              ABOUT <span
                className="text-4xl sm:text-4xl lg:text-5xl font-black leading-none tracking-tight"
                style={{
                  WebkitTextStroke: '2px #3b82f6',
                  color: 'transparent',
                }}
              >
                ME
              </span></h2>
          </div>
        </div>


        {/* Right Side - Content */}
        <div className="space-y-16">
          {/* Introduction */}
          <div className="space-y-6">
            <p className="text-xl sm:text-2xl text-gray-100 leading-relaxed">
              👋 Hey, I'm <span className="text-white ">Srijan</span>, a Full Stack Developer.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              I've been working with <span className="text-blue-400 ">React</span> and <span className="text-blue-400 ">Node</span> for the past <span className="text-blue-400 ">three years</span>, building web applications that are fast, scalable and user-friendly.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              I like solving problems, learning new things, and experimenting with different technologies. When I'm not coding, I'm probably working on a side project or exploring something new.
            </p>
          </div>

          {/* Experience Section */}
          <div className="space-y-12">

            {/* EXPERIENCE */}
            <h3 className="text-3xl sm:text-4xl italic text-white">EXPERIENCE</h3>

            {/* FOXBEEP */}
            <div className="relative pl-8 border-l-2 border-blue-500 space-y-4">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl  text-white">
                  Cofounder & Head of IT (Full Stack Developer)
                </h4>
                <p className="text-blue-400 font-medium">@FOXBEEP | 2024 – Present</p>

                <ul className="space-y-3 mt-4 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Led the IT department and co-founded the company, defining technical vision, architecture, and long-term product strategy.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Designed and developed scalable full-stack applications using modern frameworks, APIs, and cloud-ready architectures.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Managed deployment, security, performance optimization, and cross-functional collaboration with design and business teams.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ARIHANT MULTI FIBERS */}
            <div className="relative pl-8 border-l-2 border-blue-500 space-y-4">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl  text-white">
                  Data Analyst
                </h4>
                <p className="text-blue-400 font-medium">
                  @Arihant Multi Fibers, Sonapur
                </p>

                <ul className="space-y-3 mt-4 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Analyzed production, sales, and operational data to support data-driven decision making and efficiency improvements.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Built structured reports and dashboards to track trends, performance metrics, and inventory insights.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Collaborated with management to identify bottlenecks and optimize workflows using analytical insights.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Certification Section */}
          <div className="space-y-8">
            <h3 className="text-3xl sm:text-4xl  italic text-white">CERTIFICATION</h3>
            <div className="relative pl-8 border-l-2 border-blue-500 space-y-4">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl text-white">Full Stack Developer</h4>
                <p className="text-blue-400 font-medium">Association of Computer Engineering Society | 2021 - 2022</p>
                <ul className="space-y-3 mt-4 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Earned a Full Stack Development certification from the ACES society in university.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Awarded for securing the top position in development competition, demonstrating strong skills and commitment.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-8">
            <h3 className="text-3xl sm:text-4xl italic text-white">EDUCATION</h3>
            <div className="relative pl-8 border-l-2 border-blue-500 space-y-4">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl text-white">Bachelor of Engineering in Computer Science </h4>
                <p className="text-blue-400 font-medium">Institute of Engineering, Nepal | 2019 - 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;