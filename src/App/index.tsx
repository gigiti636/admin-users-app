import { useState } from 'react';
//components
import { AppPage } from '@/components/Layout';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { CallToActionMessage } from '@/components/Message';
import { SectionWrapper } from '@/components/SectionWrapper';
//App components
import { UserList } from './UserList';
import { UserForm } from './UserForm';
//types
import { UserModel } from './types';
//data slice
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
        <UserList
          fetching={fetching}
          users={users ?? []}
          selectedID={idSelected}
          selectionHandler={(id) => setIdSelected(id)}
        />
        <SectionWrapper>
          {selected_user ? (
            <UserForm user={selected_user} handleUpdate={UpdateUser} />
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
