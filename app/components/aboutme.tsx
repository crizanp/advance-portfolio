"use client";

export const AboutMe = () => {
  return (
    <section className="bg-black py-20 relative" id="about-me">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        {/* Two Column Layout */}
        {/* Left Side - Sticky Title */}
        <div className="lg:sticky lg:top-24 self-start h-fit pb-8">
          <div className="flex flex-col">
            <h2 className="text-4xl sm:text-4xl lg:text-5xl font-black text-white leading-none tracking-tight">
              ABOUT{" "}
              <span
                className="text-4xl sm:text-4xl lg:text-5xl font-black leading-none tracking-tight"
                style={{
                  WebkitTextStroke: "2px #3b82f6",
                  color: "transparent",
                }}
              >
                ME
              </span>
            </h2>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="space-y-16">
          {/* Introduction */}
          <div className="space-y-6">
            <p className="text-xl sm:text-2xl text-gray-100 leading-relaxed">
              👋 Hey, I&apos;m <span className="text-white">Srijan Pokhrel</span>,
              a Senior Data Engineer & Full Stack Developer.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              I&apos;ve been working with <span className="text-blue-400">Python</span>,{" "}
              <span className="text-blue-400">SQL</span>, and{" "}
              <span className="text-blue-400">Node.js</span> for the past{" "}
              <span className="text-blue-400">3+ years</span>, building data
              pipelines, scalable systems, and REST APIs that drive real business
              impact.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Currently serving as{" "}
              <span className="text-blue-400 font-semibold">
                CTO at Foxbeep Technology
              </span>
              , architecting backend infrastructure for data-intensive
              applications. I specialize in ETL pipelines, database
              optimization, and microservices architecture. I&apos;m passionate
              about solving complex problems and turning raw data into reliable
              infrastructure that powers product decisions.
            </p>
          </div>

          {/* Experience Section */}
          <div className="space-y-12">
            {/* EXPERIENCE */}
            <h3 className="text-3xl sm:text-4xl italic text-white">
              EXPERIENCE
            </h3>

            {/* CTO POSITION */}
            <div className="relative pl-8 border-l-2 border-blue-500 space-y-4">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl text-white">
                  Chief Technical Officer (CTO)
                </h4>
                <p className="text-blue-400 font-medium">
                  @Foxbeep Technology | Nov 2025 – Present
                </p>

                <ul className="space-y-3 mt-4 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Design and own end-to-end data architecture for multiple
                      products, ensuring scalability, reliability, and
                      performance.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Build and maintain data pipelines and ETL processes
                      connecting product systems, payment gateways, CRM
                      platforms, and external APIs.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Define data quality standards, consistency checks, and
                      automated testing across the engineering team.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Lead backend and frontend architecture using PHP, Node.js,
                      and React - integrating data flows across the full stack.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* SOFTWARE DEVELOPER */}
            <div className="relative pl-8 border-l-2 border-blue-500 space-y-4">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl text-white">
                  Software Developer - Full-Stack & Integrations
                </h4>
                <p className="text-blue-400 font-medium">
                  @Foxbeep Technology | Jul 2025 – Sep 2025
                </p>

                <ul className="space-y-3 mt-4 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Built data dashboards and reporting tools connecting
                      frontend interfaces with backend data sources and external
                      platforms.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Designed REST APIs for structured data exchange between
                      products and third-party services.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Optimised SQL database queries and data pipelines,
                      improving system throughput significantly.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Integrated marketing analytics tools and external data
                      APIs to create unified data views.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* DATA ANALYTICS INTERN */}
            <div className="relative pl-8 border-l-2 border-blue-500 space-y-4">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl text-white">
                  Data Analytics Intern
                </h4>
                <p className="text-blue-400 font-medium">
                  @Arihant Multifibres / Arihant Poly-Packs Ltd | May 2024 –
                  Aug 2024
                </p>

                <ul className="space-y-3 mt-4 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Analysed production datasets to identify process
                      inefficiencies, reducing raw material waste by 10%.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Built statistical models using Python (NumPy) and SQL to
                      track product defect rates over time.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Delivered management-ready data visualisations and
                      reports using Excel and Python.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* JUNIOR BACKEND DEVELOPER */}
            <div className="relative pl-8 border-l-2 border-blue-500 space-y-4">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl text-white">
                  Junior Backend Developer
                </h4>
                <p className="text-blue-400 font-medium">
                  @Nxtechhosting Solution | Feb 2024 – Apr 2024
                </p>

                <ul className="space-y-3 mt-4 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Designed microservices architecture improving system
                      scalability by 40%.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Developed server-side applications with Node.js and
                      Express.js, improving performance by 30%.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Managed MongoDB and MySQL database operations including
                      schema design and query optimisation.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>
                      Built RESTful APIs for frontend consumption and
                      third-party service integrations.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certification */}
          <div className="space-y-6">
            <h3 className="text-3xl sm:text-4xl italic text-white">
              CERTIFICATIONS
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-blue-400 text-xl">🎓</span>
                <div>
                  <p className="text-white font-semibold">
                    Supervised Machine Learning: Regression & Classification
                  </p>
                  <p className="text-gray-400">
                    Stanford University / DeepLearning.AI
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-blue-400 text-xl">🎓</span>
                <div>
                  <p className="text-white font-semibold">
                    Full Stack Development with MERN Stack
                  </p>
                  <p className="text-gray-400">Online Course</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-blue-400 text-xl">🎓</span>
                <div>
                  <p className="text-white font-semibold">SQL Certification</p>
                  <p className="text-gray-400">Udemy</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-blue-400 text-xl">🎓</span>
                <div>
                  <p className="text-white font-semibold">
                    Licensed Engineer
                  </p>
                  <p className="text-gray-400">Nepal Engineering Council</p>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <h3 className="text-3xl sm:text-4xl italic text-white">
              EDUCATION
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-white font-semibold text-lg">
                  MSc - Informatics & Intelligent System Engineering
                </p>
                <p className="text-blue-400">
                  Tribhuvan University, Thapathali Campus
                </p>
                <p className="text-gray-400">2025 - Present</p>
              </div>

              <div>
                <p className="text-white font-semibold text-lg">
                  Bachelor of Engineering - Computer Engineering
                </p>
                <p className="text-blue-400">
                  Tribhuvan University, Purwanchal Campus
                </p>
                <p className="text-gray-400">2020 - 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
