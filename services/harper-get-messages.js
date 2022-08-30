const axios = require('axios')

function harperGetMessages(room) {
  const dbUrl = process.env.HARPERDB_URL
  const dbPw = process.env.HARPERDB_PW

  if (!dbPw || !dbUrl) return null;

  const data = JSON.stringify({
    operation: 'sql',
    sql: `SELECT * FROM realtime_chat_app.messages WHERE room = '${room}' LIMIT 100`
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
      .then(res => {
        resolve(JSON.stringify(res.data))
      })
      .catch(err => reject(err))
  })

}

module.exports = harperGetMessages