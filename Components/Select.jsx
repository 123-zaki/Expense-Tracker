import React from "react";

export default function Select({
  id,
  label,
  value,
  onChange,
  defaultOption,
  options = [],
  error,
}) {
  return (
    <div className="input-label-container">
      <label htmlFor={id}>{label}</label>
      <select
        name={id}
        id={id}
        value={value}
        // defaultValue={""}
        // required={true}
        // onChange={(e) => setExpense({...expense, category: e.target.value})}
        onChange={onChange}
        // ref={categoryRef}
      >
        {defaultOption && (
          <option value="" disabled hidden>
            {defaultOption}
          </option>
        )}

        {options.map((opt, ind) => (
          <option key={ind} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
