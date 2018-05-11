/*
 * Udacity: Create a list that holds all of your cards
 $listofCards
 * Gus: Declare variables here, too.
 $openCards are the one or two cards currently in play
 $revealedCards are the cards that have previously been revealed
 $openShow are the cards on constant display because of matching pairs;
 */
 let $openCards, $revealedCards, $openShow;
 $openCards = ['string0','string1'];
 const $listofCards = $('#deckofCards');                  //one of these can be an array
 const $arrayofCards = document.querySelector('.deck');  //likely, this one



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * DONE set up the event listener for a card. If a card is clicked:
 * DONE - display the card's symbol (put this functionality in another function that you call from this one) DONE
 * DOING - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function
  that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this
 functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function
 that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in
 another function that you call from this one)
Gus: Star system will have demerits if turned card has data-revealed = true

 */

//class 'card open show' means the card is unclickable, matching pairs
//$(this).removeClass('myclass');
//$(this).addClass('showhidenew');

//$('body').on('click', 'li', function() { //not ideal

/*
$('body').on('click', '.card', function() {
//$('body').on('click', test, function() { //não funciona

  $(this).toggleClass('card'); //https://stackoverflow.com/questions/7014385/javascript-jquery-to-change-class-onclick
  $(this).toggleClass('card match');
});
*/


//$('body').on('click', '.card', displaySymbol(this));
$('.card').click(function() {
  displaySymbol($(this)); //https://stackoverflow.com/questions/7519815/in-jquery-how-to-pass-the-element-that-was-clicked-to-the-method-that-is-called
});

function displaySymbol($obj) {
  $obj.attr('data-revealed','true'); //for the star demerits
  $obj.toggleClass('card'); //https://stackoverflow.com/questions/7014385/javascript-jquery-to-change-class-onclick
  $obj.toggleClass('card match');
  insertOpenCards($obj);
}//end of displaySymbol

/*
function insertOpenCards($obj) {
  if ($openCards[0] == 'string0') {
    $openCards[0] = $obj.children()attr("class");
  }
}
*/
