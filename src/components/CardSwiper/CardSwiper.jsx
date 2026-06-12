import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CardSwiper.css'

export default function CardSwiper({ teamMembers = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalImage, setModalImage] = useState(null)

  // Pre-filter just in case
  const cards = teamMembers || []

  const advance = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length)
  }

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  // Handle escape key for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalImage) {
        setModalImage(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalImage])

  const CARD_OFFSET = 18; 
  const SCALE_FACTOR = 0.05; 

  return (
    <>
      <div className="card-swiper-stacked">
        <div className="deck-container">
          
          {/* Floating Edge Cards (Decorative Depth) */}
          <motion.div 
            className="floating-edge-card left-edge"
            animate={{ y: [0, -10, 0], rotate: -25 }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          <motion.div 
            className="floating-edge-card right-edge"
            animate={{ y: [0, 10, 0], rotate: 20 }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          />

          <AnimatePresence>
            {cards.filter((_, idx) => {
              const distanceFromActive = (idx - activeIndex + cards.length) % cards.length;
              return distanceFromActive <= 3;
            }).map((member) => {
              const idx = cards.findIndex(c => c.id === member.id);
              const distanceFromActive = (idx - activeIndex + cards.length) % cards.length;
              const isTop = distanceFromActive === 0;

              let rotate = 0;
              if (distanceFromActive === 1) rotate = 8;
              if (distanceFromActive === 2) rotate = -8;
              if (distanceFromActive === 3) rotate = 14;

              return (
                <motion.div
                  key={member.id}
                  className="stacked-card-wrapper team-card-wrapper"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{
                    opacity: 1 - (distanceFromActive * 0.15),
                    scale: 1 - (distanceFromActive * SCALE_FACTOR),
                    y: distanceFromActive * CARD_OFFSET,
                    rotate: rotate,
                    zIndex: cards.length - distanceFromActive,
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: -50, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.8 }}
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -10000) advance();
                    else if (swipe > 10000) prev();
                  }}
                  onClick={() => {
                    if (isTop) setModalImage(member.img)
                    else advance()
                  }}
                  style={{ 
                    cursor: isTop ? 'pointer' : 'pointer',
                    pointerEvents: distanceFromActive > 1 ? 'none' : 'auto'
                  }}
                >
                  <div className="scard team-scard">
                    <img src={member.img} alt={member.name} className="team-img" draggable="false" />
                    <div className="team-overlay">
                      <h4 className="team-name">{member.name}</h4>
                      <p className="team-role">{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <div className="stacked-controls">
          <button className="stack-btn" onClick={prev} aria-label="Previous card">
            <i className="fas fa-chevron-left" />
          </button>
          <div className="stack-dots">
            {cards.map((_, i) => (
              <button
                key={i}
                className={`stack-dot ${i === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
          <button className="stack-btn" onClick={advance} aria-label="Next card">
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {modalImage && (
          <motion.div 
            className="team-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
          >
            <button className="team-modal-close" onClick={() => setModalImage(null)}>
              <i className="fas fa-times" />
            </button>
            <motion.img 
              src={modalImage} 
              alt="Full size profile" 
              className="team-modal-img"
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
