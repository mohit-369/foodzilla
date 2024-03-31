import { Navigate } from "react-router-dom";
import { authService } from "../services/authservices";

export const OwnerRoute = ({ children }) => {
  return authService.getUserRole() === "owner" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};
