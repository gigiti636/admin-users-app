import { useCallback, useEffect, useReducer, useState } from 'react';
import { AppPage } from '@/components/Layout';
import { List } from './List';
import { Section, CallToActionMessage } from './Section';
import ErrorComponent from '@/components/ErrorComponent';
import useFetchUsers from '@/App/useFetchUsers';
import { reducer, InitialState, ActionTypes } from './usersReducer';

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

  return (
    <AppPage>
      <List
        loading={loading}
        users={state.users ?? []}
        selectedID={idSelected}
        selectionHandler={(id) => setIdSelected(id)}
      />
      {idSelected.length > 0 ? (
        <Section user={state.users.find((user) => user.id === idSelected)!} />
      ) : (
        <CallToActionMessage />
      )}
      {state.error && !loading && <ErrorComponent error={state.error} handlerClear={ResetError} />}
    </AppPage>
  );
};

export default App;
