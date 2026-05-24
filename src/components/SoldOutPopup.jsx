import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function SoldOutPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('bl_soldout_popup')
    if (dismissed) return
    const t = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem('bl_soldout_popup', '1')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-[#2C1506]/70" onClick={dismiss} />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className="relative bg-[#FAF0E0] dark:bg-[#1C0F0A] rounded-2xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center"
          >
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-[#2C1506]/50 dark:text-[#FDF6EC]/50 hover:text-[#2C1506] dark:hover:text-[#FDF6EC] transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img src="/logo.png" alt="" className="w-10 h-10 rounded-full mx-auto mb-3 object-cover ring-1 ring-[#D4A020]" />
            <p className="text-lg mb-1">🍌</p>
            <h3 className="font-headline text-xl text-[#2C1506] dark:text-[#FDF6EC] font-bold mb-2">Selling Fast Today!</h3>
            <p className="text-sm text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-6 leading-relaxed">
              Banana bread & cheesecakes are going fast. Order now to guarantee tomorrow's batch.
            </p>
            <Link
              to="/order-now"
              onClick={dismiss}
              className="block w-full bg-[#D4A020] text-[#2C1506] font-bold py-3 rounded-xl text-sm hover:brightness-110 hover:scale-[1.02] active:scale-100 transition-all"
            >
              Order Now
            </Link>
            <button
              onClick={dismiss}
              className="mt-3 text-xs text-[#2C1506]/50 dark:text-[#FDF6EC]/50 hover:text-[#2C1506]/80 dark:hover:text-[#FDF6EC]/80 transition-colors"
            >
              Maybe Later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
