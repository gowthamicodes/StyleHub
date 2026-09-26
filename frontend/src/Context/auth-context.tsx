
import { createContext, useState, type ReactNode } from "react"


interface User {
id: string;
name: string;
email: string;
// password: string;
role: "user" | "admin";

}

interface AuthContextType {
isLoggedIn: boolean;
currentUser: User | null;
token: string | null;
login: (user: User, token: string) => void;
logout: () => void;

}

export const AuthContext = createContext<AuthContextType>({
isLoggedIn: false,
currentUser: null, 
token: null,
login: () => {},
logout: () => {}

})


interface AuthProviderProps{
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps ) => {

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    const [currentUser, setCurrentUser] = useState<User | null>(
        storedUser ? JSON.parse(storedUser) : null
    )

const [token, setToken] = useState<string | null>(storedToken);

const [isLoggedIn, setIsLoggedIn] = useState(
    !!storedUser && !!storedToken)


const login = (user: User, token: string) => {

setIsLoggedIn(true);
setCurrentUser(user)
setToken(token);

localStorage.setItem("user" ,JSON.stringify(user))
localStorage.setItem("token", token)

}


const logout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setToken(null)

    localStorage.removeItem("user")
    localStorage.removeItem("token")

}

return (

<AuthContext.Provider value={{
isLoggedIn,
login,
logout,
currentUser,
token

}}>
{children}
</AuthContext.Provider>

)
}