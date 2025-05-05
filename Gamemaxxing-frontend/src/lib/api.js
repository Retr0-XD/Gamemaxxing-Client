import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

export const getGames = async () => {
  const response = await api.get('/games')
  return response.data
}

export const getGameById = async (id) => {
  const response = await api.get(`/games/${id}`)
  return response.data
}

export const addGame = async (game, token) => {
  const response = await api.post('/admin/games', game, {
    headers: { Authorization: token },
  })
  return response.data
}

export const updateGame = async (id, game, token) => {
  const response = await api.put(`/admin/games/${id}`, game, {
    headers: { Authorization: token },
  })
  return response.data
}

export const deleteGame = async (id, token) => {
  await api.delete(`/admin/games/${id}`, {
    headers: { Authorization: token },
  })
}