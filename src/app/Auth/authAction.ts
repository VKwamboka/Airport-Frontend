import { createAction, props } from '@ngrx/store';
import { User } from '../Interfaces';

// login
export const login = createAction('[User] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[User] Login Success', props<{ user: User }>());
export const loginFailure = createAction('[User] Login Failure', props<{ errorMessage: string }>());

// update profile
export const updateUserProfile = createAction('[User] Update Profile', props<{ user: User }>());
export const updateUserProfileSuccess = createAction('[User] Update Profile Success', props<{ user: User }>());
export const updateUserProfileFailure = createAction('[User] Update Profile Failure', props<{ errorMessage: string }>());

// logout
export const logout = createAction('[User] Logout');
export const logoutSuccess = createAction('[User] Logout Success');
export const logoutFailure = createAction('[User] Logout Failure', props<{ errorMessage: string }>());
