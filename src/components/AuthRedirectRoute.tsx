import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { getCurrentUser } from 'aws-amplify/auth';

export default function AuthRedirectRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>Checking session...</div>;
  }

  return authenticated ? <Navigate to="/" replace /> : <Outlet />;
}
