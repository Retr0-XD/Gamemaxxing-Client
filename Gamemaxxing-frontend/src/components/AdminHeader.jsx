import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/authContext.jsx';

export default function AdminHeader() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '2rem',
      borderBottom: '1px solid #E5E7EB',
      paddingBottom: '1rem'
    }}>
      <div>
        <Link 
          to="/" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: '#4F46E5',
            fontWeight: '500',
            textDecoration: 'none',
            marginRight: '2rem'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem'}}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Back to Home
        </Link>
      </div>
      
      <div>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#EF4444',
              color: 'white',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/admin/login"
            style={{
              display: 'inline-block',
              backgroundColor: '#4F46E5',
              color: 'white',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}