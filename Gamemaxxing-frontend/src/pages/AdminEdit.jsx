import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import GameForm from '../components/GameForm'
import AdminHeader from '../components/AdminHeader'
import { getGameById, updateGame } from '../lib/api'
import { useAuth } from '../lib/authContext.jsx'

export default function AdminEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/admin/login')
      return
    }

    setLoading(true)
    getGameById(id)
      .then((data) => {
        console.log("Fetched game for editing:", data)
        setGame(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching game for edit:", err)
        setError(err.message)
        setLoading(false)
      })
  }, [id, isAuthenticated, navigate])

  const handleSubmit = async (formData, token) => {
    try {
      const result = await updateGame(id, formData, token)
      console.log("Game updated successfully:", result)
      alert("Game updated successfully!")
      navigate('/admin')
    } catch (err) {
      console.error("Error updating game:", err)
      alert('Error: ' + (err.response?.data?.message || err.message || "Failed to update game"))
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
        <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#B91C1C', marginBottom: '0.5rem'}}>Error Loading Game</h2>
        <p style={{color: '#DC2626'}}>{error}</p>
      </div>
    </div>
  )
  
  if (loading) return (
    <div style={{maxWidth: '80rem', margin: '0 auto', padding: '1rem'}}>
      <AdminHeader />
      
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '16rem'}}>
        <div style={{
          animation: 'spin 1s linear infinite',
          borderRadius: '9999px',
          height: '4rem',
          width: '4rem',
          borderTop: '4px solid #4F46E5',
          borderRight: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderLeft: '4px solid transparent'
        }}></div>
      </div>
      
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

  return (
    <div style={{maxWidth: '80rem', margin: '0 auto', padding: '1rem'}}>
      <AdminHeader />
    
      <h1 style={{fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>Edit Game: {game.title}</h1>
      <GameForm
        initialData={game}
        onSubmit={handleSubmit}
        submitText="Update Game"
      />
    </div>
  )
}