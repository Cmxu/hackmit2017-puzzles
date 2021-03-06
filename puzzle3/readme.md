Puzzle 3
========

After opening this challenge, which is hosted at [the.delorean.codes/u/\<username>](https://the.delorean.codes/u/<username>/), you will see that Doc and Marty are trying to send messages through time, but their messages get scrambled pretty heavily in the process.

Part I - Playing with Codes
---------------------------

There are a few features on the page. The first you might notice is two notepads structured as the following.

| Sent codewords                                                                                                                                      | Received messages      |
|-----------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|
| hey way still isnt ever bob missing know nickles television letting                                                                                 | great scott            |
| know how want was better reelect son havent jennifer jennifers slip what totaled here produced advice                                               | eighty eight mph       |
| sponsoring thats not bob company readout around um or gullible worry oh can down disintegrate deloreon embarrassment claimed mayor freak worked you | get your hands off her |

You will also have a message which looks like the following.

```
The ____ of _____ but like _____
```

Your task is to encode the message with their unknown algorithm. As you try to enter codewords into the log, nothing seems to work; all it returns is "ERROR READING." Careful examination of the table shows that there are the same number of words in the codewords as letters in the messages; furthermore, if you reset the log you will eventually notice that the order of the words doesn't matter. Finally, if you are familiar with the *Back to the Future* films, you might notice that all of the words (except "bob" kind of threw me off) come from the movie. 

#### DISCLAIMER

The remainder of this solution is very hacky and not even close to the best way to solve this problem. This is just the method we came up with on the spot.

Part II - Brute Force
---------------------

We noticed next that if we took codewords from the script of the movie, we could finally get some words to work.

| Sent codewords | Received messages |
|----------------|-------------------|
| back           | a                 |
| to             | b                 |
| the            | c                 |
| future         | d                 |

Now is where the mysterious "bob" comes in, as Bob Gale is a cowriter of the films so his name also appears in the screenplay. One of the biggest challenges we had in coming up with the correct solution was finding the screenplay/script that was used by the writers of this problem (at the moment this is still a mystery<sup>1</sup>). For example, in some versions of the script the word "catch" is written as "cat h", meaning that our algorithm would find *catch* where the word was actually *cat*. We created a list of unique words in the order that they appear in the script, and then did a brute force search, slowly building up the desired string by finding the letters one at a time while searching through the set of words.

The general idea is that the order of the words does not really matter, and that some word in the script corresponds with the next letter. By repeatedly making requests we could iteratively find the next letter.

Then *tada*, you're done. The magic date appears and it's on to the next puzzle.

<sup>1</sup>We found later from the solvers group on Slack that the script they used was actually [revealed](https://the.delorean.codes/static/script.txt) in the HTTP headers.

