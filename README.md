# Game of Lives

Javascript Game for *Free Style JavaScript Game Jam*: http://www.meetup.com/js-games/events/219553972/ 

This is a game of life|corewar inspired programming game.

February 2015


## Idea

We have got a 1 dimensional ring buffer (RAM).

There are two cores. Both cores operate on this RAM.

Each player operates one of this cores. He/she writes an own program.

The goal is to eliminate the other player's program.

## Components

* RAM (Array of Operations)
* Input (two text areas)
* Visualizer (Canvas)
* Main-Loop (endless loop over visualizer and interpreter)
* Interpreters (executes Ops)
* Ops-Commands (Command -> JSFunction)


## License
Do what you want.