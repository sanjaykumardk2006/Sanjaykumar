import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { m, AnimatePresence } from 'framer-motion'
import './CertSwiper.css'

const DESKTOP_STACK = [
  { rotate: 0, rotateX: 0, rotateY: 0, x: 0, y: 40 },
  { rotate: 0, rotateX: 0, rotateY: 0, x: 0, y: -10 },
  { rotate: 0, rotateX: 0, rotateY: 0, x: 0, y: -60 },
]

const MOBILE_STACK = [
  { rotate: 0, rotateX: 0, rotateY: 0, x: 0, y: 20 },
  { rotate: 0, rotateX: 0, rotateY: 0, x: 0, y: 0 },
  { rotate: 0, rotateX: 0, rotateY: 0, x: 0, y: -20 },
]

export default function CertSwiper({ certs = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalImage, setModalImage] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const advance = () => {
    setActiveIndex((prev) => (prev + 1) % certs.length)
  }

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + certs.length) % certs.length)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalImage) {
        setModalImage(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalImage])

  useEffect(() => {
    document.body.style.overflow = modalImage ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalImage])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (modalImage || isHovered) return; // Don't auto-play when modal is open or hovered
    const interval = setInterval(() => {
      advance()
    }, 3000)
    return () => clearInterval(interval)
  }, [certs.length, modalImage, isHovered])

  return (
    <>
      <div className="cert-swiper-stacked">
        <div 
          className="cert-deck-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence>
            {certs.map((cert, idx) => {
              // Calculate distance from active index
              const distanceFromActive = (idx - activeIndex + certs.length) % certs.length;
              
              // We only want to show 3 cards to keep it clean
              if (distanceFromActive > 2 && certs.length > 3) return null;

              const isTop = distanceFromActive === 0;

              const stackLayouts = isMobile ? MOBILE_STACK : DESKTOP_STACK
              const layout = stackLayouts[distanceFromActive] ?? stackLayouts[0]
              const jitterScale = isMobile ? 0.45 : 1
              const jitter = (((idx * 11 + activeIndex * 7) % 9) - 4) * jitterScale

              return (
                <m.div
                  key={cert.id}
                  className={`cert-stacked-card-wrapper${isTop ? ' cert-stacked-card-wrapper--top' : ''}`}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{
                    opacity: 1 - (distanceFromActive * 0.1),
                    scale: 1 - (distanceFromActive * 0.06),
                    x: layout.x,
                    y: layout.y,
                    rotate: layout.rotate,
                    rotateX: layout.rotateX,
                    rotateY: layout.rotateY,
                    zIndex: certs.length - distanceFromActive,
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: -50, transition: { duration: 0.6 } }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -10000) advance();
                    else if (swipe > 10000) prev();
                  }}
                  onClick={() => {
                    if (isTop) setModalImage(cert.image)
                    else advance()
                  }}
                  style={{ 
                    cursor: isTop ? 'pointer' : 'pointer',
                    pointerEvents: distanceFromActive > 1 ? 'none' : 'auto'
                  }}
                >
                  <div className="cert-scard">
                    <div className="cert-scard-header">
                      <span className="cert-scard-title">{cert.title}</span>
                      <span className="cert-scard-issuer">{cert.issuer}</span>
                    </div>
                    <div className="cert-scard-body">
                      <img src={cert.image} alt={cert.title} loading="lazy" className="cert-img-preview" draggable="false" />
                    </div>
                  </div>
                </m.div>
              )
            })}
          </AnimatePresence>
        </div>

        <div className="cert-stacked-controls">
          <button className="cert-stack-btn" onClick={prev} aria-label="Previous certificate">
            <i className="fas fa-chevron-left" />
          </button>
          <div className="cert-stack-dots">
            {certs.map((_, i) => (
              <button
                key={i}
                className={`cert-stack-dot ${i === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to certificate ${i + 1}`}
              />
            ))}
          </div>
          <button className="cert-stack-btn" onClick={advance} aria-label="Next certificate">
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {modalImage && (
            <m.div
              className="cert-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              onClick={() => setModalImage(null)}
            >
              <button
                type="button"
                className="cert-modal-close"
                onClick={(e) => { e.stopPropagation(); setModalImage(null) }}
                aria-label="Close certificate"
              >
                <i className="fas fa-times" />
              </button>
              <m.div
                className="cert-modal-content"
                initial={{ scale: 0.95, y: 10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } }}
                exit={{ scale: 0.95, y: 10, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="cert-modal-img-wrap">
                  <img src={modalImage} alt="Full size certificate" className="cert-modal-img" />
                </div>
                <a href={modalImage} download className="cert-download-btn">
                  <i className="fas fa-download" /> Download
                </a>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
