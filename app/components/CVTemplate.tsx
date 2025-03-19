import React from "react";
import "./resumestyle.css";

const CVTemplate = () => {
    return (
        <div className="cv-container">
          {/* Profile Section */}
          <div className="profile-card">
            <div className="profile-image">
              <img
                src="/images/pp.png"
                alt="Srijan Pokhrel"
              />
            </div>
            <h1>Srijan Pokhrel</h1>
            <h2>Full Stack & Bot Creator</h2>
            <div className="contact-buttons">
              <a href="mailto:srijanpokhrel1@gmail.com" className="contact-btn email">
                <span>Email Me</span>
              </a>
              <a href="https://linkedin.com/in/srijanpokhrel" target="_blank" rel="noopener noreferrer" className="contact-btn linkedin">
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/crizanp" target="_blank" rel="noopener noreferrer" className="contact-btn github">
                <span>GitHub</span>
              </a>
            </div>
          </div>
    
          {/* About Me Section */}
          <div className="cv-section about-section">
            <h3>👋 About Me</h3>
            <p>
              Hi there! I'm a web developer who loves building cool stuff with Next.js and MERN stack. 
              I'm really good at making Telegram & Discord bots that help businesses connect with people. 
              When I'm not coding, I enjoy finding ways to automate boring tasks and make things run more smoothly.
            </p>
          </div>
    
          {/* Skills Section */}
          <div className="cv-section skills-section">
            <h3>✨ What I'm Good At</h3>
            <div className="skills-container">
              {[
                { skill: 'Next.js', level: 95 },
                { skill: 'MERN Stack', level: 92 },
                { skill: 'Telegram Bots', level: 90 },
                { skill: 'Discord Bots', level: 85 },
                { skill: 'Automation', level: 88 },
                { skill: 'WebSockets', level: 80 }
              ].map((item, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{item.skill}</span>
                    <span className="skill-level">{item.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${item.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="tools-container">
              <h4>Tools I Use:</h4>
              <div className="tools-grid">
                {['Puppeteer', 'Selenium', 'Redis', 'REST API', 'GraphQL', 'Docker', 'AWS', 'CI/CD'].map((tool, index) => (
                  <span key={index} className="tool-tag">{tool}</span>
                ))}
              </div>
            </div>
          </div>
    
          {/* Work History Section */}
          <div className="cv-section work-section">
            <h3>💼 My Work History</h3>
            <div className="timeline">
              {[
                {
                  title: "Senior Full Stack Developer",
                  company: "IGH Digital, UAE",
                  period: "2021 - Present",
                  points: [
                    "Built super fast websites with Next.js that got top scores on speed tests",
                    "Created Telegram Mini Apps that over 50,000 people use each month",
                    "Made tools that automatically post and manage social media content",
                    "Built Discord bots that handle over 1 million messages every day"
                  ]
                },
                {
                  title: "Lead Bot Developer",
                  company: "NXtech Digital",
                  period: "2017 - 2021",
                  points: [
                    "Created Telegram bots that can process payments for businesses",
                    "Set up systems that automatically update bots when code changes",
                    "Built Discord bots that can handle multiple communities at once",
                    "Made bots run faster using smart caching techniques"
                  ]
                }
              ].map((job, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>{job.title}</h4>
                    <p className="company">{job.company} • {job.period}</p>
                    <ul>
                      {job.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
    
          {/* Projects Section */}
          <div className="cv-section projects-section">
            <h3>🚀 Cool Things I've Built</h3>
            <div className="project-grid">
              {[
                {
                  title: "Telegram Shop Bot",
                  description: "Made a shopping app inside Telegram that handles $250K+ in monthly sales with blockchain payments"
                },
                {
                  title: "Discord Helper",
                  description: "Created a smart Discord bot that manages communities, keeps chats friendly, and tracks stats for 500+ servers"
                },
                {
                  title: "Web Robot Army",
                  description: "Built a system that automates web tasks like filling forms and collecting data at massive scale"
                }
              ].map((project, index) => (
                <div key={index} className="project-card">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </div>
    
          {/* Education Section */}
          <div className="cv-section education-section">
            <h3>🎓 My Education</h3>
            <div className="education-item">
              <h4>Computer Engineering Degree</h4>
              <p className="institution">Tribhuwan University • 2018 - 2023</p>
              <div className="education-details">
                <p>I focused on learning about Data Mining and Machine Learning.</p>
                <p>For my final project, I created a system that can recognize Nepali currency from phone photos.</p>
              </div>
            </div>
          </div>
        </div>
    );
};

export default CVTemplate;