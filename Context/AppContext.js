import react, { Children, useState } from 'react'

const AppContext = react.createContext()

export const AppProvider = ({ children }) => {
    const [email, setEmail] = useState("")
    return (
        <AppContext.Provider value={{ email, setEmail }}>
            {children}
        </AppContext.Provider>

    )

}

export default AppContext