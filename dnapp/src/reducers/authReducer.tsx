
import { AuthActions } from '../actions';
import { SIGN_IN_USER, SIGN_OUT } from '../actions/types';
import { Reducer } from 'redux';
import { User } from '../types';

const INITIAL_AUTH_STATE: User = {
   uid: null,
   loggedIn: false,
   name: null,
   email: null,
   phone: null,
};

const authReducer: Reducer<User, AuthActions> = (
   state = INITIAL_AUTH_STATE,
   action: AuthActions
) => {
   switch (action.type) {
      case SIGN_IN_USER:
			return { ...action.payload };
		case SIGN_OUT : {
			return INITIAL_AUTH_STATE;
		}
   }
   return state;
};

export default authReducer;
