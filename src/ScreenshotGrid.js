import React from 'react'
import Screenshot from './Screenshot'


const ScreenshotGrid = ({ devices, currentIndex, storeFilter }) => {
  const devicesInView = (storeFilter ? devices.filter(d => d.storeId === Number(storeFilter)) : devices).slice(
    currentIndex,
    currentIndex + 32
  )
  return (
    <div className={'grid'}>
      {devicesInView.map(device => (
        <Screenshot key={device.name} device={device} />
      ))}
    </div>
  )
}

export default ScreenshotGrid
