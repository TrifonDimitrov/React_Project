import { useState } from "react";

export function useForm(initionValues, submitCallback) {
  const [value, setValue] = useState(initionValues);

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    submitCallback(value);
  };

  return {
    value,
    changeHandler,
    submitHandler,
  };
}
