const experience = [
  {
    role: 'Technical Team Lead',
    company: 'Society of CSE, NIT Jamshedpur',
    period: '2023 – Present',
    points: [
      'Organized and led DSA and Web Development events for the CSE society',
      'Mentored junior students on competitive programming and full-stack development',
      'Coordinated technical workshops and hackathon prep sessions',
    ],
  },
  {
    role: 'Web Team Member',
    company: 'NIT Jamshedpur (Official Institute)',
    period: '2023 – Present',
    points: [
      'Migrated the official institute website from React.js to Next.js',
      'Improved performance and SEO of the institute’s web presence',
      'Collaborated with the design and content teams on the official site',
    ],
  },
  {
    role: 'Web Development Wing Member',
    company: 'PCON, NIT Jamshedpur',
    period: '2022 – 2023',
    points: [
      'Conducted web development workshops for junior students',
      'Taught fundamentals of HTML, CSS, JavaScript and React',
    ],
  },
]

const education = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    institute: 'NIT Jamshedpur',
    year: '2022 – Present',
    cgpa: '6.0 / 10',
  },
  {
    degree: 'Class XII',
    institute: 'Government Inter College',
    year: '2020 – 2021',
    cgpa: '67.8%',
  },
  {
    degree: 'Class X',
    institute: 'SEMFORD, Prayagraj',
    year: '2018 – 2019',
    cgpa: '64.8%',
  },
]

const techStack = [
  { cat: 'Languages', items: 'C, C++, JavaScript, TypeScript, Python' },
  { cat: 'Web Dev', items: 'Next.js, React.js, Node.js, Express.js, HTML, CSS, Tailwind, EJS, Bootstrap' },
  { cat: 'Database', items: 'MongoDB, MySQL' },
  { cat: 'Auth & RT', items: 'Socket.io, Google OAuth 2.0, JWT, Session Management' },
  { cat: 'ML', items: 'Pandas, NumPy, Scikit-learn, Pickle, Jupyter Notebook' },
  { cat: 'Tools', items: 'Git, GitHub, Postman, VS Code, npm, Vercel, Render' },
]

function Resume() {
  return (
    <div className="resume-content">
      <div className="resume-download-bar">
        <span className="resume-name">📄 Amrish_Yadav_Resume.pdf</span>
        <div className="resume-btn-group">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-view-btn"
          >
            👁 View PDF
          </a>
          <a
            href="/resume.pdf"
            download="Amrish_Yadav_Resume.pdf"
            className="resume-download-btn"
          >
            ⬇ Download
          </a>
        </div>
      </div>

      <div className="resume-section">
        <h3 className="resume-section-title">▶ POSITIONS OF RESPONSIBILITY</h3>
        {experience.map((exp, i) => (
          <div key={i} className="resume-card">
            <div className="resume-role">{exp.role}</div>
            <div className="resume-meta">
              <span className="resume-company">{exp.company}</span>
              <span className="resume-period">{exp.period}</span>
            </div>
            <ul className="resume-points">
              {exp.points.map((p, j) => (
                <li key={j}><span className="bullet">&gt;</span> {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="resume-section">
        <h3 className="resume-section-title">▶ EDUCATION</h3>
        {education.map((edu, i) => (
          <div key={i} className="resume-card">
            <div className="resume-role">{edu.degree}</div>
            <div className="resume-meta">
              <span className="resume-company">{edu.institute}</span>
              <span className="resume-period">{edu.year}</span>
            </div>
            <p className="resume-cgpa">CGPA: <span className="success">{edu.cgpa}</span></p>
          </div>
        ))}
      </div>

      <div className="resume-section">
        <h3 className="resume-section-title">▶ TECH STACK</h3>
        <div className="resume-tech-grid">
          {techStack.map((t, i) => (
            <div key={i} className="resume-tech-row">
              <span className="tech-cat">{t.cat}</span>
              <span className="tech-items">{t.items}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Resume
