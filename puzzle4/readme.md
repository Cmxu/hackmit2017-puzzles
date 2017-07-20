Puzzle 4
========

Finally, we get into the realm of machine learning. The puzzle is hosted on [hotsinglebots.delorean.codes/u/\<username>](https://hotsinglebots.delorean.codes/u/<username>), a site aptly named Tinbot. On the surface, this puzzle is cleverly designed as a stripped down version of tinder, giving you the ability to set a profile picture and to try to match with the bots. After playing around for a bit and uploading some images, you might get some matches but it's hard to see what is going on.

Part I - Understanding the Problem
----------------------------------

Checking the console on the webpage while clicking through bots shows us that each bot excepts some label. Clicking through a lot we get this list of possible labels.

```
airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck
```

If you have any familiarity with machine learning and have done problems, these labels probably look familiar to you, but you could also google them and find a popular dataset called [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html). If you submit the correct image for each bot given the label they want, you'll match with that bot.

Just for understanding the problem, we wrote a quick script which submits a profile picture given the label so it matches with each bot. See [preliminary.js](preliminary.js). However, doing this we found we never matched with bots that prefer automobiles. This turns out to be the challenge of this puzzle: to submit an image that will match with a bot that prefers automobiles. 

Part II - Loading up Keras
--------------------------

We now must find an image that the bots see as an automobile. Although it might be possible to get luckly while trying random images, the key to this puzzle is again to inspect the page source in which you will find this comment at the very top.

```
<!-- FIXME: Make /api/Cmxu/model/model.json, and model.hdf5 files private. -->
```

However, this time there is no comment saying fixed, and so we immediately go find these files by going to the corresponding urls ([model.json](https://hotsinglebots.delorean.codes/api/<username>/model/model.json) and [model.hdf5](https://hotsinglebots.delorean.codes/api/<username>/model/model.hdf5), of course making sure to replace the username field as each users files will be different). A quick google search will tell you that a .hdf5 file is just a file format for storing different kinds of data, if you weren't sure. Looking at the model.json file you will find the keywords *keras* and *tensorflow* immediately hinting at the need for these tools.

If you haven't already, install both keras and tensorflow including any dependencies they might need, the following line should do.

```
pip install keras tensorflow
```

Next, a quick google search will show you how to use the two files in Keras (or you could look at our code). The two files together create a pretrained model. In Keras, you give the model an image and it spits out an array with 10 entries. Each entry is a weight for a specific class, and it predicts your image to be the entry with the highest weight. Some quick playing around and you'll find that the problem can be reduced to trying to find an image which maximizes the second entry in the array (or 1st entry is counting from 0) or just makes that entry larger than all the others. Thus, we implement a simple Hill Climbing Algorithm to find such an image.

Part III - Hill Climbing
------------------------

Hill climbing is a mathematical local search optimization technique, and for this problem we only need the most basic version (see [wikipedia](https://en.wikipedia.org/wiki/Hill_climbing) for more). The basic idea is that you have some function you want to optimize and you slowly pull yourself towards a maximum. If you have no idea what I am talking about about, imagine one of those contour maps for geography. Start at some random point on the map and move in a random direction. If you get higher stay there, if not go back. Repeat. This is an extremely naive approach, but it is enough to solve this problem pretty quickly. A "better" solution might be to use [gradient ascent](https://en.wikipedia.org/wiki/Gradient_descent).

This process goes pretty fast, the only problem we ran into was scaling. This was remedied by the following hint on Slack:

```
ANOTHER HINT: uint8
```

This essentially told us that their network was trained with pixel colors between 0 and 255 where I had been using 0 to 1. Otherwise, the general idea is to load their model. Generate a random point. Continue to generate a random movement, move there, see if it does better, then repeat. In our code we also implemented a way to update the learning rate, but it turns out that we only had to do that when using 0 to 1 and the learning rate doesn't actually need to be changed for 0 to 255 as it converges quite quickly. There is also a stopper for the objective value but it doesn't matter when you stop it as long as the value for automobile is higher than the rest. See [hillclimb.py](hillclimb.py).

Using this we get an image that looks something like this: ![alt text](pfp.jpg "Hot Automobile"). It really looks like nothing, but at least it tricks the bots!

Once you've generated your image, set it as your profile picture on [Tinbot](https://hotsinglebots.delorean.codes/u/<username>/profile) and then click through bots until you have one that prefers automobiles. Once you match with such a bot, *eureka*, the magic date appears.
