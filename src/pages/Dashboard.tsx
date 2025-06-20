import { useState, useEffect } from "react";
import { getCurrentUser, signOut } from "@aws-amplify/auth";
import { useNavigate } from "react-router";

export default function Home() {
  const [user, setUser] = useState<{username: string, email: string|undefined } | null>(null);
  const navigate = useNavigate()

  // useEffect(() => {
  //   const checkUser = async () => {
  //       try {
  //           await getCurrentUser();
  //           navigate('/dashboard');
  //       } catch {
  //           navigate('/login')
  //       }
  //   };
  //   checkUser();
  // }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser({
          username: currentUser.username,
          email: currentUser.signInDetails?.loginId
        });
      } catch (error: any) {
        console.error('Failed to fetch user info:', error);
      } finally {
        // setLoading(false);
      }
    };
    fetchUser();
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login')
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

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
      <h1 style={{ margin: 0 }}>Dashboard</h1>
      {user && (
        <>
          <p style={{ fontSize: '16px', color: '#333' }}>
            Welcome, {user.email}!
          </p>
          <button onClick={handleSignOut} style={{ marginTop: '16px', padding: '8px 16px' }}>
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}
