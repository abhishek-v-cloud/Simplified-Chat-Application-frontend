import { createContext, useState } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [history, setHistory] = useState([]); 

  return (
    <SessionContext.Provider value={{ history, setHistory }}>
      {children}
    </SessionContext.Provider>
  );
};