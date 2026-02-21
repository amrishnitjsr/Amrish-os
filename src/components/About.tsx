function About() {
  return (
    <div className="about-content">
      <div className="terminal-header">
        <span className="prompt">C:\Users\Amrish&gt;</span>
        <span className="command">whoami</span>
      </div>
      
      <div className="about-section">
        <div className="ascii-art">
{`
  ╔═══════════════════════════════════════╗
  ║         AMRISH YADAV PORTFOLIO        ║
  ║    Full Stack Developer | ML Enthusiast║
  ╚═══════════════════════════════════════╝
`}
        </div>

        <div className="about-text">
          <p className="typing-text">
            <span className="highlight">&gt;</span> Hello, World! I'm <span className="accent">Amrish Yadav</span>
          </p>
          <p>
            A passionate <span className="highlight">Full Stack Developer</span> currently pursuing
            B.Tech in Computer Science at <span className="highlight">NIT Jamshedpur</span>.
          </p>
          <p>
            I build full-stack web apps with the MERN stack, craft real-time experiences
            with Socket.io, and explore machine learning with Python. From crafting clean
            UIs to designing scalable backends — I love the whole stack.
          </p>
          <p>
            Technical Team Lead at Society of CSE, NIT Jamshedpur. Runner-up at
            national-level hackathons and competitive coder with AIR 35 at Coding Ninjas
            Code Arena.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">6+</span>
            <span className="stat-label">Projects Built</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">20+</span>
            <span className="stat-label">Technologies</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">1268</span>
            <span className="stat-label">Codeforces Rating</span>
          </div>
        </div>

        <div className="terminal-output">
          <p><span className="prompt">STATUS:</span> <span className="success">Open to opportunities</span></p>
          <p><span className="prompt">LOCATION:</span> Shubhas Nagar, Nibhapur, Jaunpur</p>
          <p><span className="prompt">COLLEGE:</span> NIT Jamshedpur — CSE (2022–Present)</p>
          <p><span className="prompt">INTERESTS:</span> Full Stack, ML, DSA, Open Source</p>
        </div>
      </div>
    </div>
  )
}

export default About
