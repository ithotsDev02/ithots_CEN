import React from 'react'

const PlusIcon = ({ fill, width, height, viewBox = '0 0 11 11', ...rest }) => (
  <svg
    width={width || '11'}
    height={height || '11'}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M10.2812 5.09375H5.90625V0.71875C5.90625 0.609375 5.79688 0.5 5.6875 0.5H4.8125C4.67578 0.5 4.59375 0.609375 4.59375 0.71875V5.09375H0.21875C0.0820312 5.09375 0 5.20312 0 5.3125V6.1875C0 6.32422 0.0820312 6.40625 0.21875 6.40625H4.59375V10.7812C4.59375 10.918 4.67578 11 4.8125 11H5.6875C5.79688 11 5.90625 10.918 5.90625 10.7812V6.40625H10.2812C10.3906 6.40625 10.5 6.32422 10.5 6.1875V5.3125C10.5 5.20312 10.3906 5.09375 10.2812 5.09375Z"
      fill={fill || '#242E39'}
    />
  </svg>
)

export default PlusIcon