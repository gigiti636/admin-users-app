import type { InputHTMLAttributes } from 'react';
import sc from 'styled-components';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
}

const Container = sc.div`
  text-align: left;
  margin-bottom: 10px;
  width: 100%;
`;

const Input = sc.input`
  width: 100%;
  border: 1px solid #ececec;
  height: 33px;
  box-sizing: border-box;
  font-size: 1.1rem;
  padding-left: 8px;
  padding-right: 8px;
  &::placeholder {
    color: grey;
  }
`;

const Label = sc.label`
  color: grey;
  font-size: 0.95rem;
`;

export const FormInput = ({ label, placeholder, ...rest }: FormInputProps) => (
  <Container>
    <Label>{label}:</Label>
    <Input type="text" placeholder={placeholder} {...rest} />
  </Container>
);
