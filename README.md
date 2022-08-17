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

# features not implemented

## key-bindings

This calculator does not include any key-bindings. For this project it would go over the main challenge which is the get an indefinite input of calculations and compute the result.

## PEMDAS

There is no intelligence on prioritizing calculations with paranthese, multiplications, or divisions first.

Because the calculator computes based on inputs rather than parantheses and a final compute input, it would require sizable refactoring to implement.
