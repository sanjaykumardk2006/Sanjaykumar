import { m } from 'framer-motion'
import './About.css'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons'

const techCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    techs: [
      { name: 'React',      src: `${DEVICON}/react/react-original.svg`,           brand: '#61DAFB' },
      { name: 'JavaScript', src: `${DEVICON}/javascript/javascript-original.svg`, brand: '#F7DF1E' },
      { name: 'HTML',       src: `${DEVICON}/html5/html5-original.svg`,           brand: '#E34F26' },
      { name: 'CSS',        src: `${DEVICON}/css3/css3-original.svg`,             brand: '#1572B6' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    techs: [
      { name: 'Node.js', src: `${DEVICON}/nodejs/nodejs-original.svg`, brand: '#339933' },
      { name: 'PHP',     src: `${DEVICON}/php/php-original.svg`,       brand: '#777BB4' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    techs: [
      { name: 'MongoDB', src: `${DEVICON}/mongodb/mongodb-original.svg`, brand: '#47A248' },
      { name: 'MySQL',   src: `${DEVICON}/mysql/mysql-original.svg`,     brand: '#00758F' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    techs: [
      { name: 'Git',      src: `${DEVICON}/git/git-original.svg`,              brand: '#F05032' },
      { name: 'GitHub',   src: `${DEVICON}/github/github-original.svg`,      brand: '#FFFFFF', inv: true },
      { name: 'Unity',    src: `${DEVICON}/unity/unity-original.svg`,        brand: '#FFFFFF', inv: true },
      { name: 'Power BI', src: '/powerbi.svg', brand: '#F2C811' },
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
            <div className="ts-category-grid">
            {techCategories.map((category) => (
              <m.div
                key={category.id}
                className="ts-category-card"
                variants={cardVariant}
                whileHover={{ y: -2, scale: 1.01 }}
              >
                <span className="ts-category-label">{category.title}</span>
                <div className="ts-tech-grid">
                  {category.techs.map((tech, index) => (
                    <div
                      key={tech.name}
                      className={`ts-tech-item ts-icon-float-${(index % 4) + 1}`}
                      title={tech.name}
                      style={{ '--ts-brand': tech.brand }}
                    >
                      <div className="ts-tech-icon">
                        <img
                          src={tech.src}
                          alt={tech.name}
                          width="44"
                          height="44"
                          loading="lazy"
                          className={[
                            tech.inv ? 'ts-inv' : '',
                            tech.lightBg ? 'ts-light-bg' : '',
                          ].filter(Boolean).join(' ')}
                        />
                      </div>
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
