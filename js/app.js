/*
 * Udacity: Create a list that holds all of your cards
 $arrayofCards: OK
 * Gus: Declare variables here, too.
 $openCards are the one or two cards currently in play  OK
 $revealedCards are the cards that have previously been revealed
 $openShow are the cards on constant display because of matching pairs;
 */
 let $arrayofCards, $openCards, $revealedCards, $openShow;
 $arrayofCards = document.querySelectorAll('.card');
 //$openCards = ['string0','string1'];
 $openCards = [];
 $revealedCards = [];
// const $listofCards = $('#deckofCards');                  //one of these can be an array
// const $arrayofCards = document.querySelector('.deck');  //likely, this one
//let $arrayofCards = [];


/*
for (let index = 0; index < 16; index++) {
  let thisCard = document.querySelector('.card');
  $arrayofCards[index] = thisCard;
  $arrayofCards.push(thisCard);
}

for each card in deck {
  $arrayofCards.push(thisCard);
  $arrayofCards.forEach(some function);
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page

https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

document.body.onload = addElement;
function addElement () {
// create a new div element
var newDiv = document.createElement("div");
// and give it some content
var newContent = document.createTextNode("Hi there and greetings!");
// add the text node to the newly created div
newDiv.appendChild(newContent);

// add the newly created element and its content into the DOM
var currentDiv = document.getElementById("div1");
document.body.insertBefore(newDiv, currentDiv);
}

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
 * DONE - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * DONE - if the list already has another card, check to see if the two cards match
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
  if ($obj.hasClass('card open show')) { //if card is blue, clicking it does nothing
    return null;
  }
  $obj.toggleClass('card'); //https://stackoverflow.com/questions/7014385/javascript-jquery-to-change-class-onclick
  $obj.toggleClass('card match');
  insertOpenCards($obj);
}//end of displaySymbol


function insertOpenCards($obj) {

    $openCards.push($obj);

    if ($openCards.length == 2) {
      checkOpenCards();
    }
/*
  if ($openCards[0] == 'string0') {
    $openCards[0] = $obj.children().attr("class");
    $card0 = $obj;
    $revealedCards.push($openCards[0]);
  } else {
  $openCards[1] = $obj.children().attr("class");
  $card1 = $obj
  $revealedCards.push($openCards[1]);
  checkOpenCards(); //may be incorporated here

}
*/
}

function checkOpenCards($obj) {
  if ($openCards[0].children().attr("class") == $openCards[1].children().attr("class")) {
  //if ($openCards[0] == $openCards[1]) {
    $($openCards[0]).removeClass('card match').addClass('card open show');
    $($openCards[1]).removeClass('card match').addClass('card open show');
    //alert("Cards are of the same class!");
  } else {
    //CODE HERE: must close cards and add star demerits
    alert ("Cards are not of the same class.")
  }
  //$openCards = ['string0','string1']; //reset $openCards
  $openCards = []; //reset $openCards
}
