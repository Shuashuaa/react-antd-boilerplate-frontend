import { getCurrentUser } from "@aws-amplify/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Home() {

  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
        try {
            await getCurrentUser();
            navigate('/dashboard');
        } catch {
            navigate('/login')
        }
    };
    checkUser();
  }, [navigate]);

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
    </div>
  );
}
