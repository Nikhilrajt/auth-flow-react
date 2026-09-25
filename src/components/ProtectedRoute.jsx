import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContextDefinition";
function ProtectRoute({children}){
    const {isAuthenticated,isLoading} = useContext(AuthContext);
    if(isLoading){
        return <p>Loading...</p>;
    }
    if(!isAuthenticated()){
        return <Navigate to="/login" replace/>;
    }
    return children;
}
export default ProtectRoute;