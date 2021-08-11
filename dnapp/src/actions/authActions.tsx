import { SIGN_IN_USER, SIGN_OUT } from './types';
import { action } from 'typesafe-actions';
import { User } from '../types';

export const signInUser = (userInfo: User) => action(SIGN_IN_USER, userInfo);
export const signOutUser = () => action(SIGN_OUT);