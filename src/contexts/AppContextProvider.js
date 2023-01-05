import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext)
}

const initialTokenState = [];

const reducer = (state, action) => {
   const newState = [...state];
   switch(action.type) {
    case "ADD_TOKEN": 
        newState.push(action.tokenData);
        return newState
    case "CLEAR_TOKENS":
        newState.length = 0;
        return newState
    default: 
        return state
   }
}

export const AppContextProvider = ({ children }) => {

   const [tokens, dispatch] = useReducer(reducer, initialTokenState);

    return (
        <AppContext.Provider value={{
            dispatch,
            tokens
        }}>
            {children}
        </AppContext.Provider>
    )
}