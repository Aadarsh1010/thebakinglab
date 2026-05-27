import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useInView, animate, AnimatePresence } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
}

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.15 },
}

/* ── HERO ── */
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(44,21,6,0.80) 0%, rgba(44,21,6,0.60) 100%), url(https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1920)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >


      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[#D4A020] text-sm tracking-[0.3em] uppercase mb-6"
        >
          Est. 2023 • Kaldhara Chowk, Thamel
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FDF6EC] font-bold leading-tight"
        >
          Kathmandu's
          <span
            className="block font-accent text-4xl sm:text-5xl text-[#D4A020] mt-2 mb-8"
          >
            Best Kept Secret
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-[#FDF6EC]/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10 px-4"
        >
          Home of Nepal's finest banana bread, premium cheesecakes with caramelized cashews,
          and custom celebration cakes. Hidden in Kaldhara — discovered by thousands of
          travelers and locals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/menu"
            className="border-2 border-[#FDF6EC] text-[#FDF6EC] font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#FDF6EC] hover:text-[#2C1506] dark:hover:text-[#FDF6EC] transition-all duration-300"
          >
            Explore Our Menu
          </Link>
          <Link
            to="/order-now"
            className="bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-8 py-3.5 rounded-full text-base hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200 animate-pulse"
          >
            Order Now for Tomorrow
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D4A020]"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}

/* ── AWARDS TICKER ── */
const tickerItems = [
  '🍌 Nepal\'s Best Banana Bread',
  '⭐ 4.7 Stars on Google',
  '🎂 500+ Custom Cakes Made',
  '🥐 Fresh Daily Bakes',
  '🌿 Eggless Options Available',
  '🌍 Tourists from 50+ Countries',
  '📍 Kaldhara Chowk, Thamel',
]

function AwardsTicker() {
  const duplicated = [...tickerItems, ...tickerItems, ...tickerItems]

  const TickerRow = ({ direction = 1 }) => (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        animate={{ x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="flex shrink-0"
      >
        {duplicated.map((item, i) => (
          <span key={i} className="inline-block px-4 text-sm md:text-base text-[#FDF6EC]">
            {item}
            <span className="mx-4 text-[#D4A020]/50">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  )

  return (
    <div className="bg-[#3D1F0D] py-3 md:py-4 overflow-hidden">
      <TickerRow direction={1} />
    </div>
  )
}

/* ── DELIVERY & PROMOS BANNER ── */
function DeliveryPromosBanner() {
  return (
    <section className="py-8 bg-[#2C1506] border-y border-[#D4A020]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="flex items-center gap-4 bg-[#3D1F0D]/50 rounded-xl px-5 py-4 border border-[#D4A020]/10">
            <span className="text-3xl">🚚</span>
            <div>
              <p className="font-headline text-sm text-[#FDF6EC] font-bold">Free Delivery</p>
              <p className="text-xs text-[#FDF6EC]/60">On orders over NPR 2,000</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#3D1F0D]/50 rounded-xl px-5 py-4 border border-[#D4A020]/10">
            <span className="text-3xl">🥖</span>
            <div>
              <p className="font-headline text-sm text-[#FDF6EC] font-bold">Fresh Daily</p>
              <p className="text-xs text-[#FDF6EC]/60">Baked from scratch every morning</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── WHY THE BAKING LAB (BRAND STORY) ── */
function BrandStorySection() {
  return (
    <section className="py-20 md:py-28 bg-[#FDF6EC] dark:bg-[#1C0F0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <p className="font-accent text-[#D4A020] text-xl mb-2">Why The Baking Lab?</p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2C1506] dark:text-[#FDF6EC] mb-6">
              More Than a Bakery — An Experience
            </h2>
            <div className="space-y-4 text-[#2C1506]/70 dark:text-[#FDF6EC]/70 leading-relaxed text-sm md:text-base">
              <p>
                Nestled in Kaldhara Chowk, just minutes from Thamel's bustling streets, 
                The Baking Lab is where tradition meets passion. Every item we bake tells 
                a story — of locally sourced ingredients, time-honored techniques, and an 
                unwavering commitment to quality.
              </p>
              <p>
                Our banana bread has achieved near-legendary status among travelers, our 
                caramelized cashew cheesecake keeps locals coming back week after week, 
                and our custom cakes have sweetened celebrations across Kathmandu.
              </p>
              <p>
                We believe great food brings people together. Whether you're a backpacker 
                passing through, a local family celebrating a milestone, or a foodie on a 
                mission — you're welcome at our table.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#D4A020]/20">
              {[
                { num: '3+', label: 'Years' },
                { num: '50k+', label: 'Items Baked' },
                { num: '80+', label: 'Countries Served' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="font-headline text-2xl md:text-3xl text-[#D4A020] font-bold">{s.num}</p>
                  <p className="text-xs text-[#2C1506]/50 dark:text-[#FDF6EC]/50">{s.label}</p>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-8 py-3 rounded-full text-sm hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200"
            >
              Read Our Story →
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800"
              alt="The Baking Lab bakery team in Kaldhara, Thamel, Kathmandu"
              loading="lazy"
              className="rounded-2xl shadow-xl w-full h-[450px] object-cover"
            />
            <div className="absolute -bottom-5 -right-5 bg-white dark:bg-[#2C1506] rounded-2xl shadow-xl px-5 py-4 border border-[#D4A020]/10">
              <p className="font-headline text-sm text-[#2C1506] dark:text-[#FDF6EC] font-bold">⭐ 4.7/5</p>
              <p className="text-xs text-[#2C1506]/50 dark:text-[#FDF6EC]/50">100+ reviews on Google</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── FAMOUS FOR ── */
const famousItems = [
  {
    emoji: '🍌',
    title: "Nepal's Best Banana Bread",
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600',
    badge: '⚡ Sells Out Daily',
    badgeColor: 'bg-red-500',
    desc: 'Constantly reviewed by international travelers as the absolute best banana bread in Nepal. Exceptionally moist, baked every morning.',
    preOrderItem: 'Banana Bread Slice',
  },
  {
    emoji: '🍰',
    title: 'Cheesecakes & Brownies',
    img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600',
    badge: '❤️ Most Loved',
    badgeColor: 'bg-[#D4A020]',
    desc: 'Rich, heavy textures with big chocolate chunks and our signature caramelized cashew topping.',
    preOrderItem: 'Caramelized Cashew Cheesecake',
  },
  {
    emoji: '🥐',
    title: 'Cookies & Croissants',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600',
    badge: null,
    badgeColor: '',
    desc: 'Signature daily quick-bites. Coconut cookies and buttery croissants — crispy, fresh, gone by noon.',
    preOrderItem: 'Butter Croissant',
  },
  {
    emoji: '🎂',
    title: 'Custom Celebration Cakes',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600',
    badge: '🌿 Eggless Available',
    badgeColor: 'bg-green-600',
    desc: 'Birthday, wedding, baby shower — including eggless options for all dietary and religious preferences.',
    linkTo: '/custom-cake',
  },
]

function FamousForSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF0E0] dark:bg-[#1C0F0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2C1506] dark:text-[#FDF6EC] mb-3">
            What We're Famous For
          </h2>
          <p className="font-accent text-xl md:text-2xl text-[#D4A020]">
            Made fresh, every single day
          </p>
        </motion.div>

        <motion.div {...stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {famousItems.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
              }}
              className="group bg-white dark:bg-[#2C1506] rounded-2xl overflow-hidden shadow-md hover:shadow-[0_8px_30px_rgba(212,160,32,0.25)] hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.badge && (
                  <span className={`absolute top-3 left-3 ${item.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <h3 className="font-headline text-lg text-[#2C1506] dark:text-[#FDF6EC] mb-2">{item.title}</h3>
                <p className="text-sm text-[#2C1506]/70 dark:text-[#FDF6EC]/70 leading-relaxed mb-4">{item.desc}</p>
                <Link
                  to={item.linkTo || `/order-now${item.preOrderItem ? `?add=${encodeURIComponent(item.preOrderItem)}` : ''}`}
                  className="inline-block text-sm font-semibold text-[#D4A020] hover:text-[#2C1506] dark:hover:text-[#FDF6EC] transition-colors"
                >
                  Order Now →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── TOURIST URGENCY ── */
function TouristUrgency() {
  return (
    <section className="bg-[#2C1506]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-64 lg:h-auto overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800"
            alt="Freshly baked banana bread at The Baking Lab in Thamel, Kathmandu"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center p-8 md:p-12 lg:p-16"
        >
          <div className="text-5xl mb-4">🏃</div>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#FDF6EC] mb-2">
            Visiting Thamel?
          </h2>
          <p className="font-accent text-xl md:text-2xl text-[#D4A020] mb-6">
            Don't Leave Without Our Banana Bread
          </p>
          <p className="text-[#FDF6EC]/80 leading-relaxed mb-8">
            Thousands of tourists visit us every month — and many miss out because we sell out
            by noon. Order the night before and pick up fresh the next morning at Kaldhara
            Chowk. 5 minutes from Thamel main.
          </p>
          <Link
            to="/order-now"
            className="inline-flex items-center gap-2 bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-8 py-3.5 rounded-full text-base hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200 w-fit"
          >
            Reserve for Tomorrow →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ── CUSTOM CAKE TEASER ── */
function CustomCakeTeaser() {
  return (
    <section className="relative bg-[#2C1506] overflow-hidden">
      {/* Subtle noise/grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1 flex flex-col justify-center p-8 md:p-12 lg:p-16"
        >
          <div className="text-4xl mb-3">👨‍🍳</div>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#FDF6EC] mb-1">
            Your Dream Cake,
          </h2>
          <p className="font-accent text-xl md:text-2xl text-[#D4A020] mb-6">
            Built Your Way
          </p>
          <p className="text-[#FDF6EC]/80 leading-relaxed mb-6">
            No more Facebook DM back-and-forth. Choose flavor, size, eggless option,
            custom message and delivery date — all online in 2 minutes.
          </p>

          <ul className="space-y-2.5 mb-8">
            {[
              'Eggless options available',
              'Birthday, wedding, baby shower & more',
              'WhatsApp confirmation within 2 hours',
              'Pickup or delivery in Kathmandu',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[#FDF6EC]/80 text-sm">
                <span className="text-[#D4A020] mt-0.5">✅</span>
                {item}
              </li>
            ))}
          </ul>

          <Link
            to="/custom-cake"
            className="inline-flex items-center gap-2 bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-8 py-3.5 rounded-full text-base hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200 w-fit"
          >
            Build Your Cake →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2 h-64 lg:h-auto overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800"
            alt="Custom celebration cake from The Baking Lab, Kathmandu — eggless options available"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ── GOOGLE REVIEWS CARDS ── */
const reviews = [
  {
    stars: 5,
    text: 'The banana bread here is absolutely incredible — the best I\'ve had in all of Nepal. Don\'t leave Thamel without it!',
    author: 'Sarah M., United Kingdom',
  },
  {
    stars: 5,
    text: 'Hidden gem in Thamel! The cheesecake with caramelized cashews is something I still think about. Absolutely unforgettable.',
    author: 'James K., Australia',
  },
  {
    stars: 5,
    text: 'Ordered a custom eggless birthday cake — stunning and incredibly delicious. The whole process was so easy!',
    author: 'Priya S., India',
  },
]

function GoogleReviews() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goTo = (i) => setCurrent(i)
  const prev = () => setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c + 1) % reviews.length)

  return (
    <section className="py-20 md:py-28 bg-[#FAF0E0] dark:bg-[#1C0F0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2C1506] dark:text-[#FDF6EC] mb-2">
            What Travelers Are Saying
          </h2>
          <p className="font-accent text-xl md:text-2xl text-[#D4A020] mb-10">
            100+ verified Google reviews
          </p>
        </motion.div>

        <div className="relative flex items-center gap-4">
          <button onClick={prev} className="hidden md:flex shrink-0 w-10 h-10 items-center justify-center rounded-full bg-white dark:bg-[#2C1506] border border-[#D4A020]/20 text-[#2C1506] dark:text-[#FDF6EC] hover:bg-[#D4A020] hover:text-white transition-all" aria-label="Previous review">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative flex-1 h-[220px] md:h-[200px]">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 60 }}
                animate={
                  i === current
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -60 }
                }
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-[#D4A020]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#2C1506]/80 dark:text-[#FDF6EC]/80 text-base md:text-lg leading-relaxed max-w-xl mb-4 px-4">
                  "{review.text}"
                </p>
                <p className="font-headline text-sm text-[#2C1506] dark:text-[#FDF6EC]">— {review.author}</p>
              </motion.div>
            ))}
          </div>

          <button onClick={next} className="hidden md:flex shrink-0 w-10 h-10 items-center justify-center rounded-full bg-white dark:bg-[#2C1506] border border-[#D4A020]/20 text-[#2C1506] dark:text-[#FDF6EC] hover:bg-[#D4A020] hover:text-white transition-all" aria-label="Next review">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-[#D4A020] w-6' : 'bg-[#D4A020]/30'
              }`}
            />
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-10">
          <a
            href="https://www.google.com/search?q=The+Baking+Lab+Thamel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-8 py-3.5 rounded-full text-base hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200"
          >
            See All Reviews on Google →
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ── STATS COUNTER ── */
function Counter({ end, suffix = '', label, icon }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, end, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.floor(v)),
    })
    return controls.stop
  }, [inView, end])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-headline text-4xl md:text-5xl text-[#D4A020] font-bold">
        {count}{suffix}
      </div>
      <div className="text-[#FDF6EC]/80 text-sm md:text-base mt-1">{label}</div>
    </div>
  )
}

function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-[#3D1F0D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Counter icon="⭐" end={4.7} suffix="" label="Star Rating" />
          <Counter icon="💬" end={100} suffix="+" label="Google Reviews" />
          <Counter icon="🎂" end={500} suffix="+" label="Custom Cakes Made" />
          <Counter icon="🌍" end={50} suffix="+" label="Tourist Countries" />
        </motion.div>
      </div>
    </section>
  )
}

/* ── NEWSLETTER ── */
function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <section className="py-20 md:py-28 bg-[#2C1506] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div {...fadeUp}>
          <p className="font-accent text-[#D4A020] text-xl mb-2">Never Miss Out</p>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#FDF6EC] mb-3">
            Join Our Baking Community
          </h2>
          <p className="text-[#FDF6EC]/70 mb-8 max-w-lg mx-auto">
            Be the first to know about new bakes, seasonal specials, and pre-order openings.
            No spam — just fresh bread in your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3.5 rounded-full border-2 border-[#D4A020]/20 bg-white/10 backdrop-blur-sm text-[#FDF6EC] placeholder:text-[#FDF6EC]/40 outline-none focus:border-[#D4A020] transition-colors text-sm"
            />
            <button
              type="submit"
              className="bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-8 py-3.5 rounded-full text-sm hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200 shrink-0"
            >
              Subscribe
            </button>
          </form>

          <AnimatePresence>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-400 text-sm mt-4 font-semibold"
              >
                ✅ You're subscribed! Welcome to The Baking Lab community.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

/* ── HOME ── */
export default function Home() {
  return (
    <div>
      <Helmet>
        <title>The Baking Lab | Best Banana Bread & Bakery in Thamel, Kathmandu</title>
        <meta name="description" content="Nepal's best banana bread, artisan cakes & baked goods in Kaldhara, Thamel. Freshly baked daily. Eggless & custom options. Visit Kathmandu's favorite hidden bakery." />
        <link rel="canonical" href="https://thebakinglab.com.np/" />
        <meta property="og:title" content="The Baking Lab | Best Banana Bread & Bakery in Thamel, Kathmandu" />
        <meta property="og:description" content="Nepal's best banana bread, artisan cakes & baked goods in Kaldhara, Thamel. Freshly baked daily. Eggless & custom options." />
        <meta property="twitter:title" content="The Baking Lab | Best Banana Bread & Bakery in Thamel, Kathmandu" />
        <meta property="twitter:description" content="Nepal's best banana bread, artisan cakes & baked goods in Kaldhara, Thamel. Freshly baked daily. Eggless & custom options." />
      </Helmet>
      <HeroSection />
      <AwardsTicker />
      <DeliveryPromosBanner />
      <BrandStorySection />
      <FamousForSection />
      <TouristUrgency />
      <CustomCakeTeaser />
      <GoogleReviews />
      <StatsSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#FAF0E0] dark:bg-[#1C0F0A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <p className="font-accent text-[#D4A020] text-xl mb-2">Get in Touch</p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2C1506] dark:text-[#FDF6EC] mb-4">
              Ready to Order?
            </h2>
            <p className="text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-10 max-w-lg mx-auto">
              Whether it's a custom cake for your celebration or a weekly batch of
              our famous brownies — we're just a message away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/9779845126192"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-8 py-3.5 rounded-full text-base hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200 inline-block"
              >
                Message on WhatsApp
              </a>
              <Link
                to="/contact"
                className="border-2 border-[#D4A020] text-[#D4A020] font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D4A020] hover:text-[#2C1506] dark:hover:text-[#FDF6EC] transition-all duration-300 inline-block"
              >
                Visit Our Bakery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
