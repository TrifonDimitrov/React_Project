import { useState } from "react";

export function useForm(initionValues, submitCallback) {
  const [value, setValue] = useState({ ...initionValues });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValue((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const resetForm = () => setValue({ ...initionValues });

  const submitHandler = (e) => {
    e.preventDefault();
    submitCallback(value);
    resetForm();
  };

  return {
    value,
    changeHandler,
    submitHandler,
    resetForm,
  };
}
