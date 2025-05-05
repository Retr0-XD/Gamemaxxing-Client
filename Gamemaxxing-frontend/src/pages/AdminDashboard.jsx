import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminTable from '../components/AdminTable'
import AdminHeader from '../components/AdminHeader'
import { getGames, deleteGame } from '../lib/api'
import { useAuth } from '../lib/authContext.jsx'

export default function AdminDashboard() {
  const [games, setGames] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { token, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/admin/login')
      return
    }

    setLoading(true)
    getGames()
      .then((data) => {
        console.log("Admin - Fetched games:", data)
        setGames(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Admin - Error fetching games:", err)
        setError(err.message)
        setLoading(false)
      })
  }, [isAuthenticated, navigate])

  const handleDelete = async (id) => {    
    if (!confirm("Are you sure you want to delete this game?")) {
      return
    }
    
    try {
      await deleteGame(id, token)
      setGames(games.filter((game) => game.id !== id))
    } catch (err) {
      setError(err.message)
      alert("Error deleting game: " + err.message)
    }
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  if (error) return (
    <div style={{maxWidth: '80rem', margin: '0 auto', padding: '1rem'}}>
      <AdminHeader />
      
      <div style={{textAlign: 'center', padding: '2rem', backgroundColor: '#FEF2F2', borderRadius: '0.5rem', border: '1px solid #FECACA', maxWidth: '36rem', margin: '2.5rem auto'}}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{height: '3rem', width: '3rem', margin: '0 auto 1rem', color: '#EF4444'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#B91C1C', marginBottom: '0.5rem'}}>Error Loading Games</h2>
        <p style={{color: '#DC2626'}}>{error}</p>
      </div>
    </div>
  )

  return (
    <div style={{maxWidth: '80rem', margin: '0 auto', padding: '1rem'}}>
      <AdminHeader />
      
      <h1 style={{fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem'}}>Admin Dashboard</h1>
      
      <div style={{marginBottom: '1rem'}}>
        <Link 
          to="/admin/new" 
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
          Add New Game
        </Link>
      </div>
      
      {loading ? (
        <div style={{display: 'flex', justifyContent: 'center', padding: '3rem 0'}}>
          <div style={{
            animation: 'spin 1s linear infinite',
            borderRadius: '9999px',
            height: '3rem',
            width: '3rem',
            borderTop: '4px solid #4F46E5',
            borderRight: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: '4px solid transparent'
          }}></div>
        </div>
      ) : (
        <AdminTable games={games} onDelete={handleDelete} />
      )}
      
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  )
}