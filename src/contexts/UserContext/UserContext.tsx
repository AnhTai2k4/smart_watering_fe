import { createContext, useContext, useState } from "react";

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

const UserContext = createContext<UserContextType>({
  userName: "",
  setUserName: () => {},
  password: "",
  setPassword: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
    return (
    <UserContext.Provider value={{ userName, setUserName, password, setPassword }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () =>{
  const context = useContext(UserContext)
  if(!context){
    throw new Error("useUserContext must be used within a UserProvider")
  }
  return context
}

export { UserContext, UserProvider };


