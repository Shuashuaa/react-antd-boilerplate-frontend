import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchUserSession, logoutUser } from '../store/slices/authSlice';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserSession());
    }
  }, [dispatch, user]);

  const handleSignOut = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div style={{
      flex: 1, display: 'flex', justifyContent: 'center',
      alignItems: 'center', fontSize: '24px', fontWeight: 'bold',
      color: '#888', flexDirection: 'column', width: '100%',
    }}>
      <h1 style={{ margin: 0 }}>Dashboard Page</h1>

      {loading ? (
        <p>Loading user info...</p>
      ) : user ? (
        <>
          <p style={{ fontSize: '16px', color: '#333' }}>
            Welcome, {user.username}!
          </p>
          <button
            onClick={handleSignOut}
            style={{ marginTop: '16px', padding: '8px 16px' }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <p>Not authenticated.</p>
      )}
    </div>
  );
}
