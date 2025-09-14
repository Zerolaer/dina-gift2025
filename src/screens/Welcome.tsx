
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BRIDE_NAME } from '../lib/config'
import { Sound } from '../lib/Sound'

function OlympicRings() {
  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 olympic-rings">
      <div className="flex space-x-2">
        <div className="w-8 h-8 rounded-full border-4 border-blue-500"></div>
        <div className="w-8 h-8 rounded-full border-4 border-yellow-400"></div>
        <div className="w-8 h-8 rounded-full border-4 border-black"></div>
        <div className="w-8 h-8 rounded-full border-4 border-green-500"></div>
        <div className="w-8 h-8 rounded-full border-4 border-red-500"></div>
      </div>
    </div>
  )
}

function ConfettiParticle({ delay = 0, color = 'yellow' }: { delay?: number; color?: string }) {
  return (
    <motion.div
      className={`absolute w-2 h-2 ${color === 'yellow' ? 'bg-yellow-400' : color === 'blue' ? 'bg-blue-400' : color === 'red' ? 'bg-red-400' : 'bg-green-400'} rounded-full`}
      initial={{ y: -50, x: Math.random() * window.innerWidth, rotate: 0 }}
      animate={{ 
        y: window.innerHeight + 50, 
        rotate: 360,
        x: Math.random() * window.innerWidth
      }}
      transition={{ 
        duration: 3, 
        delay, 
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{ left: `${Math.random() * 100}%` }}
    />
  )
}

export function Welcome({ onNext }: { onNext: () => void }) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="vh-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <ConfettiParticle 
              key={i} 
              delay={i * 0.1} 
              color={['yellow', 'blue', 'red', 'green'][i % 4] as any}
            />
          ))}
        </div>
      )}

      <OlympicRings />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
        className="text-center px-6 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="mb-4"
        >
          🎂
        </motion.div>
        
        <motion.h1 
          className="headline mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          С днём рождения, {BRIDE_NAME()}!
        </motion.h1>
        
        <motion.p 
          className="sub mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Сегодня исполняется одна мечта…
        </motion.p>
        
        <motion.button 
          onClick={()=>{ Sound.sparkle(); onNext(); }} 
          className="btn primary pulse-glow float"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          Начать путешествие 🏆
        </motion.button>
      </motion.div>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-10 text-center text-white/60 text-xs">
          Проведи со мной небольшой ритуал ✨
        </div>
      </div>
    </div>
  )
}
