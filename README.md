# MyAdvent22

Mostly in Javascript

## Day 7

### Part one

Data structure chosen : A tree. Each directory has a father (execept the root) and an array of children.
To compute size of directories I coded a recursive function.

### Part two

Nothing to report.

## Day 11

### Part one

I created an object monkey, and I applied the rules explictely explained. Nothing to report

### Part two

Really hard to think of working with the modulo of lcm, (which is by the way easy to compute beacause each numbers are prime). 

## Day 12 

### Part one 

The idea was to implement a Breadth-First search algorithm. I created an object Node which has an attribute 'adjacents' containing all nodes it is possible to move from the current node. I didn't use a queue data structure in the search function because the amount of adjacent nodes was 4 maximum. To enhance the search function I could have use a bidirectional search.

### Part two

When I created all my nodes, I registred all nodes of a minimum hight in the array S. I iterated the search function over all nodes in S and let's not forget to re-initialized all nodes before operating the search.

## Day 13

### Part one

I didn't know about JSON.parse(). It could have been useful. Therefore I practiced my recursivity skills. Indeed I coded a recursive function to convert my inputs into array and I applied on each these arrays the rules explained in the instructions with also a recursive function.

## day 17

### Part one

I created two objects, the shape and the cave. The cave of object has an attribute matrix which contains 0 and 1, 1 is for an obstacle. The object shape have 3 attributes : the up, down and the list of points. I only had points of a shape in the matrix cave when the shape is stuck.
