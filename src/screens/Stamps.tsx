
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sound } from '../lib/Sound'

const labels = [
  "Все совпадения случайны",
  "Я ни при чём",
  "Ответственность снята"
]

export function Stamps({ onNext }: { onNext: () => void }) {
  const [done, setDone] = useState(0)

  const stamp = () => {
      Sound.chime();
    setDone(d => {
      const n = Math.min(3, d + 1)
      if (n === 3) setTimeout(onNext, 700)
      return n
    })
  }

  return (
    <div className="vh-screen w-full relative flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto px-6 text-center">
        <h2 className="headline mb-6">Три штампа судьбы</h2>
        <div className="grid grid-cols-1 gap-4">
          {labels.map((l, i) => (
            <motion.button
              key={i}
              onClick={stamp}
              disabled={i < done ? true : false}
              whileTap={{ scale: .98 }}
              className={"btn frost w-full" + (i < done ? " opacity-50" : "")}
            >
              {l}
            </motion.button>
          ))}
        </div>
        <motion.div
          initial={{ scale: .95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: .2 }}
          className="mt-8 text-white/70 text-sm"
        >
          Нажми все три по очереди
        </motion.div>
      </div>
    </div>
  )
}
