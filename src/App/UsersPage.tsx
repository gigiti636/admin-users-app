import { useCallback, useEffect, useReducer, useState } from 'react';
import { AppPage } from '@/components/Layout';
import { List } from './List';
import { Section, CallToActionMessage } from './Section';
import ErrorComponent from '@/components/ErrorComponent';
import useFetchUsers from '@/App/useFetchUsers';
import { reducer, InitialState, ActionTypes } from './usersReducer';
import { UserModel } from '@/App/types';
import api from '@/api';

const App = () => {
  const [idSelected, setIdSelected] = useState<string>('');

  const { loading, error, invalidateCache } = useFetchUsers({
    cacheDurationSeconds: 60,
    onData: (data) => {
      dispatch({
        type: ActionTypes.INITIALIZE_USERS,
        payload: data,
      });
    },
  });

  const [state, dispatch] = useReducer(reducer, InitialState);
  console.log(state);

  const ResetError = useCallback(() => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  }, []);
  useEffect(() => {
    if (error) dispatch({ type: ActionTypes.SET_ERROR, payload: error });
  }, [error]);

  useEffect(() => {
    invalidateCache();
  }, [invalidateCache]);

  const selected_user = state.users.find((user) => user.id === idSelected);

  const UpdateUser = async (payload: Partial<UserModel>) => {
    const { id, ...rest } = payload;

    const { status } = await api.put(`/users/${id}`, rest);
    if (status && status < 300) {
      await dispatch({ type: ActionTypes.UPDATE_USER, payload: payload });
    }
  };

  return (
    <AppPage>
      <List
        loading={loading}
        users={state.users ?? []}
        selectedID={idSelected}
        selectionHandler={(id) => setIdSelected(id)}
      />
      {idSelected.length > 0 && selected_user ? (
        <Section user={selected_user} handleUpdate={UpdateUser} />
      ) : (
        <CallToActionMessage />
      )}
      {state.error && !loading && <ErrorComponent error={state.error} handlerClear={ResetError} />}
    </AppPage>
  );
};

export default App;
