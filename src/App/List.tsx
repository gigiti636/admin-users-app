import sc from 'styled-components';
import { breakpoints } from '@/theme/breakpoints';
import { UserModel } from '@/App/types';
import { LoadingList } from '@/components/LoadingList';
import { MemoizedItem } from '@/components/UserItem';
import { useEffect, useRef } from 'react';

interface UserListProps {
  loading: boolean;
  users: UserModel[];
  selectedID: string;
  selectionHandler: (_id: string) => void;
}
export const List = ({ loading, users, selectionHandler, selectedID }: UserListProps) => {
  const myElementRef = useRef<HTMLDivElement | null>(null);

  // Use useEffect to get the height after the component has rendered
  useEffect(() => {
    // Ensure the ref has been assigned to a DOM element
    if (myElementRef.current) {
      // Access the height of the DOM element
      const elementHeight = myElementRef.current?.offsetHeight;
      console.log('Element height:', elementHeight);
    }
  }, [myElementRef, window.screen]);

  return (
    <UserListWrapper>
      {loading ? (
        <LoadingList times={5} />
      ) : (
        <ItemsWrapper ref={myElementRef}>
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

export const UserListWrapper = sc.div`
    width: 100%;
    height: 100%;
    max-width: 90px;
    overflow-y: scroll;
    @media only screen and ${breakpoints.desktop} {
        max-width: 50%;
    }
`;
export const ItemsWrapper = sc.div`
    display: flex;
    flex-direction: column;
`;
