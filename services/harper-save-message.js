const axios = require('axios')

function harperSaveMessage(message, username, room) {
  const dbUrl = process.env.HARPERDB_URL
  const dbPw = process.env.HARPERDB_PW

  if (!dbPw || !dbUrl) return null;

  const data = JSON.stringify({
    operation: 'insert',
    schema: 'realtime_chat_app',
    table: 'messages',
    records: [
      {
        message,
        username,
        room
      }
    ]
  })

  const config = {
    method: 'post',
    url: dbUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${dbPw}`
    },
    data
  }

  return new Promise((resolve, reject) => {
    axios(config)
      .then(response => {
        resolve(JSON.stringify(response.data))
      })
      .catch(err => reject(err))
  })
}

module.exports = harperSaveMessage