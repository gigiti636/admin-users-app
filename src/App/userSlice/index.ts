import { useReducer, useCallback, useEffect } from 'react';
import { ActionTypes, InitialState, reducer } from './usersReducer';
import { UserModel } from '../types';
import useFetchUsers from './useFetchUsers';
import api from '@/api';

export const useUserSlice = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const clearError = useCallback(() => dispatch({ type: ActionTypes.CLEAR_ERROR }), [dispatch]);

  const setError = useCallback(
    (err: string) => dispatch({ type: ActionTypes.SET_ERROR, payload: err }),
    [dispatch],
  );

  const setUserUpdating = useCallback(
    (isUpdating: boolean) => dispatch({ type: ActionTypes.SET_UPDATING_USER, payload: isUpdating }),
    [dispatch],
  );

  const setUsers = useCallback(
    (data: UserModel[]) => dispatch({ type: ActionTypes.SET_USERS, payload: data }),
    [dispatch],
  );

  const updateUser = useCallback(
    (user: Partial<UserModel>) => dispatch({ type: ActionTypes.UPDATE_USER, payload: user }),
    [dispatch],
  );

  const { refetch, fetching, fetchUsers, updateCache, fetchErr } = useFetchUsers({
    cacheDurationSeconds: 0,
    onData: (data) => setUsers(data),
  });

  const updateUserHandler = async (payload: Partial<UserModel>) => {
    setUserUpdating(true);

    const { id, ...rest } = payload;

    const { status } = await api.put(`/users/${id}`, rest);
    if (status && status < 300) {
      updateUser(payload);
      const updatedUsers = state.users.map((user) => {
        if (user.id === id) {
          return { ...user, ...rest };
        }
        return user;
      });
      updateCache(updatedUsers);
    } else {
      setError('Error updating User');
    }
    setUserUpdating(false);
  };

  useEffect(() => {
    if (error) setError(error);
  }, [fetchErr]);

  useEffect(() => {
    refetch();
  }, [fetchUsers]);

  const { users, error, usersUpdating } = state;

  return {
    //state
    users,
    error,
    usersUpdating,
    //actions
    setUserUpdating,
    clearError,
    setError,
    setUsers,
    updateUser,
    //fetch
    refetch,
    fetching,
    fetchUsers,
    //combo
    updateUserHandler,
  };
};
