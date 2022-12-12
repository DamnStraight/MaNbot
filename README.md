<p align="center">
  <img src="https://files.catbox.moe/3fc0qz.png" />
</p>

---

A discord bot personalized for a server I frequent made using `discord.js`

Currently has the following features:
- `/scrape` to scrape a users message history in the channel and stores it into a `{discordId}.txt` file (10,000 messages)
- `/cache` to make a snapshot of the current guild emotes into a sqlite database
- `/shitpost {@user} {seed}` Generates a random message using a markov chain model of the specified `@user`, if a `seed` is specified the model will try to generate a sentence beginning with that word.