import React, { useState } from "react";
import { formFileds } from "./form-data";
import shortid from "shortid";

function arrayToObject(obj) {
  return Object.keys(obj).map((key) => ({
    ...obj[key],
    name: key,
  }));
}

function transformObject(obj) {
  return Object.keys(obj).reduce((acc, cur) => {
    acc[cur] = {
      ...obj[cur],
      _id: shortid.generate(),
      value: "",
    };

    return acc;
  }, {});
}

function DynamicForm() {
  const [fieldState, setFieldState] = useState(transformObject(formFileds));
  const formData = arrayToObject(fieldState);

  function handleChange(e) {
    setFieldState({
      ...fieldState,
      [e.target.name]: {
        ...fieldState[e.target.name],
        value: e.target.value,
      },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {formData.map((item) => (
          <div key={item._id}>
            <label htmlFor={item.name}> {item.label} </label>
            <input
              id={item.name}
              name={item.name}
              placeholder={item.placeholder}
              type={item.type}
              value={fieldState[item.name].value}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicForm;
