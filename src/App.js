import React, { useEffect, useState } from 'react'
import './App.css'
import ms from 'milliseconds'
import ScreenshotGrid from './ScreenshotGrid'
import {getDevices} from './helpers'


const useDevices = (currentIndex)=>{
  const [loading,setLoading] = useState(false)
  const [devices,setDevices] = useState([])
  useEffect(async () => {
  	if (!devices.length || currentIndex + 32 > devices.length){
			setLoading(true)
			const data = await getDevices()
			setDevices(data)
			setLoading(false)
		}
	},[currentIndex])
  return {loading,devices}
}

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
	const {loading,devices} = useDevices(currentIndex)
	useEffect(()=>{
		setTimeout(()=>{
			setCurrentIndex(currentIndex + 32 > devices.length ? 0 : currentIndex + 32)
		},ms.seconds(20))
	},[currentIndex, devices.length])
  return (
    <div className='App'>
      {loading && <h1>Loading...</h1>}
      {devices.length ? (
        <ScreenshotGrid
          devices={devices}
          currentIndex={currentIndex}
        />
      ) : null}
    </div>
  )
}

export default App
