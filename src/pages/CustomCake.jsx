import { useState, useRef, useMemo, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'

const steps = ['Occasion', 'Details', 'Personalize', 'Delivery', 'Confirm']
const stepLabels = ['Occasion', 'Cake Details', 'Personalize', 'Delivery', 'Confirm']

const occasions = [
  { label: 'Birthday', sub: 'For someone special', svg: 'M4 15h16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM4 11h16v4H4zM12 2v6m-3-3l3-3 3 3' },
  { label: 'Wedding', sub: 'Make it unforgettable', svg: 'M8 12a4 4 0 118 0 4 4 0 01-8 0zM3 12a9 9 0 1118 0' },
  { label: 'Baby Shower', sub: 'Welcome the little one', svg: 'M10 4v4M14 4v4M9 8h6v10a3 3 0 01-3 3H9a3 3 0 01-3-3V8z' },
  { label: 'Anniversary', sub: 'Celebrate your love', svg: 'M12 21l-1.5-1.4C5.4 14.7 3 12.5 3 9.5 3 7 5 5 7.5 5c1.4 0 2.7.7 3.5 1.7A4.5 4.5 0 0114.5 5C17 5 19 7 19 9.5c0 3-2.4 5.2-7.5 10.1L12 21z' },
  { label: 'Graduation', sub: 'Honor the achievement', svg: 'M3 10l9-5 9 5-9 5-9-5zM5 12v4c0 2 3 4 7 4s7-2 7-4v-4' },
  { label: 'Custom / Other', sub: 'Any reason to celebrate', svg: 'M12 2l1.5 5.5L19 7l-4 4 1.5 5.5L12 13l-4.5 3.5L9 11l-4-4 5.5-.5z' },
]

const flavors = [
  { icon: '🍫', label: 'Chocolate Fudge', desc: 'Rich' },
  { icon: '🍦', label: 'Vanilla Bean', desc: 'Classic' },
  { icon: '❤️', label: 'Red Velvet', desc: 'Elegant' },
  { icon: '🌲', label: 'Black Forest', desc: 'Decadent' },
  { icon: '🧈', label: 'Butterscotch', desc: 'Creamy' },
  { icon: '🍊', label: 'Lemon', desc: 'Zesty' },
  { icon: '🍓', label: 'Strawberry', desc: 'Fresh' },
  { icon: '✏️', label: 'Custom', desc: 'Your way' },
]

const weights = [
  { kg: 0.5, price: 2500 },
  { kg: 1, price: 3200 },
  { kg: 1.5, price: 4000 },
  { kg: 2, price: 4800 },
  { kg: 3, price: 6000 },
  { kg: 4, price: 7500 },
]

const decorations = [
  { icon: '🎀', label: 'Classic Cream', desc: 'Timeless elegance' },
  { icon: '🌸', label: 'Floral Design', desc: 'Nature-inspired' },
  { icon: '⬜', label: 'Minimalist', desc: 'Clean & modern' },
  { icon: '🎨', label: 'Funky & Colorful', desc: 'Bold & vibrant' },
  { icon: '🎭', label: 'Themed', desc: 'Custom concept' },
  { icon: '✏️', label: 'Custom Design', desc: 'Your imagination' },
]

const timeSlots = [
  { icon: '🌅', label: 'Morning', value: '10AM – 12PM' },
  { icon: '☀️', label: 'Afternoon', value: '1PM – 4PM' },
  { icon: '🌆', label: 'Evening', value: '5PM – 7PM' },
]

const CONF_COLORS = ['#D4A020', '#2C1506', '#FDF6EC', '#7B4A1E', '#FAF0E0', '#3D1F0D']

function getMinDate() {
  const d = new Date()
  d.setDate(d.getDate() + 2)
  return d.toISOString().split('T')[0]
}

function formatPrice(n) {
  return 'NPR ' + n.toLocaleString('en-IN')
}

function CheckmarkAnimated() {
  return (
    <svg className="w-16 h-16 mx-auto" viewBox="0 0 52 52">
      <motion.circle
        cx="26" cy="26" r="24"
        fill="none"
        stroke="#D4A020"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.path
        d="M14 27l7 7 16-16"
        fill="none"
        stroke="#D4A020"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      />
    </svg>
  )
}

function Confetti() {
  const particles = Array.from({ length: 30 })
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: CONF_COLORS[i % CONF_COLORS.length], left: `${Math.random() * 100}%`, top: -10 }}
          animate={{
            y: [0, window.innerHeight + 10],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, 720],
            opacity: [1, 0],
          }}
          transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export default function CustomCake() {
  const [step, setStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    occasion: '',
    flavor: '',
    eggType: 'regular',
    weight: 1,
    customWeight: '',
    message: '',
    decoration: '',
    themeDesc: '',
    refImage: null,
    refImagePreview: null,
    date: '',
    time: '',
    deliveryType: 'pickup',
    address: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  })

  const update = useCallback((field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
  }, [])

  const cakePrice = useMemo(() => {
    const w = form.weight === 'custom' ? parseFloat(form.customWeight) || 0 : form.weight
    const found = weights.find((x) => x.kg === w)
    if (found) return found.price
    if (w > 0) {
      const rates = weights.map((x) => x.price / x.kg)
      const avgRate = rates.reduce((a, b) => a + b, 0) / rates.length
      return Math.round(avgRate * w)
    }
    return 0
  }, [form.weight, form.customWeight])

  const deliveryFee = form.deliveryType === 'delivery' ? 200 : 0
  const total = cakePrice + deliveryFee

  const isStepValid = useCallback(() => {
    switch (step) {
      case 1: return !!form.occasion
      case 2: return !!form.flavor && (form.weight === 'custom' ? !!form.customWeight : !!form.weight)
      case 3: return true
      case 4: return !!form.date && !!form.time && (form.deliveryType !== 'delivery' || !!form.address)
      case 5: return !!form.name && !!form.phone
      default: return false
    }
  }, [step, form])

  const canNext = isStepValid()
  const isLastStep = step === 5

  const buildWhatsAppMessage = () => {
    const lines = [
      'Hello The Baking Lab! 🎂',
      '━━━━━━━━━━━━━━━',
      '🎉 CAKE ORDER REQUEST',
      '━━━━━━━━━━━━━━━',
      `Occasion: ${form.occasion}`,
      `Flavor: ${form.flavor}`,
      `Weight: ${form.weight === 'custom' ? form.customWeight : form.weight} kg`,
      `Egg/Eggless: ${form.eggType === 'eggless' ? '🌿 Eggless' : '🥚 With Egg'}`,
      `Message on Cake: "${form.message || 'None'}"`,
      `Decoration: ${form.decoration}${form.themeDesc ? ' — ' + form.themeDesc : ''}`,
      '━━━━━━━━━━━━━━━',
      `📅 Delivery Date: ${form.date}`,
      `⏰ Time: ${form.time}`,
      `📦 Method: ${form.deliveryType === 'pickup' ? 'Pickup (Kaldhara Chowk)' : 'Home Delivery'}`,
      ...(form.deliveryType === 'delivery' ? [`Address: ${form.address}`] : []),
      '━━━━━━━━━━━━━━━',
      `👤 Name: ${form.name}`,
      `📱 WhatsApp: ${form.phone}`,
      ...(form.email ? [`📧 Email: ${form.email}`] : []),
      ...(form.notes ? [`📝 Notes: ${form.notes}`] : []),
      '━━━━━━━━━━━━━━━',
      `💰 Total: ${formatPrice(total)}`,
    ]
    if (form.refImage) {
      lines.push('━━━━━━━━━━━━━━━')
      lines.push('⚠️ I will send the reference image manually in this chat.')
    }
    return lines.join('\n')
  }

  const handleSubmit = () => {
    window.open(`https://wa.me/9779845126192?text=${encodeURIComponent(buildWhatsAppMessage())}`, '_blank')
    setShowSuccess(true)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG and PNG images are allowed')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB')
      return
    }
    update('refImage', file)
    const reader = new FileReader()
    reader.onload = (ev) => update('refImagePreview', ev.target.result)
    reader.readAsDataURL(file)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#2C1506] flex items-center justify-center relative overflow-hidden">
        <Helmet>
          <title>Order Confirmed | Custom Cakes — The Baking Lab, Kathmandu</title>
          <meta name="description" content="Your custom cake order has been received! The Baking Lab will confirm via WhatsApp within 1 hour. Eggless & themed cakes in Kathmandu." />
          <meta name="robots" content="noindex" />
        </Helmet>
        <Confetti />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-4 max-w-lg mx-auto"
        >
          <CheckmarkAnimated />
          <h1 className="font-headline text-3xl md:text-4xl text-[#FDF6EC] mt-6 mb-3">
            Your Cake Order is On Its Way! 🎂
          </h1>
          <p className="text-[#FDF6EC]/80 text-lg mb-2">
            We'll confirm via WhatsApp within 2 hours
          </p>
          <p className="text-[#FDF6EC]/50 text-sm mb-10">
            You'll receive a message at {form.phone} shortly.
          </p>
          {form.refImage && (
            <div className="bg-yellow-900/30 border border-yellow-600/40 rounded-xl px-5 py-3.5 mb-8 mx-4">
              <p className="text-yellow-200 text-sm font-medium flex items-center gap-2">
                <span>⚠️</span>
                <span>Please also send your reference image manually in the WhatsApp chat.</span>
              </p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-8 py-3.5 rounded-full hover:brightness-110 transition-all"
            >
              Back to Home
            </Link>
            <button
              onClick={() => {
                setShowSuccess(false)
                setStep(1)
                setForm({
                  occasion: '', flavor: '', eggType: 'regular', weight: 1, customWeight: '',
                  message: '', decoration: '', themeDesc: '', refImage: null, refImagePreview: null,
                  date: '', time: '', deliveryType: 'pickup', address: '', name: '', phone: '', email: '', notes: '',
                })
              }}
              className="border-2 border-[#D4A020] text-[#D4A020] font-semibold px-8 py-3.5 rounded-full hover:bg-[#D4A020] hover:text-[#2C1506] dark:hover:text-[#FDF6EC] transition-all"
            >
              Order Another Cake
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF0E0] dark:bg-[#1C0F0A]">
      <Helmet>
        <title>Custom Cakes Kathmandu | The Baking Lab — Order Online</title>
        <meta name="description" content="Order custom celebration cakes in Kathmandu from The Baking Lab. Eggless, themed, and personalized cakes for birthdays, weddings & events. Premium ingredients. Order online for pickup or delivery in Thamel." />
        <link rel="canonical" href="https://thebakinglab.com.np/custom-cake" />
        <meta property="og:title" content="Custom Cakes Kathmandu | The Baking Lab" />
        <meta property="og:description" content="Order custom celebration cakes in Kathmandu. Eggless, themed & personalized. Premium ingredients. Pickup or delivery in Thamel." />
      </Helmet>
      {/* Header */}
      <section className="pt-24 pb-8 md:pb-12 bg-[#2C1506]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <img src="/logo.png" alt="The Baking Lab" className="w-14 h-14 rounded-full mx-auto mb-4 ring-2 ring-[#D4A020]" />
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#FDF6EC] font-bold">
              Build Your Dream Cake
            </h1>
            <p className="font-accent text-[#D4A020] text-xl mt-2 mb-3">
              Step by step, just the way you want it
            </p>
            <p className="text-[#FDF6EC]/70 max-w-lg mx-auto text-sm">
              No more Facebook DM back-and-forth. Configure your perfect cake in 2 minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-[#2C1506] shadow-sm sticky top-0 z-30 overflow-x-auto border-b border-[#2C1506]/5 dark:border-[#FDF6EC]/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center min-w-[500px] md:min-w-0">
            {steps.map((s, i) => {
              const idx = i + 1
              const active = idx === step
              const completed = idx < step
              return (
                <div key={s} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        completed
                          ? 'bg-[#c9a84c] text-white'
                          : active
                            ? 'bg-[#c9a84c] text-white ring-2 ring-[#c9a84c]/30 ring-offset-2 ring-offset-white dark:ring-offset-[#2C1506]'
                            : 'bg-[#2C1506]/6 dark:bg-[#FDF6EC]/10 text-[#2C1506]/30 dark:text-[#FDF6EC]/30'
                      }`}
                    >
                      {completed ? '✓' : idx}
                    </div>
                    <span className={`hidden md:block text-[10px] mt-1.5 font-medium whitespace-nowrap tracking-wide ${active || completed ? 'text-[#c9a84c]' : 'text-[#2C1506]/40 dark:text-[#FDF6EC]/40'}`}>
                      {stepLabels[i]}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 md:mx-3 transition-all duration-300 ${
                        completed ? 'bg-[#c9a84c]' : 'bg-[#2C1506]/6 dark:bg-[#FDF6EC]/10'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Form */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-[#2C1506] rounded-[16px] p-6 sm:p-8 shadow-lg border border-[#2C1506]/5 dark:border-[#FDF6EC]/5"
              >
                {/* Step 1 — Occasion */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-headline text-2xl md:text-3xl text-[#2C1506] dark:text-[#FDF6EC]">What's the celebration?</h2>
                        <p className="text-[#2C1506]/50 dark:text-[#FDF6EC]/50 text-sm mt-1">Choose the occasion for your custom cake</p>
                      </div>
                      <span className="hidden sm:inline text-xs font-semibold text-[#c9a84c] bg-[#c9a84c]/10 px-3.5 py-1.5 rounded-full whitespace-nowrap">Step 1 of 5</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {occasions.map((o) => {
                        const selected = form.occasion === o.label
                        return (
                          <button
                            key={o.label}
                            onClick={() => update('occasion', o.label)}
                            className={`relative flex flex-col items-center justify-center p-6 md:p-8 rounded-[16px] border-2 transition-all duration-200 ${
                              selected
                                ? 'border-[#c9a84c] bg-[#c9a84c]/5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.1),0_4px_16px_rgba(201,168,76,0.12)]'
                                : 'border-[#2C1506]/8 dark:border-[#FDF6EC]/10 hover:border-[#c9a84c]/40 hover:shadow-md hover:-translate-y-0.5 bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30'
                            }`}
                          >
                            {selected && (
                              <span className="absolute top-3 right-3 w-5 h-5 bg-[#c9a84c] rounded-full flex items-center justify-center ring-2 ring-white dark:ring-[#2C1506]">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                            )}
                            <svg className="w-8 h-8 md:w-10 md:h-10 text-[#c9a84c] mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              {o.svg.split('M').filter(Boolean).map((p, i) => <path key={i} d={'M' + p} />)}
                            </svg>
                            <span className="text-sm md:text-base font-bold text-[#2C1506] dark:text-[#FDF6EC]">{o.label}</span>
                            <span className="text-[11px] text-[#2C1506]/45 dark:text-[#FDF6EC]/45 mt-0.5">{o.sub}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2 — Cake Details */}
                {step === 2 && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-headline text-2xl md:text-3xl text-[#2C1506] dark:text-[#FDF6EC]">Choose Your Flavor</h2>
                        <p className="text-[#2C1506]/50 dark:text-[#FDF6EC]/50 text-sm mt-1">Pick the perfect taste for your cake</p>
                      </div>
                      <span className="hidden sm:inline text-xs font-semibold text-[#c9a84c] bg-[#c9a84c]/10 px-3.5 py-1.5 rounded-full whitespace-nowrap">Step 2 of 5</span>
                    </div>
                    <div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {flavors.map((f) => {
                          const selected = form.flavor === f.label
                          return (
                            <button
                              key={f.label}
                              onClick={() => update('flavor', f.label)}
                              className={`relative flex flex-col items-center gap-1.5 px-4 py-4 rounded-[16px] border-2 transition-all duration-200 ${
                                selected
                                  ? 'border-[#c9a84c] bg-[#c9a84c]/5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.1),0_4px_12px_rgba(201,168,76,0.1)]'
                                  : 'border-[#2C1506]/8 dark:border-[#FDF6EC]/10 hover:border-[#c9a84c]/40 hover:shadow-md hover:-translate-y-0.5 bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30'
                              }`}
                            >
                              {selected && (
                                <span className="absolute top-2 right-2 w-4 h-4 bg-[#c9a84c] rounded-full flex items-center justify-center">
                                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                              )}
                              <span className="text-2xl md:text-3xl">{f.icon}</span>
                              <span className="text-xs md:text-sm font-bold text-[#2C1506] dark:text-[#FDF6EC] text-center leading-tight">{f.label}</span>
                              <span className="text-[10px] text-[#c9a84c] font-medium uppercase tracking-wider">{f.desc}</span>
                            </button>
                          )
                        })}
                      </div>
                      {form.flavor === 'Custom' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="overflow-hidden mt-3"
                        >
                          <input
                            type="text"
                            value={form.customFlavor || ''}
                            onChange={(e) => update('customFlavor', e.target.value)}
                            className="w-full px-4 py-3 rounded-[16px] border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#c9a84c] outline-none bg-[#FAF0E0]/50 dark:bg-[#3D1F0D]/50 transition-all duration-200"
                            placeholder="Describe your custom flavor..."
                          />
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-headline text-xl text-[#2C1506] dark:text-[#FDF6EC] mb-3">Egg Preference</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'regular', icon: '🥚', label: 'With Egg', sub: 'Traditional recipe' },
                          { value: 'eggless', icon: '🌿', label: 'Eggless', sub: 'Dietary & religious preference' },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => update('eggType', opt.value)}
                            className={`flex items-center gap-4 px-5 py-5 rounded-[16px] border-2 transition-all duration-200 ${
                              form.eggType === opt.value
                                ? 'border-[#c9a84c] bg-[#c9a84c]/5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.1),0_4px_12px_rgba(201,168,76,0.1)]'
                                : 'border-[#2C1506]/8 dark:border-[#FDF6EC]/10 hover:border-[#c9a84c]/40 hover:shadow-md bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30'
                            }`}
                          >
                            <span className="text-2xl md:text-3xl">{opt.icon}</span>
                            <div className="text-left">
                              <div className="text-sm md:text-base font-bold text-[#2C1506] dark:text-[#FDF6EC]">{opt.label}</div>
                              <div className="text-xs text-[#2C1506]/50 dark:text-[#FDF6EC]/50 mt-0.5">{opt.sub}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-headline text-xl text-[#2C1506] dark:text-[#FDF6EC]">Weight & Price</h3>
                        <span className="font-headline text-2xl text-[#c9a84c] font-bold">
                          {formatPrice(cakePrice)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {weights.map((w) => {
                          const selected = form.weight === w.kg
                          return (
                            <button
                              key={w.kg}
                              onClick={() => update('weight', w.kg)}
                              className={`relative px-4 py-4 rounded-[16px] border-2 text-center transition-all duration-200 ${
                                selected
                                  ? 'border-[#c9a84c] bg-[#c9a84c]/5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.1),0_4px_12px_rgba(201,168,76,0.1)]'
                                  : 'border-[#2C1506]/8 dark:border-[#FDF6EC]/10 hover:border-[#c9a84c]/40 hover:shadow-md hover:-translate-y-0.5 bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30'
                              }`}
                            >
                              {selected && (
                                <span className="absolute top-2 right-2 w-4 h-4 bg-[#c9a84c] rounded-full flex items-center justify-center">
                                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                              )}
                              <div className="text-base md:text-lg font-bold text-[#2C1506] dark:text-[#FDF6EC]">{w.kg} kg</div>
                              <div className="text-sm text-[#c9a84c] font-semibold mt-1">{formatPrice(w.price)}</div>
                            </button>
                          )
                        })}
                        <button
                          onClick={() => update('weight', 'custom')}
                          className={`relative px-4 py-4 rounded-[16px] border-2 text-center transition-all duration-200 ${
                            form.weight === 'custom'
                              ? 'border-[#c9a84c] bg-[#c9a84c]/5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.1),0_4px_12px_rgba(201,168,76,0.1)]'
                              : 'border-[#2C1506]/8 dark:border-[#FDF6EC]/10 hover:border-[#c9a84c]/40 hover:shadow-md hover:-translate-y-0.5 bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30'
                          }`}
                        >
                          {form.weight === 'custom' && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-[#c9a84c] rounded-full flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          )}
                          <div className="text-base md:text-lg font-bold text-[#2C1506] dark:text-[#FDF6EC]">Custom</div>
                          <div className="text-xs text-[#2C1506]/50 dark:text-[#FDF6EC]/50 mt-1">Enter weight</div>
                        </button>
                      </div>
                      {form.weight === 'custom' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="overflow-hidden mt-3"
                        >
                          <input
                            type="number"
                            value={form.customWeight}
                            onChange={(e) => update('customWeight', e.target.value)}
                            className="w-full px-4 py-3 rounded-[16px] border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#c9a84c] outline-none bg-[#FAF0E0]/50 dark:bg-[#3D1F0D]/50 transition-all duration-200"
                            placeholder="Enter weight in kg (e.g. 2.5)"
                            step="0.1"
                            min="0.5"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3 — Personalize */}
                {step === 3 && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-headline text-2xl md:text-3xl text-[#2C1506] dark:text-[#FDF6EC]">Personalize Your Cake</h2>
                        <p className="text-[#2C1506]/50 dark:text-[#FDF6EC]/50 text-sm mt-1">Make it truly yours</p>
                      </div>
                      <span className="hidden sm:inline text-xs font-semibold text-[#c9a84c] bg-[#c9a84c]/10 px-3.5 py-1.5 rounded-full whitespace-nowrap">Step 3 of 5</span>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2C1506]/80 dark:text-[#FDF6EC]/80 mb-2">Message on Cake</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={form.message}
                          onChange={(e) => {
                            if (e.target.value.length <= 50) update('message', e.target.value)
                          }}
                          className="w-full px-4 pt-4 pb-3 rounded-[16px] border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#c9a84c] outline-none bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30 transition-all duration-200"
                          placeholder="Happy Birthday Aadarsh! 🎉"
                        />
                        <span className="absolute bottom-3 right-3 text-xs font-medium text-[#c9a84c] bg-[#c9a84c]/10 px-2 py-0.5 rounded-full">{form.message.length}/50</span>
                      </div>
                      {form.message && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 bg-[#FAF7F2] dark:bg-[#1C0F0A] rounded-[16px] p-4 text-center border border-dashed border-[#c9a84c]/30"
                        >
                          <p className="text-[10px] text-[#2C1506]/40 dark:text-[#FDF6EC]/40 mb-1 uppercase tracking-wider font-medium">Preview</p>
                          <p className="font-accent text-xl text-[#2C1506] dark:text-[#FDF6EC]">{form.message}</p>
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-headline text-lg text-[#2C1506] dark:text-[#FDF6EC] mb-3">Decoration Style</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {decorations.map((d) => {
                          const selected = form.decoration === d.label
                          return (
                            <button
                              key={d.label}
                              onClick={() => update('decoration', d.label)}
                              className={`relative flex items-center gap-3 px-4 py-4 rounded-[16px] border-2 transition-all duration-200 ${
                                selected
                                  ? 'border-[#c9a84c] bg-[#c9a84c]/5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.1),0_4px_12px_rgba(201,168,76,0.1)]'
                                  : 'border-[#2C1506]/8 dark:border-[#FDF6EC]/10 hover:border-[#c9a84c]/40 hover:shadow-md bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30'
                              }`}
                            >
                              {selected && (
                                <span className="absolute top-2 right-2 w-4 h-4 bg-[#c9a84c] rounded-full flex items-center justify-center">
                                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                              )}
                              <span className="text-xl md:text-2xl">{d.icon}</span>
                              <div className="text-left">
                                <span className="text-sm font-bold text-[#2C1506] dark:text-[#FDF6EC] block">{d.label}</span>
                                <span className="text-[11px] text-[#2C1506]/45 dark:text-[#FDF6EC]/45">{d.desc}</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                      <AnimatePresence>
                        {form.decoration === 'Themed' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-3"
                          >
                            <input
                              type="text"
                              value={form.themeDesc}
                              onChange={(e) => update('themeDesc', e.target.value)}
                              className="w-full px-4 py-3 rounded-[16px] border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#c9a84c] outline-none bg-[#FAF0E0]/50 dark:bg-[#3D1F0D]/50 transition-all duration-200"
                              placeholder="Describe your theme (e.g. Superhero, Princess, etc.)"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <h3 className="font-headline text-lg text-[#2C1506] dark:text-[#FDF6EC] mb-3">Reference Image <span className="text-[#2C1506]/40 dark:text-[#FDF6EC]/40 font-normal text-sm">(optional)</span></h3>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`rounded-[16px] border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 ${
                          form.refImagePreview
                            ? 'border-[#c9a84c]/40 bg-[#c9a84c]/5'
                            : 'border-[#2C1506]/20 dark:border-[#FDF6EC]/20 hover:border-[#c9a84c]/50 bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30 hover:shadow-md'
                        }`}
                      >
                        {form.refImagePreview ? (
                          <div className="relative inline-block">
                            <img src={form.refImagePreview} alt="Reference image for custom cake order at The Baking Lab, Kathmandu" className="h-32 rounded-[12px] object-cover shadow-md" />
                            <button
                              onClick={(e) => { e.stopPropagation(); update('refImage', null); update('refImagePreview', null) }}
                              className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div>
                            <svg className="w-10 h-10 text-[#c9a84c] mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <path d="M21 15l-5-5L5 21" />
                            </svg>
                            <p className="text-sm font-medium text-[#2C1506] dark:text-[#FDF6EC]">Upload an inspiration image</p>
                            <p className="text-xs text-[#2C1506]/45 dark:text-[#FDF6EC]/45 mt-1">JPG/PNG, max 5MB</p>
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4 — Delivery */}
                {step === 4 && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-headline text-2xl md:text-3xl text-[#2C1506] dark:text-[#FDF6EC]">Delivery Details</h2>
                        <p className="text-[#2C1506]/50 dark:text-[#FDF6EC]/50 text-sm mt-1">When and where should we deliver?</p>
                      </div>
                      <span className="hidden sm:inline text-xs font-semibold text-[#c9a84c] bg-[#c9a84c]/10 px-3.5 py-1.5 rounded-full whitespace-nowrap">Step 4 of 5</span>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2C1506]/80 dark:text-[#FDF6EC]/80 mb-2">Pickup Date</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => update('date', e.target.value)}
                        min={getMinDate()}
                        className="w-full px-4 py-3 rounded-[16px] border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#c9a84c] outline-none bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30 transition-all duration-200"
                      />
                      <p className="text-xs text-[#2C1506]/50 dark:text-[#FDF6EC]/50 mt-1.5">We need at least 2 days to craft your cake</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2C1506]/80 dark:text-[#FDF6EC]/80 mb-2">Delivery Time</label>
                      <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((t) => {
                          const selected = form.time === t.value
                          return (
                            <button
                              key={t.value}
                              onClick={() => update('time', t.value)}
                              className={`px-4 py-4 rounded-[16px] border-2 text-center transition-all duration-200 ${
                                selected
                                  ? 'border-[#c9a84c] bg-[#c9a84c]/5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.1),0_4px_12px_rgba(201,168,76,0.1)]'
                                  : 'border-[#2C1506]/8 dark:border-[#FDF6EC]/10 hover:border-[#c9a84c]/40 hover:shadow-md hover:-translate-y-0.5 bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30'
                              }`}
                            >
                              <div className="text-xl mb-1">{t.icon}</div>
                              <div className="text-xs font-bold text-[#2C1506] dark:text-[#FDF6EC]">{t.label}</div>
                              <div className="text-[10px] text-[#2C1506]/50 dark:text-[#FDF6EC]/50 mt-0.5">{t.value}</div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-headline text-lg text-[#2C1506] dark:text-[#FDF6EC] mb-3">Delivery Type</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => update('deliveryType', 'pickup')}
                          className={`flex items-center gap-4 px-5 py-5 rounded-[16px] border-2 transition-all duration-200 ${
                            form.deliveryType === 'pickup'
                              ? 'border-[#c9a84c] bg-[#c9a84c]/5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.1),0_4px_12px_rgba(201,168,76,0.1)]'
                              : 'border-[#2C1506]/8 dark:border-[#FDF6EC]/10 hover:border-[#c9a84c]/40 hover:shadow-md bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30'
                          }`}
                        >
                          <span className="text-2xl md:text-3xl">🏪</span>
                          <div className="text-left">
                            <div className="text-sm md:text-base font-bold text-[#2C1506] dark:text-[#FDF6EC]">FREE Pickup</div>
                            <div className="text-xs text-[#2C1506]/50 dark:text-[#FDF6EC]/50 mt-0.5">Kaldhara Chowk, Thamel</div>
                          </div>
                        </button>
                        <button
                          onClick={() => update('deliveryType', 'delivery')}
                          className={`flex items-center gap-4 px-5 py-5 rounded-[16px] border-2 transition-all duration-200 ${
                            form.deliveryType === 'delivery'
                              ? 'border-[#c9a84c] bg-[#c9a84c]/5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.1),0_4px_12px_rgba(201,168,76,0.1)]'
                              : 'border-[#2C1506]/8 dark:border-[#FDF6EC]/10 hover:border-[#c9a84c]/40 hover:shadow-md bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30'
                          }`}
                        >
                          <span className="text-2xl md:text-3xl">🚚</span>
                          <div className="text-left">
                            <div className="text-sm md:text-base font-bold text-[#2C1506] dark:text-[#FDF6EC]">Home Delivery</div>
                            <div className="text-xs text-[#2C1506]/50 dark:text-[#FDF6EC]/50 mt-0.5">+{formatPrice(200)} &middot; Kathmandu only</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {form.deliveryType === 'delivery' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <label className="block text-sm font-semibold text-[#2C1506]/80 dark:text-[#FDF6EC]/80 mb-2">Delivery Address *</label>
                          <textarea
                            value={form.address}
                            onChange={(e) => update('address', e.target.value)}
                            className="w-full px-4 py-3 rounded-[16px] border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#c9a84c] outline-none bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30 h-20 resize-none transition-all duration-200"
                            placeholder="Full address in Kathmandu valley"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Step 5 — Confirm */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-headline text-2xl md:text-3xl text-[#2C1506] dark:text-[#FDF6EC]">Your Details</h2>
                        <p className="text-[#2C1506]/50 dark:text-[#FDF6EC]/50 text-sm mt-1">Almost done — confirm your order</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#2C1506]/80 dark:text-[#FDF6EC]/80 mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          className="w-full px-4 py-3 rounded-[16px] border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#c9a84c] outline-none bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30 transition-all duration-200"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#2C1506]/80 dark:text-[#FDF6EC]/80 mb-2">WhatsApp Number *</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          className="w-full px-4 py-3 rounded-[16px] border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#c9a84c] outline-none bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30 transition-all duration-200"
                          placeholder="+977 98XXXXXXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2C1506]/80 dark:text-[#FDF6EC]/80 mb-2">Email <span className="text-[#2C1506]/40 dark:text-[#FDF6EC]/40 font-normal">(optional)</span></label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-[16px] border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#c9a84c] outline-none bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30 transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2C1506]/80 dark:text-[#FDF6EC]/80 mb-2">Special Instructions</label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => update('notes', e.target.value)}
                        className="w-full px-4 py-3 rounded-[16px] border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#c9a84c] outline-none bg-[#FAF7F2]/50 dark:bg-[#3D1F0D]/30 h-24 resize-none transition-all duration-200"
                        placeholder="Any allergies or special requests?"
                      />
                    </div>

                    {/* Order Summary (mobile) */}
                    <div className="block lg:hidden bg-[#FAF7F2] dark:bg-[#1C0F0A] rounded-[16px] p-5 space-y-3 border-t-4 border-[#c9a84c]">
                      <h3 className="font-headline text-lg text-[#2C1506] dark:text-[#FDF6EC]">Order Summary</h3>
                      <SummaryRow label="Occasion" value={form.occasion} />
                      <div className="border-t border-[#2C1506]/8 dark:border-[#FDF6EC]/8" />
                      <SummaryRow label="Flavor" value={form.flavor} />
                      <div className="border-t border-[#2C1506]/8 dark:border-[#FDF6EC]/8" />
                      <SummaryRow label="Weight" value={`${form.weight === 'custom' ? form.customWeight : form.weight} kg`} />
                      <div className="border-t border-[#2C1506]/8 dark:border-[#FDF6EC]/8" />
                      <SummaryRow label="Egg" value={form.eggType === 'eggless' ? '🌿 Eggless' : '🥚 With Egg'} />
                      {form.message && <div className="border-t border-[#2C1506]/8 dark:border-[#FDF6EC]/8" />}
                      {form.message && <SummaryRow label="Message" value={`"${form.message}"`} />}
                      <div className="border-t border-[#2C1506]/8 dark:border-[#FDF6EC]/8" />
                      <SummaryRow label="Decoration" value={form.decoration} />
                      <div className="border-t border-[#2C1506]/8 dark:border-[#FDF6EC]/8" />
                      <SummaryRow label="Date" value={form.date} />
                      <div className="border-t border-[#2C1506]/8 dark:border-[#FDF6EC]/8" />
                      <SummaryRow label="Time" value={form.time} />
                      <div className="border-t border-[#2C1506]/8 dark:border-[#FDF6EC]/8" />
                      <SummaryRow label="Method" value={form.deliveryType === 'pickup' ? '🏪 Pickup' : '🚚 Delivery'} />
                      <div className="border-t-2 border-[#c9a84c]/30 pt-3 mt-4 space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#2C1506]/50 dark:text-[#FDF6EC]/50">Cake</span>
                          <span className="font-medium text-[#2C1506] dark:text-[#FDF6EC]">{formatPrice(cakePrice)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#2C1506]/50 dark:text-[#FDF6EC]/50">Delivery</span>
                          <span className="font-medium text-[#2C1506] dark:text-[#FDF6EC]">{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                        </div>
                        <div className="flex justify-between font-headline text-xl text-[#c9a84c] font-bold pt-2 border-t border-[#2C1506]/10 dark:border-[#FDF6EC]/10">
                          <span>TOTAL</span>
                          <span>{formatPrice(total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between mt-8 pt-6 border-t border-[#2C1506]/10 dark:border-[#FDF6EC]/10 gap-3 sm:gap-0">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="order-2 sm:order-1 px-6 py-3.5 rounded-full border-2 border-[#2C1506]/20 dark:border-[#FDF6EC]/20 text-[#2C1506]/70 dark:text-[#FDF6EC]/70 hover:border-[#2C1506]/40 hover:text-[#2C1506] dark:hover:text-[#FDF6EC] transition-all duration-200 font-medium text-sm flex items-center justify-center gap-1.5"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                  ) : (
                    <div />
                  )}
                  {!isLastStep ? (
                    <button
                      onClick={() => setStep(step + 1)}
                      disabled={!canNext}
                      className={`order-1 sm:order-2 w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        canNext
                          ? 'bg-[#c9a84c] text-white hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                          : 'bg-[#2C1506]/10 dark:bg-[#FDF6EC]/10 text-[#2C1506]/30 dark:text-[#FDF6EC]/30 cursor-not-allowed'
                      }`}
                    >
                      Next Step
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!canNext}
                      className={`w-full px-8 py-3.5 rounded-[16px] font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                        canNext
                          ? 'bg-[#25D366] text-white hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                          : 'bg-[#2C1506]/10 dark:bg-[#FDF6EC]/10 text-[#2C1506]/30 dark:text-[#FDF6EC]/30 cursor-not-allowed'
                      }`}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Place Order via WhatsApp — {formatPrice(total)}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sticky Sidebar (desktop) */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white dark:bg-[#2C1506] rounded-[16px] shadow-lg border border-[#2C1506]/5 dark:border-[#FDF6EC]/5 overflow-hidden">
                <div className="h-1 bg-[#c9a84c]" />
                <div className="p-6">
                  <h3 className="font-headline text-lg text-[#2C1506] dark:text-[#FDF6EC] mb-4">Your Order</h3>
                  <div className="space-y-3">
                    <SidebarRow label="Occasion" value={form.occasion || '—'} />
                    <div className="border-t border-[#2C1506]/6 dark:border-[#FDF6EC]/6" />
                    <SidebarRow label="Flavor" value={form.flavor || '—'} />
                    <div className="border-t border-[#2C1506]/6 dark:border-[#FDF6EC]/6" />
                    <SidebarRow label="Weight" value={form.weight ? `${form.weight === 'custom' ? form.customWeight : form.weight} kg` : '—'} />
                    <div className="border-t border-[#2C1506]/6 dark:border-[#FDF6EC]/6" />
                    <SidebarRow label="Egg" value={form.eggType === 'eggless' ? '🌿 Eggless' : '🥚 With Egg'} />
                    <div className="border-t border-[#2C1506]/6 dark:border-[#FDF6EC]/6" />
                    <SidebarRow label="Message" value={form.message || '—'} />
                    <div className="border-t border-[#2C1506]/6 dark:border-[#FDF6EC]/6" />
                    <SidebarRow label="Decoration" value={form.decoration || '—'} />
                    <div className="border-t border-[#2C1506]/6 dark:border-[#FDF6EC]/6" />
                    <SidebarRow label="Date" value={form.date || '—'} />
                    <div className="border-t border-[#2C1506]/6 dark:border-[#FDF6EC]/6" />
                    <SidebarRow label="Time" value={form.time || '—'} />
                    <div className="border-t border-[#2C1506]/6 dark:border-[#FDF6EC]/6" />
                    <SidebarRow label="Method" value={form.deliveryType === 'pickup' ? '🏪 Pickup' : '🚚 Delivery'} />
                  </div>
                  <div className="border-t-2 border-[#c9a84c]/30 mt-5 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2C1506]/50 dark:text-[#FDF6EC]/50">Cake</span>
                      <span className="font-semibold text-[#2C1506] dark:text-[#FDF6EC]">{formatPrice(cakePrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2C1506]/50 dark:text-[#FDF6EC]/50">Delivery</span>
                      <span className="font-semibold text-[#2C1506] dark:text-[#FDF6EC]">{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between font-headline text-xl text-[#c9a84c] font-bold pt-2 border-t border-[#2C1506]/10 dark:border-[#FDF6EC]/10">
                      <span>TOTAL</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#2C1506] rounded-[16px] p-6 shadow-lg border border-[#2C1506]/5 dark:border-[#FDF6EC]/5 space-y-3">
                <p className="font-headline text-base text-[#2C1506] dark:text-[#FDF6EC] mb-2">Why order with us?</p>
                {[
                  'Eggless options available',
                  'Min 2 days advance notice',
                  'WhatsApp confirmation in 2 hrs',
                  '500+ custom cakes made',
                  '4.7⭐ rated bakery in Thamel',
                ].map((item, i) => (
                  <p key={i} className="text-xs text-[#2C1506]/70 dark:text-[#FDF6EC]/70 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[#2C1506]/50 dark:text-[#FDF6EC]/50">{label}</span>
      <span className="font-semibold text-[#2C1506] dark:text-[#FDF6EC] text-right max-w-[55%]">{value}</span>
    </div>
  )
}

function SidebarRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#2C1506]/45 dark:text-[#FDF6EC]/45 text-xs">{label}</span>
      <span className="text-[#2C1506] dark:text-[#FDF6EC] text-xs font-semibold text-right max-w-[55%] truncate">{value}</span>
    </div>
  )
}
