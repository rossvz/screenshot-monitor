import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import moment from 'moment'
import ms from 'milliseconds'
import ScreenshotGrid from './ScreenshotGrid'

const formatStoreData = (stores, storeFilter) => {
    console.log(storeFilter)
  return stores.map(store =>
      store.devices
        .filter(device => {
          const recentScreenshot = device.moki_screenshot_url && moment(Number(device.moki_screenshot_date)).isAfter(moment().subtract(7, 'days'))
          const matchesFilter = storeFilter
            ? device.storeId === Number(storeFilter)
            : true
          return recentScreenshot && matchesFilter
        })
        .map(device => ({
          name: device.name,
          screenshot: device.moki_screenshot_url || '',
          timestamp: moment(Number(device.moki_screenshot_date)).fromNow(),
          storeId: device.storeId
        }))
    )
    .reduce((prev, current) => [...prev, ...current], [])
}

const getStoreIdQueryParam = () => {
  const url = new URL(window.location.href)
  return url.searchParams.get('storeId') || null
}

const getDevices = async (storeFilter) => {
  const results = await axios.get('https://api.sllr.io/devices/stores')
  const formatted = formatStoreData(results.data.stores, storeFilter)
  console.log(formatted)
  return formatted
}

async function fetchDevices (setLoading, storeFilter) {
  setLoading(true)
  const devices = await getDevices(setLoading, storeFilter)
  setLoading(false)
  return devices
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [devices, setDevices] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [storeFilter, setStoreFilter] = useState(null)

  useEffect(async () => {
      const storeId = getStoreIdQueryParam()
    if(storeId) setStoreFilter(storeId)
    const devices = await fetchDevices(setLoading, storeFilter)
    console.log(devices)
    setDevices(devices)
    // setInterval(async () => {
    //   if (devices && currentIndex + 32 > devices.length) {
    //     const devices = await fetchDevices(setLoading, storeFilter)
    //     setDevices(devices)
    //     setCurrentIndex(0)
    //   } else {
    //     setCurrentIndex(currentIndex + 32)
    //   }
    // }, ms.seconds(20))
  },[])
  return (
    <div className="App">
      {loading && <h1>Loading...</h1>}
      {devices.length ? (
        <ScreenshotGrid
          storeFilter={storeFilter}
          devices={devices}
          currentIndex={currentIndex}
        />
      ) : null}
    </div>
  )
}

export default App
