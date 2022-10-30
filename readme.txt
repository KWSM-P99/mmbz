TLDR: paste EQ Logs dir into path.txt, run MMBZ-Server.exe, open browser to localhost:8080


**SETUP**

1. Enter your EQ installation Logs directory into path.txt file in this folder.

- Navigate to your Everquest 1999 directory.
- Open the Logs folder.
- Right-click the navigation bar and select "Copy address as text".
- Open path.txt and hit Ctrl + V (or File -> Paste)

  It should look something like:
  C:\EverQuest Project 1999\Logs

- File -> Save

2. Run the application MMBZ-Server.exe. Leave the terminal window open and running.

3. For browser view type localhost:8080 into your browser nav bar. To create a shortcut, in Chrome right click the 3 dots in the top right corner, select More Tools -> Create Shortcut. If you want a non-browser view, check Open as window.

**USE**

1. To start a bidding session, type in /say mmbz START
2. To end the bidding session, type in /say mmbz STOP
3. To bid as an officer:
	3a. Start a session (/say mmbz START)
	3b. Before you begin taking bids, enter your DKP and ITEM. Submit Bid
4. To see these results in mmbz, you must click Start Fetch. This can be done before, during, or after the bidding has occurred. Click again if you wish to end the active log parsing. 


**FUTURE FEATURES**

1. Store Sessions

Sessions will always exist in the officer's log file, but it might be nice to retrieve a bidding session at any time down the line.

2. Adjustable polling rate

User will be able to select how many seconds occur before a fetch (for those of you with huge log files that don't wish to back them up elsewhere).

**KNOWN ISSUES**

Parsing for tells with 2 or more numbers incomplete at this time. It will show the first number as the bid.
Timestamps are ISO which is India, I think.

---

Happy Beanz Counting!
-Sunwind
