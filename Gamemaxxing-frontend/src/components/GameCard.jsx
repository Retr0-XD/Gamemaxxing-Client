import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`}>
      <Card className="hover:bg-primary/10 transition-colors">
        <CardHeader>
          <CardTitle>{game.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={game.thumbnailUrl || 'https://via.placeholder.com/300x200'}
            alt={game.title}
            className="w-full h-40 object-cover rounded-md"
          />
        </CardContent>
      </Card>
    </Link>
  )
}