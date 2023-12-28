import { useState } from "react";

export const useFormFields = (initialValues) => {
  const [fields, setFields] = useState(initialValues);
  const changeField = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };
  const clearForm = () => {
    setFields(initialValues);
  };
  return { fields, changeField, clearForm };
};