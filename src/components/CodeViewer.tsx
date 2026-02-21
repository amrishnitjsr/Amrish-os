const repos = [
  {
    name: 'chatify-master',
    desc: 'Full-stack social media app with real-time 1-to-1 chat, posts, likes, nested comments, and profile management using Socket.io and Google OAuth 2.0.',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    stars: 0,
    forks: 0,
    url: 'https://github.com/amrishnitjsr/chatify-master',
    topics: ['node.js', 'express', 'mongodb', 'socket.io', 'oauth'],
  },
  {
    name: 'Social-Media-Web-App-Mern-Stack',
    desc: 'Full-stack MERN social media application with real-time chat, JWT authentication, and modern UI. Includes post feed, comments, and user profiles.',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    stars: 0,
    forks: 0,
    url: 'https://github.com/amrishnitjsr/Social-Media-Web-App-Mern-Stack',
    topics: ['react', 'node.js', 'mongodb', 'express', 'jwt'],
  },
  {
    name: 'Global-Logistics-Performance-Dashboard',
    desc: '3D geospatial performance dashboard for asset tracking and risk classification using Streamlit, Plotly, and PyDeck with interactive maps.',
    lang: 'Python',
    langColor: '#3572A5',
    stars: 0,
    forks: 0,
    url: 'https://github.com/amrishnitjsr/Global-Logistics-Performance-Dashboard',
    topics: ['python', 'streamlit', 'plotly', 'pydeck', 'geospatial'],
  },
  {
    name: 'World-Cup-Score-Predictor',
    desc: 'ML application predicting World Cup match scores using historical data and team statistics, built with Streamlit for interactive visualization.',
    lang: 'Jupyter Notebook',
    langColor: '#DA5B0B',
    stars: 0,
    forks: 0,
    url: 'https://github.com/amrishnitjsr/World-Cup-Score-Predictor',
    topics: ['python', 'machine-learning', 'streamlit', 'scikit-learn', 'deep-learning'],
  },
  {
    name: 'IHPMS',
    desc: 'Integrated Hospital Pharmacy Management System with inventory tracking, prescription management, and billing modules for healthcare facilities.',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    stars: 0,
    forks: 0,
    url: 'https://github.com/amrishnitjsr/IHPMS',
    topics: ['react', 'node.js', 'mongodb', 'healthcare'],
  },
  {
    name: 'ADR-MedDRA',
    desc: 'Streamlit app for mapping Adverse Drug Reactions to MedDRA terms using AI semantic similarity. Live on Streamlit Cloud.',
    lang: 'Jupyter Notebook',
    langColor: '#DA5B0B',
    stars: 0,
    forks: 0,
    url: 'https://github.com/amrishnitjsr/ADR-MedDRA',
    topics: ['python', 'streamlit', 'ai', 'nlp', 'healthcare'],
  },
]

function CodeViewer() {
  return (
    <div className="code-content">
      <div className="terminal-header">
        <span className="prompt">C:\Amrish-OS&gt;</span>
        <span className="command"> git log --repos --all</span>
      </div>
      <div className="code-repos-grid">
        {repos.map((repo, i) => (
          <a
            key={i}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="code-repo-card"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="repo-header">
              <span className="repo-icon">📦</span>
              <span className="repo-name">{repo.name}</span>
            </div>
            <p className="repo-desc">{repo.desc}</p>
            <div className="repo-topics">
              {repo.topics.map(t => (
                <span key={t} className="repo-topic">{t}</span>
              ))}
            </div>
            <div className="repo-footer">
              <span className="repo-lang">
                <span className="lang-dot" style={{ background: repo.langColor }} />
                {repo.lang}
              </span>
              <span className="repo-stars">⭐ {repo.stars}</span>
              <span className="repo-forks">🍴 {repo.forks}</span>
            </div>
          </a>
        ))}
      </div>
      <div className="code-link-bar">
        <a href="https://github.com/amrishnitjsr" target="_blank" rel="noopener noreferrer" className="github-profile-link">
          🌐 View Full GitHub Profile →
        </a>
      </div>
    </div>
  )
}

export default CodeViewer
