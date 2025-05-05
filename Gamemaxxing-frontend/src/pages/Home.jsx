import { useEffect, useState } from 'react'
import GameCard from '../components/GameCard'
import { getGames } from '../lib/api'

export default function Home() {
  const [games, setGames] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getGames()
      .then((data) => setGames(data))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="text-center text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gamemaxxing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}