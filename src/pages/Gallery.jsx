import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
}

const tabs = ['All', 'Banana Bread', 'Cheesecakes', 'Brownies', 'Cookies & Croissants', 'Custom Cakes', 'Our Bakery']

const images = [
  { src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600', label: 'Fresh Banana Bread', cat: 'Banana Bread', span: 'row-span-2' },
  { src: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600', label: 'Banana Bread Slice', cat: 'Banana Bread', span: '' },
  { src: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600', label: 'Caramelized Cashew Cheesecake', cat: 'Cheesecakes', span: '' },
  { src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600', label: 'Blueberry Cheesecake', cat: 'Cheesecakes', span: 'row-span-2' },
  { src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600', label: 'Chocolate Fudge Brownie', cat: 'Brownies', span: '' },
  { src: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600', label: 'Coconut Cookies', cat: 'Cookies & Croissants', span: '' },
  { src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600', label: 'Butter Croissant', cat: 'Cookies & Croissants', span: 'row-span-2' },
  { src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600', label: 'Custom Celebration Cake', cat: 'Custom Cakes', span: '' },
  { src: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=600', label: 'Our Bakery Counter', cat: 'Our Bakery', span: '' },
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600', label: 'Coffee & Pastry', cat: 'Our Bakery', span: '' },
  { src: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=600', label: 'Wedding Cake', cat: 'Custom Cakes', span: 'row-span-2' },
  { src: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=600', label: 'New York Cheesecake', cat: 'Cheesecakes', span: '' },
  { src: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=600', label: 'Almond Croissant', cat: 'Cookies & Croissants', span: '' },
  { src: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=600', label: 'Sourdough Bread', cat: 'Banana Bread', span: '' },
  { src: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600', label: 'Masala Tea', cat: 'Our Bakery', span: '' },
  { src: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=600', label: 'Hot Chocolate', cat: 'Our Bakery', span: '' },
]

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeTab === 'All' ? images : images.filter((img) => img.cat === activeTab)

  const open = (i) => setLightbox(i)
  const close = useCallback(() => setLightbox(null), [])
  const prev = useCallback(() => setLightbox((i) => (i > 0 ? i - 1 : filtered.length - 1)), [filtered.length])
  const next = useCallback(() => setLightbox((i) => (i < filtered.length - 1 ? i + 1 : 0)), [filtered.length])

  useEffect(() => {
    const handler = (e) => {
      if (lightbox === null) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, close, prev, next])

  return (
    <div className="bg-[#FAF0E0] dark:bg-[#1C0F0A] min-h-screen">
      {/* Hero */}
      <section
        className="relative pt-28 pb-20 md:pb-28 flex items-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(44,21,6,0.80) 0%, rgba(44,21,6,0.60) 100%), url(https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1920)`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-accent text-[#D4A020] text-xl mb-3">Every item made with love in Thamel</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="font-headline text-4xl md:text-5xl text-[#FDF6EC] font-bold">From Our Kitchen</motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-20 h-1 bg-[#D4A020] rounded-full mx-auto mt-4" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] shadow-md' : 'bg-white dark:bg-[#2C1506] text-[#2C1506]/60 dark:text-[#FDF6EC]/60 hover:bg-[#D4A020]/10 border border-[#D4A020]/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4"
          >
            {filtered.map((img, i) => (
              <motion.button
                key={img.src + i}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                onClick={() => open(i)}
                className="group relative w-full overflow-hidden rounded-xl break-inside-avoid cursor-pointer"
              >
                <img src={img.src} alt={img.label} loading="lazy" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1506]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold text-[#D4A020] uppercase tracking-wider">{img.cat}</span>
                  <span className="text-[#FDF6EC] font-headline text-sm mt-0.5">{img.label}</span>
                </div>
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#D4A020]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-3.5 h-3.5 text-[#2C1506]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-[#2C1506]/95 flex items-center justify-center"
              onClick={close}
            >
              <span className="absolute top-4 right-4 text-[#FDF6EC]/60 text-sm z-10">{lightbox + 1} / {filtered.length}</span>
              <button onClick={close} className="absolute top-4 right-14 text-[#FDF6EC] hover:text-[#D4A020] transition-colors z-10" aria-label="Close">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FDF6EC] hover:text-[#D4A020] transition-colors z-10 p-2"
                aria-label="Previous"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <motion.img
                key={lightbox}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={filtered[lightbox].src}
                alt={filtered[lightbox].label}
                className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FDF6EC] hover:text-[#D4A020] transition-colors z-10 p-2"
                aria-label="Next"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <a
                href={filtered[lightbox].src}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold text-xs px-4 py-2 rounded-full hover:brightness-110 transition-all z-10"
                onClick={(e) => e.stopPropagation()}
              >
                Download
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instagram + Facebook */}
        <motion.div {...fadeUp} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#2C1506] rounded-2xl p-6 shadow-md text-center">
            <div className="text-3xl mb-3">📸</div>
            <h3 className="font-headline text-xl text-[#2C1506] dark:text-[#FDF6EC] mb-1">Follow @bakinglabaadhunik</h3>
            <div className="grid grid-cols-3 gap-2 my-4">
              {images.slice(0, 6).map((img, i) => (
                <a key={i} href="https://www.instagram.com/bakinglabaadhunik" target="_blank" rel="noopener noreferrer" className="aspect-square rounded-lg overflow-hidden">
                  <img src={img.src} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
            <a href="https://www.instagram.com/bakinglabaadhunik" target="_blank" rel="noopener noreferrer" className="inline-flex bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-6 py-2.5 rounded-full text-sm hover:brightness-110 transition-all">
              Follow on Instagram
            </a>
          </div>

          <div className="bg-[#f0f6ff] dark:bg-[#0a1a2e] rounded-2xl p-6 shadow-lg text-center flex flex-col justify-center border-l-4 border-[#1877F2] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#1877F2] flex items-center justify-center shadow-md"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.div>

              <div className="flex items-center justify-center gap-2 mb-1">
                <h3 className="font-headline text-xl text-[#2C1506] dark:text-[#FDF6EC]">Order via Facebook</h3>
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block shadow-[0_0_6px_rgba(34,197,94,0.6)]" title="Active Now" />
              </div>
              <p className="text-sm text-[#1877F2] dark:text-[#9bbfff] font-medium mb-1">@ThebakinglabNP</p>
              <span className="inline-block text-[10px] bg-[#1877F2]/10 dark:bg-[#1877F2]/20 text-[#1877F2] dark:text-[#9bbfff] font-semibold px-2.5 py-0.5 rounded-full mb-3">
                ⚡ Usually replies within 1 hour
              </span>
              <p className="text-xs text-[#2C1506]/50 dark:text-[#FDF6EC]/50 mb-5 max-w-xs mx-auto">We're active and responsive on Facebook — DM us to order or ask any question!</p>
              <a href="https://www.facebook.com/ThebakinglabNP" target="_blank" rel="noopener noreferrer" className="inline-flex bg-[#1877F2] text-white font-bold px-6 py-2.5 rounded-full text-sm hover:brightness-110 hover:shadow-lg hover:shadow-[#1877F2]/30 transition-all mx-auto">
                Visit Facebook Page
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
