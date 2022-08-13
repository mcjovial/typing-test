import React from 'react'

const Input = ({ style, type, name, list, id, onChange}) => {
  return (
    <input
      id={id}
      type={type}
      list={list}
      name={name}
      className={style}
      onChange={onChange}
    />
  )
}

export default Input