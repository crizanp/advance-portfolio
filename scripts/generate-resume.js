import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate resume PDF
const generateResumePDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 15;
  const lineHeight = 7;
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  // Helper functions
  const addText = (text, x, y, options = {}) => {
    doc.setFontSize(options.size || 10);
    doc.setFont('helvetica', options.bold ? 'bold' : 'normal');
    doc.setTextColor(options.color ? options.color[0] : 0, options.color ? options.color[1] : 0, options.color ? options.color[2] : 0);
    doc.text(text, x, y, { maxWidth: options.maxWidth || contentWidth });
  };

  const checkPageBreak = (needed = 10) => {
    if (yPosition + needed > pageHeight - 10) {
      doc.addPage();
      yPosition = 15;
    }
  };

  // Header
  addText('SRIJAN POKHREL', margin, yPosition, { size: 20, bold: true });
  yPosition += 8;
  addText('Senior Data Engineer | Python & SQL | Data Pipelines & ETL', margin, yPosition, { size: 10 });
  yPosition += 5;
  addText('+977 981 057 0014 • srijanpokhrel1@gmail.com • www.srijanpokhrel.com.np • linkedin.com/in/srijanpokhrel', margin, yPosition, { size: 9 });
  yPosition += 12;

  // Professional Summary
  addText('PROFESSIONAL SUMMARY', margin, yPosition, { size: 11, bold: true, color: [0, 51, 102] });
  yPosition += 6;
  const summaryText = 'Data-focused Full-Stack Engineer with 3+ years building scalable systems, data pipelines, and REST APIs across multiple products. Currently serving as CTO at Foxbeep Technology, architecting backend infrastructure for data-intensive applications. Experienced in Python, SQL, Node.js, and database optimisation with hands-on exposure to data analytics, statistical modelling, and distributed system design. Passionate about turning raw data into reliable, high-performance infrastructure that drives product decisions.';
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, yPosition);
  yPosition += splitSummary.length * 4 + 6;

  // Technical Skills
  checkPageBreak();
  addText('TECHNICAL SKILLS', margin, yPosition, { size: 11, bold: true, color: [0, 51, 102] });
  yPosition += 6;
  const skills = [
    { label: 'Languages:', value: 'Python, SQL, JavaScript, TypeScript, PHP' },
    { label: 'Data Engineering:', value: 'ETL pipelines, data modelling, query optimisation, data quality' },
    { label: 'Databases:', value: 'MySQL, MongoDB, SQL Server indexing and query optimisation' },
    { label: 'Cloud & DevOps:', value: 'Docker, AWS, GCP, Git, GitHub, Postman' },
    { label: 'Analytics & ML:', value: 'NumPy, TensorFlow, Scikit-learn, statistical modelling' },
    { label: 'Backend:', value: 'Node.js, Express.js, Laravel, CodeIgniter, REST API design' },
    { label: 'Testing:', value: 'Jest, Playwright - unit, integration, and end-to-end' },
  ];
  
  skills.forEach(skill => {
    addText(`${skill.label} ${skill.value}`, margin, yPosition, { size: 9 });
    yPosition += 4;
  });
  yPosition += 2;

  // Professional Experience
  checkPageBreak();
  addText('PROFESSIONAL EXPERIENCE', margin, yPosition, { size: 11, bold: true, color: [0, 51, 102] });
  yPosition += 6;

  const experiences = [
    {
      title: 'Chief Technical Officer | Foxbeep Technology - Kathmandu',
      period: 'Nov 2025 - Present',
      bullets: [
        'Design and own end-to-end data architecture for multiple products, ensuring scalability, reliability, and performance.',
        'Build and maintain data pipelines and ETL processes connecting product systems, payment gateways, CRM platforms, and external APIs.',
        'Define data quality standards, consistency checks, and automated testing across the engineering team.',
        'Lead backend and frontend architecture using PHP, Node.js, and React - integrating data flows across the full stack.',
      ]
    },
    {
      title: 'Software Developer - Full-Stack & Integrations | Foxbeep Technology - Kathmandu',
      period: 'Jul 2025 - Sep 2025',
      bullets: [
        'Built data dashboards and reporting tools connecting frontend interfaces with backend data sources and external platforms.',
        'Designed REST APIs for structured data exchange between products and third-party services.',
        'Optimised SQL database queries and data pipelines, improving system throughput significantly.',
        'Integrated marketing analytics tools and external data APIs to create unified data views.',
      ]
    },
    {
      title: 'Data Analytics Intern | Arihant Multifibres / Arihant Poly-Packs Ltd - On-Site',
      period: 'May 2024 - Aug 2024',
      bullets: [
        'Analysed production datasets to identify process inefficiencies, reducing raw material waste by 10%.',
        'Built statistical models using Python (NumPy) and SQL to track product defect rates over time.',
        'Delivered management-ready data visualisations and reports using Excel and Python.',
      ]
    },
    {
      title: 'Junior Backend Developer | Nxtechhosting Solution - On-Site',
      period: 'Feb 2024 - Apr 2024',
      bullets: [
        'Designed microservices architecture improving system scalability by 40%.',
        'Developed server-side applications with Node.js and Express.js, improving performance by 30%.',
        'Managed MongoDB and MySQL database operations including schema design and query optimisation.',
        'Built RESTful APIs for frontend consumption and third-party service integrations.',
      ]
    },
  ];

  experiences.forEach((exp, idx) => {
    checkPageBreak(15);
    addText(exp.title, margin, yPosition, { size: 9, bold: true });
    yPosition += 4;
    addText(exp.period, margin, yPosition, { size: 8, color: [51, 102, 153] });
    yPosition += 4;
    
    exp.bullets.forEach(bullet => {
      checkPageBreak(8);
      const bulletText = doc.splitTextToSize(`• ${bullet}`, contentWidth - 5);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(bulletText, margin + 3, yPosition);
      yPosition += bulletText.length * 3.5;
    });
    yPosition += 2;
  });

  // Education
  checkPageBreak(15);
  addText('EDUCATION', margin, yPosition, { size: 11, bold: true, color: [0, 51, 102] });
  yPosition += 6;

  addText('MSc - Informatics & Intelligent System Engineering | Tribhuvan University, Thapathali Campus - Kathmandu', margin, yPosition, { size: 9, bold: true });
  yPosition += 4;
  addText('2025 - Present', margin, yPosition, { size: 8 });
  yPosition += 4;

  addText('Bachelor of Engineering - Computer Engineering | Tribhuvan University, Purwanchal Campus - Dharan', margin, yPosition, { size: 9, bold: true });
  yPosition += 4;
  addText('2020 - 2024', margin, yPosition, { size: 8 });
  yPosition += 6;

  // Certifications
  checkPageBreak(10);
  addText('CERTIFICATIONS', margin, yPosition, { size: 11, bold: true, color: [0, 51, 102] });
  yPosition += 6;

  const certs = [
    'Supervised Machine Learning: Regression & Classification - Stanford University / DeepLearning.AI',
    'Full Stack Development with MERN Stack',
    'SQL - Udemy Certification',
  ];

  certs.forEach(cert => {
    addText(`• ${cert}`, margin + 3, yPosition, { size: 8 });
    yPosition += 4;
  });
  yPosition += 2;

  // Key Projects
  checkPageBreak(10);
  addText('KEY PROJECTS', margin, yPosition, { size: 11, bold: true, color: [0, 51, 102] });
  yPosition += 6;

  const projects = [
    'Hotel & Restaurant POS System - Real-time data flows across role-based access layers (Admin, Chef, Kitchen). Built with Next.js and SQL, including hardware integration.',
    'Inventory Management System - Full POS with product and stock tracking backed by MySQL reporting. Built with Laravel.',
    'School Management System - Automated attendance data collection, student records management, and SMS notification pipelines. Built with Laravel.',
    'E-Commerce Websites - Responsive storefronts for international clients with data integration. Built with Next.js and MongoDB.',
  ];

  projects.forEach(project => {
    checkPageBreak(8);
    const projText = doc.splitTextToSize(`• ${project}`, contentWidth - 5);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(projText, margin + 3, yPosition);
    yPosition += projText.length * 3.5 + 2;
  });

  // Achievements
  checkPageBreak(10);
  addText('ACHIEVEMENTS', margin, yPosition, { size: 11, bold: true, color: [0, 51, 102] });
  yPosition += 6;

  const achievements = [
    '1st Place - Web Development Competition',
    'Registered Licensed Computer Engineer - Nepal Engineering Council',
    'Organised 3-day Robotics & Arduino automation training as ACES coordinator',
  ];

  achievements.forEach(achievement => {
    addText(`• ${achievement}`, margin + 3, yPosition, { size: 8 });
    yPosition += 4;
  });

  // Save the PDF
  const pdfPath = path.join(__dirname, '../public/resume.pdf');
  doc.save(pdfPath);
  console.log('Resume PDF created successfully at:', pdfPath);
};

generateResumePDF();
