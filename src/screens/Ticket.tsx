
import React, { useEffect, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { Sound } from '../lib/Sound'

function Firework({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-4 h-4 bg-yellow-400 rounded-full firework"
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 15, opacity: 0 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
      style={{ 
        left: `${20 + Math.random() * 60}%`, 
        top: `${20 + Math.random() * 60}%` 
      }}
    />
  )
}

function OlympicRings() {
  return (
    <div className="flex justify-center space-x-1 mb-4">
      <div className="w-6 h-6 rounded-full border-2 border-blue-500"></div>
      <div className="w-6 h-6 rounded-full border-2 border-yellow-400"></div>
      <div className="w-6 h-6 rounded-full border-2 border-black"></div>
      <div className="w-6 h-6 rounded-full border-2 border-green-500"></div>
      <div className="w-6 h-6 rounded-full border-2 border-red-500"></div>
    </div>
  )
}

export function Ticket({ onNext }: { onNext: () => void }) {
  const controls = useAnimationControls()
  const [showFireworks, setShowFireworks] = useState(false)

  useEffect(()=>{
    (async () => {
      await controls.start({ y: 300, opacity: 0, rotate: -8, scale: 0.5 })
      await controls.start({
        y: 0, opacity: 1, rotate: 0, scale: 1,
        transition: { type: 'spring', stiffness: 140, damping: 16 }
      })
      
      // Show fireworks after ticket appears
      setTimeout(() => setShowFireworks(true), 500)
    })()
  }, [controls])

  return (
    <div className="vh-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Fireworks */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <Firework key={i} delay={i * 0.2} />
          ))}
        </div>
      )}

      <motion.div animate={controls} className="w-[340px] relative z-10">
        <div className="relative rounded-3xl bg-white text-gray-800 shadow-2xl overflow-hidden shimmer pulse-glow">
          {/* Olympic header */}
          <div className="bg-gradient-to-r from-blue-600 via-red-600 to-yellow-500 p-3 text-white text-center">
            <OlympicRings />
            <div className="text-xs font-bold tracking-wider">MILANO CORTINA 2026</div>
            <div className="text-[10px] opacity-90">XXV OLYMPIC WINTER GAMES</div>
          </div>

          <div className="p-6">
            <div className="text-center mb-4">
              <div className="text-lg font-extrabold text-gray-800 mb-1">
                🏆 FIGURE SKATING GALA 🏆
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Exhibition of Champions
              </div>
              <div className="text-xs text-gray-500">
                February 13, 2026 • 20:00
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 mb-4">
              <div className="text-xs text-gray-500 mb-1">VENUE</div>
              <div className="text-sm font-semibold">PalaItalia Santa Giulia</div>
              <div className="text-xs text-gray-500 mb-2">Milano, Italy</div>
              
              <div className="text-xs text-gray-500 mb-1">SEAT</div>
              <div className="text-sm font-semibold">Category A • Row 5 • Seat 12</div>
            </div>

            <div className="text-xs text-gray-500 mb-2 text-center">
              🎁 This is your special gift
            </div>
            
            <motion.button 
              onClick={()=>{ Sound.olympicFanfare(); onNext(); }} 
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-red-600 text-white py-4 font-bold hover:opacity-90 active:scale-[.98] transition shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🏆 Это твой подарок! 🏆
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
