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

## Day 17

### Part one

I created two objects, the shape and the cave. The cave of object has an attribute matrix which contains 0 and 1, 1 is for an obstacle. The object shape have 3 attributes : the up, down and the list of points. I only had points of a shape in the matrix cave when the shape is stuck.

## Day 18

### Part one

Nothing to report

### Part two
I found contours of the rocks, then used a BFS in order to find each air cubes which has an adjacent rock cube. Since I started from a air cube outside the rocks, I only found exterior faces. 
I lost time because I didn't well find the contours ...


## Day 20

### Part one 

I was hard to understand the concept of circulary buffer. Check what did on of my brilant classmate : (https://github.com/NuageTompis/Advent-of-Code/blob/main/2022/Day20.js) :)

### Part two

Nothing to report 

## Day 21 

I really enjoyed this one :)

### Part one

After several problem that I solved using recursive functions, it was easier for me to solve quite rapidly. I created a Monkey object which has a name and an attribute operation. Operation is a number of an array containing 2 monkeys and the operation.

### Part two

First, I coded a loop in order to try different values. But of course it was not that simple. I had the intuition that there was only one unique branch (in my graph) that linked the root to humn. I verified the hypothesis and stores the path into an array. Then I solved recursively. I check if the monkey at left is in the path or not, I compute the value of the other monkey, I solve the equation and then I call again the function to the next monkey in the path, until the monkey is humn.