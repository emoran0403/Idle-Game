<!--
<div align="center">
  <h1>The something update</h1>
  <p>Version XX.XX.XX</p>
  <p>Released 2022-MM-DD</p>

  <a href="https://ejmdev-idlescape.herokuapp.com/">Play now</a>
</div>
# ADDED
# CHANGED
# DEPRECATED
# REMOVED
# FIXED
# SECURITY -->

<!-- Currently in Development -->

<!-- <div align="center">
  <h1>The Runecrafting update</h1>
  <p>Version 1.2.4</p>
  <p>Released 2022-MM-DD</p>

  <a href="https://ejmdev-idlescape.herokuapp.com/">Play now</a>
</div>

#### ADDED

- Added Runecrafting as a skill! Players may create runes from essence at the altars in certain locations, or train their skills in the Runespan, located in the Wizards' Tower.
- Added Wizards' Tower as a location. The Wizards' Tower features 4 quests, rune and pure essence mining options, and a lesser demon to fight.

#### CHANGED

- Bronze and Iron hatchets now show a woodcutting level requirement of 1 (0 looks silly).
- The current resource is now more accurately described based on the your current activity.
- The Bank panel now displays currencies (currently only coins and runespan points).

#### DEPRECATED

#### REMOVED

#### FIXED

- Combat was ignoring footwear, but now respects your kicks.
- Prevented a possible crash with current resource component trying to access .displayname of an undefined item.

#### SECURITY -->

<!-- Currently in Production -->

<div align="center">
  <h1>The Firemaking update</h1>
  <p>Version 1.1.1 </p>
  <p>Released 2022-8-17</p>
  <a href="https://ejmdev-idlescape.herokuapp.com/">Play now</a>
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
