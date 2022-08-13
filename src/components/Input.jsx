import React from 'react'

const Input = ({ size, type, name, list, id, onChange}) => {
  return (
    <input
      id={id}
      type={type}
      list={list}
      name={name}
      className={`col-md-${size}`}
      onChange={onChange}
    />
  )
}

export default Input