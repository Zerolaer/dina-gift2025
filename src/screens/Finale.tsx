
import React from 'react'
import { motion } from 'framer-motion'
import { BRIDE_NAME } from '../lib/config'

export function Finale() {
  return (
    <div className="vh-screen w-full relative flex items-center justify-center text-center px-6">
      <motion.div
        initial={{ scale: .9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      >
        <h3 className="headline mb-3">Мы едем в Милан! 🇮🇹</h3>
        <p className="sub mb-6">Олимпиада 2026 • Фигурное катание • Твоя мечта сбылась ♥</p>
        <div className="text-white/70 text-sm">Я люблю тебя, {BRIDE_NAME()}</div>
      </motion.div>
    </div>
  )
}
