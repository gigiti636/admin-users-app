import { useState } from 'react';

import { AppPage } from '@/components/Layout';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';

import { List } from './UserList/List';
import { CallToActionMessage, Section, SectionWrapper } from './UserSection/Section';

import { UserModel } from './types';
import { useUserSlice } from './userSlice';

const App = () => {
  const [idSelected, setIdSelected] = useState<string>('');

  const { users, usersUpdating, error, updateUserHandler, clearError, fetching } = useUserSlice();

  const UpdateUser = async (payload: Partial<UserModel>) => {
    await updateUserHandler(payload);
  };

  const selected_user = users.find((user) => user.id === idSelected);
  return (
    <AppPage>
      <>
        <List
          fetching={fetching}
          users={users ?? []}
          selectedID={idSelected}
          selectionHandler={(id) => setIdSelected(id)}
        />
        <SectionWrapper>
          {selected_user ? (
            <Section user={selected_user} handleUpdate={UpdateUser} />
          ) : (
            <CallToActionMessage message={fetching ? 'Fetching users' : ''} />
          )}
          {usersUpdating && <Loader />}
        </SectionWrapper>
      </>

      {error && !fetching && <ErrorMessage error={error} handlerClear={clearError} />}
    </AppPage>
  );
};

export default App;
