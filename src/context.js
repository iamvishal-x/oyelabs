import { createContext, useContext, useState, useMemo } from "react";

const Context = createContext();

export const CustomContextProvider = ({ children }) => {
  const initialState = {
    isEditing: false,
    selectedEntryId: null,
    entries: [],
  };

  const [state, setState] = useState(initialState);
  const value = useMemo(() => [state, setState], [state, setState]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCustomContext = () => {
  const context = useContext(Context);
  if (context === undefined)
    throw new Error(
      "useCustomContext can only be used inside CustomContextProvider"
    );

  return context;
};
