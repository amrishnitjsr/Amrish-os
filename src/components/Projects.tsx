const projects = [
  {
    id: 1,
    name: 'Chatify',
    description: 'Full-stack social media app with real-time 1-to-1 chat, posts, likes, nested comments, and profile management (follow/unfollow) using Socket.io and Google OAuth 2.0.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Express'],
    github: 'https://github.com/amrishnitjsr/chatify-master',
    live: 'https://chatify-frontend-henna.vercel.app',
    icon: '💬'
  },
  {
    id: 2,
    name: 'Social Media MERN App',
    description: 'Full-stack MERN social media application with real-time chat, JWT authentication, and modern UI. Includes post feed, comments, and user profiles.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    github: 'https://github.com/amrishnitjsr/Social-Media-Web-App-Mern-Stack',
    live: 'https://github.com/amrishnitjsr/Social-Media-Web-App-Mern-Stack',
    icon: '📱'
  },
  {
    id: 3,
    name: 'Global Logistics Dashboard',
    description: '3D geospatial performance dashboard for asset tracking and risk classification using Streamlit, Plotly, and PyDeck with interactive maps and real-time analytics.',
    tech: ['Python', 'Streamlit', 'Plotly', 'PyDeck', 'Pandas'],
    github: 'https://github.com/amrishnitjsr/Global-Logistics-Performance-Dashboard',
    live: 'https://global-logistics-performance-dashboard-8itb2jxpnesfxcm5m2tvjh.streamlit.app/',
    icon: '🌍'
  },
  {
    id: 4,
    name: 'World Cup Score Predictor',
    description: 'ML application that predicts World Cup match scores using historical data and team statistics. Built with Streamlit for interactive visualization and prediction.',
    tech: ['Python', 'Streamlit', 'scikit-learn', 'Pandas', 'Jupyter'],
    github: 'https://github.com/amrishnitjsr/World-Cup-Score-Predictor',
    live: 'https://amrishnitjsr-world-cup-score-predictor-streamlit-app-hliyyk.streamlit.app/',
    icon: '🏏'
  },
  {
    id: 5,
    name: 'IHPMS',
    description: 'Integrated Hospital Pharmacy Management System with inventory tracking, prescription management, and billing modules for healthcare facilities.',
    tech: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/amrishnitjsr/IHPMS',
    live: 'https://ihpms.vercel.app',
    icon: '🏥'
  },
  {
    id: 6,
    name: 'ADR-MedDRA AI Tool',
    description: 'Streamlit application for mapping Adverse Drug Reactions (ADR) to MedDRA standardized terminology using AI semantic similarity models.',
    tech: ['Python', 'Streamlit', 'AI/NLP', 'Jupyter', 'scikit-learn'],
    github: 'https://github.com/amrishnitjsr/ADR-MedDRA',
    live: 'https://amrishnitjsr-adr-meddra-app-nw6yfc.streamlit.app/',
    icon: '💊'
  }
]

function Projects() {
  return (
    <div className="projects-content">
      <div className="terminal-header">
        <span className="prompt">C:\Users\Amrish\Projects&gt;</span>
        <span className="command">dir /w</span>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="project-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="project-header">
              <span className="project-icon">{project.icon}</span>
              <h3 className="project-name">{project.name}</h3>
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.tech.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                [GitHub]
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                [Live Demo]
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="terminal-output">
        <p><span className="prompt">FILES:</span> {projects.length} project(s) found</p>
        <p><span className="success">[TIP]</span> Click links to explore projects</p>
      </div>
    </div>
  )
}

export default Projects
