import { useEffect, useState } from 'react'
import { m, useScroll, useMotionValueEvent } from 'framer-motion'
import './Navbar.css'

const links = [
  { href: '#home',           label: 'Home',           section: 'home'           },
  { href: '#about',          label: 'About',          section: 'about'          },
  { href: '#qualifications', label: 'Journey', section: 'qualifications' },
  { href: '#projects',       label: 'Projects',       section: 'projects'       },
  { href: '#contact',        label: 'Contact',        section: 'contact'        },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active,   setActive]   = useState('home')

  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // Track active section
  useEffect(() => {
    const onScroll = () => {
      const sections  = document.querySelectorAll('section[id]')
      const threshold = window.innerHeight * 0.38
      let current = ''
      sections.forEach(s => {
        if (s.getBoundingClientRect().top <= threshold) current = s.id
      })
      if (current) setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') closeMenu() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    closeMenu()
    const target = document.querySelector(href)
    if (!target) return
    const navH = document.querySelector('.navbar')?.offsetHeight || 70
    window.scrollTo({ top: target.offsetTop - navH - 16, behavior: 'smooth' })
  }

  return (
    <m.nav 
      className={`navbar${isScrolled ? ' scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-inner">
        <a href="#home" className="nav-logo" onClick={e => handleClick(e, '#home')}>
          Sanjaykumar<span className="logo-dot"></span>
        </a>
        <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>
          {links.map(l => (
            <li key={l.section}>
              <a
                href={l.href}
                className={`nav-link${active === l.section ? ' active' : ''}`}
                onClick={e => handleClick(e, l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </m.nav>
  )
}
