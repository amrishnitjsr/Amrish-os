const awards = [
  {
    icon: '🥈',
    title: 'Runner-up, Uber She++ 2024',
    org: 'National-level Ideathon',
    desc: 'Runner-up at the prestigious Uber She++ 2024 Ideathon — a national-level competition for innovative tech ideas.',
    year: '2024',
    color: '#ffd700',
  },
  {
    icon: '🥈',
    title: 'Runner-up, Hack de Science',
    org: 'Ojass — NIT Jamshedpur',
    desc: 'Runner-up at Hack de Science under Ojass, the annual techno-management fest of NIT Jamshedpur.',
    year: '2024',
    color: '#ffd700',
  },
  {
    icon: '🏆',
    title: 'AIR 35 — Coding Ninjas Code Arena',
    org: 'Coding Ninjas',
    desc: 'Achieved All India Rank 35 in the competitive Code Arena contest hosted by Coding Ninjas.',
    year: '2023',
    color: '#ff6b35',
  },
  {
    icon: '⭐',
    title: '5-Star Problem Solver',
    org: 'HackerRank',
    desc: 'Earned a 5-star gold badge in Problem Solving on HackerRank through consistent competitive coding.',
    year: '2023',
    color: '#00ff41',
  },
  {
    icon: '📊',
    title: 'Max Rating 1268',
    org: 'Codeforces',
    desc: 'Reached a peak competitive programming rating of 1268 on Codeforces with consistent contest participation.',
    year: '2024',
    color: '#00d9ff',
  },
  {
    icon: '🎓',
    title: 'React.js Front-End Certification',
    org: 'Publicis Sapient',
    desc: 'Certified in React.js Front-End Development by Publicis Sapient, validating industry-level frontend skills.',
    year: '2024',
    color: '#9d00ff',
  },
]

function Awards() {
  return (
    <div className="awards-content">
      <div className="terminal-header">
        <span className="prompt">C:\Amrish-OS&gt;</span>
        <span className="command"> dir awards\</span>
      </div>
      <div className="awards-grid">
        {awards.map((award, i) => (
          <div
            key={i}
            className="award-card"
            style={{ animationDelay: `${i * 0.1}s`, borderColor: award.color + '44' }}
          >
            <div className="award-icon-wrap" style={{ color: award.color }}>
              {award.icon}
            </div>
            <div className="award-body">
              <div className="award-title" style={{ color: award.color }}>{award.title}</div>
              <div className="award-org">{award.org}</div>
              <div className="award-desc">{award.desc}</div>
              <div className="award-year">
                <span className="badge">{award.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Awards
