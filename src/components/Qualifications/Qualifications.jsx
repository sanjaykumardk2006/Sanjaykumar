import { m } from 'framer-motion'
import CertSwiper from '../CertSwiper/CertSwiper'
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="heading-label">Journey</span>
          <span className="heading-sub">Career Milestones</span>
        </m.div>

        <m.div 
          className="internship-layout"
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
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
                <h3 className="intern-company-name">Coptercode</h3>
                <p className="intern-role-line">
                  Full Stack Developer
                  <span className="intern-sep">·</span>
                  Jan 2026
                  <span className="remote-badge">
                    <span className="remote-dot"></span> Remote
                  </span>
                </p>
              </div>
            </div>
            <div className="intern-divider" />
            <div className="intern-content">
              <div className="intern-block">
                <ul className="intern-list">
                  <li>Developed full-stack web applications using modern frontend and backend technologies.</li>
                  <li>Designed responsive and user-friendly interfaces to enhance user experience.</li>
                  <li>Integrated APIs, databases, and CMS solutions (Sanity) for dynamic content management.</li>
                  <li>Participated in deployment workflows and maintained scalable, efficient code structures.</li>
                </ul>
              </div>
            </div>
          </m.div>
        </m.div>

        <m.div 
          className="certs-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="certs-heading">
            <span className="section-eyebrow">Certifications</span>
          </div>
          <div className="certs-showcase">
            <CertSwiper certs={certs} />
          </div>
        </m.div>
      </div>
    </section>
  )
}
