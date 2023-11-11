import sc from 'styled-components';
import type { UserModel } from '@/App/types';
import { validateName, validatePhone, validateEmail } from '@/App/types';
import { MemoizedInput } from '@/components/FormInput';
import { SyntheticEvent, useEffect, useState } from 'react';

const SectionWrapper = sc.div`
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
`;
const Message = sc.span`
 color: ${(props) => props.theme.text.secondary};
`;

const SaveButton = sc.button<{ isdirty: 'yes' | 'no' }>`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  opacity: ${(props) => (props.isdirty === 'yes' ? 1 : 0.7)};
  pointer-events: ${(props) => (props.isdirty === 'yes' ? 'all' : 'none')};
  &:active {
    background-color: #3989d5;
  }
`;

const CancelButton = sc.button`
  background-color: ${(props) => props.theme.colors.secondaryLight};
  color: ${(props) => props.theme.text.main};;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  type: button;
  fontWeight: bold;
  font-size: 16px;
  margin-right: 12px;
  &:active {
      background-color: ${(props) => props.theme.colors.secondaryMain};
  }
`;
const BtnWrapper = sc.div`
  display: flex;
  justify-content: flex-end;
  width: 100%
`;

type ValidatorFunction = (_value: string) => string;
interface FormFieldState {
  [key: string]: { value: string; message: string; validator: ValidatorFunction | null };
}

interface SectionProps {
  user: UserModel;
  handleUpdate: (_data: Partial<UserModel>) => void;
}
export const Section = ({ user, handleUpdate }: SectionProps) => {
  const { name, email, phone, address, company } = user;

  const initialFormState = {
    name: { value: name, message: '', validator: validateName },
    email: { value: email, message: '', validator: validateEmail },
    phone: { value: phone, message: '', validator: validatePhone },
    address: { value: address, message: '', validator: null },
    company: { value: company, message: '', validator: null },
  };

  const [formState, setFormState] = useState<FormFieldState>(initialFormState);

  const handleInputChange = (value: string, for_key: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [for_key]: {
        ...prevState[for_key],
        value: value.trim(),
        message: prevState[for_key]?.validator ? prevState[for_key].validator!(value) : '',
      },
    }));
  };

  useEffect(() => {
    resetForm();
  }, [user]);

  const validateForm = () => {
    let isFormValid = true;
    const updatedFormState: FormFieldState = {};

    Object.keys(formState).forEach((formField) => {
      if (formState[formField]?.validator) {
        const validationMessage = formState[formField].validator!(formState[formField].value);

        updatedFormState[formField] = {
          ...formState[formField],
          message: validationMessage,
        };

        if (validationMessage) {
          isFormValid = false;
        }
      }
    });

    // Update the form state in bulk
    setFormState((prevState) => ({
      ...prevState,
      ...updatedFormState,
    }));

    return isFormValid;
  };

  const UpdateHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    if (isdirty && validateForm()) {
      const formData = Object.fromEntries(
        Object.entries(formState).map(([field, data]) => [field, data.value]),
      );

      formData.id = user.id;
      handleUpdate(formData);
    }
  };
  const resetForm = () => {
    setFormState(initialFormState);
  };

  const isdirty =
    JSON.stringify({
      name: formState.name.value,
      email: formState.email.value,
      phone: formState.phone.value,
      address: formState.address.value,
      company: formState.company.value,
    }) !==
    JSON.stringify({
      name: user.name,
      email: email,
      phone: phone,
      address: address,
      company: company,
    });
  return (
    <SectionWrapper>
      <form onSubmit={(event) => UpdateHandler(event)} style={{ width: '100%' }}>
        <MemoizedInput
          label={'Name'}
          placeholder={'Enter Name'}
          value={formState.name.value}
          name={'name'}
          error_message={formState['name'].message}
          has_error={formState['name'].message.length > 0}
          onChange={(event) => handleInputChange(event.target.value, 'name')}
        />
        <MemoizedInput
          required
          label={'Email'}
          placeholder={'Enter Email'}
          value={formState.email.value}
          name={'email'}
          error_message={formState['email'].message}
          has_error={formState['email'].message.length > 0}
          onChange={(event) => handleInputChange(event.target.value, 'email')}
        />
        <MemoizedInput
          label={'Phone'}
          placeholder={'Enter Phone'}
          value={formState.phone.value}
          name={'phone'}
          error_message={formState['phone'].message}
          has_error={formState['phone'].message.length > 0}
          onChange={(event) => handleInputChange(event.target.value, 'phone')}
        />
        <MemoizedInput
          label={'Address'}
          placeholder={'Enter Address'}
          value={formState.address.value}
          name={'address'}
          onChange={(event) => handleInputChange(event.target.value, 'address')}
        />
        <MemoizedInput
          label={'Company'}
          placeholder={'Enter Company'}
          value={formState.company.value}
          name={'company'}
          onChange={(event) => handleInputChange(event.target.value, 'company')}
        />
        <BtnWrapper>
          {isdirty && <CancelButton onClick={resetForm}>Cancel</CancelButton>}

          <SaveButton isdirty={isdirty ? 'yes' : 'no'} disabled={!isdirty}>
            Save
          </SaveButton>
        </BtnWrapper>
      </form>
    </SectionWrapper>
  );
};

export const CallToActionMessage = () => {
  return (
    <SectionWrapper>
      <Message>Select a user from the list</Message>
    </SectionWrapper>
  );
};
