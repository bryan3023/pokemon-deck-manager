--
--  Delete Pokemon Deck Manager database
--
--  Remove database and user account from local MySQL instances.
--


DROP DATABASE IF EXISTS pokemon_deck_DB;
DROP USER IF EXISTS 'bryan3023.pokemon_deck'@'localhost';
