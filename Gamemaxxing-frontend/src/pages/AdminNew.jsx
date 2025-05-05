import { useNavigate } from 'react-router-dom'
import GameForm from '../components/GameForm'
import { addGame } from '../lib/api'

export default function AdminNew() {
  const navigate = useNavigate()

  const handleSubmit = async (formData, token) => {
    try {
      await addGame(formData, token)
      navigate('/admin')
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Game</h1>
      <GameForm onSubmit={handleSubmit} submitText="Add Game" />
    </div>
  )
}