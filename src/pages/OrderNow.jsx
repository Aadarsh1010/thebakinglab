import { useState, useMemo, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import FloatingCart from '../components/FloatingCart'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
}

const tabs = ['All', 'Breads', 'Cakes & Brownies', 'Cookies & Croissants', 'Custom Cakes', 'Drinks']

const menuItems = {
  'Breads': [
    { icon: '🍞', name: 'Banana Bread Slice', price: 350, tag: '⚡ Sells out daily', highlight: true, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=200' },
    { icon: '🍞', name: 'Banana Bread Whole Loaf', price: 1800, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=200' },
    { icon: '🍞', name: 'Sourdough Loaf', price: 450, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=200' },
    { icon: '🍞', name: 'Multigrain Bread', price: 380, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=200' },
  ],
  'Cakes & Brownies': [
    { icon: '🍰', name: 'Caramelized Cashew Cheesecake', price: 600, tag: '❤️ Most loved', highlight: false, img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=200' },
    { icon: '🍰', name: 'Classic New York Cheesecake', price: 500, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=200' },
    { icon: '🍰', name: 'Blueberry Cheesecake', price: 550, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=200' },
    { icon: '🍫', name: 'Chocolate Fudge Brownie', price: 280, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=200' },
    { icon: '🍫', name: 'Nutella Swirl Brownie', price: 320, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=200' },
  ],
  'Cookies & Croissants': [
    { icon: '🥥', name: 'Coconut Cookie', price: 130, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=200' },
    { icon: '🥐', name: 'Butter Croissant', price: 200, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=200' },
    { icon: '🥐', name: 'Chocolate Croissant', price: 250, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=200' },
    { icon: '🥐', name: 'Almond Croissant', price: 280, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=200' },
    { icon: '🍪', name: 'Walnut Cookie', price: 150, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=200' },
  ],
  'Custom Cakes': [
    { icon: '🎂', name: 'Birthday Cake', price: 2500, tag: '🌿 Eggless available', highlight: false, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=200' },
    { icon: '🎂', name: 'Wedding Cake', price: 8000, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=200' },
    { icon: '🎂', name: 'Baby Shower Cake', price: 3000, tag: '🌿 Eggless available', highlight: false, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=200' },
    { icon: '🎂', name: 'Anniversary Cake', price: 3500, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=200' },
    { icon: '🎂', name: 'Eggless Special Cake', price: 2800, tag: '🌿 100% Eggless', highlight: false, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=200' },
  ],
  'Drinks': [
    { icon: '☕', name: 'Americano', price: 180, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=200' },
    { icon: '☕', name: 'Cappuccino', price: 220, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200' },
    { icon: '🫖', name: 'Masala Tea', price: 120, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=200' },
    { icon: '🧃', name: 'Fresh Juice', price: 200, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?q=80&w=200' },
    { icon: '🍫', name: 'Hot Chocolate', price: 200, tag: null, highlight: false, img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=200' },
  ],
}

const allItems = Object.values(menuItems).flat()

function formatPrice(n) {
  return 'NPR ' + n.toLocaleString('en-IN')
}

export default function OrderNow() {
  const { quantities, inc, dec, clearCart } = useCart()
  const [activeTab, setActiveTab] = useState('All')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [address, setAddress] = useState('')
  const delivery = true
  const deliveryFee = 200
  const freeDeliveryThreshold = 2000

  const addedRef = useRef(false)

  useEffect(() => {
    if (addedRef.current) return
    const params = new URLSearchParams(window.location.search)
    const addItem = params.get('add')
    if (addItem && allItems.some((i) => i.name === addItem)) {
      inc(addItem)
      addedRef.current = true
    }
  }, [])

  const subtotal = useMemo(() => {
    return allItems.reduce((sum, item) => sum + (quantities[item.name] || 0) * item.price, 0)
  }, [quantities])

  const qualifiesFreeDelivery = subtotal >= freeDeliveryThreshold
  const deliveryCharge = delivery && !qualifiesFreeDelivery ? deliveryFee : 0
  const total = subtotal
  const hasItems = total > 0

  const handleSubmit = () => {
    const lines = ['Hello The Baking Lab! 🧁 Order:', '━━━━━━━━━━━━━━━']
    allItems.forEach((item) => {
      const qty = quantities[item.name] || 0
      if (qty > 0) lines.push(`${item.icon} ${item.name} x${qty} — ${formatPrice(item.price * qty)}`)
    })
    lines.push(`Total: ${formatPrice(total)}`)
    lines.push(`📍 Address: ${address}`)
    lines.push('━━━━━━━━━━━━━━━')
    lines.push(`Name: ${name} | Phone: ${phone}`)
    if (notes) lines.push(`Notes: ${notes}`)
    window.open(`https://wa.me/9779845126192?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
  }

  return (
    <div className="bg-[#FAF0E0] dark:bg-[#1C0F0A] min-h-screen">
      <Helmet>
        <title>Order Online | The Baking Lab — Bakery Delivery in Thamel, Kathmandu</title>
        <meta name="description" content="Pre-order banana bread, cheesecakes, brownies & more from The Baking Lab in Thamel, Kathmandu. Free delivery on orders over NPR 2,000. Reserve by 8PM for next-day pickup." />
        <link rel="canonical" href="https://thebakinglab.com.np/order-now" />
        <meta property="og:title" content="Order Online | The Baking Lab — Bakery Delivery Thamel" />
        <meta property="og:description" content="Pre-order banana bread, cheesecakes & more from The Baking Lab in Thamel. Free delivery on orders over NPR 2,000." />
      </Helmet>
      {/* Hero */}
      <section
        className="relative pt-28 pb-20 md:pb-28 flex items-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(44,21,6,0.80) 0%, rgba(44,21,6,0.60) 100%), url(https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1920)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-accent text-[#D4A020] text-xl mb-3">
            For Tomorrow's Fresh Pickup
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="font-headline text-4xl md:text-5xl text-[#FDF6EC] font-bold">
            Reserve Your Favorites
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[#FDF6EC]/80 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
            Banana bread and cheesecakes sell out by noon every single day. Order by 8PM
            and pick up fresh tomorrow morning at Kaldhara Chowk, Thamel.
          </motion.p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Products */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div {...fadeUp}>
              <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeTab === tab
                        ? 'bg-[#D4A020] text-[#2C1506] shadow-md'
                        : 'bg-white/80 dark:bg-[#2C1506]/80 text-[#2C1506]/70 dark:text-[#FDF6EC]/70 border border-[#2C1506]/10 dark:border-[#FDF6EC]/10 hover:border-[#D4A020]/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(activeTab === 'All' ? allItems : menuItems[activeTab]).map((item) => (
                  <ProductCard key={item.name} item={item} qty={quantities[item.name] || 0} onInc={inc} onDec={dec} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Order Form (mobile visible below products, desktop sticky sidebar) */}
          <OrderForm
            quantities={quantities}
            allItems={allItems}
            inc={inc}
            dec={dec}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            notes={notes}
            setNotes={setNotes}
            subtotal={subtotal}
            qualifiesFreeDelivery={qualifiesFreeDelivery}
            freeDeliveryThreshold={freeDeliveryThreshold}
            total={total}
            hasItems={hasItems}
            handleSubmit={handleSubmit}
            formatPrice={formatPrice}
          />
        </div>

        {/* Why Order */}
        <motion.div {...fadeUp} className="mt-16 bg-[#2C1506] rounded-2xl p-8 md:p-10">
          <h3 className="font-headline text-2xl text-[#FDF6EC] text-center mb-8">Why Order?</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              ['✅', 'Guaranteed', 'No sold out disappointment'],
              ['✅', 'Freshest Items', 'Reserved for you'],
              ['✅', 'No Waiting', 'Skip the queue'],
              ['✅', 'Ready on Time', 'At your pickup slot'],
              ['✅', 'Confirmation', 'WhatsApp in 1 hour'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <h4 className="font-headline text-sm text-[#FDF6EC]">{title}</h4>
                <p className="text-xs text-[#FDF6EC]/60 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile Floating Cart */}
      <FloatingCart />
    </div>
  )
}

function OrderForm({
  quantities, allItems, inc, dec,
  name, setName, phone, setPhone,
  address, setAddress,
  notes, setNotes,
  subtotal, qualifiesFreeDelivery, freeDeliveryThreshold, total, hasItems,
  handleSubmit, formatPrice,
}) {
  const itemCount = Object.values(quantities).reduce((sum, q) => sum + q, 0)

  return (
    <div id="order-form-section" className="lg:col-span-2 scroll-mt-28">
      <motion.div {...fadeUp} className="bg-white dark:bg-[#2C1506] rounded-2xl p-6 shadow-xl lg:sticky lg:top-28 space-y-5">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#D4A020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="font-headline text-xl text-[#2C1506] dark:text-[#FDF6EC]">Your Order</h2>
          </div>
          {itemCount > 0 && (
            <span className="w-7 h-7 rounded-full bg-[#D4A020] text-[#2C1506] text-xs font-bold flex items-center justify-center shrink-0">
              {itemCount}
            </span>
          )}
        </div>

        <div className="divide-y divide-[#2C1506]/10 dark:divide-[#FDF6EC]/10 max-h-52 overflow-y-auto">
          {allItems.map((item) => {
            const qty = quantities[item.name] || 0
            if (qty === 0) return null
            return (
              <div key={item.name} className="flex items-center justify-between py-2.5 gap-2">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  {item.img && (
                    <img src={item.img} alt={item.name} className="w-9 h-9 rounded-lg object-cover shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#2C1506] dark:text-[#FDF6EC] whitespace-normal break-words leading-snug">{item.name}</p>
                    <p className="text-[11px] text-[#D4A020] font-medium">{formatPrice(item.price)} &times; {qty} = {formatPrice(item.price * qty)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => dec(item.name)}
                    className="w-6 h-6 rounded-full border border-[#2C1506]/20 dark:border-[#FDF6EC]/20 flex items-center justify-center text-[#2C1506] dark:text-[#FDF6EC] hover:border-[#D4A020] hover:bg-[#D4A020]/10 transition-all text-xs font-medium"
                  >
                    &minus;
                  </button>
                  <span className="w-4 text-center font-bold text-[#2C1506] dark:text-[#FDF6EC] text-xs">{qty}</span>
                  <button
                    onClick={() => inc(item.name)}
                    className="w-6 h-6 rounded-full border border-[#2C1506]/20 dark:border-[#FDF6EC]/20 flex items-center justify-center text-[#2C1506] dark:text-[#FDF6EC] hover:border-[#D4A020] hover:bg-[#D4A020]/10 transition-all text-xs font-medium"
                  >
                    +
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {allItems.some((item) => (quantities[item.name] || 0) > 0) && (
          <div className="border-t border-[#D4A020]/20 pt-3 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#2C1506]/70 dark:text-[#FDF6EC]/70">Total</span>
              <span className="text-lg font-bold text-[#D4A020]">{formatPrice(total)}</span>
            </div>
            {!qualifiesFreeDelivery && subtotal > 0 && (
              <p className="text-[11px] text-[#2C1506]/50 dark:text-[#FDF6EC]/50">
                {formatPrice(freeDeliveryThreshold - subtotal)} more for free delivery
              </p>
            )}
          </div>
        )}

        {allItems.every((item) => (quantities[item.name] || 0) === 0) && (
          <p className="text-sm text-[#2C1506]/40 dark:text-[#FDF6EC]/40 text-center py-4">Select items above to start your order</p>
        )}

        <div className="border-t border-[#2C1506]/10 dark:border-[#FDF6EC]/10 pt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-2">Full Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#D4A020] outline-none bg-[#FAF0E0]/50 dark:bg-[#3D1F0D]/50 text-sm" placeholder="Your name" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-2">Phone Number * (for WhatsApp)</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#D4A020] outline-none bg-[#FAF0E0]/50 dark:bg-[#3D1F0D]/50 text-sm" placeholder="+977 98XXXXXXXX" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-2">Delivery Address *</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#D4A020] outline-none bg-[#FAF0E0]/50 dark:bg-[#3D1F0D]/50 text-sm" placeholder="Delivery address in Kathmandu" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-2">Special instructions (optional)</label>
            <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#D4A020] outline-none bg-[#FAF0E0]/50 dark:bg-[#3D1F0D]/50 text-sm" placeholder="Anything else?" />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!hasItems || !name || !phone || !address}
            className={`w-full py-3.5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              hasItems && name && phone && address
                ? 'bg-[#25D366] text-white hover:brightness-110 hover:scale-[1.02] active:scale-100 shadow-lg'
                : 'bg-[#2C1506]/10 dark:bg-[#FDF6EC]/10 text-[#2C1506]/30 dark:text-[#FDF6EC]/30 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Place Order via WhatsApp
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function ProductCard({ item, qty, onInc, onDec }) {
  return (
    <div className={`rounded-xl border-2 transition-all overflow-hidden ${
      item.highlight ? 'border-[#D4A020]' : 'border-[#2C1506]/10 dark:border-[#FDF6EC]/10 bg-white dark:bg-[#2C1506] hover:border-[#D4A020]/30'
    }`}>
      <div className="flex items-stretch">
        <div className="w-20 sm:w-24 shrink-0 overflow-hidden">
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-headline text-sm text-[#2C1506] dark:text-[#FDF6EC] font-bold whitespace-normal break-words leading-tight">{item.icon} {item.name}</p>
              {item.tag && <p className="text-[10px] text-[#2C1506]/50 dark:text-[#FDF6EC]/50 whitespace-normal break-words leading-tight">{item.tag}</p>}
            </div>
            <span className="font-accent text-[#D4A020] font-bold text-sm shrink-0 whitespace-nowrap">
              {'NPR ' + item.price.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onDec(item.name) }}
                className="w-7 h-7 rounded-full border-2 border-[#2C1506]/20 dark:border-[#FDF6EC]/20 flex items-center justify-center text-[#2C1506] dark:text-[#FDF6EC] hover:border-[#D4A020] hover:bg-[#D4A020]/10 transition-all text-base font-medium"
              >
                −
              </button>
              <span className="w-5 text-center font-bold text-[#2C1506] dark:text-[#FDF6EC] text-sm">{qty}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onInc(item.name) }}
                className="w-7 h-7 rounded-full border-2 border-[#2C1506]/20 dark:border-[#FDF6EC]/20 flex items-center justify-center text-[#2C1506] dark:text-[#FDF6EC] hover:border-[#D4A020] hover:bg-[#D4A020]/10 transition-all text-base font-medium"
              >
                +
              </button>
            </div>
            {qty > 0 && (
              <span className="text-xs text-[#D4A020] font-bold">{'NPR ' + (item.price * qty).toLocaleString('en-IN')}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
