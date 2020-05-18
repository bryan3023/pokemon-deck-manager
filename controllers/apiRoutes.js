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
  })

  app.get("/api/pokemon/:name", function(req,res) {
    const name = req.params.name

    Pokemon.getByKey(name)
      .then((response) => res.json(response))
      .catch((error) => console.error(error))
  })

}
