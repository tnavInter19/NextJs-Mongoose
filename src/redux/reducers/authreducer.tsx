import { AuthAction, LOGIN,LOGOUT } from "../actions/authAction";


export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null; // Add userId here
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  userId: null, // Initialize userId as null
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
 switch (action.type) {
   case LOGIN:
     return {
       ...state,
       isLoggedIn: true,
       token: action?.payload.token,
       userId: action?.payload.userId, // Set userId from the action payload
     };
   case LOGOUT:
     return {
       ...state,
       isLoggedIn: false,
       token: null,
       userId:null,
     };
   default:
     return state;
 }
};

export default authReducer;