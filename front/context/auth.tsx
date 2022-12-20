import React, { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
interface User{
    email:string,
    firstname:string
}
interface UserContextType{
    user: User,
    setUser:(Dispatch<SetStateAction<User>>)
}

export const UserContext = React.createContext<UserContextType>({
    user: {email:'',firstname:''},
    setUser: (user) => null,
  })
  
export const UserProvider = ({ children }:PropsWithChildren) => {
    const [user, setUser] = useState<User>({email:'',firstname:''})
  
    return <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>
  }