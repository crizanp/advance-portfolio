import React from "react";
import "./resumestyle.css";

const CVTemplate = () => {
    return (
        <div className="resume-container">
            {/* Left Sidebar */}
            <div className="resume-left">
                <div className="profile-section">
                    <img
                        src="https://avatars.githubusercontent.com/u/137764965?v=4"
                        alt="Srijan Pokhrel"
                    />
                </div>
                <div className="contact-section py-4">
                    <h3>Contact</h3>
                    <ul>
                        <li><span className="icon">📧</span> srijanpokhrel1@gmail.com</li>
                        <li><span className="icon">🔗</span> linkedin.com/in/srijanpokhrel</li>
                        <li><span className="icon">🔗</span> github.com/crizanp</li>
                    </ul>
                </div>
                <div className="skills-section py-4">
                    <h3>Technical Expertise</h3>
                    <ul>
                        {[
                            { skill: 'Next.js', level: '95%' },
                            { skill: 'MERN Stack', level: '92%' },
                            { skill: 'Telegram Bots', level: '90%' },
                            { skill: 'Discord Bots', level: '85%' },
                            { skill: 'Automation Tools', level: '88%' },
                            { skill: 'WebSockets', level: '80%' }
                        ].map((item, index) => (
                            <li key={index}>
                                {item.skill}
                                <span className="skill-bar">
                                    <span style={{ width: item.level }}></span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="tools-section py-4">
                    <h3>Tools & Technologies</h3>
                    <div className="tools-grid">
                        {['Puppeteer', 'Selenium', 'Redis', 'REST API', 'GraphQL', 'Docker', 'AWS', 'CI/CD'].map((tool, index) => (
                            <span key={index} className="tool-tag">{tool}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="resume-right">
                <header>
                    <h1>Srijan Pokhrel</h1>
                    <h2>Full Stack & Automation Developer</h2>
                </header>

                <div className="summary-section">
                    <h3>Professional Summary</h3>
                    <p>
                        Full Stack Developer specializing in Next.js and MERN stack applications with expertise in messaging platform development. 
                        Proven experience in building scalable Telegram Mini Apps, high-performance bots for Telegram/Discord, and automation solutions. 
                        Passionate about creating efficient systems with modern web technologies and cloud infrastructure.
                    </p>
                </div>

                <div className="experience-section">
                    <h3>Professional Experience</h3>
                    <div className="timeline">
                        {[
                            {
                                title: "Senior Full Stack Developer",
                                company: "IGH Digital, UAE",
                                period: "2021 - Present",
                                points: [
                                    "Developed Next.js applications with TypeScript achieving 98% Lighthouse scores",
                                    "Created Telegram Mini Apps with WebView integration handling 50k+ monthly users",
                                    "Built automated social media management tools using Puppeteer and Redis",
                                    "Designed Discord bot architecture handling 1M+ daily interactions"
                                ]
                            },
                            {
                                title: "Lead Bot Developer",
                                company: "NXtech Digital",
                                period: "2017 - 2021",
                                points: [
                                    "Led development of enterprise-grade Telegram bots with payment integration",
                                    "Implemented CI/CD pipelines for automated bot deployments",
                                    "Created multi-tenant Discord bots with role-based access systems",
                                    "Optimized bot performance using WebSockets and Redis caching"
                                ]
                            }
                        ].map((exp, index) => (
                            <div key={index} className="timeline-item">
                                <h4>{exp.title}</h4>
                                <p className="company">{exp.company} • {exp.period}</p>
                                <ul>
                                    {exp.points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="projects-section">
                    <h3>Key Projects</h3>
                    <div className="project-grid">
                        {[
                            {
                                title: "Telegram E-Commerce Bot",
                                description: "Built a Telegram Mini App marketplace with Next.js backend and TON blockchain payments processing $250k+ monthly transactions"
                            },
                            {
                                title: "Discord Community Manager",
                                description: "Developed AI-powered Discord bot with automated moderation, analytics, and role management for 500+ servers"
                            },
                            {
                                title: "Web Automation Framework",
                                description: "Created enterprise-grade automation system using Puppeteer Cluster and Redis for mass data processing"
                            }
                        ].map((project, index) => (
                            <div key={index} className="project-card">
                                <h4>{project.title}</h4>
                                <p>{project.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="education-section">
                    <h3>Education & Certifications</h3>
                    <div className="education-item">
                        <h4>BSc in Computer Engineering</h4>
                        <p className="institution">Tribhuwan University • 2018 - 2023</p>
                        <ul>
                            <li>Focus: Data Mining and ML</li>
                            <li>Final Year Project: "ML-Powered Nepali Currency Recognition System for Seamless Mobile Integration"</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVTemplate;