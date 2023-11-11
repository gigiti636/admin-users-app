import { Avatar } from '@/components/Avatar';
import { UserModel } from '@/App/types';
import sc from 'styled-components';
import { breakpoints } from '@/theme/breakpoints';
import { memo, useEffect } from 'react';

const AvatarWrapper = sc.div`
  padding: 10px 5px 10px 5px;
`;

const UserName = sc.div<{ selected?: boolean }>`
    font-weight: bold;
   
`;
const UserEmail = sc.div<{ selected?: boolean }>`
  font-size: 0.9rem;
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

  &:hover {
    ${UserEmail} {
      color: ${(props) => props.theme.text.secondary};
    }
    ${UserName} {
      color: white;
    }
  }
`;

const UserItemWrapper = sc.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  background-color: transparent;
  transition: background-color 0.3s ease-in;
  cursor: pointer;
  min-height: 80px;
  background-color:  ${(props) => (props.selected ? `${props.theme.colors.secondaryMain}` : 'transparent')};
  &:hover {
    background-color:  ${(props) => props.theme.colors.primary};
  }
  &:active {
    background-color: #3989d5;
  }
`;

interface UserItemProps {
  user: UserModel;
  isSelected: boolean;
  clickHandler: (_id: string) => void;
}
export const MemoizedItem = memo(function UserItem({
  user,
  isSelected = false,
  clickHandler,
}: UserItemProps) {
  useEffect(() => {
    console.log('rendered');
  }, [isSelected]);

  return (
    <UserItemWrapper onClick={() => clickHandler(user.id)} selected={isSelected} title={user.name}>
      <AvatarWrapper>
        <Avatar photo={user.photo} alt={user.name} size={'60px'} />
      </AvatarWrapper>
      <UserDetails>
        <UserName selected={isSelected}>{user.name}</UserName>
        <UserEmail selected={isSelected}>{user.email}</UserEmail>
      </UserDetails>
    </UserItemWrapper>
  );
});
