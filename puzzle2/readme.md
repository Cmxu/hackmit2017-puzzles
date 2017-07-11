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

At this point, with some prior experience and thinking we know that they are looking for a timing based attack. Basically, they are suggesting that their servers respond super fast and they have implemented this login speed "fix" which runs through the password you submit and terminates the moment it is wrong. This suggests that if you submit the correct first entry the server will take longer to respond, and then repeat this process till you find the passcode.

Initially, brute force seems infeasible as there are a total of 26 + 26 + 10 = 62 possible characters for an alphanumeric password (you find out they want alphanumeric the moment you submit a bad password of at least 6 characters). If there are anywhere from 6 to 12 characters with 62 possibilities for each, that means we are looking for anywhere from 5 x 10^10 to 3 x 10^21 passcodes. However, if instead we only have to try each character once per location we have at most 62 x 12 = 744 passcodes to try.

So then lets whip up some code. We need to be able to record server response time... (ADD MORE). Since the times get longer and longer, this method still takes quite a bit of time to run.

Our code could be improved since after our initial attempts it seems obvious that the timings increase by 0.5 seconds each time, so you could stop prematurely, halving the time on average. It could also be down concurrently with node although I'm not sure how server times would be affected by this.

Using this method, you have to find the passcodes for both Marty and Biff and then you're in.

Part 2
------

Now that you're in you're lead to a new page (Maybe say the page here, I can't get in right now D:). It's like a store, each account will have 50 hackcoins and you can transfer the coins between the two accounts; however, it becomes immediately obvious that you can only have 100 in either account at any time, and the store says that you can buy the solution for 1000 hackcoins. 

You need to find a way to get 1000 hackcoins. The first thing that you notice is that there are two accounts and a transfer button, this immediately suggests an attack where you might flood the server with transfer requests in order to cause it to transfer your amount multiple times. In fact, this is the solution. Using Node, you can do this relatively easily to get enough coins.

Once you have enough coins, buy the solution and Voila they give you the time. Go back to the homepage and submit it.
