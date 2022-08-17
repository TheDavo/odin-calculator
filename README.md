# odin-calculator

The Odin Project - Foundations - Calculator

This is the final major project in the The Odin Project's Foundation course.

# features

## history

Once the user clicks on the compute sign (=), the input feed and the result will be pushed to a game history stack.

This then creates a `<tr> <td>` pair that appended to the game history table.

## undo

Using the Back button ('Bk'), the user can undo any actions.

Each current calculation has its own on-going history, and using an array/stack's `pop()` function, the most recent actions can be removed.
