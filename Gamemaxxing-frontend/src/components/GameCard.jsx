import { Link } from 'react-router-dom'

export default function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className="block">
      <div className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="relative">
          <img
            src={game.thumbnailUrl || 'https://via.placeholder.com/300x200?text=Game+Image'}
            alt={game.title}
            className="w-full h-48 object-cover"
          />
          {game.tags && (
            <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {game.tags.split(',')[0]}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 mb-2" style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{game.title}</h3>
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="#FFC107">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-600 ml-1">
                {game.rating || '4.5'}
              </span>
            </div>
            
            <span style={{display: 'inline-flex', alignItems: 'center', borderRadius: '0.375rem', backgroundColor: '#D1FAE5', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: '500', color: '#047857'}}>
              {game.platform || 'All Platforms'}
            </span>
          </div>
          
          {game.description && (
            <p className="text-gray-600 text-sm mt-3" style={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
              {game.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}