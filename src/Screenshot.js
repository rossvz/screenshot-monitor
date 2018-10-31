import React from 'react'


const Screenshot = props => {
  return (
    <div className="container">
      <img
        className={'image screenshot'}
        src={props.device.screenshot}
        alt=""
        onError={(e) => {
          e.target.onerror = null
          e.target.src = 'http://via.placeholder.com/683x384/1f2532/ffffff?text=N/A'
        }}
      />
      <h3>{props.device.name}</h3>
      <h4>{props.device.timestamp}</h4>
    </div>
  )
}

export default Screenshot
