import { useEffect, useRef } from 'react'
import { m } from 'framer-motion'
import AnimatedButton from '../AnimatedButton'
import FlipText from '../FlipText'
import FlipFadeText from '../FlipFadeText'
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

    const isMobile = window.innerWidth <= 768
    const dotCount = isMobile ? 25 : 55
    const barSpeedMult = isMobile ? 0.5 : 1.0 // Slow down bars on high-refresh-rate mobile screens

    const numBars = 100
    const bars = Array.from({ length: numBars }, (_, i) => ({
      angle: (i / numBars) * Math.PI * 2,
      currentHeight: 0,
      targetHeight: 0,
      speed: (Math.random() * 0.1 + 0.05) * barSpeedMult
    }))

    const particles = []
    for (let i = 0; i < dotCount; i++) {
      // Evenly distribute dots around the circle to prevent empty gaps
      const baseAngle = (i / dotCount) * Math.PI * 2
      const jitter = (Math.random() - 0.5) * (Math.PI * 2 / dotCount) * 0.8
      
      particles.push({
        angle: baseAngle + jitter,
        baseDistOffset: Math.random() * 40 + 15, // Push them noticeably further from the ring
        currentDistOffset: 0, // Start at the ring for intro animation
        size: Math.random() * 1.5 + 1.0,
        alpha: isMobile ? 1.0 : Math.random() * 0.5 + 0.5,
        alphaTarget: isMobile ? 1.0 : Math.random() * 0.5 + 0.5,
        alphaSpeed: isMobile ? 0 : Math.random() * 0.01 + 0.005,
        // Sine wave based wandering
        timeX: Math.random() * Math.PI * 2,
        timeY: Math.random() * Math.PI * 2,
        speedX: Math.random() * 0.02 + 0.005,
        speedY: Math.random() * 0.02 + 0.005,
        ampX: Math.random() * 15 + 10, // Allow more wandering space
        ampY: Math.random() * 15 + 10, // Allow more wandering space
        // Extremely slow orbit just to keep the whole cloud rotating
        angularSpeed: (Math.random() > 0.5 ? 1 : -1) * 0.0005,
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
          bar.speed = (Math.random() * 0.1 + 0.05) * barSpeedMult
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
        ctx.lineWidth = Math.max(1.5, canvas.width * 0.006) // Ensure it doesn't get too thin and look faded on mobile
        ctx.strokeStyle = '#FFFFFF'
        ctx.stroke()
      }
      
      // Draw Particles (dots)
      for (let p of particles) {
        if (Math.abs(p.alpha - p.alphaTarget) < 0.02 && !isMobile) {
          p.alphaTarget = Math.random() * 0.5 + 0.5
          p.alphaSpeed = Math.random() * 0.01 + 0.005
        }
        p.alpha += (p.alphaTarget - p.alpha) * p.alphaSpeed
        
        // Guaranteed smooth organic movement using sine waves
        p.timeX += p.speedX
        p.timeY += p.speedY
        
        p.xOffset = Math.sin(p.timeX) * p.ampX
        p.yOffset = Math.cos(p.timeY) * p.ampY

        // Very slow global rotation
        p.angle += p.angularSpeed
        
        // Animate outward from the ring on load (slowed down for majestic bloom effect)
        if (p.currentDistOffset < p.baseDistOffset - 0.1) {
          p.currentDistOffset += (p.baseDistOffset - p.currentDistOffset) * 0.015
        } else {
          p.currentDistOffset = p.baseDistOffset
        }
        
        const pRadius = baseRadius + (canvas.width * 0.01) + p.currentDistOffset
        
        const px = cx + Math.cos(p.angle) * pRadius + p.xOffset
        const py = cy + Math.sin(p.angle) * pRadius + p.yOffset
        
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



export default function Hero() {
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
          <m.h1 variants={itemVariants} className="hero-name">
            <FlipFadeText words={["Sanjaykumar D K"]} textClassName="hero-name" staggerDelay={0.05} letterDuration={0.5} />
          </m.h1>
          <m.div variants={itemVariants} className="hero-role" style={{ display: 'flex', alignItems: 'center', gap: '8px', minHeight: '32px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27C93F', boxShadow: '0 0 8px rgba(39, 201, 63, 0.6)', flexShrink: 0 }}></span>
            <FlipText loop={true} duration={3.2}>Aspiring Full Stack Developer</FlipText>
          </m.div>
          <m.p variants={itemVariants} className="hero-description">
            Passionate about building modern, responsive web applications and creating seamless user experiences. I enjoy developing scalable solutions with clean and efficient code while continuously learning new technologies.
          </m.p>

          <m.div variants={buttonVariants} className="hero-actions">
            <AnimatedButton
              as="a"
              href="#projects"
              className="btn btn-primary"
              id="btn-view-projects"
              onClick={e => scrollTo(e, '#projects')}
              whileHover={{ 
                scale: 1.05, 
                y: -4,
                boxShadow: '0 0 24px rgba(59, 130, 246, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ background: '#ffffff', color: '#000000', borderColor: '#ffffff' }}
            >
              Track Projects
            </AnimatedButton>
            <AnimatedButton
              as="a"
              href="/resume.pdf"
              className="btn btn-ghost"
              id="btn-resume"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05, 
                y: -4,
                boxShadow: 'inset 0 0 16px rgba(59, 130, 246, 0.25)'
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <i className="fas fa-eye" /> View Resume
            </AnimatedButton>
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
            transition={{ delay: 0.5, duration: 1.0, ease: "easeOut" }}
          >
            <a href="https://github.com/sanjaykumardk2006" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <i className="fab fa-github" />
            </a>
            <a href="https://www.linkedin.com/in/sanjaykumar-24csr264/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
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
