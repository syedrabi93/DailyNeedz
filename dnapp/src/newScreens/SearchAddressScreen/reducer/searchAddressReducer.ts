import { Reducer, Dispatch } from "redux";
import { action, ActionType } from "typesafe-actions";
import { mapsapi } from "../../../axios";

export const searchPlaces = (searchQuery: string) => async (dispatch: Dispatch) => {
   try {
      const data = {
         key: "AIzaSyBWmJvN2MqkmZKvVhRMLLiACIY5ykVW5kU",
         input: searchQuery,
			components: "country:in",
         types: "establishment",
      };
      const stringify = (input: { [k: string]: string }) => {
         let str = "?";
         for (var key in input) {
            str += `${key}=${input[key]}&`;
         }
         return str;
      };
      const res = await mapsapi.get("/json" + stringify(data));
      // console.log(res);
      if (res.status === 200) {
			console.log(res.data);
         dispatch(searchPlaceSuccess(res.data));
      } else {
         dispatch(searchPlaceFail());
      }
   } catch (e) {
      console.log(e);
   }
};

const searchPlaceSuccess = (data: object) => action("SEARCH_PLACE_SUCCESS", { data });
const searchPlaceFail = () => action("SEARCH_PLACE_FAIL");

type AddressActions = ActionType<typeof searchPlaceSuccess> | ActionType<typeof searchPlaceFail>;

export const searchAddressReducer: Reducer<any, AddressActions> = (state = null, action) => {
   switch (action.type) {
      case "SEARCH_PLACE_SUCCESS": {
         return { ...action.payload.data };
      }
      case "SEARCH_PLACE_FAIL": {
         return null;
      }
   }

   return state;
};
