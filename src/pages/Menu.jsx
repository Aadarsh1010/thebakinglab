import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const tabs = [
  { key: 'All', icon: '📋', label: 'All' },
  { key: 'Breads', icon: '🍞', label: 'Breads' },
  { key: 'Cheesecakes & Brownies', icon: '🍰', label: 'Cakes & Brownies' },
  { key: 'Cookies & Croissants', icon: '🥐', label: 'Cookies & Croissants' },
  { key: 'Custom Cakes', icon: '🎂', label: 'Custom Cakes' },
  { key: 'Drinks', icon: '☕', label: 'Drinks' },
]

const menuItems = [
  // ── Breads ──
  {
    tab: 'Breads',
    name: 'Banana Bread Slice',
    price: 'NPR 350',
    desc: 'Nepal\'s most talked-about banana bread. Moist, perfectly sweet, baked every morning.',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600',
    badges: [
      { label: '🔥 BESTSELLER', color: 'bg-red-500' },
      { label: '⚡ Sells Out Daily', color: 'bg-orange-500' },
    ],
    eggless: true,
  },
  {
    tab: 'Breads',
    name: 'Banana Bread Whole Loaf',
    price: 'NPR 1,800',
    desc: 'Take a whole loaf home or to your hotel room.',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600',
    badges: [],
    eggless: true,
  },
  {
    tab: 'Breads',
    name: 'Sourdough Loaf',
    price: 'NPR 450',
    desc: 'Slow fermented, crispy crust, airy inside.',
    img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=600',
    badges: [],
    eggless: false,
  },
  {
    tab: 'Breads',
    name: 'Multigrain Bread',
    price: 'NPR 380',
    desc: 'Locally sourced grains, hearty and healthy.',
    img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600',
    badges: [],
    eggless: true,
  },

  // ── Cheesecakes & Brownies ──
  {
    tab: 'Cheesecakes & Brownies',
    name: 'Caramelized Cashew Cheesecake',
    price: 'NPR 600/slice',
    desc: 'Our signature. Rich heavy texture with golden caramelized cashew topping. The one everyone raves about.',
    img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600',
    badges: [{ label: '❤️ MOST LOVED', color: 'bg-pink-500' }],
    eggless: false,
  },
  {
    tab: 'Cheesecakes & Brownies',
    name: 'Classic New York Cheesecake',
    price: 'NPR 500/slice',
    desc: 'Dense, creamy, perfectly balanced sweetness.',
    img: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=600',
    badges: [],
    eggless: false,
  },
  {
    tab: 'Cheesecakes & Brownies',
    name: 'Blueberry Cheesecake',
    price: 'NPR 550/slice',
    desc: 'Fresh blueberry compote on classic base.',
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600',
    badges: [],
    eggless: false,
  },
  {
    tab: 'Cheesecakes & Brownies',
    name: 'Chocolate Fudge Brownie',
    price: 'NPR 280/piece',
    desc: 'Big chocolate chunks, fudgy center, caramelized cashew bits on top.',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600',
    badges: [],
    eggless: false,
  },
  {
    tab: 'Cheesecakes & Brownies',
    name: 'Nutella Swirl Brownie',
    price: 'NPR 320/piece',
    desc: 'Layers of Nutella through fudgy brownie base.',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600',
    badges: [{ label: '🥜 Contains Nuts', color: 'bg-amber-700' }],
    eggless: false,
  },

  // ── Cookies & Croissants ──
  {
    tab: 'Cookies & Croissants',
    name: 'Coconut Cookie',
    price: 'NPR 130/piece',
    desc: 'Signature daily cookie — crispy outside, chewy inside with real coconut.',
    img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600',
    badges: [],
    eggless: false,
  },
  {
    tab: 'Cookies & Croissants',
    name: 'Butter Croissant',
    price: 'NPR 200/piece',
    desc: 'Perfectly laminated, golden and flaky.',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600',
    badges: [],
    eggless: true,
  },
  {
    tab: 'Cookies & Croissants',
    name: 'Chocolate Croissant',
    price: 'NPR 250/piece',
    desc: 'Dark chocolate filled butter croissant.',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600',
    badges: [],
    eggless: false,
  },
  {
    tab: 'Cookies & Croissants',
    name: 'Almond Croissant',
    price: 'NPR 280/piece',
    desc: 'Twice-baked with almond cream filling.',
    img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=600',
    badges: [{ label: '🥜 Contains Nuts', color: 'bg-amber-700' }],
    eggless: false,
  },
  {
    tab: 'Cookies & Croissants',
    name: 'Walnut Cookie',
    price: 'NPR 150/piece',
    desc: 'Crunchy, buttery, loaded with walnuts.',
    img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600',
    badges: [{ label: '🥜 Contains Nuts', color: 'bg-amber-700' }],
    eggless: false,
  },

  // ── Custom Cakes ──
  {
    tab: 'Custom Cakes',
    name: 'Birthday Cake',
    price: 'from NPR 2,500',
    desc: 'Custom-designed birthday cake with your choice of flavor and theme.',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600',
    badges: [{ label: '🌿 Eggless Available', color: 'bg-green-600' }],
    eggless: true,
  },
  {
    tab: 'Custom Cakes',
    name: 'Wedding Cake',
    price: 'from NPR 8,000',
    desc: 'Elegant multi-tier wedding cake — fondant or buttercream.',
    img: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=600',
    badges: [],
    eggless: true,
  },
  {
    tab: 'Custom Cakes',
    name: 'Baby Shower Cake',
    price: 'from NPR 3,000',
    desc: 'Beautifully themed cake for your special announcement.',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600',
    badges: [{ label: '🌿 Eggless Available', color: 'bg-green-600' }],
    eggless: true,
  },
  {
    tab: 'Custom Cakes',
    name: 'Anniversary Cake',
    price: 'from NPR 3,500',
    desc: 'Celebrate love with a custom-designed premium cake.',
    img: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=600',
    badges: [],
    eggless: true,
  },
  {
    tab: 'Custom Cakes',
    name: 'Eggless Special Cake',
    price: 'from NPR 2,800',
    desc: 'Delicious eggless cake for all dietary preferences.',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600',
    badges: [{ label: '🌿 100% Eggless', color: 'bg-green-600' }],
    eggless: true,
  },

  // ── Drinks ──
  {
    tab: 'Drinks',
    name: 'Americano',
    price: 'NPR 180',
    desc: 'Bold and smooth espresso with hot water.',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600',
    badges: [],
    eggless: true,
  },
  {
    tab: 'Drinks',
    name: 'Cappuccino',
    price: 'NPR 220',
    desc: 'Espresso with steamed milk and thick foam.',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600',
    badges: [],
    eggless: true,
  },
  {
    tab: 'Drinks',
    name: 'Masala Tea',
    price: 'NPR 120',
    desc: 'Spiced Nepali chai — aromatic and comforting.',
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600',
    badges: [],
    eggless: true,
  },
  {
    tab: 'Drinks',
    name: 'Fresh Juice',
    price: 'NPR 200',
    desc: 'Seasonal fresh-squeezed juice.',
    img: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?q=80&w=600',
    badges: [{ label: '🌿 Eggless', color: 'bg-green-600' }],
    eggless: true,
  },
  {
    tab: 'Drinks',
    name: 'Hot Chocolate',
    price: 'NPR 200',
    desc: 'Rich, creamy chocolate — comfort in a cup.',
    img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=600',
    badges: [],
    eggless: true,
  },
]

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
  transition: { staggerChildren: 0.08 },
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('All')
  const [egglessOnly, setEgglessOnly] = useState(false)

  const filtered = menuItems.filter((item) => {
    const matchTab = activeTab === 'All' || item.tab === activeTab
    const matchEggless = !egglessOnly || item.eggless
    return matchTab && matchEggless
  })

  const activeTabData = tabs.find((t) => t.key === activeTab) || tabs[0]

  return (
    <div className="bg-[#FAF0E0] dark:bg-[#1C0F0A]">
      {/* Page Hero */}
      <section
        className="relative pt-28 pb-20 md:pb-28 flex items-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(44,21,6,0.80) 0%, rgba(44,21,6,0.60) 100%), url(https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1920)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-accent text-[#D4A020] text-xl mb-3"
          >
            Baked fresh in Kaldhara, every morning
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="font-headline text-4xl md:text-5xl lg:text-6xl text-[#FDF6EC] font-bold"
          >
            Our Menu {activeTab !== 'All' && <span className="text-[#D4A020]">{activeTabData?.icon}</span>}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-20 h-1 bg-[#D4A020] rounded-full mx-auto mt-6"
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Sold Out Warning Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#FDF6EC] dark:bg-[#1C0F0A] border-2 border-[#D4A020] rounded-2xl p-6 md:p-8 shadow-lg mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-bold text-[#2C1506] dark:text-[#FDF6EC] text-lg mb-1">
                ⚠️ Banana bread & cheesecakes sell out by noon daily!
              </p>
              <p className="text-[#2C1506]/70 dark:text-[#FDF6EC]/70 text-sm">
                Order by 8PM tonight for guaranteed next-morning pickup.
              </p>
            </div>
            <Link
              to="/pre-order"
              className="shrink-0 bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-6 py-3 rounded-full text-sm hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200"
            >
              Order Now →
            </Link>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div {...fadeUp} className="mb-8">
          <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === tab.key
                    ? 'bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] shadow-md'
                    : 'bg-white dark:bg-[#2C1506] text-[#2C1506]/60 dark:text-[#FDF6EC]/60 hover:bg-[#D4A020]/10 border border-[#D4A020]/20'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Dietary toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEgglessOnly(!egglessOnly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                egglessOnly ? 'bg-green-500' : 'bg-[#2C1506]/20 dark:bg-[#FDF6EC]/20'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow ${
                  egglessOnly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${egglessOnly ? 'text-green-600' : 'text-[#2C1506]/50 dark:text-[#FDF6EC]/50'}`}>
              🌿 Eggless Only
            </span>
          </div>
        </motion.div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + String(egglessOnly)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-lg text-[#2C1506]/60 dark:text-[#FDF6EC]/60">No items match your filters.</p>
              </div>
            ) : (
              <motion.div {...stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {filtered.map((item, i) => (
                  <motion.div
                    key={`${item.tab}-${item.name}`}
                    variants={{
                      initial: { opacity: 0, y: 30 },
                      whileInView: { opacity: 1, y: 0 },
                    }}
                    className="group bg-white dark:bg-[#2C1506] rounded-2xl overflow-hidden shadow-md hover:shadow-[0_12px_35px_rgba(212,160,32,0.3)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {item.badges.map((badge) => (
                          <span
                            key={badge.label}
                            className={`${badge.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md`}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>
                      {item.eggless && (
                        <span className="absolute top-3 right-3 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                          🌿 Eggless
                        </span>
                      )}
                      <div className="absolute bottom-2 left-3">
                        <span className="text-[10px] bg-white/90 dark:bg-[#2C1506]/90 text-[#2C1506] dark:text-[#FDF6EC] px-2 py-0.5 rounded-full font-medium backdrop-blur-sm">
                          {item.tab}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-headline text-lg text-[#2C1506] dark:text-[#FDF6EC] font-bold mb-1.5">
                        {item.name}
                      </h3>
                      <p className="font-body text-sm text-[#2C1506]/60 dark:text-[#FDF6EC]/60 italic leading-relaxed mb-3 flex-1">
                        {item.desc}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#D4A020]/10">
                        <span className="font-headline text-xl text-[#D4A020] font-bold">
                          {item.price}
                        </span>
                        <Link
                          to={`/pre-order?add=${encodeURIComponent(item.name)}`}
                          className="bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-semibold text-xs px-4 py-2 rounded-full hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200 flex items-center gap-1"
                        >
                          <span>Order Now</span>
                          <span className="hidden sm:inline">→</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Custom Cakes Tab — extra CTA */}
        {activeTab === 'Custom Cakes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-[#2C1506] rounded-2xl p-10 mb-16"
          >
            <h3 className="font-headline text-2xl md:text-3xl text-[#FDF6EC] mb-3">
              Ready to build your dream cake?
            </h3>
            <p className="text-[#FDF6EC]/70 mb-6 max-w-lg mx-auto">
              Choose flavor, size, design, and dietary preferences — all online.
            </p>
            <Link
              to="/custom-cake"
              className="inline-flex bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-8 py-3.5 rounded-full text-base hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200"
            >
              Build Your Custom Cake →
            </Link>
          </motion.div>
        )}

        {/* Sold Out Bottom Note */}
        <motion.div {...fadeUp} className="text-center bg-[#FDF6EC] dark:bg-[#1C0F0A] border border-[#D4A020]/20 rounded-2xl p-8 md:p-10 mb-16">
          <div className="text-4xl mb-3">⏰</div>
          <h3 className="font-headline text-xl md:text-2xl text-[#2C1506] dark:text-[#FDF6EC] mb-2">
            Most items available from 7AM until sold out
          </h3>
          <p className="text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-6">
            Order by 8PM for guaranteed next-morning pickup
          </p>
          <Link
            to="/pre-order"
            className="inline-flex bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-8 py-3.5 rounded-full text-base hover:brightness-110 hover:scale-105 active:scale-100 transition-all duration-200"
          >
            Order Now
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
