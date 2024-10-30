import { selectUserRole, selectUserState } from '@/app/slices/authSlice';
import { useSelector } from 'react-redux';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireUserAuth() {
    console.log("inside user Auth")
    const isAuthenticated = useSelector(selectUserState); // Getting the user authentication statue from Redux state
    const role = useSelector(selectUserRole);     // Getting the user role from Redux state
    console.log("Authenticated:", isAuthenticated)
    console.log("Role:", role);
    const location = useLocation();     
    console.log(location,"location object")        // Getting the current location for redirection

    
        // isAuthenticated && role === 'user' ? <Outlet /> : <Navigate to='/auth/login' state={{ from: location }} /> // Redirect to login
 
      
        if (isAuthenticated && role === 'user') {
          console.log("Rendering Outlet");
          return <Outlet />;
        } else {
          console.log("Redirecting to login");
          return <Navigate to="/auth/login" state={{ from: location }} replace />;
        }
    
}

export default RequireUserAuth;
