import { action } from 'typesafe-actions';
import { ADD_SEARCH_SUGGESTIONS } from './types';

export const addSearchSuggetions = (suggestions: string[]) =>
   action(ADD_SEARCH_SUGGESTIONS, { suggestions });
