import React from 'react'
import Screenshot from './Screenshot'


const ScreenshotGrid = ({ devices, currentIndex }) => {
  const devicesInView =  devices.slice(
    currentIndex,
    currentIndex + 32
  )
  return (
    <div className={'grid'}>
      {devicesInView.map(device => (
        <Screenshot key={device.screenshot} device={device} />
      ))}
    </div>
  )
}

export default ScreenshotGrid
