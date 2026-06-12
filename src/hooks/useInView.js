import { useEffect, useRef } from 'react'
export function useInView(rootMargin = '0px 0px -60px 0px', threshold = 0.08) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in-view')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin, threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])
  return ref
}
