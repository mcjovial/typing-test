import React from 'react'

const Button = ({ name, onClick, style }) => {
  return (
    <button className={style} onClick={onClick} >
      {name}
    </button>
  )
}

export default Button