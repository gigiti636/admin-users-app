import { useState, useEffect, useCallback } from 'react';
import api from '@/api';
import { UserModel } from './types';

interface useFetchUsersProps {
  cacheDurationSeconds?: number;
  onData?: () => void;
}

const cacheKey = 'cachedUsers';

interface FetchUsersResult {
  users: UserModel[];
  loading: boolean;
  error: string | null;
  invalidateCache: () => void;
  clearError: () => void;
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
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

        if (cachedData && cacheTimestamp) {
          const currentTime = new Date().getTime();
          const cacheTime = new Date(parseInt(cacheTimestamp)).getTime();

          if (currentTime - cacheTime < cacheDurationSeconds * 1000) {
            setUsers(JSON.parse(cachedData));
            setLoading(false);
            return;
          }
        }
      }

      const { data } = await api.get<UserModel[]>('/users');
      if (data) setUsers(data);

      if (cacheDurationSeconds) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}_timestamp`, new Date().getTime().toString());
      }

      if (onData) {
        onData();
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

  const clearError = useCallback(() => {
    setError('');
  }, [fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, invalidateCache, clearError };
};

export default useFetchUsers;
