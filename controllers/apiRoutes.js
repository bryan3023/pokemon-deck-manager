const Pokemon = require("../models/pokemon_model")

module.exports = function(app) {

  app.post("/api/search", function(req, res) {
    const searchTerm = req.body.search

    Pokemon.search(searchTerm)
      .then((response) => res.json(response))
      .catch((error) => console.error(error))
  })

  app.get("/api/pokemon", function(req,res) {
    Pokemon.getAll()
      .then((response) => res.json(response))
      .catch((error) => console.error(error))
  })

  app.get("/api/pokemon/:keyName", function(req,res) {
    const name = req.params.keyName

    Pokemon.getByKey(name)
      .then((response) => res.json(response))
      .catch((error) => console.error(error))
  })

}
