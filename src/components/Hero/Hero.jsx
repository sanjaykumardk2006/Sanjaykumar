import { useEffect } from 'react'
import { m } from 'framer-motion'
import './Hero.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.4 }
  }
}

export default function Hero() {
  useEffect(() => {
    const prefersFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    let spotlight = null
    const onMove = e => {
      if (!spotlight) return
      spotlight.style.left = e.clientX + 'px'
      spotlight.style.top = e.clientY + 'px'
    }
    if (prefersFinePointer.matches) {
      spotlight = document.createElement('div')
      spotlight.className = 'cursor-spotlight'
      document.body.appendChild(spotlight)
      document.addEventListener('mousemove', onMove)
    }
    return () => {
      document.removeEventListener('mousemove', onMove)
      spotlight?.remove()
    }
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (!target) return
    const navH = document.querySelector('.navbar')?.offsetHeight || 70
    window.scrollTo({ top: target.offsetTop - navH - 16, behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      <div className="container hero-grid">
        <m.div
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <m.p variants={itemVariants} className="hero-greeting">Hi, I'm</m.p>
          <m.h1 variants={itemVariants} className="hero-name">SANJAYKUMAR<br /><span>D K</span></m.h1>
          <m.p variants={itemVariants} className="hero-role">Aspiring Full Stack Developer</m.p>
          <m.p variants={itemVariants} className="hero-description">
            Building scalable web applications with a focus on performance, usability, and modern development practices.
          </m.p>

          <m.div variants={buttonVariants} className="hero-actions">
            <m.a
              href="#projects"
              className="btn btn-primary"
              id="btn-view-projects"
              onClick={e => scrollTo(e, '#projects')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{ background: '#ffffff', color: '#000000', borderColor: '#ffffff' }}
            >
              Track Projects
            </m.a>
            <m.a
              href="/resume.pdf"
              className="btn btn-ghost"
              id="btn-resume"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="fas fa-eye" /> View Resume
            </m.a>
          </m.div>
        </m.div>

        <m.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="profile-wrap">
            <img
              src="/profile.png"
              alt="Sanjay Kumar"
              className="profile-photo"
            />
          </div>
          <m.div
            className="hero-socials"
            style={{ marginTop: '100px' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a href="https://github.com/sanjaykumardk2006" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <i className="fab fa-github" />
            </a>
            <a href="https://www.linkedin.com/in/sanjay-kumar-16b75b334/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="https://leetcode.com/u/SANJAYKUMAR_24CSR264/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LeetCode">
              <img src="https://cdn.simpleicons.org/leetcode/ffffff" alt="LeetCode" style={{ width: '1.25em', height: '1.25em', objectFit: 'contain' }} />
            </a>
          </m.div>
        </m.div>
      </div>

    </section>
  )
}
