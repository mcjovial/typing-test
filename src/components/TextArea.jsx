import React from 'react'

const TextArea = ({ size, name, rows, cols, onChange, defaultValue }) => {
  return (
    <textarea
    className={`col-md-${size} rounded lead`}
    name={name}
    rows={rows}
    cols={cols}
    onChange={onChange}
    defaultValue={defaultValue}
  ></textarea>

  )
}

export default TextArea