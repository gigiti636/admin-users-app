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
  INITIALIZE_USERS = 'INITIALIZE_USERS',
  // eslint-disable-next-line no-unused-vars
  CLEAR_ERROR = 'CLEAR_ERROR',
  // eslint-disable-next-line no-unused-vars
  SET_ERROR = 'SET_ERROR',
}
export interface InitializeUsersAction {
  type: ActionTypes.INITIALIZE_USERS;
  payload: UserModel[];
}
export interface ClearErrorAction {
  type: ActionTypes.CLEAR_ERROR;
}
export interface SetErrorAction {
  type: ActionTypes.SET_ERROR;
  payload: string;
}

type Action = InitializeUsersAction | ClearErrorAction | SetErrorAction;

export const reducer: Reducer<ReducerState, Action> = (state = InitialState, action) => {
  switch (action.type) {
    case ActionTypes.INITIALIZE_USERS:
      return {
        ...state,
        users: action.payload,
        usersUpdating: false,
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
