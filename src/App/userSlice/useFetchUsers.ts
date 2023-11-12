import { useCallback, useState } from 'react';
import api from '@/api';
import { UserModel } from '../types';
import { getLocalStorage, updateLocalStorage } from '@/util/localStorage';

interface useFetchUsersProps {
  cacheDurationSeconds?: number;
  onData?: (_data: UserModel[]) => void;
}

export const cacheKey = 'cachedUsers';

interface FetchUsersResult {
  users: UserModel[];
  fetching: boolean;
  fetchErr: string | null;
  refetch: () => void;
  updateCache: (_data: UserModel[]) => void;
  fetchUsers: () => void;
}

const useFetchUsers = ({ cacheDurationSeconds, onData }: useFetchUsersProps = {}): FetchUsersResult => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setError(null);
      setFetching(true);

      if (cacheDurationSeconds) {
        const cachedData = getLocalStorage<UserModel[]>(cacheKey, []);
        const cacheTimestamp = getLocalStorage<string>(`${cacheKey}_timestamp`, '');

        if (cachedData && cacheTimestamp) {
          const currentTime = new Date().getTime();
          const cacheTime = new Date(parseInt(cacheTimestamp)).getTime();

          if (currentTime - cacheTime < cacheDurationSeconds * 1000) {
            setUsers(cachedData);
            if (onData) {
              onData(cachedData);
            }
            setFetching(false);
            return;
          }
        }
      }

      const { data } = await api.get<UserModel[]>('/users');
      if (data) {
        setUsers(data);
        if (onData) {
          onData(data);
        }
        if (cacheDurationSeconds) {
          updateLocalStorage(cacheKey, data);
          updateLocalStorage(`${cacheKey}_timestamp`, new Date().getTime().toString());
        }
      } else {
        setError('Error fetching users');
      }
    } catch (error) {
      setError('Error fetching users');
    } finally {
      setFetching(false);
    }
  }, [cacheDurationSeconds]);

  const refetch = useCallback(() => {
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(`${cacheKey}_timestamp`);

    fetchUsers();
  }, [fetchUsers]);

  const updateCache = useCallback((data: UserModel[]) => {
    updateLocalStorage(cacheKey, data);
  }, []);

  return { users, fetching, refetch, updateCache, fetchUsers, fetchErr: error };
};

export default useFetchUsers;
