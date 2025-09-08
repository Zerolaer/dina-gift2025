
import React, { useState } from 'react'
import { motion } from 'framer-motion'

export function Wish({ value, onSubmit }: { value: string; onSubmit: (v:string)=>void }) {
  const [v, setV] = useState(value ?? '')

  return (
    <div className="vh-screen w-full relative flex items-center justify-center">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="frost rounded-3xl p-6 w-[92%] max-w-sm mx-auto"
      >
        <h3 className="headline mb-2">Загадай желание</h3>
        <p className="sub mb-5">Напиши его здесь, и отпусти во Вселенную</p>
        <input
          value={v}
          onChange={(e)=>setV(e.target.value)}
          placeholder="Моё желание…"
          className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
        />
        <div className="mt-5 flex justify-end">
          <button onClick={()=>onSubmit(v)} className="btn primary">Загадать</button>
        </div>
      </motion.div>
    </div>
  )
}
