import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/custom-cake', label: 'Custom Cake' },
  { to: '/pre-order', label: 'Order Now' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('blTheme')
    const isDark = stored === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    return isDark
  })
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('blTheme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleDark = () => setDark((d) => !d)

  const { quantities } = useCart()
  const totalItems = Object.values(quantities).reduce((sum, q) => sum + q, 0)

  const navBg = dark
    ? 'bg-[#2C1506]/95 backdrop-blur-sm'
    : 'bg-[#EDE5D0]/95 backdrop-blur-sm'

  const textColor = dark ? 'text-[#FDF6EC]' : 'text-[#2C1506]'
  const textMuted = dark ? 'text-[#FDF6EC]/60' : 'text-[#2C1506]/60'

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden md:flex h-9 items-center justify-between bg-[#2C1506] px-4 sm:px-6 lg:px-8 text-xs relative z-[60]">
        <div className="flex items-center gap-1 text-[#FDF6EC]/80">
          <span>📍</span>
          <span>Kaldhara Chowk, Thamel, Kathmandu</span>
        </div>

        <div className="flex items-center gap-1 text-[#D4A020] font-medium">
          <span>📞</span>
          <a href="tel:+9779845126192" className="hover:text-[#FDF6EC] transition-colors">
            +977 984-5126192
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.facebook.com/ThebakinglabNP"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FDF6EC] hover:text-[#D4A020] transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/bakinglabaadhunik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FDF6EC] hover:text-[#D4A020] transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg} shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <img
                src="/logo.png"
                alt="The Baking Lab"
                className="h-14 w-14 md:h-[72px] md:w-[72px] rounded-full object-cover ring-2 ring-[#D4A020] transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 xl:px-4 py-2 text-sm font-medium font-body transition-all duration-200 border-b-2 ${
                      isActive
                        ? 'text-[#D4A020] border-[#D4A020]'
                        : `${textColor} border-transparent hover:text-[#D4A020] hover:border-[#D4A020]/50`
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleDark}
                className={`w-9 h-9 rounded-full border border-[#D4A020] flex items-center justify-center transition-all duration-200 hover:bg-[#D4A020]/10 ${textColor}`}
                aria-label="Toggle dark mode"
              >
                {dark ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              <Link
                to="/pre-order"
                className="relative w-9 h-9 flex items-center justify-center transition-all duration-200 hover:opacity-70"
                aria-label="View cart"
              >
                <svg className={`w-5 h-5 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#c9a84c] text-white text-[9px] font-bold min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-[3px] shadow">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link
                to="/pre-order"
                className="bg-[#D4A020] text-[#2C1506] font-bold px-6 py-2.5 rounded-full text-sm hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200"
              >
                  Order Now
              </Link>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <Link
                to="/pre-order"
                className="relative w-9 h-9 flex items-center justify-center"
                aria-label="View cart"
              >
                <svg className={`w-5 h-5 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#c9a84c] text-white text-[9px] font-bold min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-[3px] shadow">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-10 h-10 flex items-center justify-center z-[70] ${textColor}`}
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1.5">
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                    className="block w-6 h-0.5 bg-current rounded"
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block w-6 h-0.5 bg-current rounded"
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                    className="block w-6 h-0.5 bg-current rounded"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#2C1506] flex flex-col"
            >
              <div className="flex items-center justify-end p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#FDF6EC]"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `text-2xl font-headline transition-colors ${
                          isActive ? 'text-[#D4A020]' : 'text-[#FDF6EC] hover:text-[#D4A020]'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 space-y-3">
                <button
                  onClick={toggleDark}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-[#D4A020] text-[#FDF6EC] text-sm font-medium"
                >
                  {dark ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                      Light Mode
                    </>
                  )}
                </button>
                <Link
                  to="/pre-order"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-[#D4A020] text-[#2C1506] font-bold py-3 rounded-full text-sm"
                >
                Order Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
