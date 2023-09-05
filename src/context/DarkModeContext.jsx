import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext()

function DarkModeProvider({children}){
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode")


    useEffect(() => {
        if(isDarkMode) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('ligth-mode')

        }else{
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('ligth-mode')
        }
    } , [isDarkMode])

    function toggleDarkMode() {
        setIsDarkMode((isDark) => !isDark)
    }

    return <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}> {children} </DarkModeContext.Provider>
}


function useDarkMode() {
    //directly consume that context
    const context = useContext(DarkModeContext);
    if (context === undefined)
      throw new Error("DarkModeContext was used outside of DarkModeProvider");
    return context;
  }
  
  export { DarkModeProvider, useDarkMode };