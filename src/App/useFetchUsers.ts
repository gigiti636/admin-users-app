import { useState, useEffect, useCallback } from 'react';
import api from '@/api';
import { UserModel } from './types';
import { updateLocalStorage, getLocalStorage } from '@/util/localStorage';

interface useFetchUsersProps {
  cacheDurationSeconds?: number;
  onData?: (_data: UserModel[]) => void;
}

export const cacheKey = 'cachedUsers';

interface FetchUsersResult {
  users: UserModel[];
  loading: boolean;
  error: string | null;
  invalidateCache: () => void;
  updateCache: (_data: UserModel[]) => void;
}

const useFetchUsers = ({ cacheDurationSeconds, onData }: useFetchUsersProps = {}): FetchUsersResult => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

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
            setLoading(false);
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
      }

      if (cacheDurationSeconds) {
        updateLocalStorage(cacheKey, data);
        updateLocalStorage(`${cacheKey}_timestamp`, new Date().getTime().toString());
      }
    } catch (error) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
      setError(null);
    }
  }, [cacheDurationSeconds]);

  const invalidateCache = useCallback(() => {
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(`${cacheKey}_timestamp`);

    fetchUsers();
  }, [fetchUsers]);

  const updateCache = useCallback((data: UserModel[]) => {
    updateLocalStorage(cacheKey, data);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, invalidateCache, updateCache };
};

export default useFetchUsers;
