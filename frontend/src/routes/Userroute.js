import { Navigate } from "react-router-dom";
import { authService } from "../services/authservices";

export const UserRoute = ({ children }) => {
  return authService.getUserRole() === "user" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};
