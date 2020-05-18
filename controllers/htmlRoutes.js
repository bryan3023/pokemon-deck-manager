model=require("../models/pokemon_model")

module.exports = function(app) {

    app.get("/", function(req, res) {
      // fill in
      model.getAll()
      .then((response) => {
        console.log(response)
        res.render("pokeList", {pokemon : response})})
      .catch((error) => console.error(error))

    })

    app.get("/search", function(req, res) {
      res.render("search")

    })
  }