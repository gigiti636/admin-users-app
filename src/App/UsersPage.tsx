import { useEffect, useState } from 'react';
import { AppPage } from '@/components/Layout';
import { List } from './List';
import { Section } from './Section';
import ErrorComponent from '@/components/ErrorComponent';
import useFetchUsers from '@/App/useFetchUsers';

const App = () => {
  const [idSelected, setIdSelected] = useState<string>('');
  const { users, loading, error, invalidateCache, clearError } = useFetchUsers({
    cacheDurationSeconds: 60,
    onData: () => {
      console.log('New data fetched!');
    },
  });

  useEffect(() => {
    invalidateCache();
  }, []);

  console.log(users, loading, error);

  return (
    <AppPage>
      <List
        loading={loading}
        users={users}
        selectedID={idSelected}
        selectionHandler={(id) => setIdSelected(id)}
      />
      <Section selectedID={idSelected} user={users.find((user) => user.id === idSelected)!} />
      {error && !loading && <ErrorComponent error={error} handlerClear={clearError} />}
    </AppPage>
  );
};

export default App;
