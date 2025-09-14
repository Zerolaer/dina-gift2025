
// Simple WebAudio-based sound effects (no external assets)
export class Sound {
  private static ctx: AudioContext | null = null

  static ensure() {
    if (!this.ctx) this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    return this.ctx!
  }

  static async chime() {
    const ctx = this.ensure()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = 880
    g.gain.setValueAtTime(0.0001, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5)
    o.connect(g).connect(ctx.destination)
    o.start()
    o.stop(ctx.currentTime + 0.5)
  }

  static async sparkle() {
    const ctx = this.ensure()
    // two quick chimes
    const freqs = [1200, 1600]
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'triangle'
      o.frequency.setValueAtTime(f, ctx.currentTime + i * 0.12)
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.12)
      g.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + i * 0.14)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.38)
      o.connect(g).connect(ctx.destination)
      o.start(ctx.currentTime + i * 0.12)
      o.stop(ctx.currentTime + i * 0.42)
    })
  }

  static async applause() {
    const ctx = this.ensure()
    // Fake "applause" via filtered white noise + quick bursts
    const bufferSize = 2 * ctx.sampleRate
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.6

    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 2000
    filter.Q.value = 0.5

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.2)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6)

    noise.connect(filter).connect(gain).connect(ctx.destination)
    noise.start()
    noise.stop(ctx.currentTime + 1.7)
  }

  static async olympicFanfare() {
    const ctx = this.ensure()
    // Olympic fanfare-like sound
    const notes = [523, 659, 784, 1047] // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'square'
      o.frequency.value = freq
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.2)
      g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + i * 0.2 + 0.05)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.2 + 0.8)
      o.connect(g).connect(ctx.destination)
      o.start(ctx.currentTime + i * 0.2)
      o.stop(ctx.currentTime + i * 0.2 + 0.8)
    })
  }

  static async victory() {
    const ctx = this.ensure()
    // Victory sound with ascending notes
    const notes = [261, 330, 392, 523, 659] // C4, E4, G4, C5, E5
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'triangle'
      o.frequency.value = freq
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.15)
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + i * 0.15 + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.15 + 0.6)
      o.connect(g).connect(ctx.destination)
      o.start(ctx.currentTime + i * 0.15)
      o.stop(ctx.currentTime + i * 0.15 + 0.6)
    })
  }
}
