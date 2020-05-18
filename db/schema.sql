--
--  Create Pokemon Deck Manager database
--
--  Create database for storing information about players, their deck,
--  and their Pokemon.
--


-- Create tables --

DROP DATABASE IF EXISTS pokemon_db;
CREATE DATABASE pokemon_db;

USE pokemon_db;

CREATE TABLE pokedex (
    id INTEGER NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    pokemon_name VARCHAR(30) NOT NULL
    pokemon_num INTEGER NOT NULL
    deck_id INTEGER NOT NULL
    PRIMARY KEY (id)
);