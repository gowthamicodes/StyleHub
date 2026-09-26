import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../Context/auth-context";


interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps ) => {

const { isLoggedIn } = useContext(AuthContext);

if(!isLoggedIn) {
return <Navigate to="/login" replace />
}

return children;

}
export default ProtectedRoute;