import React from 'react'

const Button = ({ name, onClick, type, disabled }) => {
  return (
    <button className={`btn btn-circle btn-outline-${type}`} disabled={disabled} onClick={onClick} >
      {name}
    </button>
  )
}

export default Button