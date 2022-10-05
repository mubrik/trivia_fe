import { useState, useReducer } from "react";
// utils
import createTypeContext from "../utils/createContext";
// types
import { 
  IStoreState, StoreAction, IStoreContextValue
} from "../compTypes";


// initial reducer state
const initialState: IStoreState = {
  mode: "free",
  timedPlaySettings: {minutes: 0, seconds: 30, limit: 40, categories: [], tags: [], difficulty: "easy", displayAnswer: false},
  freePlaySettings: {limit: 15, categories: [], tags: [], difficulty: "easy", displayAnswer: false},
};

// reducer 
const storeReducer: React.Reducer<typeof initialState, StoreAction> = (state, action) => {

  switch (action.type) {
    case "UPDATE_MODE":
      return {
        ...state,
        mode: action.mode
      };
      
    case "UPDATE_TIMED_SETTINGS":
      return {
        ...state,
        timedPlaySettings: {...state.timedPlaySettings,...action.settings}
      };

    case "UPDATE_FREE_SETTINGS":
      return {
        ...state,
        freePlaySettings: {...state.freePlaySettings,...action.settings}
      };

    case "UPDATE_FREE_GENERAL_SETTINGS":
      return {
        ...state,
        freePlaySettings: {...state.freePlaySettings,...action.generalSettings}
      };
      
    case "UPDATE_TIMED_GENERAL_SETTINGS":
      return {
        ...state,
        timedPlaySettings: {...state.timedPlaySettings,...action.generalSettings}
      };

    default:
      return state;
  }
};

// create context
const [useStore, Provider] = createTypeContext<IStoreContextValue>('StoreContext');

interface IAppProps {
  children: React.ReactNode;
}

export default function StoreContext ({ children }: IAppProps) {

  const [state, dispatch] = useReducer(storeReducer, initialState);

  // create context value, memoize?
  const value = {
    ...state,
    dispatchToStore: dispatch
  };

  return (
    <Provider value={value}>
      {children}
    </Provider>
  );

};

export { useStore };