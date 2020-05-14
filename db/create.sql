--
--  Create Pokemon Deck Manager local artifacts
--
--  Create a database and account for working with the database locally.
--


DROP DATABASE IF EXISTS pokemon_deck_DB;
CREATE DATABASE pokemon_deck_DB;

DROP USER IF EXISTS 'bryan3023.pokemon_deck'@'localhost';

CREATE
  USER 'bryan3023.pokemon_deck'@'localhost'
  IDENTIFIED BY 'Ce*D^SK1u2j3^x*hvusU'
;

GRANT
  SELECT, UPDATE, INSERT, DELETE
ON
  pokemon_deck_DB . *
TO
  'bryan3023.pokemon_deck'@'localhost'
;