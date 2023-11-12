import { useCallback, useEffect, useReducer, useState } from 'react';

import { List } from './List';
import { Section, CallToActionMessage } from './Section';

import { AppPage } from '@/components/Layout';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';

import useFetchUsers from './useFetchUsers';
import { reducer, InitialState, ActionTypes } from './usersReducer';
import { UserModel } from './types';

import api from '@/api';

const App = () => {
  const [idSelected, setIdSelected] = useState<string>('');

  const { loading, error, invalidateCache, updateCache } = useFetchUsers({
    cacheDurationSeconds: 600,
    onData: (data) => {
      dispatch({
        type: ActionTypes.INITIALIZE_USERS,
        payload: data,
      });
    },
  });

  const [state, dispatch] = useReducer(reducer, InitialState);

  const ResetError = useCallback(() => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  }, []);
  useEffect(() => {
    if (error) dispatch({ type: ActionTypes.SET_ERROR, payload: error });
  }, [error]);

  useEffect(() => {
    //invalidateCache();
  }, [invalidateCache]);

  const selected_user = state.users.find((user) => user.id === idSelected);

  const UpdateUser = async (payload: Partial<UserModel>) => {
    await dispatch({ type: ActionTypes.SET_UPDATING_USER, payload: true });
    const { id, ...rest } = payload;

    const { status } = await api.put(`/users/${id}`, rest);
    if (status && status < 300) {
      await dispatch({ type: ActionTypes.UPDATE_USER, payload: payload });
    }
    await dispatch({ type: ActionTypes.SET_UPDATING_USER, payload: false });

    const updatedUsers = state.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...rest };
      }
      return user;
    });
    updateCache(updatedUsers);
  };

  return (
    <AppPage>
      <List
        loading={loading}
        users={state.users ?? []}
        selectedID={idSelected}
        selectionHandler={(id) => setIdSelected(id)}
      />
      {selected_user ? <Section user={selected_user} handleUpdate={UpdateUser} /> : <CallToActionMessage />}
      {state.usersUpdating && <Loader />}
      {state.error && !loading && <ErrorMessage error={state.error} handlerClear={ResetError} />}
    </AppPage>
  );
};

export default App;
