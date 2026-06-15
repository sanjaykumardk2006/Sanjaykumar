import { useState, useRef } from 'react'
import { m } from 'framer-motion'
import './Contact.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const nameRef    = useRef(null)
  const emailRef   = useRef(null)
  const subjectRef = useRef(null)
  const messageRef = useRef(null)

  const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  const handleSubmit = async e => {
    e.preventDefault()
    const name    = nameRef.current.value.trim()
    const email   = emailRef.current.value.trim()
    const subject = subjectRef.current.value.trim()
    const message = messageRef.current.value.trim()
    
    ;[nameRef, emailRef, messageRef].forEach(r => r.current.parentElement.classList.remove('invalid'))
    
    let valid = true
    if (!name)                { nameRef.current.parentElement.classList.add('invalid');    nameRef.current.focus();    valid = false }
    if (!isValidEmail(email)) { emailRef.current.parentElement.classList.add('invalid');   if (valid) emailRef.current.focus();   valid = false }
    if (!message)             { messageRef.current.parentElement.classList.add('invalid'); if (valid) messageRef.current.focus(); valid = false }
    if (!valid) return

    setStatus('sending')
    
    // Construct the mailto link
    const mailSubject = subject || `Portfolio Contact from ${name}`
    const mailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    const mailtoLink = `mailto:sanjaykumardk2006@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`
    
    window.location.href = mailtoLink

    setStatus('done')
    e.target.reset()
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <m.div 
          className="contact-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="contact-top-label">Contact</p>
          <span className="heading-label">Get In Touch</span>
          <p className="contact-subtitle">Let's Build Something Great Together.</p>
        </m.div>

        <m.div 
          className="contact-cards-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Column */}
          <div className="contact-col contact-col-left">
            <m.div variants={itemVariants} className="contact-card contact-left">
              <div className="contact-info-list" style={{ marginBottom: 0 }}>
                <div className="ci-item">
                  <div className="ci-icon-box"><i className="fas fa-envelope" /></div>
                  <div className="ci-details">
                    <span className="ci-title">Email</span>
                    <span className="ci-desc">sanjaykumardk2006@gmail.com</span>
                  </div>
                </div>
                <div className="ci-item">
                  <div className="ci-icon-box"><i className="fas fa-map-marker-alt" /></div>
                  <div className="ci-details">
                    <span className="ci-title">Location</span>
                    <span className="ci-desc">Tamil Nadu, India</span>
                  </div>
                </div>
                <div className="ci-item">
                  <div className="ci-icon-box"><i className="fas fa-briefcase" /></div>
                  <div className="ci-details">
                    <span className="ci-title">Availability</span>
                    <span className="ci-desc">Open to Opportunities</span>
                  </div>
                </div>
              </div>
            </m.div>

          </div>

          {/* Right Column */}
          <div className="contact-col contact-col-right">
            <form className="contact-form-wrapper" noValidate onSubmit={handleSubmit}>
              <m.div variants={itemVariants} className="contact-card contact-right">
                
                <div className="contact-form-new">
                  <div className="input-box full-width">
                    <i className="far fa-user input-icon" />
                    <input
                      ref={nameRef} type="text" name="name"
                      placeholder="Your Name"
                      onChange={e => e.target.parentElement.classList.remove('invalid')}
                    />
                  </div>
                  
                  <div className="input-box full-width">
                    <i className="far fa-envelope input-icon" />
                    <input
                      ref={emailRef} type="email" name="email"
                      placeholder="Your Email"
                      onChange={e => e.target.parentElement.classList.remove('invalid')}
                    />
                  </div>

                  <div className="input-box full-width">
                    <i className="fas fa-tag input-icon" />
                    <input
                      ref={subjectRef} type="text" name="subject"
                      placeholder="Subject"
                      onChange={e => e.target.parentElement.classList.remove('invalid')}
                    />
                  </div>

                  <div className="input-box full-width textarea-box">
                    <i className="fas fa-pen input-icon" />
                    <textarea
                      ref={messageRef} name="message" rows={5}
                      placeholder="Your Message"
                      onChange={e => e.target.parentElement.classList.remove('invalid')}
                    />
                  </div>
                </div>
                <m.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`btn-gradient-submit${status === 'done' ? ' done' : ''}`}
                  disabled={status === 'sending'}
                >
                  {status === 'idle'    && <><i className="fas fa-paper-plane" /> Connect</>}
                  {status === 'sending' && <><i className="fas fa-spinner fa-spin" /> Connecting…</>}
                  {status === 'done'    && <><i className="fas fa-check" /> Connected!</>}
                </m.button>
              </m.div>
            </form>
          </div>
        </m.div>

      </div>
    </section>
  )
}
