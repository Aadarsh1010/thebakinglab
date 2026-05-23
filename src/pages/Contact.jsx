import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
}

const subjects = [
  'Order Enquiry',
  'Custom Cake Order',
  'General Question',
  'Collaboration',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'Order Enquiry', message: '' })
  const [sent, setSent] = useState(false)
  const update = (f, v) => setForm((s) => ({ ...s, [f]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = `Hello The Baking Lab!%0A%0A** Subject:** ${form.subject}%0A** Name:** ${form.name}%0A** WhatsApp/Phone:** ${form.phone}%0A** Email:** ${form.email || 'Not provided'}%0A** Message:** ${form.message}`
    window.open(`https://wa.me/9779845126192?text=${msg}`, '_blank')
    setSent(true)
    setForm({ name: '', phone: '', email: '', subject: 'Order Enquiry', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

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
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-accent text-[#D4A020] text-xl mb-3">Hidden in Kaldhara — worth every step</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="font-headline text-4xl md:text-5xl text-[#FDF6EC] font-bold">Find Us in Thamel</motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-20 h-1 bg-[#D4A020] rounded-full mx-auto mt-4" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — Info Card */}
          <motion.div {...fadeUp} className="bg-[#2C1506] rounded-2xl p-8 shadow-xl text-[#FDF6EC] space-y-6">
            <img src="/logo.png" alt="The Baking Lab" className="w-20 h-20 rounded-full mx-auto object-cover ring-2 ring-[#D4A020]" />
            <div className="text-center">
              <h2 className="font-headline text-2xl text-[#D4A020]">The Baking Lab</h2>
              <p className="font-accent text-sm text-[#FDF6EC]/60">Fresh & Best — Estd. 2023</p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3"><span className="text-lg shrink-0">📍</span><span>Kaldhara Chowk, Thamel<br />Kathmandu 44600, Nepal</span></div>
              <div className="flex items-center gap-3"><span className="text-lg shrink-0">📞</span><a href="tel:+9779845126192" className="hover:text-[#D4A020] transition-colors">+977 984-5126192</a></div>
              <div className="flex items-center gap-3"><span className="text-lg shrink-0">📞</span><a href="tel:+9779841101667" className="hover:text-[#D4A020] transition-colors">+977 984-1101667</a></div>
              <div className="flex items-center gap-3"><span className="text-lg shrink-0">💬</span><a href="https://wa.me/9779845126192" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A020] transition-colors">wa.me/9779845126192</a></div>
              <div className="flex items-center gap-3"><span className="text-lg shrink-0">📘</span><a href="https://www.facebook.com/ThebakinglabNP" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A020] transition-colors">facebook.com/ThebakinglabNP</a></div>
              <div className="flex items-center gap-3"><span className="text-lg shrink-0">📸</span><a href="https://www.instagram.com/bakinglabaadhunik" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A020] transition-colors">instagram.com/bakinglabaadhunik</a></div>
            </div>
            <div className="border-t border-[#FDF6EC]/10 pt-4">
              <h3 className="font-headline text-lg text-[#D4A020] mb-3">Opening Hours</h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span>Mon – Sat</span><span className="font-medium">7:00 AM – 7:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="font-medium">8:00 AM – 5:00 PM</span></div>
              </div>
              <p className="text-xs text-[#D4A020]/80 mt-3">⚠️ Most items sell out by noon — come early or pre-order!</p>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="bg-white dark:bg-[#2C1506] rounded-2xl p-6 sm:p-8 shadow-xl">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-headline text-2xl text-[#2C1506] dark:text-[#FDF6EC] mb-2">Message Sent!</h3>
                  <p className="text-[#2C1506]/60 dark:text-[#FDF6EC]/60 text-sm text-center max-w-xs">
                    We'll respond on WhatsApp within a few hours. Keep an eye on your inbox!
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <h2 className="font-headline text-2xl text-[#2C1506] dark:text-[#FDF6EC] mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-2">Full Name *</label>
                        <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required className="w-full px-4 py-3 rounded-xl border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#D4A020] outline-none bg-[#FAF0E0]/50 dark:bg-[#3D1F0D]/50" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-2">WhatsApp / Phone *</label>
                        <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} required className="w-full px-4 py-3 rounded-xl border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#D4A020] outline-none bg-[#FAF0E0]/50 dark:bg-[#3D1F0D]/50" placeholder="+977 98XXXXXXXX" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-2">Email</label>
                        <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#D4A020] outline-none bg-[#FAF0E0]/50 dark:bg-[#3D1F0D]/50" placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-2">Subject</label>
                        <select value={form.subject} onChange={(e) => update('subject', e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#D4A020] outline-none bg-[#FAF0E0]/50 dark:bg-[#3D1F0D]/50 text-sm">
                          {subjects.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2C1506]/70 dark:text-[#FDF6EC]/70 mb-2">Message *</label>
                      <textarea value={form.message} onChange={(e) => update('message', e.target.value)} required rows={5} className="w-full px-4 py-3 rounded-xl border-2 border-[#2C1506]/10 dark:border-[#FDF6EC]/10 focus:border-[#D4A020] outline-none bg-[#FAF0E0]/50 dark:bg-[#3D1F0D]/50 resize-none" placeholder="Tell us what you need..." />
                    </div>
                    <button type="submit" disabled={!form.name || !form.phone || !form.message} className="w-full bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold py-3.5 rounded-xl text-sm hover:brightness-110 hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100">
                      Send via WhatsApp
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div {...fadeUp} className="mt-12">
          <h2 className="font-headline text-2xl text-[#2C1506] dark:text-[#FDF6EC] text-center mb-6">Find Us on the Map</h2>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://maps.google.com/maps?q=27.7172,85.3095&z=17&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Baking Lab Location"
            />
          </div>
          <div className="text-center mt-4">
            <a href="https://maps.google.com/?q=27.7172,85.3095" target="_blank" rel="noopener noreferrer" className="inline-flex bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-6 py-2.5 rounded-full text-sm hover:brightness-110 transition-all">
              Get Directions
            </a>
          </div>
        </motion.div>

        {/* Tourist Directions */}
        <motion.div {...fadeUp} className="mt-12 bg-[#2C1506] rounded-2xl p-8 md:p-10 text-[#FDF6EC]">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="font-headline text-2xl text-[#D4A020] mb-3">Coming from Thamel Main Street?</h3>
            <p className="text-sm text-[#FDF6EC]/80 leading-relaxed">
              Walk towards Kaldhara Chowk — approximately 5 minutes on foot from Thamel Chowk.
              Look for The Baking Lab sign. We're the bakery everyone keeps telling you about.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
