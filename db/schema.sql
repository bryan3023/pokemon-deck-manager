--
--  Create Pokemon Deck Manager database
--
--  Create database for storing information about players, their deck,
--  and their Pokemon.
--


-- Create tables --


CREATE TABLE pokemon (
  id INTEGER NOT NULL AUTO_INCREMENT,
  pokemon_key VARCHAR(60) NOT NULL,
  pokemon_name VARCHAR(120) NOT NULL,
  pokemon_num INTEGER NOT NULL,
  pokemon_sprite VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);


CREATE TABLE deck (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120)
);


CREATE TABLE team_member (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pokemon_id INTEGER NOT NULL,
  deck_id INTEGER NOT NULL,

  CONSTRAINT FK_team_member_pokemon
    FOREIGN KEY (pokemon_id)
    REFERENCES pokemon(id),

  CONSTRAINT FK_team_member_deck
    FOREIGN KEY (deck_id)
    REFERENCES deck(id)
);
