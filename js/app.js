/*
 * Gus: Declare variables here, too.
 openCards are the one or two cards currently in play  OK
 revealedCards are the cards that have previously been revealed
 openShow are the cards on constant display because of matching pairs;
 giantArray because 500 icons are better than eight
 */
let arrayofCards, openCards, openShow, moveCounter, giantArray;
arrayofCards = document.querySelectorAll('.card'); //list that holds all cards

openCards = [];
openShow = [];
moveCounter = 0;
giantArray = document.querySelectorAll('.newCard');

$('.restart').click(function() {
  displayCards();
  $('.card').click(onCardClick); //event handler needs to be recreated after displayCards run
  moveCounter = 0; //reset
  document.querySelector('.moves').innerHTML = moveCounter.toString();
  arrayofCards = document.querySelectorAll('.card'); //list that holds all cards

  openCards = [];
  openShow = [];
  moveCounter = 0;
  giantArray = document.querySelectorAll('.newCard');
  // setInterval(myTimer);
  timerFunction();
});

// <div id="timer">00:00:00</div>

let message = document.getElementById('timer');

// https://gist.github.com/vivekrk/3918717
function timerFunction () {
    var i = 30;
    var timer = setInterval(function() {
        message.innerHTML = i + " seconds";
        i--;
        if(i === 0) {
            clearInterval(timer);
            message.innerHTML = "Time's up!"
        }
    }, 1000);
}

// var timer = new Timer();


function displayCards() {
  let tempArray = [];
  //tempArray = shuffle([...arrayofCards]); //spread allows for correct array manipulation
  tempArray = shuffle([...giantArray]).slice(0,8);
  tempArray = tempArray.concat(tempArray);
  tempArray = shuffle([...tempArray]);
  $('.deck').children().remove();

  tempArray.forEach(function(arrayElement) {
    const newListItem = document.createElement("li");
    const newItem = document.createElement("i");
    $(newListItem).attr('class', 'card');
    $(newListItem).attr('data-revealed', 'false');
    newItem.className = $(arrayElement).children().attr("class");
    newListItem.appendChild(newItem);
    document.querySelector('.deck').appendChild(newListItem);
  });//end of forEach loop
  return null;
} //end of displayCards()

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}// end of shuffle(array)

/*
 * DONE set up the event listener for a card. If a card is clicked:
 * DONE - display the card's symbol (put this functionality in another function that you call from this one) DONE
 * DONE - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * DONE - if the list already has another card, check to see if the two cards match
 * DONE DIFFERENTLY   + if the cards do match, lock the cards in the open position (put this functionality in another function
  that you call from this one)
 * DONE DIFFERENTLY   + if the cards do not match, remove the cards from the list and hide the card's symbol (put this
 functionality in another function that you call from this one)
 * DONE   + increment the move counter and display it on the page (put this functionality in another function
 that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in
 another function that you call from this one)
Gus: Star system will have demerits if turned card has data-revealed = true

 *
*/

$('.card').click(onCardClick);

function onCardClick() {
  $(this).attr('data-revealed', 'true'); //for the star demerits
  if ($(this).hasClass('open show') || $(this).hasClass('match')) { //if card is open, clicking it does nothing
    return null;
  }

  if (openCards.length < 2) {
    $(this).addClass("open show");
    openCards.push($(this));
    moveCounter++;
    document.querySelector('.moves').innerHTML = moveCounter.toString();
  }

  if (openCards.length === 2) {
    checkOpenCards();
    openCards = [];

  }

  return null;
}// end of onCardClick()


function checkOpenCards() {

  //cards match
  if (openCards[0].children().attr("class") === openCards[1].children().attr("class")) {
    openCards.forEach(function(obj) {
      obj.animateCss('flip', function() {
        obj.removeClass("open show").addClass('match');
      });
    });//end of forEach loop

  let string = openCards[0].children().attr("class");
  openShow.push(string); //openShow keeps track of winning cards

  if (openShow.length == 8) {
    endGame();
  }

  } else { // cards do not match
    openCards.forEach(function(obj) {
      obj.animateCss('flipInX', function() {
        obj.removeClass("open show");
      });
    }); //end of forEach loop //CODE HERE: must close cards and add star demerits
  } //end of if-else

  return null;
}//end of checkOpenCards()


function endGame() {
  //let tempArray = [];
  //tempArray =  [...arrayofCards];

  [...arrayofCards].forEach(function(obj) {
    //console.log(obj);
    $(obj).animateCss('wobble');
  }); //end of forEach loop
  displayWinModal();
  // JSalert();
  return null;
}// end of endGame()

//this function will likely die
// $.fn.redraw = function() {
//   $(this).each(function() {
//     var redraw = this.offsetHeight;
//   });
// };

// https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
function displayWinModal() {
  modal.style.display = "block";
$(modal).animateCss('bounceInUp');

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// code from https://github.com/daneden/animate.css/#usage
$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
}); //end of jQuery extention for animation


//document.body.onload = displayCards();
