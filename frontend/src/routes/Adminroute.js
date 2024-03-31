import { Navigate } from "react-router-dom"
import { authService } from "../services/authservices"

export const AdminPrivateRoute = ({children}) => {
    
   return (authService.getUserRole() === 'admin') ? children : <Navigate to="/login" />
}