import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function MobileStickyBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  if (pathname === '/order-now') return null

  const handleClick = () => {
    if (pathname === '/order-now') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/order-now')
    }
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 safe-area-pb shadow-2xl"
    >
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-center bg-[#D4A020] text-[#2C1506] font-bold text-sm h-12 active:brightness-90 transition-all"
      >
        Order Now
      </button>
    </motion.div>
  )
}
