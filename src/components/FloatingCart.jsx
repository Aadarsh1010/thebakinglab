import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function FloatingCart() {
  const { quantities } = useCart()
  const itemCount = Object.values(quantities).reduce((sum, q) => sum + q, 0)
  if (itemCount === 0) return null

  const scrollToForm = () => {
    const el = document.getElementById('order-form-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="fixed bottom-[152px] right-4 z-50 md:hidden">
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToForm}
        className="relative w-16 h-16 rounded-full bg-[#D4A020] shadow-[0_4px_20px_rgba(212,160,32,0.4)] flex items-center justify-center hover:brightness-110 active:brightness-90 transition-all"
        aria-label="View order"
      >
        <svg className="w-7 h-7 text-[#2C1506]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
          <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 shadow-lg ring-2 ring-white">
          {itemCount}
        </span>
      </motion.button>
    </div>
  )
}
