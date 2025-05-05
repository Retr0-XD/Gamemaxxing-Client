import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GameDetail from './pages/GameDetail'
import AdminDashboard from './pages/AdminDashboard'
import AdminNew from './pages/AdminNew'
import AdminEdit from './pages/AdminEdit'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/new" element={<AdminNew />} />
        <Route path="/admin/edit/:id" element={<AdminEdit />} />
      </Routes>
    </div>
  )
}

export default App