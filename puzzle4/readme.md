Puzzle 4
========

Finally, we get into the realm of machine learning. The puzzle is hosted on [hotsinglebots.delorean.codes/u/\<username>](https://hotsinglebots.delorean.codes/u/<username>), a site aptly named Tinbot. On the surface, this puzzle is cleverly designed as a stripped down version of tinder, giving you the ability to set a profile picture and to try to match with the bots. After playing around for a bit and uploading some images, you might get some matches but it's hard to see what is going on.

Part 1 - Understanding the Problem
----------------------------------

Checking the console on the webpage while clicking through bots shows us that each bot excepts some label. Clicking through a lot we get this list of possible labels.

```
airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck
```

If you have any familiarity with machine learning and have done problems, these labels probably look familiar to you, but you could also google them and find a popular dataset called [CIPHAR-10](https://www.cs.toronto.edu/~kriz/cifar.html). If you submit the correct image for each bot given the label they want, you'll match with that bot.

Just for understanding the problem, we wrote a quick script (ADD REFERENCE) which submits a profile picture given the label so it matches with each bot. However, doing this we find we never match with bots that prefer automobiles. This turns out to be the challenge of this puzzle, to submit an image that will match with a bot that prefers automobiles.

Part 2 - Loading up Keras
-------------------------

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

Part 3 - Hill Climbing
----------------------

