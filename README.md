# MyAdvent22

Mostly in Javascript

## Day 11

### Part one

I created an object monkey, and I applied the rules explictely explained. Nothing to report

### Part two

Really hard to think of working with the modulo of lcm, (which is by the way easy to compute beacause each numbers are prime). 

## Day 12 

### Part one 

The idea was to implement a Breadth-First search algorithm. I created an object Node which has an attribute 'adjacents' containing all nodes it is possible to move from the current node. I didn't use a queue data structure in the search function because the amount of adjacent nodes was 4 maximum. To enhance the search function I could have use a bidirectional search.

### Part two

When I created all my nodes, I registred all nodes of a minimum hight in the array S. I iterated the search function over all nodes in S and let's not forget to re-initialized all nodes before operate the search.
