import sc from 'styled-components';

const Message = sc.span`
 color: ${(props) => props.theme.text.secondary};
`;

interface CallToActionMessageProps {
  message?: string;
}
export const CallToActionMessage = ({ message }: CallToActionMessageProps) => {
  return <Message data-testid={'user_prompt'}>{message ? message : 'Select a user from the list'}</Message>;
};
