import sc from 'styled-components';
import { UserForm } from '@/components/UserForm';
import type { UserModel } from '@/App/types';
import { FormInput } from '@/components/FormInput';

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

const SaveButton = sc.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
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
  fontWeight: bold;
  font-size: 16px;
  margin-right: 20px;
  &:active {
      background-color: ${(props) => props.theme.colors.secondaryMain};
  }
`;
const BtnWrapper = sc.div`
  display: flex;
  justify-content: flex-end;
  width: 100%
`;

interface SectionProps {
  user: UserModel;
}
export const Section = ({ user }: SectionProps) => {
  return (
    <SectionWrapper>
      <FormInput label={'Name'} placeholder={'Enter Name'} />
      <FormInput label={'Email'} placeholder={'Enter Email'} />
      <FormInput label={'Phone'} placeholder={'Enter Phone'} />
      <FormInput label={'Address'} placeholder={'Enter Address'} />
      <FormInput label={'Company'} placeholder={'Enter Company'} />
      <BtnWrapper>
        <CancelButton>Cancel</CancelButton>
        <SaveButton>Save</SaveButton>
      </BtnWrapper>

      {/*  <UserForm user={user} />*/}
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
