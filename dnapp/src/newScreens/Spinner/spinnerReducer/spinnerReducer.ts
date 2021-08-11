import { Reducer } from "redux";
import { action, ActionType } from "typesafe-actions";

export const showSpinner = () => action("SHOW_SPINNER");
export const hideSpinner = () => action("HIDE_SPINNER");

type SpinnerActions = ActionType<typeof showSpinner> | ActionType<typeof hideSpinner>;

export const spinnerReducer: Reducer<boolean, SpinnerActions> = (state = false, action) => {
   switch (action.type) {
      case "SHOW_SPINNER": {
         return true;
      }
      case "HIDE_SPINNER": {
         return false;
      }
   }
   return state;
};
