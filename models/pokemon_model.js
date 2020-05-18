const
  PokeAPI = require('pokedex-promise-v2'),
  database = require('../config/database')

const KANTO_NUM_POKEMON = 151

class PokemonModel {

  constructor() {
    this.pokeAPI = new PokeAPI()
    this.loadPokedex()
  }


  async loadPokedex() {
    const pokedex = await database.query('SELECT * FROM pokemon')

    if (pokedex.length !== KANTO_NUM_POKEMON) {
      const kanto = await this.getPokedex()

      for (let pokemon_key of kanto) {

        const pokemon = await this.getByKey(pokemon_key)
        await this.sleep(2000)
        console.log(`Adding ${pokemon.name} (${pokemon.number} of ${KANTO_NUM_POKEMON}) to the database`)
        await database.query(`INSERT INTO pokemon SET ?`, {
          pokemon_key: pokemon_key,
          pokemon_name: pokemon.name,
          pokemon_num: pokemon.number
        })
      }
    }
  }


  async search(searchTerm) {
    const santizedSearch = searchTerm.trim()
    let queryString, queryMatch

    if (parseInt(searchTerm)) {
      queryString = 'SELECT * FROM pokemon WHERE pokemon_num = ?'
      queryMatch = santizedSearch
    } else {
      queryString = 'SELECT * FROM pokemon WHERE pokemon_name LIKE ?'
      queryMatch = `%${santizedSearch}%`
    }

    return await database.query(queryString, queryMatch)
  }


  async getAll() {
    const names = await database.query('SELECT pokemon_name FROM pokemon')
    return names.map(n => n.pokemon_name)
  }


  async getByKey(name) {
    try {
      const
        pokemon = await this.pokeAPI.getPokemonByName(name),
        pokemonSpecies = await this.pokeAPI.getPokemonSpeciesByName(name),

        flavorText = pokemonSpecies.flavor_text_entries
          .filter(f => f.language.name === "en")
          .map(f => f.flavor_text)[0],
        pokemonName = pokemonSpecies.names
          .filter(n => n.language.name === "en")
          .map(n => n.name)[0],
        pokemonAbilities = pokemon.abilities.map(a => a.ability.name),
        pokemonMoves = pokemon.moves.map(m => m.move.name),
        pokemonTypes = pokemon.types.map(t => t.type.name)

//        console.log(await this.pokeAPI.getMovesList(pokemonMoves))

        return {
          name: pokemonName,
          number: pokemon.id,
          height: pokemon.height,
          weight: pokemon.weight,
          sprite: pokemon.sprites.front_default,
          baseHappiness: pokemon.base_happiness,
          abilities: pokemonAbilities,
          moves: pokemonMoves,
          description: flavorText,
          speed: this.getStat(pokemon, 'speed'),
          defense: this.getStat(pokemon, 'defense'),
          specialDefense: this.getStat(pokemon, 'special-defense'),
          attack: this.getStat(pokemon, 'attack'),
          specialAttack: this.getStat(pokemon, 'special-attack'),
          hp: this.getStat(pokemon, 'hp'),
          types: pokemonTypes
        }

    }
    catch (e) {
      console.error(e)
    }
  }


  async getPokedex() {
    const
      pokedex = await this.pokeAPI.getPokedexByName('kanto'),
      pokemonName = pokedex.pokemon_entries.map(p => p.pokemon_species.name)

    return pokemonName;
  }


  getStat(pokemon, statName) {
    const stat = pokemon.stats.filter(p => p.stat.name == statName)[0]
    return  stat.base_stat
  }


  /*
    Add delay to throttle calls when creating the database.
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

module.exports = new PokemonModel()