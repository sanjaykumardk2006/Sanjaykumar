import { useEffect, useRef, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import './Hero.css'

const AudioSpectrum = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    
    const handleResize = () => {
      const wrap = canvas.parentElement
      if (!wrap) return
      const photoWidth = wrap.offsetWidth
      const canvasSize = photoWidth * 1.8 
      canvas.width = canvasSize
      canvas.height = canvasSize
      canvas.style.width = `${canvasSize}px`
      canvas.style.height = `${canvasSize}px`
    }
    
    window.addEventListener('resize', handleResize)
    setTimeout(handleResize, 0)

    let animationId
    let isVisible = true

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    }, { rootMargin: "100px" })
    observer.observe(canvas)

    let time = 0

    const numBars = 100
    const bars = Array.from({ length: numBars }, (_, i) => ({
      angle: (i / numBars) * Math.PI * 2,
      currentHeight: 0,
      targetHeight: 0,
      speed: Math.random() * 0.1 + 0.05
    }))

    const particles = []
    for (let i = 0; i < 90; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        distOffset: Math.random() * 40,
        size: Math.random() * 1.2 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        alphaTarget: Math.random() * 0.8 + 0.2,
        alphaSpeed: Math.random() * 0.02 + 0.01,
      })
    }

    const render = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const photoRadius = canvas.width / 1.8 / 2
      const baseRadius = photoRadius + 12 // clean gap from the image
      
      ctx.lineCap = 'round'
      
      // Draw Bars
      for (let bar of bars) {
        if (Math.abs(bar.currentHeight - bar.targetHeight) < 0.5) {
          // Mostly small bars, some higher peaks simulating audio
          bar.targetHeight = Math.random() > 0.75 
            ? Math.random() * (canvas.width * 0.06) 
            : Math.random() * (canvas.width * 0.02)
          bar.speed = Math.random() * 0.1 + 0.05
        }
        
        bar.currentHeight += (bar.targetHeight - bar.currentHeight) * bar.speed
        
        const height = bar.currentHeight + 2 // minimum height
        
        const innerX = cx + Math.cos(bar.angle) * baseRadius
        const innerY = cy + Math.sin(bar.angle) * baseRadius
        const outerX = cx + Math.cos(bar.angle) * (baseRadius + height)
        const outerY = cy + Math.sin(bar.angle) * (baseRadius + height)
        
        ctx.beginPath()
        ctx.moveTo(innerX, innerY)
        ctx.lineTo(outerX, outerY)
        ctx.lineWidth = canvas.width * 0.006 // Thick bars
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.stroke()
      }
      
      // Draw Particles (dots)
      for (let p of particles) {
        if (Math.abs(p.alpha - p.alphaTarget) < 0.02) {
          p.alphaTarget = Math.random() * 0.8 + 0.2
          p.alphaSpeed = Math.random() * 0.02 + 0.01
        }
        p.alpha += (p.alphaTarget - p.alpha) * p.alphaSpeed
        
        // Particles sit around and just outside the bars
        const pRadius = baseRadius + (canvas.width * 0.01) + p.distOffset
        
        const px = cx + Math.cos(p.angle) * pRadius
        const py = cy + Math.sin(p.angle) * pRadius
        
        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(render)
    }
    
    render()
    
    return () => {
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} 
    />
  )
}

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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.4 }
  }
}

const ROLES = [
  "Aspiring Full Stack Developer",
  "Available for Work"
]

const RotatingRole = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hero-role" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Invisible placeholder to maintain proper layout height */}
      <div style={{ opacity: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%' }}></span>
        Aspiring Full Stack Developer
      </div>
      
      <AnimatePresence>
        <m.div
          key={index}
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -25, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'inherit', color: '#ffffff', whiteSpace: 'nowrap', gap: '8px' }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27C93F', boxShadow: '0 0 8px rgba(39, 201, 63, 0.6)' }}></span>
          {ROLES[index]}
        </m.div>
      </AnimatePresence>
    </div>
  )
}

export default function Hero() {
  useEffect(() => {
    // Spotlight is now global in App.jsx
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
          <m.h1 variants={itemVariants} className="hero-name">Sanjaykumar <span>D K</span></m.h1>
          <m.div variants={itemVariants}>
            <RotatingRole />
          </m.div>
          <m.p variants={itemVariants} className="hero-description">
            Passionate about building modern, responsive web applications and creating seamless user experiences. I enjoy developing scalable solutions with clean and efficient code while continuously learning new technologies.
          </m.p>

          <m.div variants={buttonVariants} className="hero-actions">
            <m.a
              href="#projects"
              className="btn btn-primary"
              id="btn-view-projects"
              onClick={e => scrollTo(e, '#projects')}
              whileHover={{ 
                scale: 1.05, 
                y: -4,
                boxShadow: '0 12px 30px rgba(255, 255, 255, 0.2), 0 0 24px rgba(59, 130, 246, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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
              whileHover={{ 
                scale: 1.05, 
                y: -4,
                boxShadow: '0 12px 30px rgba(255, 255, 255, 0.1), inset 0 0 16px rgba(59, 130, 246, 0.25)'
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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
            <AudioSpectrum />
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
              <img src="https://cdn.simpleicons.org/leetcode/ffffff" alt="LeetCode" width="20" height="20" style={{ width: '1.25em', height: '1.25em', objectFit: 'contain' }} />
            </a>
          </m.div>
        </m.div>
      </div>

    </section>
  )
}
