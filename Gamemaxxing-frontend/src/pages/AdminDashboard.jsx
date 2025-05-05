import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminTable from '../components/AdminTable'
import { Button } from '../components/ui/button'
import { getGames, deleteGame } from '../lib/api'

export default function AdminDashboard() {
  const [games, setGames] = useState([])
  const [error, setError] = useState(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    getGames()
      .then((data) => setGames(data))
      .catch((err) => setError(err.message))
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteGame(id, token)
      setGames(games.filter((game) => game.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (error) return <div className="text-center text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <label htmlFor="token" className="block text-sm font-medium">
          Admin Token
        </label>
        <input
          id="token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
        />
      </div>
      <Button asChild className="mb-4">
        <Link to="/admin/new">Add New Game</Link>
      </Button>
      <AdminTable games={games} onDelete={handleDelete} />
    </div>
  )
}