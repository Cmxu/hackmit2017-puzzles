Puzzle 1
========

Arguably the easiest puzzle as the puzzles generally got harder as they progressed. You can get to it by launching the first problem from the website; otherwise, it is hosted at [warp.delorean.codes/u/<username>](warp.delorean.codes/u/<username>).

Part 1
------

The puzzle brings you to a copy of their home page, except all of the fonts are strange. You can play with the html (ADD HOW) and make all the fonts go away, or just copy the important text. As with all the puzzles everyone will be solving the same puzzles and the same technique can be applied but the answers change by user.

After copying the text, you will see that it is unreadable, instantly it looks like some sort of cipher text. So we tried to solve it using a substitution cypher.

(Add your python code)

Another way to approach this problem would be just to load up an existing cypher solver such as

- [quipquip](http://quipqiup.com)
- [wordplays](http://www.wordplays.com/cryptogram)

Putting your text in will mostly solve all of the text and you can replace the missing letters just by looking at the source text from the HackMIT [homepage](hackmit.org).

From either of these methods you will get the cypher then you just apply the cypher to the link below. Simply click the link and replace the wrong text with the real text (the last three letters should be jar). This will download a jar file.

Part 2
------

Now we have a jar file. If you run the file it will just tell you "It's not your time yet!" (Is that right???). So we decompile the jar file to get a look at the code. There are many ways you could approach this, but one common one would be to use a service like [java-decompiler](http://jd.benow.ca).

After getting your jar file decompiled, you see that it is trying to wait for some specific time before it shows. You can try to change your system time to match this, but an easier solution would be just to copy the print statement inside the if statement as it does not depend on the time in any way. I just copied it and put it into a compiler, I find [repl.it](repl.it) to be useful for this.

After you run this, Presto you're done, the string will say something like "Your time is XXX 00 0000 00:00 XX." Take this string and enter it into the keypad back at [delorean.codes](delorean.codes) and you're done!


