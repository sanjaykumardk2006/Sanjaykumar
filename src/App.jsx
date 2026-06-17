import Navbar        from './components/Navbar/Navbar'
import Hero          from './components/Hero/Hero'
import About         from './components/About/About'
import Projects      from './components/Projects/Projects'
import Qualifications from './components/Qualifications/Qualifications'
import Contact       from './components/Contact/Contact'
import Footer        from './components/Footer/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop     from './components/BackToTop'
import { useEffect } from 'react'
import Lenis from 'lenis'
export default function App() {
  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Global Cursor Spotlight
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
      document.addEventListener('mousemove', onMove, { passive: true })
    }

    return () => {
      lenis.destroy()
      document.removeEventListener('mousemove', onMove)
      spotlight?.remove()
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Qualifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
