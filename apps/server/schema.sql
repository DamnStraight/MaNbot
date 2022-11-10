drop table if exists emote;
drop table if exists variant;
drop table if exists emote_variant;

create table emote {
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(30) NOT NULL,
    discord_id varchar(30) NOT NULL,
    image text NOT NULL
}

create table variant {
    id integer  PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(30) NOT NULL
}

create table emote_variant {
    emote_id REFERENCES emote (id) ON UPDATE CASCADE ON DELETE CASCADE,
    variant_id REFERENCES variant (id) ON UPDATE CASCADE ON DELETE CASCADE,
    image text NOT NULL
}
