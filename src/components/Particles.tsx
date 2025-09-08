
import React, { useEffect, useRef } from 'react'

export const Particles: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')!
    let w = c.width = window.innerWidth * devicePixelRatio
    let h = c.height = window.innerHeight * devicePixelRatio

    const onResize = () => {
      w = c.width = window.innerWidth * devicePixelRatio
      h = c.height = window.innerHeight * devicePixelRatio
    }
    window.addEventListener('resize', onResize)

    const flakes = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      s: 0.3 + Math.random() * 0.8,
    }))

    let raf = 0
    const loop = () => {
      ctx.clearRect(0,0,w,h)
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      flakes.forEach(f => {
        f.y += f.s * 1.2
        f.x += Math.sin(f.y * 0.01) * 0.4
        if (f.y > h) { f.y = -5; f.x = Math.random() * w }
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fill()
      })
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full opacity-[.15] pointer-events-none" />
}
