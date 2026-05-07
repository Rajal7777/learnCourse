import { useState } from "react";

export default function useInput(defaultValue, validationFn) {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

    function handleInputChange(event) {
        setEnteredValue(event.target.value);
        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true)
    }

    function handleReset() {
        setEnteredValue(defaultValue);
        setDidEdit(false);
    }

    return{
        value: enteredValue,
        handleInputBlur,
        handleInputChange,
        handleReset,
        hasError: didEdit && !valueIsValid
    }
}