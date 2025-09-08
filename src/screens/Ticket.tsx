
import React, { useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { Sound } from '../lib/Sound'

export function Ticket({ onNext }: { onNext: () => void }) {
  const controls = useAnimationControls()

  useEffect(()=>{
    (async () => {
      await controls.start({ y: 300, opacity: 0, rotate: -8 })
      await controls.start({
        y: 0, opacity: 1, rotate: 0,
        transition: { type: 'spring', stiffness: 140, damping: 16 }
      })
    })()
  }, [controls])

  return (
    <div className="vh-screen w-full relative flex items-center justify-center overflow-hidden">
      <motion.div animate={controls} className="w-[320px]">
        <div className="relative rounded-3xl bg-white text-deep shadow-2xl overflow-hidden shimmer">
          <div className="p-5">
            <div className="text-[10px] tracking-[.2em] font-semibold text-gray-500 mb-2">
              DIGITAL ADMISSION • VALID WITH PHOTO ID • NON‑TRANSFERABLE
            </div>
            <div className="text-xl font-extrabold">MILANO CORTINA 2026</div>
            <div className="text-sm font-semibold mb-1">FIGURE SKATING — GALA</div>
            <div className="text-xs text-gray-600">Cat C • OFSK07 • Feb 13, 2026</div>
          </div>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
          <div className="p-5">
            <div className="text-xs text-gray-500 mb-2">This is your gift 🎁</div>
            <button onClick={()=>{ Sound.applause(); onNext(); }} className="w-full rounded-xl bg-deep text-white py-3 font-bold hover:opacity-90 active:scale-[.98] transition">
              Это твой подарок
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
