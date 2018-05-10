# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Suggested Strategy

//1) Start by building a very simple grid of cards.
      Don't worry about styling, just get something clickable on the page.
      Figure out the HTML needed to represent a card. Remember, you have to represent two sides of the card. Are you going to have two separate elements stacked on top of each other?
//2) Add the functionality to handle clicks.
      This should reveal the hidden side of each card.
      This is done but ought to be improved. Encapsulate functions.
3) Work on the matching logic. How does your game "know" if a player guesses correctly or incorrectly?
4) Work on the winning condition. How does your game “know” if a player has won?
5) We recommend saving styling until the very end. Allow your game logic and functionality to dictate the styling.

## Rubric

#Game Behavior

Memory Game Logic

The game randomly shuffles the cards. A user wins once all cards have successfully been matched.

Congratulations Popup

When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was.

Restart Button

A restart button allows the player to reset the game board, the timer, and the star rating.

Star Rating

The game displays a star rating (from 1 to at least 3) that reflects the player's performance. At the beginning of a game, it should display at least 3 stars. After some number of moves, it should change to a lower star rating. After a few more moves, it should change to a even lower star rating (down to 1). The number of moves needed to change the rating is up to you, but it should happen at some point.

Timer

When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.

Move Counter

Game displays the current number of moves a user has made.

#Interface Design

Styling

Application uses CSS to style components for the game.

Usability

All application components are usable across modern desktop, tablet, and phone browsers.

#Documentation

Comments

Comments are present and effectively explain longer code procedure when necessary.

Code Quality

Code is formatted with consistent, logical, and easy-to-read formatting as described in the Udacity JavaScript Style Guide.
