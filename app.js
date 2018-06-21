let openCards = [];
let counter = 0;
let stars = document.getElementById('rating');
let time = document.getElementById('timer');
let second = 0;
let minute = 0;
let interval = 0;


//list that holds all cards
let cards = ['fas fa-leaf', 'fas fa-dove', 'fas fa-umbrella', 'fas fa-lightbulb', 'fas fa-umbrella', 'fas fa-sun', 'fas fa-tree', 'fas fa-leaf', 'fas fa-lightbulb', 'fas fa-hourglass', 'fas fa-chess-knight', 'fas fa-tree', 'fas fa-hourglass', 'fas fa-dove', 'fas fa-chess-knight', 'fas fa-sun'];


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cards) {
  var currentIndex = cards.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
  }
  return cards;
}


//function shuffles cards, loops through each card to create its HTML, and adds it to page
$(document).ready(function createCard() {
  const shuffledCards = shuffle(cards);
  for (let i = 0; i < shuffledCards.length; i++) {
    let item = document.createElement('li');
    item.setAttribute('class', cards[i]);
    item.classList.add('card');
    let list = document.getElementById('board');
    list.appendChild(item);
  }
});


//sets event listener for card click
$('#board').click(function() {
  const cardClick = event.target;
  if (cardClick.classList.contains('card') && openCards.length < 2 && !openCards.includes(cardClick) && !cardClick.classList.contains('pair')
  ) {
    toggleCard(cardClick);
    openList(cardClick);
  }
});


//displays the card's symbol when card is clicked
function toggleCard(cardClick) {
  $(cardClick).toggleClass('open close');
}
 

//adds open cards to list
function openList(cardClick) {
  openCards.push(cardClick);
  matchCards(openCards);
  console.log(openCards);
}


//compares cards to check for match
function matchCards(openCards) {
  if (openCards.length === 2) {
    moveCounter();
    if(openCards[0].className === openCards[1].className) {
    matched();
    console.log('match');
    } else {
      unmatched();
      console.log('not a match');
    }
  }
}


//locks cards into open position if they match
function matched() {
  $(openCards[0]).toggleClass('pair');
  $(openCards[1]).toggleClass('pair');
  openCards = [];
  gameComplete();
}


//flips cards back over if not a match
function unmatched() {
  setTimeout(function() {
    toggleCard(openCards[0]);
    toggleCard(openCards[1]);
    openCards = [];
  }, 700);
    console.log(openCards);
}


//sets event listener to start game timer
$('#board').one('click', function startTimer() {
  interval = setInterval(function() {
    second++;
    time.innerHTML = minute + ' mins ' + second + ' secs';
    if(second == 60) {
      minute++;
      second = 0;
    }
  }, 1000);
});


//function to stop timer 
function stopTimer() {
  clearInterval(interval);
}


//keeps count of number of moves
function moveCounter() {
  counter++;
  document.getElementById('moves').innerHTML = counter;
  starScore();
}


//function removes stars based on move counter value
function starScore(stars) {
  if (counter <= 12) {
    return stars;
  } else if (counter > 12 && counter <= 18) {
    $('#star1').remove();
  } else {
    $('#star2').remove();
  } 
}


//function that switches modal content from hidden to visible
function showPopup() {
  $('.modal .congratsModal').toggleClass('show');
  $('#newGame').removeClass('hidden');
}


//triggers game summary modal upon game completion
function gameComplete() {
  if ($('#board li.pair').length === $('#board li').length) {
    stopTimer();
    document.getElementById('congratulations').innerHTML = 'Congratulations! You Win!';
    document.getElementById('totalMoves').innerHTML = 'Total Moves: ' + counter;
    document.getElementById('timeElapsed').innerHTML = 'Time Elapsed: ' + time.innerHTML;
    document.getElementById('starRating').innerHTML = 'Star Rating: ' + stars.children.length + ' star(s)';
    showPopup();
  }
}


//function to resetGame
function resetGame() {
  location.reload();
}


//resets game when reset button is clicked
$('#reset').click(function() {
  resetGame();
});


//resets game when 'New Game' button is clicked
$('#newGame').click(function() {
  resetGame();
});





















