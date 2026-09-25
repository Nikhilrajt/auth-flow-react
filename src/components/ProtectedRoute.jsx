import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContextDefinition";
import Loading from "./Loading";
function ProtectRoute({children}){
    const {isAuthenticated,isLoading} = useContext(AuthContext);
    if(isLoading){
         return <Loading />;
    }
    if(!isAuthenticated()){
        return <Navigate to="/login" replace/>;
    }
    return children;
}
export default ProtectRoute;