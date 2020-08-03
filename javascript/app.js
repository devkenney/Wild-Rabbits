maleNames = ["Romeo", "Donnell", "Carmine", "Nathaniel", "Kraig", "Isaac", "Sonny", "Terence", "Trent", "Osvaldo", "Wilford", "Augustus", "Kerry", "Fredric", "Donald", "Orlando", "Beau", "Mack", "Geoffrey", "Shaun", "Lucas", "Emery", "Efren", "Eli", "Clayton", "Emmett", "Morton", "Keven", "Tanner", "Stanley", "Warner", "Winston", "Kristopher", "Tommy"];

femaleNames = ["Lee", "Katelyn", "Joan", "Vickie", "Charlotte", "Heather", "Jeannine", "Mitzi", "Elena", "Katharine", "Ollie", "Carla", "Carol", "Christine", "Carlene", "Meghan", "Daphne", "Noemi", "Briana", "Joyce", "Erin", "Michelle", "Katheryn", "Patty", "Lorene", "Virginia", "Esmeralda", "Tracie", "Frieda", "Yvonne", "Kasey", "Cassandra", "Nona"];

// Generates a random name from the lists above. Takes a variable gender and picks from the appropriate list.
const nameGen = (gender) => {
  if (gender === 'male') {
    return maleNames[Math.floor(Math.random() * maleNames.length)];
  } else {
    return femaleNames[Math.floor(Math.random() * femaleNames.length)];
  }
}

// Generates food based on the number of currently alive rabbits.
const generateFood = (numRabbits) => {
  const difference = (numRabbits * 2) - (numRabbits * .2);
  return Math.floor(Math.random() * difference) + (numRabbits * .5);
}


// initializes the starting rabbits for player and enemy
const startGame = () => {
  playerObj.male.generateRabbit(nameGen('male'), null, null);             // makes one male and one female rabbit for the player
  playerObj.female.generateRabbit(nameGen('female'), null, null);
  for (let i = 0; i < 8; i++) { 
    if (Math.random() < 0.5) { 
      playerObj.male.generateRabbit(nameGen('male'), null, null);         // then makes a random amount of males and females adding
    } else {                                                              // up to ten total.
      playerObj.female.generateRabbit(nameGen('female'), null, null);
    }
    $('#player-num-bunnies').text(`x${playerObj.male.alive + playerObj.female.alive}`)
  }
  enemyObj.male.generateRabbit(nameGen('male'), null, null);             // makes one male and one female rabbit for the enemy
  enemyObj.female.generateRabbit(nameGen('female'), null, null);
  for (let i = 0; i < 8; i++) { 
    if (Math.random() < 0.5) { 
      enemyObj.male.generateRabbit(nameGen('male'), null, null);         // then makes a random amount of males and females adding
    } else {                                                             // up to ten total.
      enemyObj.female.generateRabbit(nameGen('female'), null, null);
    }
    $('#enemy-num-bunnies').text(`x${enemyObj.male.alive + enemyObj.female.alive}`)
  }
}




const playerObj = new Player('player');
const enemyObj = new Player('enemy');



startGame();
playerObj.seasonPass();
enemyObj.seasonPass()
$('#player-num-bunnies').text(`x${playerObj.male.alive + playerObj.female.alive}`);
$('#enemy-num-bunnies').text(`x${enemyObj.male.alive + enemyObj.female.alive}`);

