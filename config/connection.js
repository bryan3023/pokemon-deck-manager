const mysql = require("mysql")

module.exports = function() {
  if (process.env.JAWSDB_URL) {
    return mysql.createConnection(process.env.JAWSDB_URL)
  } else {
    return mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "bryan3023.pokemon_deck",
      password: "Ce*D^SK1u2j3^x*hvusU",
      database: "pokemon_deck_DB"
    })
  }
}
