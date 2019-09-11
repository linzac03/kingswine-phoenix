# Kingswine

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Game Premise
A king plans on having a party in two weeks (14 days so 14 turns).
A culprit claims to have poisoned a single cask of wine in a letter to the king. 
An Investigator is brought in to find out which cask has been poisoned.
The Investigator has several groups of servants to test the wine, a random servant will fall `ill` each turn.
The servants are positionally ordered, like bits in a binary sequence.
The first one to fall is always the servant representing the highest power of 2.
If the Investigator doesn't guess the correct cask by the end of the 14 turns, it's a loss.
The Investigator only makes one guess, however they can look for a clue each turn.
Making a guess fast forwards the remaining turns.

## TODO
- Set up room for one player (Investigator)
- Actions for Investigator (Clue, Guess)
- Set up responses to actions
- Set up array of servants
- Set up marking of `ill` servants
- Set up turn sequence

 

