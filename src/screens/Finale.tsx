
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BRIDE_NAME } from '../lib/config'
import { Sound } from '../lib/Sound'

function FloatingHeart() {
  return (
    <motion.div
      className="absolute text-red-500 text-2xl"
      initial={{ 
        y: window.innerHeight + 50, 
        x: Math.random() * window.innerWidth,
        rotate: 0,
        scale: 0
      }}
      animate={{ 
        y: -50, 
        x: Math.random() * window.innerWidth,
        rotate: 360,
        scale: 1
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{ left: `${Math.random() * 100}%` }}
    >
      💖
    </motion.div>
  )
}

function Sparkle() {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 2, opacity: 0 }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: 'easeOut'
      }}
      style={{ 
        left: `${Math.random() * 100}%`, 
        top: `${Math.random() * 100}%` 
      }}
    />
  )
}

export function Finale() {
  const [showEffects, setShowEffects] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowEffects(true), 500)
    Sound.victory()
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="vh-screen w-full relative flex items-center justify-center text-center px-6 overflow-hidden">
      {/* Floating hearts */}
      {showEffects && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <FloatingHeart key={`heart-${i}`} />
          ))}
          {[...Array(25)].map((_, i) => (
            <Sparkle key={`sparkle-${i}`} />
          ))}
        </div>
      )}

      <motion.div
        initial={{ scale: .9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          🏆🇮🇹🏆
        </motion.div>

        <motion.h3 
          className="headline mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Мы едем в Милан! 🇮🇹
        </motion.h3>

        <motion.p 
          className="sub mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Олимпиада 2026 • Фигурное катание • Твоя мечта сбылась ♥
        </motion.p>

        <motion.div 
          className="text-white/90 text-lg font-semibold pulse-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 150 }}
        >
          Я люблю тебя, {BRIDE_NAME()} 💖
        </motion.div>

        <motion.div
          className="mt-8 text-white/60 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Твоя мечта стала реальностью! 🎉
        </motion.div>
      </motion.div>
    </div>
  )
}
