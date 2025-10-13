import { createContext, useState } from "react";

interface UserContextType {
  userName: String;
  setUserName: (name: String) => void;
  password: String;
  setPassword: (password: String) => void;
}

const UserContext = createContext<UserContextType>({
  userName: "",
  setUserName: () => {},
  password: "",
  setPassword: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName] = useState<String>("");
  const [password, setPassword] = useState<String>("");
    return (
    <UserContext.Provider value={{ userName, setUserName, password, setPassword }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };


