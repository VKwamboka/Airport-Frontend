import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './authState';
import { loginSuccess, loginFailure, logout } from  './authAction'

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user,
    errorMessage: null,
  })),
  on(loginFailure, (state, { errorMessage }) => ({
    ...state,
    isLoggedIn: false,
    user: null,
    errorMessage,
  })),
  on(logout, () => initialAuthState),
);
