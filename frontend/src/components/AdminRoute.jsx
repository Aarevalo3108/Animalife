import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const AdminRoute = () => {
  const auth = useAuth();

  return auth.isAdmin ? <Outlet /> : <Navigate to="/profile" />;
};

export default AdminRoute;


