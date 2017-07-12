Puzzle 2
========

After completing the first puzzle, the second puzzle can now be launched. This will bring you to [store.delorean.codes/u/\<username>/login](https://store.delorean.codes/u/<username>/login) (again change <username> field).

Part 1
------

You are now faced with a login page where you must choose between logging in as Marty or Biff. The top of the page gives an interesting clue

```
Server UPGRADES: We now use brand new Pentium Pro Chips! This page loads faster than you can blink ;)
```

There isn't much to this clue, but if you continue to dig you will find this comment in the page source.

```
STORE-1294: Your login speed could be improved by immediately terminating if a[i] != b[i]
Re: STORE-1294: fixed!
```

We immediately recognized this as a [timing attack](https://en.wikipedia.org/wiki/Timing_attack). Basically, they are suggesting that it will take longer to compare two similar passwords (e.g. `abc1234` and `abc4213`) because it takes four comparisons vs. one comparison for dissimilar passwords (e.g. `1234acd` and `acd1234`). This is almost certainly not the case for a real application, as mere comparisons are very fast. (Though timing attacks can be viable in other cases and with larger samples.) 

To clarify, brute force would be infeasible as there are a total of 26 + 26 + 10 = 62 possible characters for an alphanumeric password (you find out they want alphanumeric the moment you submit a bad password of at least 6 characters). If there are anywhere from 6 to 12 characters with 62 possibilities for each, that means we are looking for anywhere from 5 x 10^10 to 3 x 10^21 passcodes. However, if instead we only have to try each character once per location we have at most 62 x 12 = 744 passcodes to try.

So we tried one character per location and picked the one with the greatest server response time (in milliseconds).

We attempted to solve this using `time` and `curl` in a small bash script, which was not successful.

So then let's write some code. We need to be able to record server response time. The node.js `request` package provides `res.elapsedTime`, exactly what we need. We start with a single character and work our way up the whole 10-chararacter password. It seems that each comparison is artifically slowed down to take an additional 500ms.

Since the times get longer and longer, this method still takes quite a bit of time to run. You know you're headed in the right direction if the log in attempt takes a long time. If the script is running quickly, you've probably made a mistake.

Our code could be improved since after our initial attempts it seems obvious that the timings increase by 0.5 seconds for each character, so you could stop at the first slow response, halving the time on average. We could have also done the requests concurrently, though we were unsure if this would affect response times (probably not on the order of 0.5 seconds).

Using this method, you have to find the passcodes for both Marty and Biff and then you're in. It also required modifying our script manually, since network noise could cause anomalous results.

Part 2
------

Now that you're in you're lead to a new page, the HackStore, showing your balance of hackcoins. Each account will have 50 hackcoins and you can transfer the coins between the two accounts; however, it becomes immediately obvious that you can only have 100 in either account at any time. The store says that you can only buy the solution for 1000 hackcoins. 

You need to find a way to get 1000 hackcoins. How could you possibly hack a sytem that only lets you transfer money back and forth?It depends on how the system was implemented on the server side. When is the other person's account balance updated? Before or after the balance of your account is updated? Say the query to add coins to Biff's account is executed *before* the query to reduce your account balance. That means there is some amount of time where Biff's account has your coins, but your account hasn't had its balance reduced yet. What if you made several rapid requests, so that you transfer twice before your account balance is updated?

Turns out that's the solution. Not much to it!

```
while true; do curl -X POST -F "to=biff_tannen" https://store.delorean.codes/u/<username>/transfer &; done
```

The & runs each curl instance in the background, so you are in essence running many requests in parallel. Terminate this after a few seconds and you should have plentiful hackcoins. You could probably juggle transfers between Biff and Marty to get an even larger quantity of hackcoins (for no purpose).

Once you have enough coins, buy the solution and *voila*they give you the time. Go back to the homepage and submit it.
