// import React, { createContext, useState } from 'react';
// import { DEFAULT_ULB_ID } from '../types/constatnts.js';

// const defaultValue = {
//   ulbID: DEFAULT_ULB_ID,
//   setUlbID: () => {}, // no operation so consumers don't need to guard for undefined
// };

// export const UlbContext = createContext(defaultValue);

// /**
//  UlbProvider - Keeps the ulbID in React state so it is globally available via React Context.
//  **/
// export const UlbProvider = ({ children }) => {
//   const [ulbID, setUlbIDState] = useState(DEFAULT_ULB_ID);

//   const setUlbID = (id) => {
//     setUlbIDState(id);
//   };

//   const value = {
//     ulbID,
//     setUlbID,
//   };

//   return <UlbContext.Provider value={value}>{children}</UlbContext.Provider>;
  
// };

import React, { createContext, useState } from "react";
import { DEFAULT_ULB_ID } from '../types/constatnts.js';


export const UlbContext = createContext({
  ulbID: DEFAULT_ULB_ID,
  setUlbID: () => {},
  corporationOptions: [],
  setCorporationOptions: () => {},
});

export function UlbProvider({ children }) {
  const [ulbID, setUlbID] = useState(DEFAULT_ULB_ID);
  const [corporationOptions, setCorporationOptions] = useState([]);

  return (
    <UlbContext.Provider
      value={{ ulbID, setUlbID, corporationOptions, setCorporationOptions }}
    >
      {children}
    </UlbContext.Provider>
  );
}