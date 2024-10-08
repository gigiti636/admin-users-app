import { UserModel } from '@/App/types';
import { Reducer } from 'react';

interface ReducerState {
  users: UserModel[];
  usersUpdating: boolean;
  error: string | null;
}
export const InitialState: ReducerState = {
  users: [],
  usersUpdating: false,
  error: null,
};

export enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  SET_USERS = 'SET_USERS',
  // eslint-disable-next-line no-unused-vars
  UPDATE_USER = 'UPDATE_USER',
  // eslint-disable-next-line no-unused-vars
  CLEAR_ERROR = 'CLEAR_ERROR',
  // eslint-disable-next-line no-unused-vars
  SET_ERROR = 'SET_ERROR',
  // eslint-disable-next-line no-unused-vars
  SET_UPDATING_USER = 'SET_UPDATING_USER',
}
export interface InitializeUsersAction {
  type: ActionTypes.SET_USERS;
  payload: UserModel[];
}
export interface UpdateUserAction {
  type: ActionTypes.UPDATE_USER;
  payload: Partial<UserModel>;
}
export interface ClearErrorAction {
  type: ActionTypes.CLEAR_ERROR;
}
export interface SetErrorAction {
  type: ActionTypes.SET_ERROR;
  payload: string;
}
export interface SetUpdatingUser {
  type: ActionTypes.SET_UPDATING_USER;
  payload: boolean;
}

type Action = InitializeUsersAction | ClearErrorAction | SetErrorAction | UpdateUserAction | SetUpdatingUser;

export const reducer: Reducer<ReducerState, Action> = (state = InitialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
        usersUpdating: false,
      };
    case ActionTypes.UPDATE_USER:
      // eslint-disable-next-line no-case-declarations
      const { id, ...rest } = action.payload;

      // eslint-disable-next-line no-case-declarations
      const updatedUsers = state.users.map((user) => {
        if (user.id === id) {
          return { ...user, ...rest };
        }
        return user;
      });

      return {
        ...state,
        users: updatedUsers,
      };
    case ActionTypes.SET_UPDATING_USER:
      return {
        ...state,
        usersUpdating: action.payload,
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
