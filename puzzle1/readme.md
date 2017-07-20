Puzzle 1
========

Arguably the easiest puzzle as the puzzles generally got harder as they progressed. You can get to it by launching the first problem from the website; otherwise, it is hosted at [warp.delorean.codes/u/\<username>](https://warp.delorean.codes/u/<username>) (replace \<username> with your username).

Part I - Playing with Ciphers
-----------------------------

The puzzle brings you to a copy of their home page with a custom, unreadable font. Simply "view source" in order to copy the clear text. You could also use the developer tools in your browser of choice to modify the CSS. Ultimately, you can just copy and paste off the page with no problems. As with all the puzzles, the answers vary by user.

After copying the text, you will see that it is unreadable, instantly it looks like some sort of cipher text. So we tried to solve it using a substitution cipher.

Using the cleartext from the original website at [hackmit.org](https://hackmit.org), we found the necessary substitutions to decipher the URL. See [solution.js](solution.js).

Another way to approach this problem would be just to load up an existing cipher solver such as

- [quipquip](http://quipqiup.com)
- [wordplays](http://www.wordplays.com/cryptogram)

Our tool or an existing tool will most likely decipher all of the text if provided a sample of cleartext and ciphertext (see [contents.txt](contents.txt)). You can then decipher the link at the bottom of the page. This will download a JAR file.

Part II - Decompiling Jars
--------------------------

Now we have a JAR file. If you run the file it will just tell you that "It's not your time ;)". So we decompiled the JAR file to get a look at the code. There are many ways you could approach this, but one common way would be to use a program like [JD-GUI](http://jd.benow.ca).

After getting your JAR file decompiled, you can see that it waits for a specific time interval before executing a large part of the program. You can try to change your system time to match this, but an easier solution would be just to copy and execute the `System.out.print` statement inside the `i`f statement, as it does not depend on the time in any way (if you have Java installed, use that; otherwise, sites like [repl.it](https://repl.it) are very useful for something quick).

After you run this, *presto* you're done! The string will say something like "Your time is XXX 00 0000 00:00 XX." Take this string and enter it into the keypad back at [delorean.codes](https://delorean.codes).


