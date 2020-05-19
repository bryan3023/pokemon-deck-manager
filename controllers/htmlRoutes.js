const model = require("../models/pokemon_model")

module.exports = function(app) {

  app.get("/", async function(req, res) {
    const deck = await model.getDeck(1)

    model.getAll()
      .then((response) => {
        res.render("pokeList", {
          pokemon: response,
          deckId: deck.deckId,
          deckName: deck.deckName,
          deckMembers: deck.deckMembers
        })
      })
      .catch((error) => console.error(error))
  })


  app.get("/search", function(req, res) {
    res.render("search")
  })
}