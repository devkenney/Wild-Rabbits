maleNames = ["Romeo", "Donnell", "Carmine", "Nathaniel", "Kraig", "Isaac", "Sonny", "Terence", "Trent", "Osvaldo", "Wilford", "Augustus", "Kerry", "Fredric", "Donald", "Orlando", "Beau", "Mack", "Geoffrey", "Shaun", "Lucas", "Emery", "Efren", "Eli", "Clayton", "Emmett", "Morton", "Keven", "Tanner", "Stanley", "Warner", "Winston", "Kristopher", "Tommy"];

femaleNames = ["Lee", "Katelyn", "Joan", "Vickie", "Charlotte", "Heather", "Jeannine", "Mitzi", "Elena", "Katharine", "Ollie", "Carla", "Carol", "Christine", "Carlene", "Meghan", "Daphne", "Noemi", "Briana", "Joyce", "Erin", "Michelle", "Katheryn", "Patty", "Lorene", "Virginia", "Esmeralda", "Tracie", "Frieda", "Yvonne", "Kasey", "Cassandra", "Nona"];

rabbitList = [];
foodDifference = null;
rabbitNum = 0;

const randomFoodInterval = (min, max) => {
  return Math.ceil(Math.random() * (max - min + 1) + min);
}

const foodCalc = (food) => {
  for (i of rabbitList) {
    if (i.alive === true) {
      deadIndex = i.number;
      continue;
    }
  }
   foodDifference = food - rabbitNum;
   return foodDifference;
}

rabbit = {
  name: null,
  gender: null,
  age: 1,
  number: 0,
  alive: true,
  randomize () {
    if (Math.random() >= 0.5) {
      rabbit.gender = "male";
      rabbit.name = maleNames[Math.floor(Math.random() * maleNames.length)]
    } else {
      rabbit.gender = "female";
      rabbit.name = femaleNames[Math.floor(Math.random() * femaleNames.length)]
    }
  },
  add (mom, dad) {
    let newRabbit = {};
    rabbit.number += 1;
    newRabbit = {
      name: rabbit.name,
      gender: rabbit.gender,
      age: rabbit.age,
      number: rabbit.number,
      alive: rabbit.alive,
      mother: mom,
      father: dad
    }
    rabbitList.push(newRabbit);
    rabbitNum += 1;
  },
  remove () {
    for (i of rabbitList) {
      if (i.alive === true) {
        i.alive = false;
        rabbitNum -= 1;
        break;
      }
    }
  },
  initialize (numRabbits) {
    for (i = 0; i < numRabbits; i++) {
      if (i === 0) {
        rabbit.gender = "male";
        rabbit.name = maleNames[Math.floor(Math.random() * maleNames.length)];
        rabbit.add(null, null);
      } else if (i === 1) {
        rabbit.gender = "female";
        rabbit.name = femaleNames[Math.floor(Math.random() * femaleNames.length)];
        rabbit.add(null, null);
      } else {
        rabbit.randomize();
        rabbit.add(null, null)
      }
    }
  }
};

let numberAnswer = true;

while (numberAnswer) {
  const startingRabbits = window.prompt("Enter a number of starting rabbits. (At least 2!)");
  if (startingRabbits >= 2) {
    rabbit.initialize(startingRabbits);
    break;
  } else {
    numberAnswer = false;
  }
}

console.log(foodCalc(randomFoodInterval(Math.floor(rabbitNum * 0.5), Math.floor(rabbitNum * 1.5))));