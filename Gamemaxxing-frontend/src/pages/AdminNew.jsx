import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GameForm from '../components/GameForm'
import AdminHeader from '../components/AdminHeader'
import { addGame } from '../lib/api'
import { useAuth } from '../lib/authContext.jsx'

export default function AdminNew() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/admin/login')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (formData, token) => {
    try {
      const result = await addGame(formData, token)
      console.log("Game added successfully:", result)
      alert("Game added successfully!")
      navigate('/admin')
    } catch (err) {
      console.error("Error adding game:", err)
      alert('Error: ' + (err.response?.data?.message || err.message || "Failed to add game"))
    }
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div style={{maxWidth: '80rem', margin: '0 auto', padding: '1rem'}}>
      <AdminHeader />
    
      <h1 style={{fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>Add New Game</h1>
      <GameForm onSubmit={handleSubmit} submitText="Add Game" />
    </div>
  )
}