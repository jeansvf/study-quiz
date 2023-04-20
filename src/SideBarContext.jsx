import React, { useState } from 'react'
import { createContext, useContext } from 'react'

const SideBarContextProvider = createContext();

function SideBarContext({ children }) {
    const [sideBarActive, setSideBarActive] = useState(false)

    const value = {
      sideBarActive,
      setSideBarActive
    }

    return (
      <SideBarContextProvider.Provider value={value}>
        { children }
      </SideBarContextProvider.Provider>
    )
}

export default SideBarContext;

// This is a helper
export const useSideBarContext = () => useContext(SideBarContextProvider);