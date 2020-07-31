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

// Passes one season.
const seasonPass = () => {
  let numRabbits = male.alive + female.alive;         // calculates the current TOTAL number of rabbits.
  console.log(numRabbits);
  let totalFood = generateFood(numRabbits);           // calls the generateFood function to generate food based on the number of rabbits calculated above.
  console.log(totalFood);
  let foodDifference = totalFood - numRabbits;        // calculates the difference between the number of rabbits and the amount of food generated.
  console.log(foodDifference);
  if (foodDifference < 0) {                           // if the difference in food is a negative number, kills rabbits until there is just enough food to
    while (foodDifference < 0) {                      // feed all of them.
      if (Math.random() > 0.5) {                      // picks either male or female and kills one of whichever one it picks.
        male.killRabbit();
      } else {
        female.killRabbit();
      }
      foodDifference++;
    }
  } else if (Math.floor(foodDifference / 2) >= 1) {                   // checks if the difference in food is at least two.
    let babyMult = Math.floor(foodDifference / 2);
    for (i = 0; i < babyMult; i++) {                                  // for every 2 extra food, iterates once.
      for (let i = 0; i < Math.ceil(Math.random() * 3); i++) {
        let newMom = female.findParent();                             // sets newMom and newDad to the oldest available parents.
        let newDad = male.findParent();
        if (Math.random() > .5) {
          male.generateRabbit(nameGen('male'), newMom, newDad);       // generates a random male or female with the parents that were found above.
        } else {
          female.generateRabbit(nameGen('female'), newMom, newDad);
        }
      }
      
    }
  }
  console.log(male.alive + female.alive);
}

// initializes the starting rabbits based on how many the player wants.
let numberAnswer = true;
const startGame = () => {
  while (numberAnswer) {                                                                              // while the answer is a number greater than one
    const startingRabbits = window.prompt("Enter a number of starting rabbits. (At least 2!)");       // prompts the user for input.
    if (startingRabbits >= 2) {                                                                       // if the prompt is successful generates one male and
      male.generateRabbit(nameGen('male'), null, null);                                               // then one female to start.
      female.generateRabbit(nameGen('female'), null, null);
      for (let i = 0; i < startingRabbits - 2; i++) {                                                 // then generates a random amount of males and females
        if (Math.random() < 0.5) {                                                                    // based on the number that was input minus two because
          male.generateRabbit(nameGen('male'), null, null);                                           // two were already created.
        } else {
          female.generateRabbit(nameGen('female'), null, null);
        }
      }
      numberAnswer = false;
    }
  }
}

// container for the male and female rabbits.
let RabbitContainer = class {
  constructor(gender) {
    this.gender = gender;
    this.rabbits = [];
    this.alive = 0
  }
  // method for generating new rabbit objects.
  generateRabbit(name, mom, dad) {
    const newRabbit = new Rabbit(this.rabbits.length + 1, name, this.gender, mom, dad);
    this.rabbits.push(newRabbit);
    this.alive += 1;
  }
  // method for setting rabbit objects' alive property to false.
  killRabbit() {
    for (let oneToDie of this.rabbits) {
      if (oneToDie.alive === true) {
        oneToDie.alive = false;
        this.alive--;
        break;
      }
    }
  }
  // method for finding the first suitable parent for a new rabbit.
  findParent() {
    for (let obj of this.rabbits) {
      if (obj.alive === true && obj.hadBaby === false) {
        obj.hadBaby = true;
        return obj;
      }
    }
  }
}
const male = new RabbitContainer('male');
const female = new RabbitContainer('female');

// actual rabbit class.
let Rabbit = class {
  constructor(number, name, gender, mom, dad) {
    this.name = name;
    this.gender = gender
    this.age = 1;
    this.number = number;
    this.alive = true;
    this.hadBaby = false;
    this.mother = mom;
    this.father = dad;
  };
}

startGame();

console.log(male.rabbits);
console.log(female.rabbits);