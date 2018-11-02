import { useEffect, useState } from 'react'
import { getDevices } from './helpers'

export const useDevices = (currentIndex) => {
  const [loading, setLoading] = useState(false)
  const [devices, setDevices] = useState([])
  useEffect(async () => {
    if (!devices.length || currentIndex + 32 > devices.length) {
      setLoading(true)
      const data = await getDevices()
      setDevices(data)
      setLoading(false)
    }
  }, [currentIndex])
  return { loading, devices }
}