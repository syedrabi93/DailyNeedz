import { Reducer } from "redux";
import { Store } from "../../../types";
import { action, ActionType } from "typesafe-actions";

const INITIAL_ADDRESS_LIST: Store["addresses"] = [];

export const addAddress = (location: string) => action("ADD_ADDRESS", { location });

export type MyAddressActions = ActionType<typeof addAddress>;

export const addressReducer: Reducer<Store["addresses"], MyAddressActions> = (
   state = INITIAL_ADDRESS_LIST,
   action
) => {
   switch (action.type) {
      case "ADD_ADDRESS": {
         const { location } = action.payload;
         return [...state, { location }];
      }
   }
   return state;
};
