import axios from 'axios'

const api = axios.create({
  baseURL: 'https://gamemaxxing-client.onrender.com/api',
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

export const getPlaceholderGames = async () => {
  return [
    {
      id: '1',
      title: 'Krunker.io',
      description: 'A fast-paced first-person shooter with pixelated graphics. Engage in various game modes and customize your character.',
      tags: 'Action, Shooter',
      screenshot: 'https://krunker.io/img/screenshots/1.jpg',
    },
    {
      id: '2',
      title: 'War Brokers',
      description: 'A 3D multiplayer shooter offering modes like battle royale and team deathmatch. Features vehicles and a variety of weapons.',
      tags: 'Action, Shooter',
      screenshot: 'https://warbrokers.io/images/screenshots/screenshot1.jpg',
    },
    {
      id: '3',
      title: 'Mini Royale: Nations',
      description: 'A tactical FPS with short matches and clan-based gameplay. Includes various maps and weapon customization.',
      tags: 'Action, Shooter',
      screenshot: 'https://miniroyale.io/assets/images/screenshot.jpg',
    },
    {
      id: '4',
      title: 'TacticsCore.io',
      description: 'Control war machines in team-based battles. Choose from tanks, bombers, and more in this strategic shooter.',
      tags: 'Action, Shooter',
      screenshot: 'https://tacticscore.io/images/screenshot.jpg',
    },
    {
      id: '5',
      title: 'The Password Game',
      description: 'A humorous game where you create a password that meets increasingly absurd requirements.',
      tags: 'Puzzle, Word',
      screenshot: 'https://neal.fun/password-game/screenshot.png',
    },
    {
      id: '6',
      title: 'Connections',
      description: 'Group words based on hidden connections in this daily puzzle challenge.',
      tags: 'Puzzle, Word',
      screenshot: 'https://www.nytimes.com/games-assets/word-connections/screenshot.png',
    },
    {
      id: '7',
      title: 'Kingdom of Loathing',
      description: 'A comedic, turn-based RPG with stick-figure art and witty writing. Explore dungeons and complete quests.',
      tags: 'RPG, Adventure',
      screenshot: 'https://images.kingdomofloathing.com/screenshots/kol_screenshot1.png',
    },
    {
      id: '8',
      title: 'Isleward',
      description: 'An open-source roguelike MMO with pixel art. Team up with others to explore and battle monsters.',
      tags: 'RPG, Adventure',
      screenshot: 'https://isleward.com/images/screenshot.png',
    },
    {
      id: '9',
      title: 'Neptune’s Pride',
      description: 'A real-time strategy game of interstellar conquest and diplomacy. Games can last for weeks.',
      tags: 'RPG, Adventure',
      screenshot: 'https://np.ironhelmet.com/images/screenshots/np_screenshot.jpg',
    },
    {
      id: '10',
      title: 'Catan Universe',
      description: 'Play the classic Settlers of Catan board game online with friends or AI opponents.',
      tags: 'Strategy, Simulation',
      screenshot: 'https://catanuniverse.com/fileadmin/user_upload/screenshots/catan_universe_screenshot.jpg',
    },
    {
      id: '11',
      title: 'Freeciv-Web',
      description: 'A browser-based version of the Civilization series. Build your empire and compete against others.',
      tags: 'Strategy, Simulation',
      screenshot: 'https://freecivweb.org/images/screenshots/freecivweb_screenshot.png',
    },
    {
      id: '12',
      title: 'Elvenar',
      description: 'A city-building game where you choose between elves or humans and develop your city accordingly.',
      tags: 'Strategy, Simulation',
      screenshot: 'https://us.elvenar.com/images/screenshots/elvenar_screenshot.jpg',
    },
    {
      id: '13',
      title: 'Townscaper',
      description: 'A relaxing city-building toy with no goals. Just build quaint island towns with simple controls.',
      tags: 'Casual, Creative',
      screenshot: 'https://www.oxeyegames.com/wp-content/uploads/2020/06/townscaper_screenshot.jpg',
    },
    {
      id: '14',
      title: 'Slow Roads',
      description: 'An endless driving simulator through procedurally generated landscapes. Perfect for relaxation.',
      tags: 'Casual, Creative',
      screenshot: 'https://slowroads.io/images/screenshot.jpg',
    },
    {
      id: '15',
      title: 'Powder Game',
      description: 'A physics sandbox where you can mix elements and watch reactions unfold.',
      tags: 'Casual, Creative',
      screenshot: 'https://dan-ball.jp/en/javagame/dust/screenshot.png',
    },
    {
      id: '16',
      title: 'Gartic Phone',
      description: 'A drawing and guessing game where players alternate between sketching and interpreting drawings.',
      tags: 'Multiplayer, Social',
      screenshot: 'https://garticphone.com/images/screenshot.png',
    },
    {
      id: '17',
      title: 'Skribbl.io',
      description: 'A multiplayer drawing game where one player draws a word, and others guess what it is.',
      tags: 'Multiplayer, Social',
      screenshot: 'https://skribbl.io/img/screenshots/1.jpg',
    },
    {
      id: '18',
      title: 'Slither.io',
      description: 'Control a snake and consume pellets to grow longer while avoiding other players.',
      tags: 'Multiplayer, Social',
      screenshot: 'https://slither.io/images/screenshot.jpg',
    },
    {
      id: '19',
      title: 'Agar.io',
      description: 'Control a cell, eat smaller cells, and avoid being eaten in this multiplayer game.',
      tags: 'Multiplayer, Social',
      screenshot: 'https://agar.io/img/screenshots/1.jpg',
    },
    {
      id: '20',
      title: 'Town of Salem',
      description: 'A multiplayer game of deception. Players are assigned roles and must uncover the mafia among them.',
      tags: 'Multiplayer, Social',
      screenshot: 'https://www.blankmediagames.com/images/screenshots/town_of_salem_screenshot.jpg',
    },
  ];
};