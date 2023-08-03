import { AuthAction, LOGIN,LOGOUT } from "../actions/authAction";


export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
 switch (action.type) {
   case LOGIN:
     return {
       ...state,
       isLoggedIn: true,
       token: action?.payload.token,
     };
   case LOGOUT:
     return {
       ...state,
       isLoggedIn: false,
       token: null,
     };
   default:
     return state;
 }
};

export default authReducer;