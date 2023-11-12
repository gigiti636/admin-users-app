import { useState } from 'react';

interface FormFieldState {
  value: string;
  message: string;
  validator: ((_value: string) => string) | null;
}

interface FormState {
  [key: string]: FormFieldState;
}

export const useForm = (
  initialValues: Record<string, { value: string; validator: ((_value: string) => string) | null }>,
) => {
  const [formState, setFormState] = useState<FormState>(() => {
    const initialFormState: FormState = {};
    Object.keys(initialValues).forEach((key) => {
      initialFormState[key] = {
        value: initialValues[key].value,
        message: '',
        validator: initialValues[key].validator,
      };
    });
    return initialFormState;
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleInputChange = (value: string, fieldName: string) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [fieldName]: {
        ...prevFormState[fieldName],
        value,
        message: prevFormState[fieldName]?.validator ? prevFormState[fieldName].validator!(value) : '',
      },
    }));
    setIsDirty(true);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const updatedFormState: FormState = {};

    Object.keys(formState).forEach((fieldName) => {
      const validator = formState[fieldName].validator;
      const value = formState[fieldName].value;
      const validationMessage = validator ? validator(value) : '';

      updatedFormState[fieldName] = {
        ...formState[fieldName],
        message: validationMessage,
      };

      if (validationMessage) {
        isValid = false;
      }
    });

    setFormState((prevFormState) => ({
      ...prevFormState,
      ...updatedFormState,
    }));

    return isValid;
  };

  const resetForm = () => {
    setFormState(() => {
      const resetFormState: FormState = {} as FormState;
      Object.keys(initialValues).forEach((key) => {
        resetFormState[key] = {
          value: initialValues[key].value,
          message: '',
          validator: initialValues[key].validator,
        };
      });
      return resetFormState;
    });

    setIsDirty(false);
  };

  return { formState, handleInputChange, validateForm, isDirty, resetForm };
};
