maleNames = ["Romeo", "Donnell", "Carmine", "Nathaniel", "Kraig", "Isaac", "Sonny", "Terence", "Trent", "Osvaldo", "Wilford", "Augustus", "Kerry", "Fredric", "Donald", "Orlando", "Beau", "Mack", "Geoffrey", "Shaun", "Lucas", "Emery", "Efren", "Eli", "Clayton", "Emmett", "Morton", "Keven", "Tanner", "Stanley", "Warner", "Winston", "Kristopher", "Tommy"];

femaleNames = ["Lee", "Katelyn", "Joan", "Vickie", "Charlotte", "Heather", "Jeannine", "Mitzi", "Elena", "Katharine", "Ollie", "Carla", "Carol", "Christine", "Carlene", "Meghan", "Daphne", "Noemi", "Briana", "Joyce", "Erin", "Michelle", "Katheryn", "Patty", "Lorene", "Virginia", "Esmeralda", "Tracie", "Frieda", "Yvonne", "Kasey", "Cassandra", "Nona"];

const genderPick = () => {
  if (Math.random() < .5) {
    return 'male'
  } else {
    return 'female'
  }
}

const nameGen = (gender) => {
  if (gender === 'male') {
    return maleNames[Math.floor(Math.random() * maleNames.length)];
  } else {
    return femaleNames[Math.floor(Math.random() * femaleNames.length)];
  }
}

let numberAnswer = true;
const startGame = () => {
  while (numberAnswer) {
    const startingRabbits = window.prompt("Enter a number of starting rabbits. (At least 2!)");
    if (startingRabbits >= 2) {
      male.generateRabbit(nameGen('male'), null, null);
      female.generateRabbit(nameGen('female'), null, null);
      for (let i = 0; i < startingRabbits - 2; i++) {
        if (Math.random() < 0.5) {
          male.generateRabbit(nameGen('male'), null, null);
        } else {
          female.generateRabbit(nameGen('female'), null, null);
        }
      }
      numberAnswer = false;
    }
  }
}

let RabbitContainer = class {
  constructor(gender) {
    this.gender = gender;
    this.rabbits = [];
  }
  generateRabbit (name, mom, dad) {
    const newRabbit = new Rabbit(this.rabbits.length + 1, name, this.gender, mom, dad);
    this.rabbits.push(newRabbit);
  }
}
const male = new RabbitContainer('male');
const female = new RabbitContainer('female');


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
