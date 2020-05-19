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

  app.get("/api/deck", function(req, res) {
    Pokemon.getAllDecks()
      .then((response) => res.json(response))
      .catch((error) => console.error(error))
  })

  app.get("/api/deck/:deckId", function(req, res) {
    const deckId = req.params.deckId

    Pokemon.getDeck(deckId)
      .then((response) => res.json(response))
      .catch((error) => console.error(error))
  })

  app.delete("/api/deck/:deckId", function(req, res) {
    const deckId = req.params.deckId

    Pokemon.removeDeck(deckId)
      .then((response) => res.json(response))
      .catch((error) => console.error(error))
  })

  app.post("/api/deck", function(req, res) {
    const deckName = req.body.name

    Pokemon.addDeck(deckName)
      .then((response) => res.json(response))
      .catch((error) => console.error(error))
  })

  app.post("/api/deck/:deckId/:pokemonNumber", function(req, res) {
    const
      deckId = req.params.deckId,
      pokemonNumber = req.params.pokemonNumber

    Pokemon.addToDeck(deckId, pokemonNumber)
      .then((response) => res.json(response))
      .catch((error) => console.error(error))
  })

  app.delete("/api/deck/:deckId/:pokemonNumber", function(req, res) {
    const
      deckId = req.params.deckId,
      pokemonNumber = req.params.pokemonNumber

    Pokemon.removeFromDeck(deckId, pokemonNumber)
      .then((response) => res.json(response))
      .catch((error) => console.error(error))
  })
}
