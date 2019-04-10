import ms from 'milliseconds'
import React, { useEffect, useState } from 'react'
import './App.css'
import { useDevices } from './hooks'
import ScreenshotGrid from './ScreenshotGrid'

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { loading, devices } = useDevices(currentIndex)
  useEffect(() => {
    setTimeout(() => {
      setCurrentIndex(
        currentIndex + 32 >= devices.length ? 0 : currentIndex + 32
      )
    }, ms.seconds(20))
  }, [currentIndex, devices.length])
  return (
    <div className="App">
      {currentIndex}-{currentIndex + 32} /{devices.length} screenshots
      {loading && <h1>Loading...</h1>}
      {devices.length ? (
        <ScreenshotGrid devices={devices} currentIndex={currentIndex} />
      ) : null}
    </div>
  )
}

export default App
