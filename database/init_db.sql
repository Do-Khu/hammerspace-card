CREATE USER hammerspace WITH PASSWORD 'hammerspace';
CREATE DATABASE hammerspace_cards;
GRANT ALL PRIVILEGES ON DATABASE hammerspace_cards TO hammerspace;

\c hammerspace_cards

CREATE TABLE IF NOT EXISTS "cards" (
    id SERIAL PRIMARY KEY,
    imgLink VARCHAR(200),
    cardName VARCHAR(145),
    colorIdentity VARCHAR(10),
    isValid BOOLEAN
);
ALTER TABLE "cards" OWNER TO hammerspace;

COPY "cards"(imgLink,isValid,cardName,colorIdentity) FROM '/populate/data.csv'
DELIMITER ';' CSV HEADER;

SELECT * FROM "cards";