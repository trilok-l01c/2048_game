# 2048_game

A famous board game, with 4 x 4 grid of tiles contains multiples of only 2 like, 2, 4, 8, 16, ... 2048

## Rules to play

The rules to play the game are simple, but not easy.

- There will be a 4X4 grid, initially, with only random 2 tiles have a value i.e; 2 or 4.
- How will be the controls
    - `Up key` or `w` will shift all the tile to the possible up, in their column.
    - `Down key` or `s` will shift all the tile to the possible down, in their column.
    - `Left key` or `a` will shift all the tile to the possible left, in their row.
    - `Right key` or `d` will shift all the tile to the possible Right, in their row.
- With every move, a new tile will be added at empty space.
- **Mereg**: At the time of shifting, if two neighbour tile, which are just hitting each other, have a value greater to zero and equal will merge into a single time with twice the previous value.
- **You will win when:** there will be a have value **2048**.
- **You will lose when:** there will be no move left i.e; neither you can merge two value nor there will be more place for a new tile.
