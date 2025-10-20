import React from 'react'

const Input = React.forwardRef(function Input(
  { label, type, placeholder, id, value, onChange, error },
  ref
) {
  return (
    <div className="input-label-container">
          <label htmlFor={id}>{label}</label>
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            value={value}
            // required={true}
            name={id}
            // onChange={(e) => setExpense({...expense, title: e.target.value})}
            onChange={onChange}
            // ref={titleRef}
            ref={ref}
          />
          {
            error && <p className="error">{error}</p>
          }
        </div>
  )
})

export default Input
