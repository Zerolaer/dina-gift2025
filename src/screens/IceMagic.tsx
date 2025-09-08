
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Particles } from '../components/Particles'
import { Sound } from '../lib/Sound'

function Trail({ delay=0 }: {delay?: number}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const el = ref.current
    if (!el) return
    const len = 10 + Math.random()*40
    el.animate([
      { transform: 'translateX(-20vw)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1, offset: .2 },
      { transform: `translateX(${len}vw)`, opacity: 0 }
    ], {
      duration: 2000 + Math.random()*1000,
      delay,
      easing: 'ease-in-out',
      iterations: 1,
      fill: 'forwards'
    })
  }, [delay])
  return <div ref={ref} className="ice-line w-[120vw] my-2" />
}

export function IceMagic({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
    const id = setInterval(()=>setProgress(p => {
      const n = Math.min(100, p + 2 + Math.random()*4)
      if (n >= 100) {
        clearInterval(id)
        Sound.sparkle(); setTimeout(onNext, 500)
      }
      return n
    }), 80)
    return ()=>clearInterval(id)
  }, [onNext])

  return (
    <div className="vh-screen w-full relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-[.18] pointer-events-none">
        {[...Array(16)].map((_,i)=>(<Trail key={i} delay={i*80}/>))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-6"
      >
        <h3 className="headline mb-3">Магия льда</h3>
        <p className="sub mb-6">Смотри, как коньки рисуют узоры…</p>
        <div className="w-72 h-72 mx-auto rounded-full border-2 border-white/30 relative overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-white/0 via-white/60 to-white/0"
          />
          <div className="absolute inset-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
