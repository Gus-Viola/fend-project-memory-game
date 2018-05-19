/*
 * Gus: Declare variables here, too.
 openCards are the one or two cards currently in play  OK
 revealedCards are the cards that have previously been revealed
 openShow are the cards on constant display because of matching pairs;
 */
 let arrayofCards, openCards, revealedCards, openShow;
 arrayofCards = document.querySelectorAll('.card'); //list that holds all cards
 revealedCards = [];
 openCards = [];

 $('.restart').click(function() {
   displayCards();

  // $('.card').click(function() { //event handler needs to be recreated after displayCards run
  //   displaySymbol($(this));
  // });

$('.card').click(onCardClick);
 });

 function displayCards() {
  let tempArray = [];
  tempArray = shuffle([...arrayofCards]); //spread allows for correct array manipulation
  //document.querySelector('.deck').innerHTML = "";
  $('.deck').children().remove();

  tempArray.forEach(function(arrayElement) {
    const newListItem = document.createElement("li");
    const newItem = document.createElement("i");

    $(newListItem).attr('class','card');
    $(newListItem).attr('data-revealed','false');
    newItem.className = $(arrayElement).children().attr("class");

    newListItem.appendChild(newItem);
    document.querySelector('.deck').appendChild(newListItem);
  });
    return null;
}

/*
 * Display the cards on the page
 * DONE  - shuffle the list of cards using the provided "shuffle" method below
 * DONE  - loop through each card and create its HTML
 * DONE  - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,  temporaryValue, randomIndex;

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
 * DONE DIFFERENTLY   + if the cards do match, lock the cards in the open position (put this functionality in another function
  that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this
 functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function
 that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in
 another function that you call from this one)
Gus: Star system will have demerits if turned card has data-revealed = true

 *
*/

//$('body').on('click', '.card', displaySymbol($(this)));
$('.card').click(onCardClick);





  function onCardClick() {
    $(this).attr('data-revealed','true'); //for the star demerits
    if ($(this).hasClass('open show') || $(this).hasClass('match')) { //if card is open, clicking it does nothing
      return null;
    }

if (openCards.length < 2) {

//  $(this).animateCss('flipInY', function(){
                $(this).addClass("open show");
      //      });

            openCards.push($(this));

  //displaySymbol($(this)); //https://stackoverflow.com/questions/7519815/in-jquery-how-to-pass-the-element-that-was-clicked-to-the-method-that-is-called

}

  if (openCards.length === 2) {
    checkOpenCards();
    openCards = [];
  } //else {
  //  return null;
  //}

};

function displaySymbol(obj) {
//  obj.attr('data-revealed','true'); //for the star demerits
//  if (obj.hasClass('open show') || obj.hasClass('match')) { //if card is open, clicking it does nothing
//    return null;
//  }

  //obj.fadeOut().fadeIn().addClass('open show');
  //openCards.push(obj);

  //obj.toggleClass('card'); //https://stackoverflow.com/questions/7014385/javascript-jquery-to-change-class-onclick
  //obj.toggleClass('card open show');
  //obj.redraw();
  //insertOpenCards(obj);



    return null;
}//end of displaySymbol


function checkOpenCards(obj) {
  if (openCards[0].children().attr("class") === openCards[1].children().attr("class")) {

    openCards.forEach(function(obj){
                obj.animateCss('flip', function(){
                    obj.removeClass("open show").addClass('match');
                });
            });

      //  $(openCards[0]).removeClass('open show').fadeOut().addClass('match').fadeIn();
      //  $(openCards[1]).removeClass('open show').addClass('match').fadeIn();

  } else { //AQUI ESTÁ O PROBLEMA??????


    openCards.forEach(function(obj){
                obj.animateCss('flipInX', function(){
                    obj.removeClass("open show");
                });
            });

//openCards[0].removeClass('open show');
//openCards[1].removeClass('open show');

}
}

    //CODE HERE: must close cards and add star demerits
    //window.confirm ("Cards are not of the same class.")
    //$(openCards[0]).removeClass('open show').fadeOut().fadeIn();//.addClass('card').fadeIn();
    //$(openCards[1]).removeClass('open show');
/*
    $(openCards[1]).removeClass("open show");
    openCards[1].animateCss('flipInX', function(){
                  //$(openCards[1]).removeClass("open show");
                  $(openCards[1]).removeClass("open show");
              });
  $(openCards[0]).animateCss('flipInX', function(){
                            $(openCards[0]).removeClass("open show");
                        });
                        */

    //  openCards[1].fadeOut().fadeIn().addClass('open show');
  //  openCards[1].removeClass('open show').fadeOut().fadeIn();//.addClass('card').fadeIn();

  //  openCards[1].addClass('card open show').fadeIn().removeClass('card open show').fadeOut().addClass('card').fadeIn();



  //openCards = []; //reset openCards
  //return null;


function lockMatchingCards(obj) {


}

$.fn.redraw = function(){
  $(this).each(function(){
    var redraw = this.offsetHeight;
  });
};

//document.body.onload = displayCards();

// load animateCss
// taken from https://github.com/daneden/animate.css/#usage
$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});
