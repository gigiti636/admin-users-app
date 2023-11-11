import sc from 'styled-components';
import { UserForm } from '@/components/UserForm';
import type { UserModel } from '@/App/types';

interface SectionProps {
  selectedID: string;
  user: UserModel;
}

export const Section = ({ selectedID, user }: SectionProps) => {
  return (
    <SectionWrapper>
      {selectedID.length === 0 ? <Message>Select a user from the list</Message> : <UserForm user={user} />}
    </SectionWrapper>
  );
};

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
