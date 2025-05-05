import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { getGameById } from '../lib/api'

export default function GameDetail() {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getGameById(id)
      .then((data) => setGame(data))
      .catch((err) => setError(err.message))
  }, [id])

  if (error) return <div className="text-center text-red-500">Error: {error}</div>
  if (!game) return <div className="text-center">Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
      <img
        src={game.thumbnailUrl || 'https://via.placeholder.com/600x400'}
        alt={game.title}
        className="w-full max-w-2xl h-64 object-cover rounded-md mb-4"
      />
      <p className="text-lg mb-4">{game.description}</p>
      <p className="text-sm text-muted-foreground mb-4">Tags: {game.tags}</p>
      <Button asChild>
        <a href={game.gameUrl} target="_blank" rel="noopener noreferrer">
          Play Now
        </a>
      </Button>
    </div>
  )
}