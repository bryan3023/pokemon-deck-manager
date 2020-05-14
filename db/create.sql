--
--  Create Eat-Da-Burger localhost account
--
--  Create an account for working with the database locally.
--


DROP DATABASE IF EXISTS pokemon_deck_DB;
CREATE DATABASE pokemon_deck_DB;

DROP USER IF EXISTS 'bryan3023.pokemon_deck'@'localhost';

CREATE
  USER 'bryan3023.pokemon_deck'@'localhost'
  IDENTIFIED BY 'ifM91qUy89*#%R^QsFjN'
;

GRANT
  SELECT, UPDATE, INSERT, DELETE
ON
  pokemon_deck_DB . *
TO
  'bryan3023.pokemon_deck'@'localhost'
;