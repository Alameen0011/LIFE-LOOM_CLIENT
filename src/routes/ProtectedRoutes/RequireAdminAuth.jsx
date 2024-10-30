import { selectUserRole, selectUserState } from '@/app/slices/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAdminAuth() {
  const isAuthenticated = useSelector(selectUserState);
  const role = useSelector(selectUserRole);             
  const location = useLocation();                       

  return (
    isAuthenticated && role === 'admin'
      ? <Outlet /> // Render admin routes if authenticated and role is admin
      : <Navigate to='/admin/login' state={{ from: location }} replace /> // Redirect to admin login
  );
}

export default RequireAdminAuth;
