import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

export default function GameForm({ initialData, onSubmit, submitText }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    gameUrl: initialData?.gameUrl || '',
    thumbnailUrl: initialData?.thumbnailUrl || '',
    tags: initialData?.tags || '',
  })
  const [token, setToken] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData, token)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="gameUrl">Game URL</Label>
        <Input
          id="gameUrl"
          name="gameUrl"
          value={formData.gameUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
        <Input
          id="thumbnailUrl"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="token">Admin Token</Label>
        <Input
          id="token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
      </div>
      <Button type="submit">{submitText}</Button>
    </form>
  )
}