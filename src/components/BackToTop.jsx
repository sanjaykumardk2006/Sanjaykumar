import { useEffect, useState } from 'react'
export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <button
      className={`back-top${show ? ' show' : ''}`}
      onClick={scrollTop}
      aria-label="Back to top"
    >
      <i className="fas fa-chevron-up" />
    </button>
  )
}
