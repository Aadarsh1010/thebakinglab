import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useInView, animate } from 'framer-motion'

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
      <div className="font-headline text-4xl md:text-5xl text-[#D4A020] font-bold leading-none tabular-nums tracking-tight">
        {count}{suffix}
      </div>
      <div className="mt-3 h-px w-12 bg-[#D4A020]/40 mx-auto" />
      <div className="mt-3 text-[#FDF6EC]/80 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium">{label}</div>
    </div>
  )
}

const team = [
  {
    name: 'Chef Aarav Sharma',
    role: 'Head Baker & Founder',
    img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400',
    desc: 'Trained in Paris patisserie schools, Aarav returned to Nepal with a dream of elevating local baking.',
    quote: 'Baking is science made delicious — every ingredient has a purpose, every temperature a reason.',
  },
  {
    name: 'Maya Thapa',
    role: 'Pastry Chef',
    img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=400',
    desc: 'Maya brings 12 years of experience crafting delicate pastries and our famous caramelized cheesecakes.',
    quote: 'A great pastry should make you close your eyes on the first bite.',
  },
  {
    name: 'Rajesh Gurung',
    role: 'Bread Artisan',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
    desc: 'Rajesh perfected our banana bread recipe through 200+ iterations. Now it\'s the most requested item.',
    quote: 'Good bread takes time. We give it every minute it deserves.',
  },
  {
    name: 'Priya Khadka',
    role: 'Custom Cake Designer',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
    desc: 'Priya designs and decorates custom celebration cakes — from elegant weddings to playful birthday themes.',
    quote: 'Every cake tells a story. I just help it look the part.',
  },
]

const process = [
  {
    step: '01',
    title: 'Source',
    icon: '🌾',
    desc: 'We start each morning by selecting the freshest local ingredients — free-range eggs from Chitwan, organic flour from Terai, and seasonal fruits from Nepali farms.',
  },
  {
    step: '02',
    title: 'Prepare',
    icon: '👩‍🍳',
    desc: 'Every batch is mixed, kneaded, and shaped by hand. Our recipes use traditional slow-fermentation techniques for deeper flavor and better texture.',
  },
  {
    step: '03',
    title: 'Bake',
    icon: '🔥',
    desc: 'Baked fresh throughout the day in small batches. Our stone-hearth ovens ensure even heat distribution for that perfect golden crust every time.',
  },
  {
    step: '04',
    title: 'Serve',
    icon: '❤️',
    desc: 'From our counter in Thamel to your table — each item is wrapped with care. We prioritize pre-orders so nothing goes to waste.',
  },
]

const values = [
  {
    icon: '🥖',
    title: 'Artisan Craft',
    desc: 'Every item is handcrafted from scratch in small batches. No shortcuts, no mixes — just traditional techniques with premium ingredients.',
  },
  {
    icon: '🌿',
    title: 'Locally Sourced',
    desc: 'We source eggs, butter, flour, and seasonal fruits from local Nepali producers. Supporting our community, one bake at a time.',
  },
  {
    icon: '❤️',
    title: 'Made with Love',
    desc: 'Baking is personal for us. Each recipe has been perfected through hundreds of trials — until every bite creates a smile.',
  },
  {
    icon: '🌍',
    title: 'Globally Inspired',
    desc: 'From New York cheesecake to French croissants, we bring world-class pastry techniques to the heart of Kathmandu.',
  },
  {
    icon: '🥚',
    title: 'Inclusive Menu',
    desc: 'Eggless options across our entire menu — because everyone deserves great baked goods, regardless of dietary needs.',
  },
  {
    icon: '♻️',
    title: 'Sustainable Packaging',
    desc: 'We use eco-friendly packaging and minimize food waste through our pre-order system. Good for you, good for the planet.',
  },
]

const workshopData = [
  {
    icon: '🥖',
    title: 'Artisan Bread Workshop',
    desc: 'Learn sourdough, focaccia, and baguette techniques in a 4-hour hands-on session.',
    duration: '4 hours',
    price: 'NPR 3,500',
  },
  {
    icon: '🎂',
    title: 'Cake Decorating 101',
    desc: 'Master buttercream piping, fondant basics, and cake assembly. Take home your creation.',
    duration: '3 hours',
    price: 'NPR 4,000',
  },
  {
    icon: '🥐',
    title: 'French Pastry Intensive',
    desc: 'Croissants, éclairs, and puff pastry from scratch. Intermediate level, all materials included.',
    duration: '6 hours',
    price: 'NPR 6,500',
  },
  {
    icon: '🍪',
    title: 'Weekend Cookie Class',
    desc: 'Perfect for beginners. Learn 5 cookie varieties including our famous coconut cookies.',
    duration: '2 hours',
    price: 'NPR 2,000',
  },
]

const timeline = [
  { year: '2023', title: 'A dream takes shape', event: 'The Baking Lab opens at Kaldhara Chowk, Thamel with a small oven and big dreams. Founder Aarav bakes the first batch before sunrise.' },
  { year: '2023', title: 'Banana bread goes viral', event: 'Our banana bread sells out in under an hour. Word spreads through hostel front desks, travel blogs, and WhatsApp groups.' },
  { year: '2024', title: 'Custom cakes launch', event: 'Expanded to full-service custom cakes. Launched the online Custom Cake Builder with eggless options across the entire menu.' },
  { year: '2025', title: 'Awarded best in Kathmandu', event: '"Nepal\'s Best Banana Bread" by travelers. Crossed 500+ custom cakes delivered to celebrations across the valley.' },
  { year: '2026', title: 'Workshops & beyond', event: 'Launched artisan baking workshops. Now serving thousands of happy customers monthly with a team of 12 passionate bakers.' },
]

const testimonials = [
  {
    text: 'The Baking Lab is a hidden gem in Thamel. Their banana bread is the best I\'ve had anywhere — moist, flavorful, and perfectly baked.',
    author: '— Emma W., United Kingdom',
    rating: 5,
  },
  {
    text: 'I took their weekend bread workshop and it was incredible. Chef Aarav is patient, knowledgeable, and truly passionate.',
    author: '— David C., Australia',
    rating: 5,
  },
  {
    text: 'Ordered a custom cake for my daughter\'s birthday — eggless, stunning design, and absolutely delicious. Highly recommend!',
    author: '— Sunita R., Kathmandu',
    rating: 5,
  },
]

function TimelineItem({ entry, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="relative md:grid md:grid-cols-9 md:gap-6 items-center pb-12 last:pb-0"
    >
      <div className={`md:col-span-4 ${index % 2 === 0 ? 'md:text-right' : 'md:order-3 md:text-left'} pl-12 md:pl-0`}>
        <div className="bg-white dark:bg-[#2C1506]/80 border border-[#FAF0E0] dark:border-[#3D1F0D] rounded-2xl p-6 shadow-[0_10px_30px_-10px_rgba(44,21,6,0.35)] hover:shadow-[0_0_0_1px_rgba(212,160,32,0.4),0_8px_20px_-8px_rgba(212,160,32,0.5)] transition-shadow duration-300">
          <span className="font-accent text-2xl text-[#D4A020] leading-none">Chapter {index + 1}</span>
          <h3 className="font-headline text-xl font-bold text-[#2C1506] dark:text-[#FDF6EC] mt-1 mb-2">{entry.title}</h3>
          <p className="text-[#2C1506]/70 dark:text-[#FDF6EC]/70 text-sm leading-relaxed">{entry.event}</p>
        </div>
      </div>

      <div className="absolute left-0 top-2 md:static md:col-span-1 md:flex md:justify-center">
        <div className="relative flex md:flex-col items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 250 }}
            className="relative z-10 w-6 h-6 rounded-full bg-[#D4A020] border-4 border-[#FDF6EC] dark:border-[#1C0F0A] shadow-[0_0_0_3px_rgba(212,160,32,0.35)]"
          >
            <span className="absolute inset-0 rounded-full bg-[#D4A020]/40 animate-ping" />
          </motion.div>
          <div className="hidden md:block md:mt-3 bg-[#2C1506] text-[#D4A020] px-4 py-1.5 rounded-full font-headline font-bold text-sm shadow-[0_10px_30px_-10px_rgba(44,21,6,0.35)]">
            {entry.year}
          </div>
        </div>
      </div>

      <div className="md:hidden absolute left-12 -top-1">
        <span className="inline-block bg-[#2C1506] text-[#D4A020] px-3 py-1 rounded-full font-headline font-bold text-xs shadow-[0_10px_30px_-10px_rgba(44,21,6,0.35)]">{entry.year}</span>
      </div>
    </motion.div>
  )
}

function ValueCard({ value, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55 }}
      className="group relative bg-white dark:bg-[#2C1506]/80 rounded-2xl p-7 border border-[#FAF0E0] dark:border-[#3D1F0D] shadow-[0_10px_30px_-10px_rgba(44,21,6,0.35)] hover:shadow-[0_0_0_1px_rgba(212,160,32,0.4),0_8px_20px_-8px_rgba(212,160,32,0.5)] transition-all duration-300 overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4A020]/10 rounded-full blur-2xl group-hover:bg-[#D4A020]/25 transition-colors duration-500" />
      <span className="absolute top-5 right-5 font-headline font-bold text-5xl text-[#FAF0E0] dark:text-[#3D1F0D]/80 group-hover:text-[#D4A020]/40 transition-colors">0{index + 1}</span>
      <div className="relative text-3xl mb-5">{value.icon}</div>
      <h3 className="font-headline text-lg text-[#2C1506] dark:text-[#FDF6EC] font-bold mb-2 relative">{value.title}</h3>
      <p className="text-sm text-[#2C1506]/70 dark:text-[#FDF6EC]/70 leading-relaxed relative">{value.desc}</p>
    </motion.div>
  )
}

export default function About() {
  return (
    <div>
      <Helmet>
        <title>About | The Baking Lab — Artisan Bakery in Kaldhara, Thamel, Kathmandu</title>
        <meta name="description" content="Discover the story behind The Baking Lab, Kathmandu's artisan bakery in Kaldhara, Thamel. Fresh, quality bakes made daily since 2023. Eggless options, custom cakes & more." />
        <link rel="canonical" href="https://thebakinglab.com.np/about" />
        <meta property="og:title" content="About | The Baking Lab — Artisan Bakery in Thamel" />
        <meta property="og:description" content="Discover the story behind The Baking Lab, Kathmandu's artisan bakery in Kaldhara, Thamel. Fresh bakes since 2023." />
      </Helmet>
      {/* Hero */}
      <section
        className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(44,21,6,0.85) 0%, rgba(44,21,6,0.65) 100%), url(https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1920)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-accent text-xl md:text-2xl text-[#D4A020] mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-headline text-5xl sm:text-6xl md:text-7xl text-[#FDF6EC] font-bold leading-tight"
          >
            From a Tiny Oven in Thamel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-[#FDF6EC]/80 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            To becoming one of Kathmandu's most-loved artisan bakeries — this is how The Baking Lab came to be.
          </motion.p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 md:py-28 bg-[#FAF0E0] dark:bg-[#1C0F0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600"
                  alt="Freshly baked banana bread at The Baking Lab, best bakery in Thamel, Kathmandu"
                  loading="lazy"
                  className="rounded-2xl h-56 sm:h-72 w-full object-cover shadow-[0_10px_30px_-10px_rgba(44,21,6,0.35)]"
                />
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600"
                  alt="Artisan baking process at The Baking Lab in Thamel, Kathmandu"
                  loading="lazy"
                  className="rounded-2xl h-56 sm:h-72 w-full object-cover shadow-[0_10px_30px_-10px_rgba(44,21,6,0.35)] mt-8"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-[#2C1506] text-[#FDF6EC] p-5 rounded-2xl shadow-[0_10px_30px_-10px_rgba(44,21,6,0.35)] border border-[#3D1F0D]">
                <p className="font-accent text-2xl text-[#D4A020] leading-none">Est.</p>
                <p className="font-headline text-3xl font-bold leading-none mt-1">2023</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-accent text-xl text-[#D4A020] mb-2">Est. 2023</p>
              <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2C1506] dark:text-[#FDF6EC] mb-5">
                Why The Baking Lab{' '}
                <span className="text-[#D4A020] italic">Exists</span>
              </h2>
              <div className="space-y-4 text-[#2C1506]/80 dark:text-[#FDF6EC]/80 leading-relaxed">
                <p>
                  The Baking Lab was born from a simple belief: great baked goods shouldn't require
                  a flight to Paris or New York. In the bustling streets of Thamel — where travelers
                  from every corner of the world converge — we saw an opportunity to create something
                  extraordinary.
                </p>
                <p>
                  We started with one oven, a handful of recipes passed down through generations of
                  bakers, and an obsession with quality. Our first batch of banana bread sold out in
                  under an hour. Word spread quickly — through hostel front desks, travel blogs, and
                  WhatsApp groups — until a line began forming at our door every morning before sunrise.
                </p>
                <p>
                  Today, we bake hundreds of items daily — from our famous caramelized cashew cheesecake
                  to buttery croissants and custom celebration cakes. Every recipe is still made in-house,
                  by hand, with ingredients we'd proudly serve our own families.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-accent text-xl text-[#D4A020] mb-2">2023 → 2026</p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2C1506] dark:text-[#FDF6EC]">
              Our <span className="text-[#D4A020] italic">Journey</span> So Far
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#D4A020]/40 to-transparent md:-translate-x-1/2" />
            {timeline.map((entry, i) => (
              <TimelineItem key={entry.year + i} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-[#3D1F0D] relative overflow-hidden">
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-[#D4A020]/15 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-72 h-72 bg-[#D4A020]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div {...stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter icon="🥐" end={50000} suffix="+" label="Items Baked" />
            <Counter icon="⭐" end={4.7} suffix="" label="Star Rating" />
            <Counter icon="🌍" end={80} suffix="+" label="Nationalities Served" />
            <Counter icon="🎂" end={500} suffix="+" label="Custom Cakes" />
          </motion.div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 md:py-28 bg-[#FDF6EC] dark:bg-[#1C0F0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <p className="font-accent text-xl text-[#D4A020] mb-2">Behind the Bakes</p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2C1506] dark:text-[#FDF6EC]">
              Meet the <span className="text-[#D4A020] italic">Team</span>
            </h2>
            <p className="text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mt-4">The hands, hearts, and obsessions behind every item we bake.</p>
          </motion.div>

          <motion.div {...stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                variants={{
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                }}
                className="group bg-white dark:bg-[#2C1506]/80 rounded-3xl overflow-hidden border border-[#FAF0E0] dark:border-[#3D1F0D] shadow-[0_10px_30px_-10px_rgba(44,21,6,0.35)] hover:shadow-[0_0_0_1px_rgba(212,160,32,0.4),0_8px_20px_-8px_rgba(212,160,32,0.5)] transition-shadow duration-300"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C1506]/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="text-[#FDF6EC]"
                    >
                      <svg className="w-5 h-5 text-[#D4A020] mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="font-accent italic text-sm leading-snug">"{member.quote}"</p>
                    </motion.div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-headline text-lg text-[#2C1506] dark:text-[#FDF6EC] font-bold">{member.name}</h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#D4A020] font-semibold mt-1">{member.role}</p>
                  <p className="text-sm text-[#2C1506]/60 dark:text-[#FDF6EC]/60 leading-relaxed mt-4">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 md:py-28 bg-[#FAF0E0] dark:bg-[#1C0F0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="font-accent text-xl text-[#D4A020] mb-2">From Kitchen to Counter</p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2C1506] dark:text-[#FDF6EC]">
              How We Bake
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="relative text-center"
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="inline-block bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {step.step}
                </div>
                <h3 className="font-headline text-lg text-[#2C1506] dark:text-[#FDF6EC] font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-[#2C1506]/70 dark:text-[#FDF6EC]/70 leading-relaxed">{step.desc}</p>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-[#D4A020]/40 text-2xl">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 md:py-28 bg-[#FDF6EC] dark:bg-[#1C0F0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <p className="font-accent text-xl text-[#D4A020] mb-2">What We Stand For</p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2C1506] dark:text-[#FDF6EC]">
              Our <span className="text-[#D4A020] italic">Values</span>
            </h2>
            <p className="text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mt-4">Six principles that guide everything we do, from sourcing to serving.</p>
          </motion.div>
          <motion.div {...stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ValueCard key={i} value={v} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-20 md:py-28 bg-[#3D1F0D] relative overflow-hidden">
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-[#D4A020]/15 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-72 h-72 bg-[#D4A020]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="font-accent text-xl text-[#D4A020] mb-2">Learn from the Masters</p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#FDF6EC]">
              Baking Workshops
            </h2>
            <p className="text-[#FDF6EC]/70 mt-4 max-w-2xl mx-auto">
              Want to learn the art of baking? Join our hands-on workshops led by our expert pastry chefs.
              All skill levels welcome — from absolute beginners to aspiring professionals.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workshopData.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-[#2C1506] rounded-2xl p-6 border border-[#D4A020]/10 hover:border-[#D4A020]/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{w.icon}</div>
                <h3 className="font-headline text-base text-[#FDF6EC] font-bold mb-2">{w.title}</h3>
                <p className="text-sm text-[#FDF6EC]/60 mb-4 leading-relaxed">{w.desc}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#D4A020] font-semibold">⏱ {w.duration}</span>
                  <span className="text-[#D4A020] font-bold">{w.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="text-center mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-8 py-3.5 rounded-full text-base hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200"
            >
              Book a Workshop
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-[#FAF0E0] dark:bg-[#1C0F0A] border-b border-[#D4A020]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="font-accent text-xl text-[#D4A020] mb-2">What People Say</p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2C1506] dark:text-[#FDF6EC]">
              Loved by Travelers &amp; Locals Alike
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-white dark:bg-[#2C1506] rounded-2xl p-6 shadow-[0_10px_30px_-10px_rgba(44,21,6,0.35)]"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#D4A020]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[#2C1506]/80 dark:text-[#FDF6EC]/80 leading-relaxed mb-4 italic">"{t.text}"</p>
                <p className="text-xs text-[#2C1506]/50 dark:text-[#FDF6EC]/50 font-semibold">{t.author}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="text-center mt-10">
            <a
              href="https://www.google.com/search?q=The+Baking+Lab+Thamel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#D4A020] text-[#D4A020] font-semibold px-8 py-3 rounded-full text-sm hover:bg-[#D4A020] hover:text-[#2C1506] dark:hover:text-[#FDF6EC] transition-all duration-300"
            >
              Read All Reviews on Google
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#FDF6EC] dark:bg-[#1C0F0A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <p className="font-accent text-[#D4A020] text-xl mb-2">Come Visit Us</p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2C1506] dark:text-[#FDF6EC] mb-4">
              Experience the Taste Yourself
            </h2>
            <p className="text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-10 max-w-lg mx-auto">
              Located in Kaldhara Chowk, Thamel — just 5 minutes from the main tourist hub.
              Come say hi and taste why thousands of travelers call us Kathmandu's best-kept secret.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-8 py-3.5 rounded-full text-base hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200"
              >
                View Our Menu
              </Link>
              <Link
                to="/contact"
                className="border-2 border-[#D4A020] text-[#D4A020] font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D4A020] hover:text-[#2C1506] dark:hover:text-[#FDF6EC] transition-all duration-300"
              >
                Find Us on Map
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
