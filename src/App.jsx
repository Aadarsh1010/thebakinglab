import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
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

const Home = lazy(() => import('./pages/Home'))
const Menu = lazy(() => import('./pages/Menu'))
const CustomCake = lazy(() => import('./pages/CustomCake'))
const OrderNow = lazy(() => import('./pages/OrderNow'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Contact = lazy(() => import('./pages/Contact'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))

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
    <HelmetProvider>
    <Router>
      <ScrollToTop />
      <CartProvider>
        <div className="min-h-screen flex flex-col transition-colors duration-300 bg-[#FDF6EC] dark:bg-[#1C0F0A] text-[#1A0800] dark:text-[#FDF6EC]">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<div className="min-h-screen bg-[#FDF6EC] dark:bg-[#1C0F0A]" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/custom-cake" element={<CustomCake />} />
                <Route path="/order-now" element={<OrderNow />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
              </Routes>
            </Suspense>
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
      </HelmetProvider>
  )
}
