import { m } from 'framer-motion'
import './Footer.css'

const quickLinks = [
  { href: '#home',           label: 'Home'           },
  { href: '#about',          label: 'About'          },
  { href: '#projects',       label: 'Projects'       },
  { href: '#contact',        label: 'Contact'        },
]

const socials = [
  { href: 'https://github.com/sanjaykumardk2006', icon: 'fab fa-github',     id: 'ft-github',   label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/sanjay-kumar-16b75b334/', icon: 'fab fa-linkedin-in', id: 'ft-linkedin', label: 'LinkedIn' },
  { href: 'https://leetcode.com/u/SANJAYKUMAR_24CSR264/', img: 'https://cdn.simpleicons.org/leetcode/ffffff', id: 'ft-leetcode', label: 'LeetCode' },
]

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (!target) return
    const navH = document.querySelector('.navbar')?.offsetHeight || 70
    window.scrollTo({ top: target.offsetTop - navH - 16, behavior: 'smooth' })
  }

  return (
    <m.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="footer-top">
        
        <div className="ft-col">
          <p className="ft-name">Sanjaykumar D K</p>
          <p className="ft-bio">Full Stack Developer..</p>
          
          <h4 className="ft-col-heading">Contact Info</h4>
          <p className="ft-bio">+(91) 7397544021 </p>
          <a href="mailto:sanjaykumardk2006@gmail.com" className="ft-email">sanjaykumardk2006@gmail.com</a>
        </div>

        <div className="ft-col">
          <h4 className="ft-col-heading">Quick Links</h4>
          <nav className="ft-links" aria-label="Footer navigation">
            {quickLinks.map(l => (
              <a key={l.href} href={l.href} onClick={e => scrollTo(e, l.href)}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="ft-col">
          <h4 className="ft-col-heading">Follow Me</h4>
          <div className="ft-socials">
            {socials.map(s => (
              <m.a
                key={s.id} id={s.id} href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {s.icon ? (
                  <i className={s.icon} />
                ) : (
                  <img src={s.img} alt={s.label} style={{ width: '1.1em', height: '1.1em', objectFit: 'contain' }} />
                )}
              </m.a>
            ))}
          </div>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Sanjaykumar D K. All rights reserved.</p>
      </div>
    </m.footer>
  )
}
