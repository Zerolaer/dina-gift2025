
import React, { useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const controls = useAnimationControls()

  useEffect(()=>{
    controls.start({
      y: [0, -6, 0, 6, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    })
  }, [controls])

  return (
    <div className="vh-screen w-full relative flex items-center justify-center">
      <motion.div animate={controls} className="relative">
        {/* Envelope body */}
        <div className="w-[320px] h-[210px] bg-white/10 rounded-3xl border border-white/15 shadow-2xl backdrop-blur-md overflow-hidden">
          {/* Flap */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: 12 }}
            className="absolute left-0 right-0 top-0 h-1/2 origin-top"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="w-full h-full bg-white/15 border-b border-white/20" />
          </motion.div>

          {/* Seal button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              whileTap={{ scale: .96 }}
              onClick={onOpen}
              className="rounded-full px-6 py-6 bg-gradient-to-br from-gold to-white text-deep font-extrabold drop-shadow-glow"
            >
              Открой меня
            </motion.button>
          </div>
        </div>
      </motion.div>
      <div className="absolute bottom-8 text-white/60 text-xs px-6 text-center">
        Конверт слегка парит в воздухе ✨
      </div>
    </div>
  )
}
