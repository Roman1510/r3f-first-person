import { useState } from 'react'
import { Landing } from './components/Landing'
import { Stage } from './components/Stage'

export function App() {
  const [ready, setReady] = useState(false)
  return (
    <div className="canvas-wrapper">
      {!ready && <Landing setReady={setReady} />}
      {ready && <Stage />}
    </div>
  )
}
