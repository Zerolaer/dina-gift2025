
import React from 'react'
import { motion } from 'framer-motion'
import { BRIDE_NAME } from '../lib/config'
import { Sound } from '../lib/Sound'

export function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="vh-screen w-full relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8 }}
        className="text-center px-6"
      >
        <h1 className="headline mb-3">С днём рождения, {BRIDE_NAME()}!</h1>
        <p className="sub mb-8">Сегодня исполняется одна мечта…</p>
        <button onClick={()=>{ Sound.sparkle(); onNext(); }} className="btn primary">Начать</button>
      </motion.div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-10 text-center text-white/60 text-xs">Проведи со мной небольшой ритуал ✨</div>
      </div>
    </div>
  )
}
