import React from "react";
import "./resumestyle.css";

const CVTemplate = () => {
    return (
        <div className="resume-container">
            {/* Left Sidebar */}
            <div className="resume-left">
                <div className="profile-section">
                    <img
                        src="https://media.licdn.com/dms/image/v2/D4D03AQEeFYmQ-5aDxw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1716426183631?e=1738195200&v=beta&t=Q50WazXmRxwoCLyp6M2Ed_gVbIa0YbAZqctzloDW--g"
                        alt="Srijan Pokhrel"
                    />
                </div>
                <div className="contact-section py-4">
                    <h3>Contact</h3>
                    <ul>
                        <li>📧 srijanpokhrel1@gmail.com</li>
                        <li>🔗 linkedin.com/in/srijanpokhrel</li>
                        <li>🔗 github.com/crizanp</li>
                    </ul>
                </div>
                <div className="skills-section py-4">
                    <h3>Skills</h3>
                    <ul>
                        <li>
                            React.js <span className="skill-bar"><span style={{ width: "90%" }}></span></span>
                        </li>
                        <li>
                            PHP <span className="skill-bar"><span style={{ width: "85%" }}></span></span>
                        </li>
                        <li>
                            JavaScript <span className="skill-bar"><span style={{ width: "95%" }}></span></span>
                        </li>
                        <li>
                            WordPress <span className="skill-bar"><span style={{ width: "80%" }}></span></span>
                        </li>
                        <li>
                            Magento <span className="skill-bar"><span style={{ width: "70%" }}></span></span>
                        </li>
                        <li>
                            Shopify <span className="skill-bar"><span style={{ width: "75%" }}></span></span>
                        </li>
                    </ul>
                </div>
                <div className="languages-section py-4">
                    <h3>Languages</h3>
                    <ul className="language-dots">
                        <li>English <span className="dots"><span></span><span></span><span></span><span></span></span></li>
                        <li>Nepali <span className="dots"><span></span><span></span><span></span><span></span></span></li>
                        <li>Hindi <span className="dots"><span></span><span></span><span></span></span></li>
                    </ul>
                </div>
            </div>

            {/* Right Content */}
            <div className="resume-right">
                <h1>Srijan Pokhrel</h1>
                <h2>Full Stack Web Developer</h2>

                <div className="summary-section">
                    <h3>Summary</h3>
                    <p>
                        Experienced Senior Web Developer skilled in React.js, PHP, and
                        JavaScript. I create seamless digital solutions for CMS platforms
                        like WordPress, Magento, and Shopify. With 5+ years of experience, I
                        am dedicated to delivering innovative and high-performing web
                        applications.
                    </p>
                </div>

                <div className="experience-section">
                    <h3>Experience</h3>
                    <ul>
                        <li>
                            <strong>Senior Web Developer</strong>
                            <p>IGH Digital, UAE (2021 - Present)</p>
                            <p>
                                - Developed scalable web applications using React.js, PHP, and
                                WordPress.
                                <br />
                                - Improved website performance and user experience.
                            </p>
                        </li>
                        <li>
                            <strong>Lead Developer</strong>
                            <p>NXtech Digital (2017 - 2021)</p>
                            <p>
                                - Led a team to create and maintain high-performing CMS
                                websites.
                                <br />
                                - Enhanced customer ROI through optimized technical solutions.
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="projects-section">
                    <h3>Projects</h3>
                    <ul>
                        <li>
                            <strong>E-Commerce Website</strong>
                            <p>
                                Built a Shopify-based platform for an online store, integrating
                                payment gateways and improving the shopping experience.
                            </p>
                        </li>
                        <li>
                            <strong>Custom CMS Platform</strong>
                            <p>
                                Designed and developed a WordPress site for a marketing agency
                                with interactive features and a responsive design.
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="education-section">
                    <h3>Education</h3>
                    <ul>
                        <li>
                            <strong>Bachelor's Degree in Computer Engineering</strong>
                            <p>Technical University (2017 - 2022)</p>
                            <p>
                                Built a strong foundation in programming, system design, and
                                software development.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CVTemplate;
