import React from 'react'

const Button = ({ name, onClick, type }) => {
  return (
    <button className={`btn btn-circle btn-outline-${type}`} onClick={onClick} >
      {name}
    </button>
  )
}

export default Button