const skillCategories = [
  {
    title: 'LANGUAGES',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 82 },
      { name: 'Python', level: 80 },
      { name: 'C++', level: 78 },
      { name: 'C', level: 75 },
    ]
  },
  {
    title: 'WEB DEVELOPMENT',
    skills: [
      { name: 'React.js', level: 88 },
      { name: 'Next.js', level: 82 },
      { name: 'Node.js / Express.js', level: 85 },
      { name: 'HTML / CSS / Tailwind', level: 92 },
      { name: 'Socket.io / JWT / OAuth', level: 78 },
    ]
  },
  {
    title: 'DATABASE & ML',
    skills: [
      { name: 'MongoDB', level: 82 },
      { name: 'MySQL', level: 75 },
      { name: 'Pandas / NumPy', level: 78 },
      { name: 'Scikit-learn', level: 72 },
      { name: 'DSA / OOP / OS', level: 80 },
    ]
  },
  {
    title: 'TOOLS & PLATFORMS',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'VS Code / Postman', level: 92 },
      { name: 'Vercel / Render', level: 80 },
      { name: 'npm', level: 85 },
      { name: 'Jupyter Notebook', level: 78 },
    ]
  }
]

function Skills() {
  return (
    <div className="skills-content">
      <div className="terminal-header">
        <span className="prompt">C:\Users\Amrish&gt;</span>
        <span className="command">skills --list --verbose</span>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3 className="category-title">
              <span className="folder-icon">📂</span> {category.title}
            </h3>
            <div className="skills-list">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-bar-fill" 
                      style={{ 
                        width: `${skill.level}%`,
                        animationDelay: `${skillIndex * 0.1}s`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="terminal-output">
        <p><span className="success">[OK]</span> All modules loaded successfully</p>
        <p><span className="prompt">TIP:</span> Double-click Projects/ to see my work!</p>
      </div>
    </div>
  )
}

export default Skills
