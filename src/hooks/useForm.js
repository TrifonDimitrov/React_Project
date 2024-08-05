import { useState } from "react";

export function useForm (initionValues, submitCallback ) {
    const [values, setValues] = useState(initionValues);

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.values

        }));
    }

    const submitHandler = (e) => {
        e.preventDefault();

        submitCallback(values);

    }

    return {
        values, 
        changeHandler,
        submitHandler,
    };
}