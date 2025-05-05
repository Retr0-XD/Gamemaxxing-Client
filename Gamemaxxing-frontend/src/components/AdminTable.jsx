import { Link } from 'react-router-dom'

export default function AdminTable({ games, onDelete }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>ID</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Title</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Tags</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '600' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ padding: '2rem 0', textAlign: 'center', color: '#6B7280' }}>
                No games found. Add your first game using the button above!
              </td>
            </tr>
          ) : (
            games.map((game) => (
              <tr key={game.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '0.75rem' }}>{game.id}</td>
                <td style={{ padding: '0.75rem' }}>{game.title}</td>
                <td style={{ padding: '0.75rem' }}>{game.tags || '-'}</td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <Link
                      to={`/admin/edit/${game.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.5rem',
                        borderRadius: '0.375rem',
                        backgroundColor: 'white',
                        border: '1px solid #D1D5DB',
                        color: '#374151'
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => onDelete(game.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.5rem',
                        borderRadius: '0.375rem',
                        backgroundColor: '#FEE2E2',
                        border: '1px solid #FECACA',
                        color: '#B91C1C',
                        cursor: 'pointer'
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}