import React from 'react'

const TextArea = ({ style, name, rows, cols, onChange, defaultValue }) => {
  return (
    <textarea
    className={style}
    name={name}
    rows={rows}
    cols={cols}
    onChange={onChange}
    defaultValue={defaultValue}
  ></textarea>

  )
}

export default TextArea