import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ user, redirectPath = '/', children }) => {
  if (!user) { 
    return <Navigate to={redirectPath} replace={true}  />;
  }
//   else if(us)

  return children ;
};