import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Trash2, Edit } from 'lucide-react'

export default function AdminTable({ games, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game.id}>
            <TableCell>{game.title}</TableCell>
            <TableCell className="flex space-x-2">
              <Link to={`/admin/edit/${game.id}`}>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete(game.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}