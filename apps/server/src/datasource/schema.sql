-- TODO Put this in fixtures not in the schema
drop table if exists emote_variant;
drop table if exists emote;
drop table if exists variant;

CREATE TABLE emote (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(30) NOT NULL,
    discord_id varchar(30) NOT NULL,
    image text NOT NULL
);

CREATE TABLE variant (
    id integer  PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(30) NOT NULL
);

CREATE TABLE emote_variant (
    emote_id integer REFERENCES emote (id) ON UPDATE CASCADE ON DELETE CASCADE,
    variant_id integer REFERENCES variant (id) ON UPDATE CASCADE ON DELETE CASCADE,
    image text NOT NULL
);


-- TODO Seperate this into its own file
INSERT INTO emote (name, discord_id, image)
VALUES ('emoneySwag', '172522267140427777', 'test');

INSERT INTO variant (name)
VALUES ('Christmas');

INSERT INTO emote_variant (emote_id, variant_id, image)
VALUES (1, 1, 'TEMP');