const
  Pokedex = require('pokedex-promise-v2'),
  PokemonTCG = require('pokemontcgsdk')

class PokemonModel {

  constructor() {
    this.pokedex = new Pokedex()
  }


  async getPokemonCardByName(name) {
      return await PokemonTCG.card.where({
        setCode: 'base1',
        supertype: 'pokemon',
        name: name
      })
  }

  async getPokemonByName(name) {
    try {
      const
        pokemon = await this.pokedex.getPokemonByName(name),
        pokemonSpecies = await this.pokedex.getPokemonSpeciesByName(name),

        flavorText = pokemonSpecies.flavor_text_entries
          .filter(f => f.language.name === "en")
          .map(f => f.flavor_text)[0],
        pokemonName = pokemonSpecies.names
          .filter(n => n.language.name === "en")
          .map(n => n.name)[0],
        pokemonAbilities = pokemon.abilities.map(a => a.ability.name),
        pokemonMoves = pokemon.moves.map(m => m.move.name),
        pokemonTypes = pokemon.types.map(t => t.type.name)

        return {
          name: pokemonName,
          number: pokemon.id,
          height: pokemon.height,
          weight: pokemon.weight,
          sprite: pokemon.sprites.front_default,
          baseHappiness: pokemon.base_happiness,
          abilities: pokemonAbilities,
          moves: pokemonMoves,
          flavorText: flavorText,
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
      pokedex = await this.pokedex.getPokedexByName('kanto'),
      pokemonName = pokedex.pokemon_entries.map(p => p.pokemon_species.name)

      console.log(pokemonName)

    return pokemonName;
  }

  getStat(pokemon, statName) {
    const stat = pokemon.stats.filter(p => p.stat.name == statName)[0]
    return  stat.base_stat
  }

}

module.exports = new PokemonModel()