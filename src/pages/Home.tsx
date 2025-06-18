import { useEffect, useState } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router';

export default function Home() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const currentUser = await getCurrentUser();
  //       setUser({ username: currentUser.username });
  //     } catch (error: any) {
  //       console.error('Failed to fetch current user:', error);
  //       navigate('/login'); // Redirect if not logged in
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser({ username: currentUser.username });
      } catch (error: any) {
        console.error('Failed to fetch user info:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  // if (loading) {
  //   return <div style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</div>;
  // }

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#888',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <h1 style={{ margin: 0 }}>Home Page</h1>
      {user && (
        <>
          <p style={{ fontSize: '16px', color: '#333' }}>
            Welcome, {user.username}!
          </p>
          <button onClick={handleSignOut} style={{ marginTop: '16px', padding: '8px 16px' }}>
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}
