import Navbar        from './components/Navbar/Navbar'
import Hero          from './components/Hero/Hero'
import About         from './components/About/About'
import Projects      from './components/Projects/Projects'
import Qualifications from './components/Qualifications/Qualifications'
import Contact       from './components/Contact/Contact'
import Footer        from './components/Footer/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop     from './components/BackToTop'
export default function App() {
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
