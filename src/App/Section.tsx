import sc from 'styled-components';
import { UserForm } from '@/components/UserForm';
import type { UserModel } from '@/App/types';

const SectionWrapper = sc.div`
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Message = sc.span`
 color: ${(props) => props.theme.text.secondary};
`;

interface SectionProps {
  user: UserModel;
}
export const Section = ({ user }: SectionProps) => {
  return (
    <SectionWrapper>
      <UserForm user={user} />
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
