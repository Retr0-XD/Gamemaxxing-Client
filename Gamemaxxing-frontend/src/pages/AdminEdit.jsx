import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import GameForm from '../components/GameForm'
import { getGameById, updateGame } from '../lib/api'

export default function AdminEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getGameById(id)
      .then((data) => setGame(data))
      .catch((err) => setError(err.message))
  }, [id])

  const handleSubmit = async (formData, token) => {
    try {
      await updateGame(id, formData, token)
      navigate('/admin')
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  if (error) return <div className="text-center text-red-500">Error: {error}</div>
  if (!game) return <div className="text-center">Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Game</h1>
      <GameForm
        initialData={game}
        onSubmit={handleSubmit}
        submitText="Update Game"
      />
    </div>
  )
}