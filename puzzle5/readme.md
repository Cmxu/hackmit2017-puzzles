Puzzle 5
========

You made it, it's the final puzzle and it's all about CAPTCHAS. The basic premise of this task is that you will need to solve CAPTCHAS, in fact, you will need to solve at least 10000 of them in order to pass. This puzzle is unlike the others in the sense that the goal is not hidden, but it is hard in the sense that there is no set way to do this problem. So below I will provide a brief overview of some of the techniques we know about that worked.

| Technique   | Comments                                                                                                                |
|-------------|-------------------------------------------------------------------------------------------------------------------------|
| Brute Force | For the Masochists. The contest is over, it's not worth it anymore.                                                     |
| Hashing     | A quick solution if you can find it, but not too satisfying in my opinion.                                              |
| OCR         | [Tesseract](https://github.com/tesseract-ocr/) is good at this, but it requires a lot of work to achieve good accuracy. |
| cNN         | Convolutional Neural Networks. This is it what we use in our solution below.                                            |

Part I - Initial Steps
----------------------

First things first, we have to download a lot of CAPTCHAS. This is pretty easy with Javascript/Node/cURL, pick your poison and download a bunch. (INSERT CODE). You can download the files from [captcha.delorean.codes/u/\<username>/challenge](https://captcha.delorean.codes/u/<username>/challenge) (again, they are different by user so make sure to replace the username field). The files contain 1000 CAPTCHAS with each having a name, picture pair like below.

```
{"name":"daaa8540ef311fa3452e8863c206929d","jpg_base64":"..."}
```

The images are stored as base 64 jpg files, you can easily view them with (INSERT STUFF)

```

```

This is an example of what one of my CAPTCHAS looks like.

(INSERT IMAGE)

Once you download a bunch of these CAPTCHAS, you enter the painful part. At one point during the competition we knew that if there were only 10 slots left we would have done all 10000 by hand so since we didn't know what to do yet we wrote a quick app and started doing them by hand. It turns out that this was extremely useful training data for the convolutional neural network later, we each did 1000, but only used one of those to actually train, I have saved you the trouble and included our training data.

Part II - Preprocessing
-----------------------

This is where things start to get hectic. I tend to prefer Java for speed and also comfort so I started writing my preprocessor in Java but then used Python to do the machine learning so there will be some transfer back and forth between languages and passing of files.

### Section A - Cleaning

The first thing you might notice is that all the CAPTCHAS have the same background image which consists of 4 colored strips and also, annoyingly, a few white lines. So, we want to remove all of this from each captcha. What's annoying about the white lines is that removing them cuts into the characters in strange ways, but if you don't remove them they remain hard to read.

The first thing I did was convert the color images to grayscale. After making the images grayscale it is a lot easier to deal with them and the color does not affect the results in any way. Next, we want to calculate the background mask. We can do this in a few ways, but I choose to calculate the mode color of each pixel which turned out to work pretty well. The mode pixel will be the one that appears most commonly in all the images, in otherwords, the background.

So now we have the background. What's remaining is to remove the background, add back pieces of the white lines that where part of characters and make the entire image into binary colors (black and white). The first part is easy, we can simply subtract the background from the image. Next in order to add back pieces of the white lines, we go through the entire image and for each pixel we count how many nearby pixels are also white. Then if a pixel was originally removed as background and it was part of a white line and it has enough nearby pixels we add it back to the image.

What results is one of the cleaner results we have seen.

(INSERT IMAGE (maybe also throughout, above/below))

### Section B - Character Seperation

Although it would be possible to directly feed each of the images into the training phase of the convolutional neural network, the learning would be slow and we would need much more data; however, if we instead parsed each image into individual characters we could train the network much faster.

Since our images are relatively clean

Part III - Convolutional Neural Networks
----------------------------------------
