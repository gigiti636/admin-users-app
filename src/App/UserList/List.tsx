import sc from 'styled-components';
import { breakpoints } from '@/theme/breakpoints';
import { UserModel } from '@/App/types';
import { LoadingList } from '@/App/UserList/LoadingList';
import { MemoizedItem } from '@/components/UserItem';

interface UserListProps {
  fetching: boolean;
  users: UserModel[];
  selectedID: string;
  selectionHandler: (_id: string) => void;
}
export const List = ({ fetching, users = [], selectionHandler, selectedID }: UserListProps) => {
  return (
    <UserListWrapper>
      {fetching ? (
        <LoadingList times={7} />
      ) : (
        <ItemsWrapper>
          {users.map((user) => (
            <MemoizedItem
              key={user.id}
              user={user}
              clickHandler={(id: string) => selectionHandler(id)}
              isSelected={selectedID === user.id}
            />
          ))}
        </ItemsWrapper>
      )}
    </UserListWrapper>
  );
};

export const UserListWrapper = sc.aside`
    width: 100%;
    height: 100%;
    max-width: 90px;
    overflow-y: scroll;
    @media only screen and ${breakpoints.desktop} {
        max-width: 50%;
    }
`;
export const ItemsWrapper = sc.ul`
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    margin-top: 0;
`;
