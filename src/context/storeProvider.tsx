import {useReducer} from 'react';
// utils
import createTypeContext from '@components/utils/createContext';
// types
import {IStoreState, StoreAction, IStoreContextValue} from '../appTypes';
import { IFreeGameSettings, ITimedGameSettings } from '@components/compTypes';

// initial reducer state
const initialState: IStoreState = {
  mode: 'free',
  timedPlaySettings: {
    minutes: 0,
    seconds: 30,
    limit: 40,
    categories: [],
    tags: [],
    difficulty: 'easy',
    displayAnswer: false,
  },
  freePlaySettings: {limit: 15, categories: [], tags: [], difficulty: 'easy', displayAnswer: false},
  darkMode: "dark",
};

// reducer
const storeReducer: React.Reducer<typeof initialState, StoreAction> = (state, action) => {
  switch (action.type) {
    case 'UPDATE_MODE':
      return {
        ...state,
        mode: action.mode,
      };

    case 'UPDATE_TIMED_SETTINGS':
      return {
        ...state,
        timedPlaySettings: {...state.timedPlaySettings, ...action.settings},
      };

    case 'UPDATE_FREE_SETTINGS':
      return {
        ...state,
        freePlaySettings: {...state.freePlaySettings, ...action.settings},
      };

    case 'UPDATE_FREE_GENERAL_SETTINGS':
      return {
        ...state,
        freePlaySettings: {...state.freePlaySettings, ...action.generalSettings},
      };

    case 'UPDATE_TIMED_GENERAL_SETTINGS':
      return {
        ...state,
        timedPlaySettings: {...state.timedPlaySettings, ...action.generalSettings},
      };

    case 'SET_DARK_MODE':
      return {
        ...state,
        darkMode: action.darkMode,
      };

    default:
      return state;
  }
};

// create context
const [useAppStore, Provider] = createTypeContext<IStoreContextValue>('StoreContext');

export function AppStoreProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // create context value, memoize?
  const value = {
    ...state,
    dispatchToStore: dispatch,
    // helpers
    setDarkMode: (val: "dark" | "light") => dispatch({type: "SET_DARK_MODE", darkMode: val}),
    setGameMode: (val: "free" | "timed") => dispatch({type: "UPDATE_MODE", mode: val}),
    setTimedSettings: (val: ITimedGameSettings) => dispatch({type: "UPDATE_TIMED_SETTINGS", settings: val}),
    setFreeSettings: (val: IFreeGameSettings) => dispatch({type: "UPDATE_FREE_SETTINGS", settings: val}),
  };

  return <Provider value={value}>{children}</Provider>;
}

export {useAppStore};
