import React from 'react'

const Input = ({ size, type, name, list, id, onChange, placeholder }) => {
  return (
    <input
      id={id}
      type={type}
      list={list}
      name={name}
      placeholder={placeholder}
      className={`col-md-${size}`}
      onChange={onChange}
    />
  )
}

export default Input