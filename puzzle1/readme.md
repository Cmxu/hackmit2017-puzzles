Puzzle 1
========

Arguably the easiest puzzle as the puzzles generally got harder as they progressed. You can get to it by launching the first problem from the website; otherwise, it is hosted at [warp.delorean.codes/u/\<username>](https://warp.delorean.codes/u/<username>) (replace \<username> with your username).

Part 1
------

The puzzle brings you to a copy of their home page with a custom, unreadable font. Simply "view source" in order to copy the clear text. You could also use the developer tools in your browser of choice to modify the CSS. Ultimately, you can just copy and paste off the page with no problems. As with all the puzzles, the answers vary by user.

After copying the text, you will see that it is unreadable, instantly it looks like some sort of cipher text. So we tried to solve it using a substitution cipher.

Using the clear text from the original website at [hackmit.org](https://hackmit.org), we created a mapping between characters. Sometimes this resulted in long chains of substitutions, e.g. a -> b -> c -> d. So we first found the path for each character and then sorted the order of application of the substitutions by ascending path length.

See `solution.js`.

Another way to approach this problem would be just to load up an existing cipher solver such as

- [quipquip](http://quipqiup.com)
- [wordplays](http://www.wordplays.com/cryptogram)

Putting your text in our tool or an existing tool will mostly solve all of the text and you can replace the missing letters just by looking at the source text from the HackMIT [homepage](https://hackmit.org).

From either of these methods you will get the cipher then you just apply the cipher to the link below. Simply click the link and replace the wrong text with the real text (the last three letters should be jar). This will download a jar file.

Part 2
------

Now we have a jar file. If you run the file it will just tell you "It's not your time ;)". So we decompiled the jar file to get a look at the code using. There are many ways you could approach this, but one common one would be to use a service like [JD-GUI](http://jd.benow.ca).

After getting your jar file decompiled, you see that it is trying to wait for some specific time before it shows. You can try to change your system time to match this, but an easier solution would be just to copy and execute the print statement inside the if statement as it does not depend on the time in any way.

After you run this, the string will say something like "Your time is XXX 00 0000 00:00 XX." Take this string and enter it into the keypad back at [delorean.codes](https://delorean.codes) and you're done!


