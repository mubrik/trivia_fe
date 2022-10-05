import { useRef, useCallback } from "react";

/**
* @description - a mutable array ref store without rerender side effects
*/
export default function useMutableStore <T extends unknown> (store: T[]) {

  const storeRef = useRef(store);

  const getMutableStoreValue = useCallback(() => {
    return storeRef.current;
  }, []);

  const addMutableStore = useCallback((param: T) => {
    storeRef.current = [
      ...storeRef.current,
      param
    ];

    return storeRef.current;
  }, []);

  const removeMutableStore = useCallback((filterCallback: (param: T) => boolean ) => {
    storeRef.current = storeRef.current.filter(filterCallback);
  }, []);

  return {
    getMutableStoreValue,
    addMutableStore,
    removeMutableStore
  };
};