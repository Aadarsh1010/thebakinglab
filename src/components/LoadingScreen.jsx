import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #3a1d0a 0%, #2C1506 55%, #1c0d03 100%)',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      aria-label="Loading The Baking Lab"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4A020 0%, transparent 70%)' }}
      />

      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * 360
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#D4A020',
              boxShadow: '0 0 10px rgba(212,160,32,0.7)'
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0.6, 1, 0],
              x: [
                Math.cos((angle + 0)   * Math.PI / 180) * 140,
                Math.cos((angle + 90)  * Math.PI / 180) * 140,
                Math.cos((angle + 180) * Math.PI / 180) * 140,
                Math.cos((angle + 270) * Math.PI / 180) * 140,
                Math.cos((angle + 360) * Math.PI / 180) * 140
              ],
              y: [
                Math.sin((angle + 0)   * Math.PI / 180) * 140,
                Math.sin((angle + 90)  * Math.PI / 180) * 140,
                Math.sin((angle + 180) * Math.PI / 180) * 140,
                Math.sin((angle + 270) * Math.PI / 180) * 140,
                Math.sin((angle + 360) * Math.PI / 180) * 140
              ]
            }}
            transition={{
              duration: 6, repeat: Infinity, ease: 'linear', delay: i * 0.2
            }}
          />
        )
      })}

      <div className="relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-2.5 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-1.5 h-8 rounded-full steam"
              style={{
                background: 'linear-gradient(180deg, transparent, rgba(253,246,236,0.6), transparent)',
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ willChange: 'transform, opacity' }}
        >
          <div
            className="relative w-[180px] h-[180px] rounded-full overflow-hidden ring-2 ring-[#D4A020]/50 animate-breadRise"
            style={{ boxShadow: '0 0 80px rgba(212,160,32,0.45), 0 20px 60px rgba(0,0,0,0.5)' }}
          >
            <img
              src="/logo.png"
              alt="The Baking Lab"
              className="w-full h-full object-cover"
              draggable="false"
            />
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
                willChange: 'transform'
              }}
              initial={{ x: '-120%' }}
              animate={{ x: '120%' }}
              transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.8 }}
            />
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute -inset-3 rounded-full border border-dashed border-[#D4A020]/45 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            style={{ willChange: 'transform' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -inset-7 rounded-full border border-[#D4A020]/20 pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            style={{ willChange: 'transform' }}
          />
        </motion.div>
      </div>

      <div className="mt-12 flex font-headline text-[#FDF6EC] text-2xl md:text-4xl tracking-[0.32em]" style={{ willChange: 'transform, opacity' }}>
        {'THE BAKING LAB'.split('').map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              delay: 1.1 + i * 0.11, duration: 0.6, ease: 'easeOut'
            }}
            className={ch === ' ' ? 'inline-block w-3 md:w-4' : 'inline-block'}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 1.0, ease: 'easeOut' }}
        className="font-accent text-[#D4A020] text-3xl md:text-4xl mt-3"
        style={{ willChange: 'transform, opacity' }}
      >
        Fresh & Best
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 3.4, duration: 0.8 }}
        className="mt-2 text-[10px] tracking-[0.4em] text-[#FDF6EC]/60 uppercase"
      >
        Kaldhara · Thamel · Kathmandu
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[240px] md:w-[300px]">
        <p className="text-[10px] tracking-[0.35em] text-[#FDF6EC]/55 uppercase mb-2 text-center">
          Warming the ovens
        </p>
        <div className="h-[3px] w-full rounded-full bg-[#FDF6EC]/10 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            className="h-full rounded-full origin-left"
            style={{
              transformOrigin: 'left',
              willChange: 'transform',
              background: 'linear-gradient(90deg, rgba(212,160,32,0) 0%, #D4A020 50%, #F2C44A 80%, rgba(212,160,32,0) 100%)',
              boxShadow: '0 0 12px rgba(212,160,32,0.55)'
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
