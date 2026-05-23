import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import SoldOutPopup from './components/SoldOutPopup'
import WhatsAppFloat from './components/WhatsAppFloat'
import BackToTop from './components/BackToTop'
import MobileStickyBar from './components/MobileStickyBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Menu from './pages/Menu'
import CustomCake from './pages/CustomCake'
import PreOrder from './pages/PreOrder'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import About from './pages/About'
import Blog from './pages/Blog'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('blTheme')
    document.documentElement.classList.toggle('dark', stored === 'dark')
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <div className="min-h-screen flex flex-col transition-colors duration-300 bg-[#FDF6EC] dark:bg-[#1C0F0A] text-[#1A0800] dark:text-[#FDF6EC]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/custom-cake" element={<CustomCake />} />
              <Route path="/pre-order" element={<PreOrder />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </main>
          <Footer />
          <SoldOutPopup />
          <WhatsAppFloat />
          <BackToTop />
          <MobileStickyBar />
        </div>
      </CartProvider>

      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
    </Router>
  )
}
