CREATE DATABASE efreiride;
USE efreiride;

CREATE TABLE trajets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  depart VARCHAR(255),
  arrivee VARCHAR(255),
  date DATE,
    places INT,
  user VARCHAR(255)
);

use efreiride;
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL
);
USE efreiride;
INSERT INTO users (nom, email, mot_de_passe)
VALUES ('Meriem', 'meriem.tih@efrei.net', '123456');

SELECT * FROM users
WHERE email = 'meriem.tih@efrei.net'
AND mot_de_passe = '123456'; 
