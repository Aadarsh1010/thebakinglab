import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'

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
  transition: { staggerChildren: 0.1 },
}

const posts = [
  {
    id: 1,
    category: 'Events',
    title: 'The Baking Lab at Thamel Food Festival 2026',
    excerpt: 'We showcased our signature banana bread and caramelized cashew cheesecake at this year\'s Thamel Food Festival — and the response was overwhelming.',
    date: 'Mar 15, 2026',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800',
    author: 'The Baking Lab Team',
    readTime: '3 min read',
  },
  {
    id: 2,
    category: 'Behind the Scenes',
    title: 'How We Perfect Our Banana Bread Recipe',
    excerpt: 'After 2,000+ batches and countless experiments, here\'s a peek into what makes our banana bread the most talked-about in Nepal.',
    date: 'Feb 28, 2026',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800',
    author: 'Chef Anish',
    readTime: '5 min read',
  },
  {
    id: 3,
    category: 'Tips & Guides',
    title: 'Eggless Baking 101: Tips for Perfect Cakes Without Eggs',
    excerpt: 'Eggless doesn\'t mean tasteless. Learn the science behind egg replacements and how we achieve the perfect texture every time.',
    date: 'Feb 10, 2026',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800',
    author: 'The Baking Lab Team',
    readTime: '4 min read',
  },
  {
    id: 4,
    category: 'Community',
    title: 'Supporting Local: Why We Source Nepali Ingredients',
    excerpt: 'From Kalinchok butter to local free-range eggs — meet the farmers and producers who make our bakery possible.',
    date: 'Jan 25, 2026',
    image: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=800',
    author: 'The Baking Lab Team',
    readTime: '4 min read',
  },
  {
    id: 5,
    category: 'Events',
    title: 'We Baked Nepal\'s Largest Banana Bread — Here\'s What Happened',
    excerpt: 'A 50-pound banana bread to celebrate our 2nd anniversary. Over 200 people showed up and we raised funds for local children\'s education.',
    date: 'Jan 5, 2026',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=800',
    author: 'The Baking Lab Team',
    readTime: '3 min read',
  },
  {
    id: 6,
    category: 'Behind the Scenes',
    title: 'A Day in the Life at The Baking Lab',
    excerpt: 'Our ovens start firing at 5 AM. Follow along for a behind-the-scenes look at what it takes to run Thamel\'s busiest artisan bakery.',
    date: 'Dec 18, 2025',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800',
    author: 'Chef Anish',
    readTime: '6 min read',
  },
  {
    id: 7,
    category: 'Tips & Guides',
    title: 'Your Guide to Ordering Custom Cakes in Kathmandu',
    excerpt: 'Everything you need to know — from choosing the right size to picking flavors and delivery options for your perfect celebration cake.',
    date: 'Dec 1, 2025',
    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?q=80&w=800',
    author: 'The Baking Lab Team',
    readTime: '5 min read',
  },
  {
    id: 8,
    category: 'Community',
    title: '5 Questions with Our Head Baker, Anish',
    excerpt: 'Get to know the person behind our most-loved recipes — his inspiration, favorite bake, and advice for home bakers.',
    date: 'Nov 15, 2025',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800',
    author: 'The Baking Lab Team',
    readTime: '4 min read',
  },
]

const categories = ['All', 'Events', 'Behind the Scenes', 'Tips & Guides', 'Community']

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [blogEmail, setBlogEmail] = useState('')
  const [blogSubscribed, setBlogSubscribed] = useState(false)
  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!blogEmail) return
    setBlogSubscribed(true)
    setBlogEmail('')
    setTimeout(() => setBlogSubscribed(false), 4000)
  }

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory)

  return (
    <div>
      <Helmet>
        <title>Blog | The Baking Lab — Baking Stories & Tips from Kathmandu</title>
        <meta name="description" content="Read about the stories, recipes, and baking tips from The Baking Lab in Thamel, Kathmandu. Banana bread secrets, eggless baking guides, custom cake ideas & more." />
        <link rel="canonical" href="https://thebakinglab.com.np/blog" />
        <meta property="og:title" content="Blog | The Baking Lab — Baking Stories & Tips from Kathmandu" />
        <meta property="og:description" content="Baking stories, tips & recipes from The Baking Lab in Thamel, Kathmandu. Banana bread secrets, eggless baking & custom cake ideas." />
      </Helmet>
      {/* Hero */}
      <section
        className="relative min-h-[50vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(44,21,6,0.85) 0%, rgba(44,21,6,0.65) 100%), url(https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1920)`,
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
            The Baking Lab Blog
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-headline text-4xl sm:text-5xl md:text-6xl text-[#FDF6EC] font-bold leading-tight"
          >
            Stories, Recipes & News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-[#FDF6EC]/80 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Behind the scenes, event recaps, baking tips, and everything happening at Thamel's
            favorite artisan bakery.
          </motion.p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-10 bg-[#FAF0E0] dark:bg-[#1C0F0A] sticky top-[64px] md:top-[80px] z-20 border-b border-[#D4A020]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC]'
                    : 'bg-white/50 dark:bg-[#2C1506]/50 text-[#2C1506]/70 dark:text-[#FDF6EC]/70 hover:bg-[#D4A020]/20 border border-[#D4A020]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-20 bg-[#FAF0E0] dark:bg-[#1C0F0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.length === 0 ? (
                <p className="text-center text-[#2C1506]/50 dark:text-[#FDF6EC]/50 py-20">
                  No posts in this category yet. Check back soon!
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtered.map((post) => (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-[#2C1506] rounded-2xl overflow-hidden shadow-md hover:shadow-[0_8px_30px_rgba(212,160,32,0.2)] hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="relative overflow-hidden aspect-[16/10]">
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] text-xs font-bold px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-[#2C1506]/50 dark:text-[#FDF6EC]/50 text-xs mb-2">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-headline text-base md:text-lg text-[#2C1506] dark:text-[#FDF6EC] mb-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[#2C1506]/60 dark:text-[#FDF6EC]/60 leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#2C1506]/50 dark:text-[#FDF6EC]/50">{post.author}</span>
                          <span className="text-sm font-semibold text-[#D4A020] group-hover:translate-x-1 transition-transform">
                            Read More →
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-[#2C1506]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <p className="font-accent text-xl text-[#D4A020] mb-2">Never Miss a Post</p>
            <h2 className="font-headline text-3xl md:text-4xl text-[#FDF6EC] mb-4">
              Subscribe to Our Blog
            </h2>
            <p className="text-[#FDF6EC]/70 mb-8 max-w-md mx-auto">
              Get new stories, recipes, and bakery updates delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={blogEmail}
                onChange={(e) => setBlogEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3 rounded-full border border-[#FDF6EC]/30 bg-transparent text-[#FDF6EC] text-sm placeholder:text-[#FDF6EC]/40 outline-none focus:border-[#D4A020] transition-colors"
              />
              <button type="submit" className="bg-[#D4A020] text-[#2C1506] dark:text-[#FDF6EC] font-bold px-6 py-3 rounded-full text-sm hover:brightness-110 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <AnimatePresence>
              {blogSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-green-400 text-xs mt-4 font-semibold"
                >
                  ✅ You're subscribed! Welcome to The Baking Lab community.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
