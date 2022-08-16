import { createContext, useContext, useReducer } from "react";

const Store = createContext();

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    default: {
      return state;
    }
  }
};

export const useStore = () => useContext(Store);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: {
      authenticated: false,
      authenticating: false,
      error: null,
    },
  });

  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};
