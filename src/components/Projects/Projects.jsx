import { m } from 'framer-motion'
import './Projects.css'

const projects = [
  {
    id: 'proj-freelancer',
    title: 'Freelancer Marketplace',
    icon: 'fa-solid fa-bullseye', // similar to the "purpose" target icon
    desc: 'A full-stack Freelancer Marketplace platform that enables clients to post jobs, freelancers to submit proposals, and both parties to track project progress efficiently.',
    image: '/proj-freelancer.png',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: 'https://github.com/sanjaykumardk2006/FSD',
    features: ['Job Posting', 'Proposal Submission', 'Role-based Auth', 'Project Tracking']
  },
  {
    id: 'proj-water',
    title: 'Water Quality Prediction',
    icon: 'fa-solid fa-eye', // similar to the "vision" eye icon
    desc: 'Developed a Machine Learning solution for sewage wastewater analysis that calculates the Water Quality Index (WQI), predicts water quality levels, and generates treatment recommendations based on the analysis results.',
    image: '/proj-water.png',
    tags: ['Python', 'NumPy','Matplotlib', 'Pandas'],
    liveUrl: '#',
    githubUrl: 'https://github.com/sanjaykumardk2006/Water-Treatment-Analysis',
    features: ['94% Accuracy Model', 'Random Forest Classifier', 'Interactive Dashboard', 'Data Visualization']
  },
  {
    id: 'proj-flame',
    title: 'Advance Flame Sensing Unit',
    desc: 'Implemented a smart fire monitoring solution that provides real-time fire detection, automated alert generation, and emergency communication. The system enhances safety by combining sensor-based detection with instant notifications and rapid response mechanisms.',
    tags: ['IoT', 'Sensors', 'Real-time', 'Alerts'],
    liveUrl: '#',
    githubUrl: 'https://github.com/sanjaykumardk2006/Fire-Alarm',
    features: ['Real-time Detection', 'Automated Alerts', 'Emergency Communication', 'Rapid Response']
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
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="heading-label">Projects</span>
          <span className="heading-sub">Showcase</span>
        </m.div>

        <div className="projects-grid">
          {projects.map((p, index) => (
            <m.div 
              key={p.id}
              className="project-grid-card"
              initial={{ opacity: 0, y: 40 }}
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
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="pg-btn">
                    <i className="fab fa-github" /> GitHub
                  </a>
                  <a href={p.liveUrl} className="pg-btn pg-btn-primary">
                    <i className="fas fa-external-link-alt" /> View Project
                  </a>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
