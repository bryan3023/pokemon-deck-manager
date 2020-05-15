const PokemonModel = require("../models/pokemon_model")

module.exports = function(app) {

  app.post("/", function(req, res) {
    // fill in
    res.json(null)
  })

  app.get("/pokedex", function(req,res) {
    const pokedex = PokemonModel.getPokedex()
      .then((response) => res.json(response))
  })

  app.get("/card/:number", function(req,res) {
    const number = req.params.number
    const pokedex = PokemonModel.getPokemonCardByNumber(number)
      .then((response) => res.json(response))
  })

  app.get("/pokemon/:name", function(req,res) {
    const name = req.params.name

//    PokemonModel.getPokemonCardByName(name)
    PokemonModel.getPokemonByName(name)
      .then((response) => res.json(response))
      .catch((error) => console.error(error))
  })
}