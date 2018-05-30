/*
 * Gus: Declare variables here, too.
 openCards are the one or two cards currently in play  OK
 revealedCards are the cards that have previously been revealed
 openShow are the cards on constant display because of matching pairs;
 giantArray because 500 icons are better than eight

brush up README file
restart on onload
adjust Modal
Optional:
Add CSS animations when cards are clicked, unsuccessfully matched, and successfully matched.
Add unique functionality beyond the minimum requirements (Implement a leaderboard, store game state using local storage, etc.)
Implement additional optimizations that improve the performance and user experience of the game (keyboard shortcuts for gameplay, etc).

 */
let arrayofCards, openCards, openShow, moveCounter, giantArray, starDemerits, timerOn, timer, secondsLeft;
arrayofCards = document.querySelectorAll(".card"); //list that holds all cards
openCards = [];
openShow = [];
moveCounter = 0;
giantArray = document.querySelectorAll(".newCard");
scoreStars = document.querySelectorAll(".fa-star");
starDemerits = 0;
timerOn = false;
secondsLeft = 45;

$(".restart").click(function() {
  // if (timerOn) {
  //   return null;
  // }
  displayCards();
  $(".card").click(onCardClick); //event handler needs to be recreated after displayCards run
  moveCounter = 0; //reset
  document.querySelector(".moves").innerHTML = moveCounter.toString();
  arrayofCards = document.querySelectorAll(".card"); //list that holds all cards

  openCards = [];
  openShow = [];
  moveCounter = 0;
  giantArray = document.querySelectorAll(".newCard");
  scoreStars = document.querySelectorAll(".fa-star");
  //  resetStars();
  /*scoreStars.forEach(function(obj) {
    $(obj).animateCss("flip", function() {
      $(obj).addClass("checked");
    });
  });//end of forEach loop*/

  starDemerits = 0;
  changeStarScore();
  timerFunction(); //change to first card touched
});


// <div id="timer">00:00:00</div>

let message = document.getElementById("timer");

// https://gist.github.com/vivekrk/3918717
function timerFunction () { //timer is broken. clicks restart multiple times wrecks it
    if (timerOn) {
      clearInterval(timer);
    }
    timerOn = true;
    secondsLeft = 45;
    timer = setInterval(function() {
        message.innerHTML = secondsLeft + " seconds";
        secondsLeft--;
        if (secondsLeft === 30 || secondsLeft === 15) {
          starDemerits++;
          changeStarScore();
        }

        if(secondsLeft === 0) {
            clearInterval(timer);
            starDemerits++;
            changeStarScore();
            message.innerHTML = "Time's up!"
            timerOn = false;
            displayWinModal("failure"); //any text <> "success" will do
        }
    }, 1000);
}

// var timer = new Timer();
function changeStarScore(){
  if (starDemerits === 0) {
    scoreStars.forEach(function(obj) {
      $(obj).animateCss("flip", function() {
        $(obj).addClass("checked");
      });
    });//end of forEach loop
  }//if 0
/*  if (starDemerits === 1) {
    obj = scoreStars[3-starDemerits];
    $(obj).animateCss("flip", function() {
      $(obj).removeClass("checked");
    });
  }//if 1
  if (starDemerits === 2) {
    obj = scoreStars[3-starDemerits];
    $(obj).animateCss("flip", function() {
      $(obj).removeClass("checked");
    });
  }//if 2
  if (starDemerits === 3) */
  else {
    obj = scoreStars[3-starDemerits];
    $(obj).animateCss("flip", function() {
      $(obj).removeClass("checked");
    });
  }//else
}


function displayCards() {
  let tempArray = [];
  //tempArray = shuffle([...arrayofCards]); //spread allows for correct array manipulation
  tempArray = shuffle([...giantArray]).slice(0,8);
  tempArray = tempArray.concat(tempArray);
  tempArray = shuffle([...tempArray]);
  $(".deck").children().remove();

  tempArray.forEach(function(arrayElement) {
    const newListItem = document.createElement("li");
    const newItem = document.createElement("i");
    $(newListItem).attr("class", "card");
    $(newListItem).attr("data-revealed", "false");
    newItem.className = $(arrayElement).children().attr("class");
    newListItem.appendChild(newItem);
    document.querySelector(".deck").appendChild(newListItem);
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

$(".card").click(onCardClick);

function onCardClick() {
  $(this).attr("data-revealed", "true"); //for the star demerits
  if ($(this).hasClass("open show") || $(this).hasClass("match")) { //if card is open, clicking it does nothing
    return null;
  }

  if (openCards.length < 2) {
    $(this).addClass("open show");
    openCards.push($(this));
    moveCounter++;
    document.querySelector(".moves").innerHTML = moveCounter.toString();
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
      obj.animateCss("flip", function() {
        obj.removeClass("open show").addClass("match");
      });
    });//end of forEach loop

  const string = openCards[0].children().attr("class"); //let to const
  openShow.push(string); //openShow keeps track of winning cards

  if (openShow.length == 8) {
    endGame();
  }

  } else { // cards do not match
    openCards.forEach(function(obj) {
      obj.animateCss("flipInX", function() {
        obj.removeClass("open show");
      });
    }); //end of forEach loop //CODE HERE: must close cards and add star demerits
  } //end of if-else

  return null;
}//end of checkOpenCards()


function endGame() {
  [...arrayofCards].forEach(function(obj) {
    $(obj).animateCss("wobble");
  }); //end of forEach loop
  displayWinModal("success");
  return null;
}// end of endGame()



// When a user wins the game, a modal appears to congratulate the player and ask if they want to play again.
//  It should also tell the user how much time it took to win the game, and what the star rating was.

// https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
const modal = document.getElementById("myModal");
const modalContent = document.getElementsByClassName("modal-content");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Modal shows up when game is won or time is up
function displayWinModal(string) {

  modal.style.display = "block";
  if (string == "success") {
  const displayString = 'You have '+(3 - starDemerits)+' stars and still '+secondsLeft+' seconds left!';
  $(modalContent).html('<h2>Congratulations, you have won!</h2><ul>'+displayString+'</ul><ul><li><h1><i class="fa fa-trophy"></i></h1></li></ul>');
  $(modalContent).removeClass("failure").addClass("success"); }
  else {
    $(modalContent).html('<h2>Sorry, your time is up!</h2><ul><li><h1><i class="fa fa-bomb"></i></h1></li></ul>');
    $(modalContent).removeClass("success").addClass("failure"); }
  $(modal).animateCss("bounceInUp");

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {  //can this die?
    modal.style.display = "none";
}

// When the user clicks anywhere on the modal, close it
window.onclick = function(event) {
        modal.style.display = "none";
}

// code from https://github.com/daneden/animate.css/#usage
$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: "animationend",
        OAnimation: "oAnimationEnd",
        MozAnimation: "mozAnimationEnd",
        WebkitAnimation: "webkitAnimationEnd",
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement("div"));

    this.addClass("animated " + animationName).one(animationEnd, function() {
      $(this).removeClass("animated " + animationName);

      if (typeof callback === "function") callback();
    });

    return this;
  },
}); //end of jQuery extention for animation


//this function will likely die
// $.fn.redraw = function() {
//   $(this).each(function() {
//     var redraw = this.offsetHeight;
//   });
// };


//document.body.onload = displayCards();
