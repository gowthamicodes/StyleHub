import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/auth-context";


interface AdminProps {
    children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminProps ) => {

    const { isLoggedIn, currentUser } = useContext(AuthContext);

 console.log("AdminRoute:", {
    isLoggedIn,
    currentUser,
  });

if(!isLoggedIn) {
    return <Navigate to="/login" replace />
}
if (currentUser?.role !== "admin") {
    return <Navigate to="/" replace />
}


    return children;

}
export default AdminRoute;