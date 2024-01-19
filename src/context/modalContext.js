'use client'

import { createContext, useContext, useState } from 'react';

export const ModalContext = createContext();

export const ContextProvider = ({ children }) => {
  const [bitlyKeyInput, setbitlyKeyInput] = useState('Y0URAW3S0M3B1TLYK3Y');

  console.log("bitlyKeyInput:", bitlyKeyInput);

  return (
    <ModalContext.Provider value={{ bitlyKeyInput, setbitlyKeyInput }}>
      {children}
    </ModalContext.Provider>
  );
};