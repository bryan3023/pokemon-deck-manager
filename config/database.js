const connection = require("./connection")()

/*
  Manages the database connection and provides basic ORM to models.
 */
class Database {

  constructor() {
    this.connection = connection
    this.connection.connect((error) => {
      if (error) throw error
    })
  }


  /*
    Close the connection when done.
   */
  async close() {
    this.connection.end()
  }


  /*
    Runs queries and returns a promise for processing.
   */
  query(queryString, conditions) {
    return new Promise((resolve, reject) => {
      const queryCallback =
        (error, results) => error ? reject(error) : resolve(results)

      if (conditions !== undefined) {
        this.connection.query(queryString, conditions, queryCallback)
      } else {
        this.connection.query(queryString, queryCallback)
      }
    })
  }

}

module.exports = new Database()
