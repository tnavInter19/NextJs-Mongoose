// authActionTypes.ts

// Define action type constants
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Define action interfaces
export interface LoginAction {
  type: typeof LOGIN;
  payload: { token: string };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export const login = (token: string): AuthAction => {
 return {
   type: LOGIN,
   payload: { token },
 };
};

export type AuthAction = LoginAction | LogoutAction;
