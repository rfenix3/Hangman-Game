window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected category
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Guess
  var guesses = [ ];      // Stored guesses
  var lives ;             // Lives
  var score = 0;          // Initial score
  var counter ;           // Count correct guesses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showScore = document.getElementById("myscore");
  var showCategory = document.getElementById("scategory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
    
  
  // Select Category
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      categoryName.innerHTML = "The Chosen Category Is the 80's";
    } else if (chosenCategory === categories[1]) {
      categoryName.innerHTML = "The Chosen Category Is the 90's";
    } else if (chosenCategory === categories[2]) {
      categoryName.innerHTML = "The Chosen Category Is 2001 And beyond";
    }
  }

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  
  // Show lives
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "You Win!";
      }
    }
  }

  // OnClick Function
   check = function () {

    list.onclick = function () {
      // The following if statement checks to see if all lives has been exhausted.
      // If so, the code will exit this function.
      if (lives < 1) {
      return
      }
      var guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        } 
      }

      var j = (word.indexOf(guess));
      if (j === -1) {
        lives -= 1;
        comments();
      } else {
        comments();
      }
      if (showLives.innerHTML === "You Win!") {
        score = score + 1;
        console.log(score);
        showScore.innerHTML = "Your Score: " + score;
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = ""; 
        play();       
      }
    }
  }
  
    
  // Play
  play = function () {
    categories = [
        ["madonna", "debbie-gibson", "cindi-lauper", "whitney-houston"],
        ["britney-spears", "celine-dion", "spice-girls", "alanis-morissette"],
        ["adele", "katy-perry", "beyonce", "taylor-swift"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    guesses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  }

  play();
  
  // Hint

    hint.onclick = function() {

      hints = [
        ["Material Girl", "Electric Youth", "True Colors", "Greatest Love"],
        ["Lucky", "Titanic Singer", "2 Become 1", "Head over Feet"],
        ["Hello", "Roar", "single ladies", "Shake It Off"]
    ];

    var categoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " +  hints [categoryIndex][hintIndex];
    };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "Clue -";
    score = 0;
    showScore.innerHTML = "Your Score: " + score;
    play();
  }
}


