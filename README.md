HackMIT 2017 Puzzle Solutions
=============================

This repository contains a writeup of our code/thinking throughout solving the puzzles for HackMIT 2017. The puzzles are hosted at [delorean.codes](https://delorean.codes). We started the puzzles at 5pm on Monday, June 3rd and finished them 11pm on Wednesday, June 5th. They were extremely fun (as in we literally were unable to do anything else, like our research, until we finished them), and I would highly recommend you check them out yourself and try to solve them while resisting the temptation to cheat before peeking at our solutions (but at the same time you've found this page, so you've probably already tried them and got stuck).

Disclaimer
----------

We are not the creators of these puzzles and these are not the official solutions by any means. In fact, the problem writers and other solvers will probably post faster and better solutions to these problems, but we'd just like to share our approaches as we worked on them for two days straight. We would like to thank the creators for making such interesting puzzles and putting in the time and effort to host this contest.

Also, obviously spoilers from here down and the rest of the repository, continue at your own risk and please excuse our terrible code, we assumed we were working under extreme time pressure. There have been some readability and usability changes, but for the most part this represents work we did during the contest.

Brief Problem Summary
---------------------

Here is a short summary of the problems, a list of some skills you might find helpful, and my difficulty rating out of 10 (where 10 would be "I couldn't solve this in a day even if I had a gun to my head").

- Problem 1 (1/10):
  * This was a good warmup, but anyone with enough googling and some knowledge of this type of puzzle could solve it. Someone relatively experienced would have no trouble.
  * Useful Skills: Substitution Cipher, Reading HTML, Decompiling JAR Files, Understanding Java
- Problem 2 (2/10):
  * Another good warmup, the hints and setup really give the puzzle away; however, you need to have some understanding of web programming in order to solve this.
  * Useful Skills: Node/JavaScript/cURL, Timing Attacks, Concurrency
- Problem 3 (3/10):
  * A bit hard to wrap your head around at first, but a brute force solution can crack this problem. You need to do a bit of searching if you haven't seen Back to the Future. There is probably a pattern, but brute force was sufficient for us.
  * Useful Skills: Node/JavaScript/cURL, Dictionary Lookup, Sets
- Problem 4 (5/10):
  * This problem should be relatively easy for a basic machine learning student with a grasp of Keras. Even for a beginner, not much prior knowledge is needed. A bit of googling can help to find the solution; however, this is quite a bit of a step up theoretically compared to the last few.
  * Useful Skills: Machine Learning (Convolutional Neural Networks), Keras, Gradient Ascent (or Hill Climbing), Python
- Problem 5 (8/10):
  * This problem is hard to rate. On one hand, a monkey could do this with enough time using brute force; in fact, almost anyone could do it within 10-12 hours as long as they can type at a decent clip and aren't afraid of going clinically insane. There are also many solutions to this problem. We chose one of the harder ones to implement and it was not obvious at all how to approach this problem unlike the other ones.
  * Useful Skills: Convolutional Neural Networks, Keras/Theano/Tensorflow/Other Machine Learning Toolkit, Hashing<sup>1</sup>, OCR

Obviously, there were many solutions to all of these problems and so the difficulty rating is pretty subjective; it also depends on your skill level with each of the tools used.

<sup>1</sup>We have heard that you can reverse engineer this problem (removing the fun and educational part), MD5 hashing being a key step.
