import { Avatar } from '@/components/Avatar';
import { UserModel } from '@/App/types';
import sc from 'styled-components';
import { breakpoints } from '@/theme/breakpoints';
import { memo } from 'react';

const AvatarWrapper = sc.div`
  padding: 10px 5px 10px 5px;
`;

const UserName = sc.a<{ selected?: boolean }>`
    font-weight: bold;
    text-decoration: none;
    color: ${(props) => (props.selected ? 'white' : 'black')};
`;
const UserEmail = sc.div<{ selected?: boolean }>`
  font-size: 0.9rem;
  color:  ${(props) => (props.selected ? 'lightgray!important' : props.theme.text.secondary)};
`;
const UserDetails = sc.div`
  padding: 10px 5px 10px 5px;
  display: none;
  overflow: hidden;
  margin-left: 12px;
  flex-grow: 1;
  @media only screen and (${breakpoints.desktop}) {
    display: inline-block;
  }

`;

const UserItemWrapper = sc.li<{ selected: boolean }>`
  display: flex;
  align-items: center;
  background-color: transparent;
  transition: background-color 0.3s ease-in;
  cursor: pointer;
  min-height: 80px;
  background-color:  ${(props) =>
    props.selected ? `${props.theme.colors.primary}!important` : 'transparent'};
  &:hover {
    background-color:  ${(props) => props.theme.colors.secondaryDark};
  }
  &:active {
    background-color: #3989d5;
  }
  
    &:hover {
      ${UserEmail} {
        color: ${(props) => props.theme.text.secondary};
      }
      ${UserName} {
        color: ${(props) => (props.selected ? 'white' : 'black')};
      }
    }
`;

interface UserItemProps {
  user: UserModel;
  isSelected?: boolean;
  clickHandler?: (_id: string) => void;
}
export const MemoizedItem = memo(function UserItem({
  user,
  isSelected = false,
  clickHandler,
}: UserItemProps) {
  const handleClick = () => {
    if (clickHandler) clickHandler(user.id);
  };
  return (
    <UserItemWrapper onClick={handleClick} selected={isSelected} title={user.name}>
      <AvatarWrapper>
        <Avatar photo={user.photo} alt={user.name} size={'82px'} />
      </AvatarWrapper>
      <UserDetails role="group" aria-labelledby="user-details">
        <UserName href="#" role="link" selected={isSelected}>
          {user.name}
        </UserName>
        <UserEmail selected={isSelected}>{user.email}</UserEmail>
      </UserDetails>
    </UserItemWrapper>
  );
});
