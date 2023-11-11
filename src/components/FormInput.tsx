import type { InputHTMLAttributes } from 'react';
import sc from 'styled-components';
import { memo } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  error_message?: string;
  has_error?: boolean;
}

const Container = sc.div`
  text-align: left;
  margin-bottom: 10px;
  width: 100%;
`;

const Input = sc.input<{ has_error: 'yes' | 'no' }>`
  width: 100%;
  border: ${(props) =>
    props.has_error === 'yes' ? `1px solid red` : `1px solid ${props.theme.colors.secondaryLight}`};
  height: 40px;
  box-sizing: border-box;
  font-size: 1.1rem;
  padding-left: 8px;
  padding-right: 8px;
  color:   ${(props) => `${props.theme.text.main}`};
  &::placeholder {
    color: grey;
  }
  &:focus-within {
    outline-color: ${(props) => `${props.theme.colors.secondaryDark}`};
     box-shadow: ${(props) =>
       props.has_error === 'yes'
         ? `0px 0px 2px 1px ${props.theme.colors.secondaryLight}`
         : `0px 0px 2px 1px #72a0ea`};
  }
`;

const Label = sc.label`
  color: grey;
  font-size: 0.95rem;
`;
const ErrorMessage = sc.small`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 0;
`;

export const MemoizedInput = memo(function FormInput({
  label,
  placeholder,
  error_message,
  has_error = false,
  ...rest
}: FormInputProps) {
  return (
    <Container>
      <Label>{label}:</Label>
      <Input type="text" placeholder={placeholder} {...rest} has_error={has_error ? 'yes' : 'no'} />
      {has_error && <ErrorMessage>{error_message}</ErrorMessage>}
    </Container>
  );
});
