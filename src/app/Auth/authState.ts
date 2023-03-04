import { User } from "../Interfaces";

export interface AuthState {
    isLoggedIn: boolean
    loading: false
    user: User | null
    errorMessage: string | null
  }
  
  export const initialAuthState: AuthState = {
    isLoggedIn: false,
    loading: false,
    user: null,
    errorMessage: null,
  };

  export interface UserState {
    user: User | null;
    loading: boolean;
    error: any;
  }
  