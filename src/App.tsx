
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Welcome } from './screens/Welcome'
import { Stamps } from './screens/Stamps'
import { Wish } from './screens/Wish'
import { IceMagic } from './screens/IceMagic'
import { Envelope } from './screens/Envelope'
import { Ticket } from './screens/Ticket'
import { Finale } from './screens/Finale'

export type Steps = 0|1|2|3|4|5|6

export default function App() {
  const [step, setStep] = useState<Steps>(0)
  const [wish, setWish] = useState<string>('')

  const next = () => setStep(s => (s < 6 ? ((s + 1) as Steps) : s))
  const to = (s: Steps) => setStep(s)

  return (
    <div className="vh-screen w-full overflow-hidden bg-gradient-aurora relative">
      <AnimatePresence mode="wait">
        {step === 0 && <Welcome key="welcome" onNext={next} />}
        {step === 1 && <Stamps key="stamps" onNext={next} />}
        {step === 2 && <Wish key="wish" value={wish} onSubmit={(v)=>{ setWish(v); next(); }} />}
        {step === 3 && <IceMagic key="ice" onNext={next} />}
        {step === 4 && <Envelope key="env" onOpen={()=>to(5)} />}
        {step === 5 && <Ticket key="ticket" onNext={next} />}
        {step === 6 && <Finale key="final" />}
      </AnimatePresence>
    </div>
  )
}
