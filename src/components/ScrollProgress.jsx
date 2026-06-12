import { useEffect, useRef } from 'react'
export default function ScrollProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const bar = barRef.current
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      bar.style.width = Math.min(pct * 100, 100).toFixed(1) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div ref={barRef} className="scroll-progress" />
}
