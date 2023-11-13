import sc from 'styled-components';
import type { UserModel } from '@/App/types';
import { validateEmail, validateName, validatePhone } from './validators';
import { MemoizedInput } from '@/components/FormInput';
import { SyntheticEvent, useEffect } from 'react';
import { useForm } from '@/util/useFormValidation';
import { breakpoints } from '@/theme/breakpoints';

export const SectionWrapper = sc.section`
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    padding-left: 17px;
    padding-right: 17px;
    position: relative;
    margin-left:auto;
    margin-right:auto;
    margin-top:30px;
    flex: 1;
       @media only screen and ${breakpoints.desktop} {
           margin-top:unset;
           justify-content: center;
           padding-left: 35px;
           padding-right: 35px;
   }
        
`;
const Message = sc.span`
 color: ${(props) => props.theme.text.secondary};
`;

const SaveButton = sc.button<{ isDirty: 'yes' | 'no' }>`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  opacity: ${(props) => (props.isDirty === 'yes' ? 1 : 0.7)};
  pointer-events: ${(props) => (props.isDirty === 'yes' ? 'all' : 'none')};
  &:active {
    background-color: #4d93d7;
  }
`;

const CancelButton = sc.button`
  background-color: ${(props) => props.theme.colors.secondaryMain};
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
      background-color: ${(props) => props.theme.colors.secondaryDark};
  }
`;
const BtnWrapper = sc.div`
  display: flex;
  justify-content: flex-end;
  width: 100%
`;

interface SectionProps {
  user: UserModel;
  handleUpdate: (_data: Partial<UserModel>) => void;
}
export const UserForm = ({ user, handleUpdate }: SectionProps) => {
  const { name, email, phone, address, company } = user;

  const initialFormState = {
    name: { value: name, message: '', validator: validateName },
    email: { value: email, message: '', validator: validateEmail },
    phone: { value: phone, message: '', validator: validatePhone },
    address: { value: address, message: '', validator: null },
    company: { value: company, message: '', validator: null },
  };

  const { formState, handleInputChange, validateForm, isDirty, resetForm } = useForm(initialFormState);

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const UpdateHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    if (isDirty && validateForm()) {
      const formData = Object.fromEntries(
        Object.entries(formState).map(([field, data]) => [field, data.value]),
      );

      formData.id = user.id;
      handleUpdate(formData);
    }
  };

  return (
    <form onSubmit={(event) => UpdateHandler(event)} style={{ width: '100%' }}>
      <MemoizedInput
        id={'name-input'}
        label={'Name'}
        placeholder={'Enter Name'}
        value={formState.name.value}
        name={'name'}
        error_message={formState['name'].message}
        has_error={formState['name'].message.length > 0}
        onChange={(event) => handleInputChange(event.target.value, 'name')}
      />
      <MemoizedInput
        id={'email-input'}
        label={'Email'}
        placeholder={'Enter Email'}
        value={formState.email.value}
        name={'email'}
        error_message={formState['email'].message}
        has_error={formState['email'].message.length > 0}
        onChange={(event) => handleInputChange(event.target.value, 'email')}
      />
      <MemoizedInput
        id={'phone-input'}
        label={'Phone'}
        placeholder={'Enter Phone'}
        value={formState.phone.value}
        name={'phone'}
        error_message={formState['phone'].message}
        has_error={formState['phone'].message.length > 0}
        onChange={(event) => handleInputChange(event.target.value, 'phone')}
      />
      <MemoizedInput
        id={'address-input'}
        label={'Address'}
        placeholder={'Enter Address'}
        value={formState.address.value}
        name={'address'}
        onChange={(event) => handleInputChange(event.target.value, 'address')}
      />
      <MemoizedInput
        id={'company-input'}
        label={'Company'}
        placeholder={'Enter Company'}
        value={formState.company.value}
        name={'company'}
        onChange={(event) => handleInputChange(event.target.value, 'company')}
      />
      <BtnWrapper>
        {isDirty && (
          <CancelButton onClick={resetForm} aria-label="Cancel-edit-form">
            Cancel
          </CancelButton>
        )}

        <SaveButton isDirty={isDirty ? 'yes' : 'no'} disabled={!isDirty} aria-label="submit-form">
          Save
        </SaveButton>
      </BtnWrapper>
    </form>
  );
};

interface CallToActionMessageProps {
  message?: string;
}
export const CallToActionMessage = ({ message }: CallToActionMessageProps) => {
  return <Message>{message ? message : 'Select a user from the list'}</Message>;
};
