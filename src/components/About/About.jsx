import { m } from 'framer-motion'
import './About.css'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons'

const techCategories = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    desc: 'Building responsive, modern, and user-friendly web applications using modern frontend technologies.',
    className: 'bento-large',
    techs: [
      { name: 'React',      src: `${DEVICON}/react/react-original.svg`,           brand: '#61DAFB' },
      { name: 'JavaScript', src: `${DEVICON}/javascript/javascript-original.svg`, brand: '#F7DF1E' },
      { name: 'HTML5',      src: `${DEVICON}/html5/html5-original.svg`,           brand: '#E34F26' },
      { name: 'CSS3',       src: `${DEVICON}/css3/css3-original.svg`,             brand: '#1572B6' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    desc: 'Developing scalable server-side applications and REST APIs.',
    className: 'bento-medium',
    techs: [
      { name: 'Node.js',    src: `${DEVICON}/nodejs/nodejs-original.svg`,         brand: '#339933' },
      { name: 'Express.js', src: `${DEVICON}/express/express-original.svg`,       brand: '#FFFFFF', inv: true },
    ],
  },
  {
    id: 'database',
    title: 'Database Management',
    desc: 'Designing and managing structured and scalable databases.',
    className: 'bento-medium',
    techs: [
      { name: 'MySQL',      src: `${DEVICON}/mysql/mysql-original.svg`,           brand: '#4479A1' },
      { name: 'MongoDB',    src: `${DEVICON}/mongodb/mongodb-original.svg`,       brand: '#47A248' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Workflow',
    desc: 'Version control and development tools used during development.',
    className: 'bento-large',
    techs: [
      { name: 'GitHub',     src: `${DEVICON}/github/github-original.svg`,        brand: '#FFFFFF', inv: true },
      { name: 'Unity',      src: `${DEVICON}/unity/unity-original.svg`,          brand: '#FFFFFF', inv: true },
    ],
  },
]

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const cardContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
}

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <m.div 
          className="about-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
        >
          <span className="heading-label">About Me</span>
        </m.div>

        <m.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
        >
          <div className="about-layout">
            <div className="about-right">
              <p className="about-bio">
                I am passionate about full-stack web development and enjoy
                building modern, responsive, and user-friendly web applications.
                With hands-on experience in React, JavaScript, and database technologies,
                I focus on creating efficient and impactful digital solutions. My internship
                experience allowed me to work on real-world projects and strengthen my
                problem-solving abilities.
              </p>
            </div>
          </div>
        </m.div>

        <m.div 
          className="tech-stack-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardContainerVariant}
        >
          <m.h3 variants={fadeUpVariant} className="ts-heading">Tech Stack</m.h3>
          <div className="tech-stack-arena">
            <div className="bento-grid">
            {techCategories.map((category) => (
              <m.div
                key={category.id}
                className={`bento-card ${category.className}`}
                variants={cardVariant}
              >
                <h4 className="bento-title">{category.title}</h4>
                <p className="bento-desc">{category.desc}</p>
                <div className="bento-chips">
                  {category.techs.map((tech) => (
                    <div
                      key={tech.name}
                      className="tech-chip"
                      title={tech.name}
                      style={{ '--ts-brand': tech.brand }}
                    >
                      <img
                        src={tech.src}
                        alt={tech.name}
                        loading="lazy"
                        className={`chip-icon ${tech.inv ? 'ts-inv' : ''}`}
                      />
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </m.div>
            ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
