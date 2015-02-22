# Game of Lives

Javascript Game for *Free Style JavaScript Game Jam*: http://www.meetup.com/js-games/events/219553972/ 

This is a game of life|corewar inspired programming game.

February 2015


## Idea

We have got a 1 dimensional ring buffer (RAM).

![](https://raw.githubusercontent.com/maltekosian/gameoflives/master/docs/idea.jpg)

There are two cores. Both cores operate on this RAM.

Each player operates one of this cores. He/she writes an own program.

The goal is to eliminate the other player's program.

## Components
![](https://raw.githubusercontent.com/maltekosian/gameoflives/master/docs/components.jpg)

* RAM (Array of Operations)
* Input (two text areas)
* Visualizer (Canvas)
* Main-Loop (endless loop over visualizer and interpreter)
* Interpreters (executes Ops)
* Ops-Commands (Command -> JSFunction)


## Spendings
![](https://raw.githubusercontent.com/maltekosian/gameoflives/master/docs/spendings.jpg)


## License
Do what you want.