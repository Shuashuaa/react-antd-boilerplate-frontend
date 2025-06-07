export default function NotFound() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#888',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ margin: 0 }}>404</h1>
      <p style={{ marginTop: '8px' }}>Page Not Found</p>
      <a href="/" style={{ color: 'blue', fontSize: '15px', textDecorationColor: 'blue' }}>Back to Home</a>
    </div>
  );
}