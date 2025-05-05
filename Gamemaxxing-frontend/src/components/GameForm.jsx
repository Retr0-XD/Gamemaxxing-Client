import { useState } from 'react'
import { useAuth } from '../lib/authContext.jsx'

export default function GameForm({ initialData, onSubmit, submitText }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    gameUrl: initialData?.gameUrl || '',
    thumbnailUrl: initialData?.thumbnailUrl || '',
    tags: initialData?.tags || '',
    platform: initialData?.platform || '',
    rating: initialData?.rating || '',
    developer: initialData?.developer || '',
    releaseDate: initialData?.releaseDate || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData, token)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto'
  }

  const fieldStyle = {
    marginBottom: '1.25rem'
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    color: '#374151'
  }

  const inputStyle = {
    width: '100%',
    padding: '0.625rem',
    borderRadius: '0.375rem',
    border: '1px solid #D1D5DB',
    fontSize: '0.875rem',
    backgroundColor: 'white'
  }

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical'
  }

  const buttonStyle = {
    backgroundColor: '#4F46E5',
    color: 'white',
    fontWeight: '500',
    padding: '0.625rem 1.25rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'inline-block'
  }

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#9CA3AF',
    cursor: 'not-allowed'
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={fieldStyle}>
        <label htmlFor="title" style={labelStyle}>Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="description" style={labelStyle}>Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={textareaStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="gameUrl" style={labelStyle}>Game URL *</label>
        <input
          type="url"
          id="gameUrl"
          name="gameUrl"
          value={formData.gameUrl}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="thumbnailUrl" style={labelStyle}>Thumbnail URL</label>
        <input
          type="url"
          id="thumbnailUrl"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="tags" style={labelStyle}>Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          style={inputStyle}
          placeholder="action, adventure, rpg"
        />
      </div>
      
      <div style={fieldStyle}>
        <label htmlFor="platform" style={labelStyle}>Platform</label>
        <input
          type="text"
          id="platform"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          style={inputStyle}
          placeholder="PC, PlayStation, Xbox, Mobile"
        />
      </div>
      
      <div style={fieldStyle}>
        <label htmlFor="rating" style={labelStyle}>Rating (1-5)</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          style={inputStyle}
          min="1"
          max="5"
          step="0.1"
        />
      </div>
      
      <div style={fieldStyle}>
        <label htmlFor="developer" style={labelStyle}>Developer</label>
        <input
          type="text"
          id="developer"
          name="developer"
          value={formData.developer}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      
      <div style={fieldStyle}>
        <label htmlFor="releaseDate" style={labelStyle}>Release Date</label>
        <input
          type="date"
          id="releaseDate"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <button 
        type="submit" 
        style={isSubmitting ? disabledButtonStyle : buttonStyle}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : submitText}
      </button>
    </form>
  )
}