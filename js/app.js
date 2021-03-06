let arrayofCards, openCards, openShow, moveCounter, giantArray;
let starDemerits, timerOn, timer, secondsLeft, firstClick, displayString;
let message = document.getElementById("timer");
let modal = document.querySelector(".modal");
let modalContent = document.getElementsByClassName("modal-content");
let span = document.getElementsByClassName("close")[0];


arrayofCards = document.querySelectorAll(".card"); //list that holds all cards
openCards = [];
openShow = [];
moveCounter = 0;
giantArray = document.querySelectorAll(".newCard");
scoreStars = document.querySelectorAll(".fa-star");
starDemerits = 0;
timerOn = false;
secondsLeft = 45;
firstClick = true;

$(".restart").click(function() {
  displayCards();
  $(".card").click(onCardClick); //event handler needs to be recreated after displayCards run
  moveCounter = 0;
  document.querySelector(".moves").innerHTML = moveCounter.toString();
  arrayofCards = document.querySelectorAll(".card"); //list that holds all cards

  openCards = [];
  openShow = [];
  giantArray = document.querySelectorAll(".newCard");
  scoreStars = document.querySelectorAll(".fa-star");

  modal = document.querySelector(".modal");
  modalContent = document.getElementsByClassName("modal-content");


  starDemerits = 0;
  changeStarScore();
  if (timerOn) {
    clearInterval(timer);
  }
  message.innerHTML = "45 seconds";
  timerOn = false;
  firstClick = true;

});

// https://gist.github.com/vivekrk/3918717
function timerFunction() {
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

    if (secondsLeft === 0) {
      clearInterval(timer);
      starDemerits++;
      changeStarScore();
      message.innerHTML = "Time's up!"
      timerOn = false;
      endGame();
      displayFailModal();
    }
  }, 1000);
}

function changeStarScore() {
  if (starDemerits === 0) {
    scoreStars.forEach(function(obj) {
      $(obj).animateCss("flip", function() {
        $(obj).addClass("checked");
      });
    }); //end of forEach loop
  } else {
    obj = scoreStars[3 - starDemerits];
    $(obj).animateCss("flip", function() {
      $(obj).removeClass("checked");
    });
  }
}


function displayCards() {
  let tempArray = [];
  tempArray = shuffle([...giantArray]).slice(0, 8);
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
  }); //end of forEach loop
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
} // end of shuffle(array)


$(".card").click(onCardClick);

function onCardClick() {
  if (firstClick) {
    firstClick = false;
    timerFunction();
  }

  $(this).attr("data-revealed", "true"); //for the star demerits
  if ($(this).hasClass("open show") || $(this).hasClass("match")) { //if card is open, clicking it does nothing
    return null;
  }

  if (openCards.length < 2) {
    $(this).addClass("open show");
    openCards.push($(this));
  }

  if (openCards.length === 2) {
    moveCounter++;
    document.querySelector(".moves").innerHTML = moveCounter.toString();
    checkOpenCards();
    openCards = [];

  }

  return null;
} // end of onCardClick()


function checkOpenCards() {

  //cards match
  if (openCards[0].children().attr("class") === openCards[1].children().attr("class")) {
    openCards.forEach(function(obj) {
      obj.animateCss("flip", function() {
        obj.removeClass("open show").addClass("match");
      });
    }); //end of forEach loop

    const string = openCards[0].children().attr("class");
    openShow.push(string); //openShow keeps track of winning cards

    if (openShow.length === 8) { 
      endGame();
      displayWinModal();
      clearInterval(timer);
    }

  } else { // cards do not match
    openCards.forEach(function(obj) {
      obj.animateCss("flipInX", function() {
        obj.removeClass("open show");
      });
    }); //end of forEach loop
  } //end of if-else

  return null;
} //end of checkOpenCards()


function endGame() {
  let tempArray = [];
  tempArray = [...arrayofCards];

  [...arrayofCards].forEach(function(obj) {
    $(obj).animateCss("wobble");
  }); //end of forEach loop


  return null;
} // end of endGame()


// Modal shows up when time is up

function displayFailModal() {
  // modal.style.display = "block";
  // $(modalContent).html('<h2>Sorry, your time is up!</h2><ul><li><h1><i class="fa fa-bomb"></i></h1></li></ul>');
  $(modalContent).html(`<span class="close">&times;</span>
    <h2>Sorry, your time is up!</h2>
    <ul><li>
    <h1><i class="fa fa-bomb"></i></h1>
    </li></ul>`);
  $(modalContent).removeClass("success").addClass("failure");
  $(modal).animateCss("bounceInUp");
  $(modal).toggleClass("show-modal");
  span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
      toggleModal();}
}//end of displayFailModal();

// When the user clicks on <span> (x), close the modal
function toggleModal() {
        $(modal).toggleClass("show-modal");
    }


span.onclick = function() {
    toggleModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      toggleModal();
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

function displayWinModal() {
  displayString = `You have ${(3 - starDemerits).toString()} stars
  and still ${secondsLeft.toString()} seconds left!`;
  $(modalContent).html(`<span class="close">&times;</span>
  <h2>Congratulations, you have won!</h2>
    <ul>${displayString}</ul>
    <ul><li><h1><i class="fa fa-trophy"></i></h1></li></ul>`);

  $(modalContent).removeClass("failure").addClass("success");
  $(modal).animateCss("bounceInUp");

  $(modal).toggleClass("show-modal");
  span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
      toggleModal();
  }

return null;
}

document.body.onload = $(".restart").click();
