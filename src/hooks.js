import { useEffect, useState } from 'react'
import { getDevices } from './helpers'

export const useDevices = currentIndex => {
  const [loading, setLoading] = useState(false)
  const [devices, setDevices] = useState([])

  useEffect(() => {
    async function rotateIndex() {
      if (!devices.length || currentIndex + 32 >= devices.length) {
        setDevices([])
        setLoading(true)
        const data = await getDevices()
        setDevices(data)
        setLoading(false)
      }
    }
    rotateIndex()
  }, [currentIndex])
  return { loading, devices }
}
