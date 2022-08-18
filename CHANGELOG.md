<!-- XX.XX.XX
# ADDED
# CHANGED
# DEPRECATED
# REMOVED
# FIXED
# SECURITY -->

<!-- V# 1.1.0
# FIREMAKING

- DONE - need to test lol
- DONE - function needs to find the first log item in the inventory, replace it with blank, then dispatch the xp
- DONE - function needs to check the amount in inventory, and if it gets to 0, refill with more of the chosen log
- DONE - function needs to be aware of the amount of the chosen log in the players bank
- DONE - function needs to not withdraw into the negatives
- DONE - function needs to be capable of dealing with withdrawing an amount under 28 and still executing as defined above
- DONE - function needs to empty the inventory, then withdraw 28 of the chosen logs
- DONE - clicking the buttons sets needsToBank to true, and sets another piece of component state (playerIsFiremaking) to true [not sure if i need this last boolean]
- DONE - skills panel styles them based on the player's firemaking level
- DONE - skills panel shows the logs the player currenly has, and their amount
- DONE - inventory slice needs a way to remove individual items from the inventory -->

<div align="center">
  <h1>The Firemaking update</h1>
  <p>Release 1.1.1</p>
</div>

#### ADDED

- Firemaking is now trainable! The skills panel will show you the logs you can burn based on your skill level, and if you actually have any logs in the bank.

#### CHANGED

- Selecting any skill will cause your inventory to be deposited on the next game tick, making logic that removes certain items from the inventory easier.
- Updated state triggering the player to bank their inventory upon loggin in to prevent possible inventory overflow.

#### REMOVED

#### FIXED

- Items in the inventory now display their display name when hovering over them. (I needed to use the title attribute, not alt)
- Added an asset for clay.

#### SECURITY
