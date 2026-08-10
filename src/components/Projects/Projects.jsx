import { m } from 'framer-motion'
import './Projects.css'

const projects = [
  {
    id: 'proj-flame',
    title: 'Advance Flame Sensing Unit',
    desc: 'A smart safety system that detects fires in real-time using advanced sensors. When a fire is spotted, it instantly sends automated alerts to emergency contacts to ensure a rapid response. This project helps prevent disasters by acting much faster than traditional alarms.',
    tags: ['IoT', 'Sensors', 'Real-time', 'Alerts'],
    liveUrl: '#',
    githubUrl: 'https://github.com/sanjaykumardk2006/Fire-Alarm',
    features: ['Real-time Detection', 'Automated Alerts', 'Emergency Communication', 'Rapid Response']
  },
  {
    id: 'proj-freelancer',
    title: 'Freelancer Marketplace',
    icon: 'fa-solid fa-bullseye', // similar to the "purpose" target icon
    desc: 'An online platform that connects businesses with independent professionals. Clients can easily post job openings with their specific needs and budgets, while freelancers can browse listings and apply. It simplifies the entire hiring process from reviewing proposals to assigning the final project.',
    image: '/proj-freelancer.png',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    liveUrl: 'https://freelancer-sigma-ebon.vercel.app/',
    githubUrl: 'https://github.com/sanjaykumardk2006/FSD',
    features: ['Job Posting', 'Proposal Submission', 'Role-based Auth', 'Project Tracking']
  },
  {
    id: 'proj-water',
    title: 'Water Quality Prediction',
    icon: 'fa-solid fa-eye', // similar to the "vision" eye icon
    desc: 'An AI-powered tool designed to analyze and predict the safety of wastewater. It automatically tests key water properties to grade the water quality as Good, Moderate, or Poor. Based on these results, it recommends the best treatment methods to protect our environment.',
    image: '/proj-water.png',
    tags: ['Python', 'NumPy','Matplotlib', 'Pandas'],
    liveUrl: '#',
    githubUrl: 'https://github.com/sanjaykumardk2006/Water-Treatment-Analysis',
    features: ['94% Accuracy Model', 'Random Forest Classifier', 'Interactive Dashboard', 'Data Visualization']
  }
]

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <m.div 
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="heading-label">Projects</span>
          <span className="heading-sub">Things I've Built</span>
        </m.div>

        <div className="projects-grid">
          {projects.map((p, index) => (
            <m.div 
              key={p.id}
              className="project-grid-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="pg-card-top">
                <h3 className="pg-title">{p.title}</h3>
                <p className="pg-desc">{p.desc}</p>
                <div className="pg-tags">
                  {p.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
              
              <div className="pg-card-bottom">
                <div className="pg-actions">
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="pg-btn pg-btn-primary">
                    <i className="fab fa-github" /> GitHub
                  </a>
                  {p.liveUrl && p.liveUrl !== '#' && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="pg-live-link">
                      <i className="fas fa-link" style={{ marginRight: '6px' }} />
                      {p.liveUrl.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
