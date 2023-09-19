import { createContext, useState } from "react";
import { Context } from "react";

const UserContext=createContext(null);

export const UserProvider=({children})=>{

const user= useState(null);

return(

<UserContext.Provider value={{user}}>
    {children}

</UserContext.Provider>

)

    }

export default UserContext;