import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { getGameById } from '../lib/api'

export default function GameDetail() {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getGameById(id)
      .then((data) => {
        setGame(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (error) return (
    <div className="container mx-auto p-8">
      <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200 max-w-2xl mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Game</h2>
        <p className="text-red-600 mb-6">{error}</p>
        <Link to="/" className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  )
  
  if (loading) return (
    <div className="container mx-auto p-8 flex justify-center items-center min-h-[50vh]">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading game details...</p>
      </div>
    </div>
  )

  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-80 md:h-96 lg:h-[500px] bg-gray-900 mb-8">
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${game.thumbnailUrl || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <Link to="/" className="inline-flex items-center text-white mb-5 hover:text-purple-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Games
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{game.title}</h1>
            
            {game.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {game.tags.split(',').map((tag, index) => (
                  <span key={index} className="bg-indigo-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Game</h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  {game.description ? (
                    <p>{game.description}</p>
                  ) : (
                    <p>No description available for this game.</p>
                  )}
                </div>
              </div>
              
              {/* Screenshots Gallery */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={game.thumbnailUrl || 'https://via.placeholder.com/600x400?text=Screenshot+1'}
                      alt={`${game.title} screenshot 1`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src="https://via.placeholder.com/600x400?text=Screenshot+2"
                      alt={`${game.title} screenshot 2`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Reviews Section */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600">No reviews yet. Be the first to review this game!</p>
                  <button className="mt-3 text-indigo-600 font-medium hover:text-indigo-800">
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 mb-8 sticky top-8">
                <div className="mb-6">
                  <h3 className="text-gray-500 text-sm mb-1">Platform</h3>
                  <p className="font-semibold">{game.platform || 'All Platforms'}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-gray-500 text-sm mb-1">Release Date</h3>
                  <p className="font-semibold">{game.releaseDate || 'Unknown'}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-gray-500 text-sm mb-1">Developer</h3>
                  <p className="font-semibold">{game.developer || 'Unknown'}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-gray-500 text-sm mb-1">Rating</h3>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 ${star <= (game.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">{game.rating || '4.0'}/5</span>
                  </div>
                </div>
                
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-bold text-lg transition-colors mb-3">
                  <a href={game.gameUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Play Now
                  </a>
                </Button>
                
                <button className="w-full flex items-center justify-center border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
          
          {/* Similar Games Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={`https://via.placeholder.com/300x200?text=Similar+Game+${item}`} 
                      alt={`Similar Game ${item}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">Similar Game {item}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-600">4.0/5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}