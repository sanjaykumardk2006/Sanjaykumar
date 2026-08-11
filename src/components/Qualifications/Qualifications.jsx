import { m } from 'framer-motion'
import CertStackCard from '../CertStackCard/CertStackCard'
import './Qualifications.css'

const certs = [
  {
    id: 'cert-infosys-dbms',
    title: 'DBMS Certification',
    issuer: 'Infosys Springboard',
    image: '/cert-infosys-dbms.png',
  },
  {
    id: 'cert-ai-fundamentals',
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    image: '/cert-ibm-ai-fundamentals.png',
  },
  {
    id: 'cert-accenture',
    title: 'Data processing and visualisation',
    issuer: 'Accenture / FutureSkills Prime',
    image: '/cert-accenture.jpg',
  },
  {
    id: 'cert-coptercode',
    title: 'Full Stack Developer-Intern',
    issuer: 'COPTERCODE',
    image: '/cert-coptercode.jpg',
  }
]

export default function Qualifications() {
  return (
    <section id="qualifications" className="section">
      <div className="container">
        <m.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="heading-label">Journey</span>
          <span className="heading-sub">Career Milestones</span>
        </m.div>

        <m.div 
          className="internship-layout"
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <div className="certs-heading">
            <span className="section-eyebrow">Internship</span>
          </div>
          <m.div 
            className="intern-experience-card glass-card"
            whileHover={{ y: -5, boxShadow: '0 15px 40px rgba(0,0,0,0.5)' }}
          >
            <div className="intern-header-row">
              <div className="intern-company-block">
                <h3 className="intern-company-name">Full Stack Developer Intern</h3>
                <p className="intern-role-line">
                  Coptercode
                  <span className="intern-sep">·</span>
                  Jan 2026
                  <span className="remote-badge">
                    <span className="remote-dot"></span> Hybrid
                  </span>
                </p>
              </div>
            </div>
            <div className="intern-divider" />
            <div className="intern-content">
              <div className="intern-block">
                <ul className="intern-list">
                  <li>Built scalable full-stack web applications using modern technologies.</li>
                  <li>Integrated APIs, databases, and Sanity CMS to power dynamic web applications.</li>
                  <li>Collaborated with cross-functional teams to deliver high-quality software solutions.</li>
                </ul>
              </div>
            </div>
          </m.div>
        </m.div>

        <m.div 
          className="certs-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <div className="certs-heading">
            <span className="section-eyebrow">Certifications</span>
          </div>
          <div className="certs-showcase">
            <CertStackCard 
              items={certs.map(c => ({ ...c, description: c.issuer }))} 
              autoPlay={true}
              autoPlayInterval={3000}
            />
          </div>
        </m.div>
      </div>
    </section>
  )
}
