import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GameCard from '../components/GameCard'
import { getGames, getPlaceholderGames, addGame } from '../lib/api'
import { useAuth } from '../lib/authContext';

export default function Home() {
  const [games, setGames] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);
    Promise.all([getGames(), getPlaceholderGames()])
      .then(async ([userGames, placeholderGames]) => {
        const combinedGames = [...userGames];

        for (const game of placeholderGames) {
          const existsInBackend = userGames.some((userGame) => userGame.id === game.id);
          if (!existsInBackend) {
            try {
              if (!token) {
                console.error('No authentication token found. Please log in.');
                continue;
              }

              const savedGame = await addGame(game, `Bearer ${token}`);
              combinedGames.push(savedGame);
            } catch (err) {
              if (err.response && err.response.status === 403) {
                console.error(`Authorization error while saving game ${game.title}. Please check your permissions.`);
              } else {
                console.error(`Error saving game ${game.title} to backend:`, err);
              }
            }
          } else {
            combinedGames.push(game);
          }
        }

        setGames(combinedGames);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching games:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  const filteredGames = games.filter(game => 
    (activeCategory === 'All' || (game.tags && game.tags.toLowerCase().includes(activeCategory.toLowerCase()))) &&
    (searchTerm === '' || 
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (game.tags && game.tags.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (game.description && game.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  )

  // Get unique categories from games' tags
  const categories = ['All', ...new Set(games
    .filter(game => game.tags)
    .flatMap(game => game.tags.split(',').map(tag => tag.trim()))
    .filter(tag => tag !== '')
  )]

  if (error) return (
    <div style={{textAlign: 'center', padding: '2rem', backgroundColor: '#FEF2F2', borderRadius: '0.5rem', border: '1px solid #FECACA', maxWidth: '36rem', margin: '2.5rem auto'}}>
      <svg xmlns="http://www.w3.org/2000/svg" style={{height: '3rem', width: '3rem', margin: '0 auto 1rem', color: '#EF4444'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#B91C1C', marginBottom: '0.5rem'}}>Error Loading Games</h2>
      <p style={{color: '#DC2626'}}>{error}</p>
    </div>
  )

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(to right, #4F46E5, #7E22CE)',
        padding: '5rem 0', 
        marginBottom: '4rem'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }}></div>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay'
          }}></div>
        </div>
        <div style={{
          position: 'relative',
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: 'white',
            marginBottom: '1.5rem'
          }}>
            Discover Your Next Gaming Adventure
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(237, 233, 254)',
            maxWidth: '48rem',
            margin: '0 auto 2.5rem'
          }}>
            Explore the ultimate collection of games across all platforms, find hidden gems, and level up your gaming experience.
          </p>
          
          {/* Search Bar */}
          <div style={{maxWidth: '36rem', margin: '0 auto', position: 'relative'}}>
            <div style={{display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '9999px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', overflow: 'hidden'}}>
              <input
                type="text"
                placeholder="Search games by title, category, or description..."
                style={{width: '100%', padding: '1rem 1.5rem', border: 'none', outline: 'none'}}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button style={{backgroundColor: '#4F46E5', color: 'white', padding: '1rem', border: 'none'}}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{height: '1.5rem', width: '1.5rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter and All Games Section */}
      <section id="categories" style={{maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', marginBottom: '4rem'}}>
        <h2 style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '2rem'}}>Browse Games</h2>
        
        {/* Category Pills */}
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem'}}>
          {categories.map((category) => (
            <button
              key={category}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontWeight: '500',
                fontSize: '0.875rem',
                transition: 'all 0.2s',
                backgroundColor: activeCategory === category ? '#4F46E5' : '#E5E7EB',
                color: activeCategory === category ? 'white' : '#374151',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {loading ? (
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
        ) : filteredGames.length === 0 ? (
          <div style={{textAlign: 'center', padding: '4rem 0', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', border: '1px solid #E5E7EB'}}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{height: '3rem', width: '3rem', margin: '0 auto 1rem', color: '#9CA3AF'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#4B5563', marginBottom: '0.5rem'}}>No games found</h3>
            <p style={{color: '#6B7280'}}>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1.5rem'
          }}>
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section style={{backgroundColor: '#4F46E5', padding: '4rem 0', marginBottom: '4rem'}}>
        <div style={{maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', textAlign: 'center'}}>
          <h2 style={{fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem'}}>Ready to level up your gaming experience?</h2>
          <p style={{color: '#C7D2FE', marginBottom: '2rem', maxWidth: '36rem', margin: '0 auto 2rem'}}>
            Join our community today and discover new games, share your favorites, and connect with other gamers.
          </p>
          <button style={{
            backgroundColor: 'white',
            color: '#4338CA',
            fontWeight: 'bold',
            padding: '0.75rem 2rem',
            borderRadius: '9999px',
            border: 'none',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}>
            Join Now
          </button>
        </div>
      </section>

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
          
          @media (min-width: 640px) {
            section > div > div {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 768px) {
            section > div > div {
              grid-template-columns: repeat(3, 1fr);
            }
            h1 {
              font-size: 3rem;
            }
          }
          
          @media (min-width: 1024px) {
            section > div > div {
              grid-template-columns: repeat(4, 1fr);
            }
          }
        `}
      </style>
    </div>
  )
}