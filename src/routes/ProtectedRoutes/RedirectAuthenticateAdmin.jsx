import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserRole, selectUserState } from '@/app/slices/authSlice';

function RedirectAuthenticatedAdmin({ children }) {
  const isAuthenticated = useSelector(selectUserState);
  const role = useSelector(selectUserRole);

  // If the user is already authenticated as an admin, redirect them away from login
  if (isAuthenticated && role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Otherwise, allow access to the login page
  return children;
}

export default RedirectAuthenticatedAdmin;
