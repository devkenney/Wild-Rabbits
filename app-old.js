maleNames = ["Romeo", "Donnell", "Carmine", "Nathaniel", "Kraig", "Isaac", "Sonny", "Terence", "Trent", "Osvaldo", "Wilford", "Augustus", "Kerry", "Fredric", "Donald", "Orlando", "Beau", "Mack", "Geoffrey", "Shaun", "Lucas", "Emery", "Efren", "Eli", "Clayton", "Emmett", "Morton", "Keven", "Tanner", "Stanley", "Warner", "Winston", "Kristopher", "Tommy"];

femaleNames = ["Lee", "Katelyn", "Joan", "Vickie", "Charlotte", "Heather", "Jeannine", "Mitzi", "Elena", "Katharine", "Ollie", "Carla", "Carol", "Christine", "Carlene", "Meghan", "Daphne", "Noemi", "Briana", "Joyce", "Erin", "Michelle", "Katheryn", "Patty", "Lorene", "Virginia", "Esmeralda", "Tracie", "Frieda", "Yvonne", "Kasey", "Cassandra", "Nona"];

const tryFetch = async (num) => {
  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
      const data = await response.json();
      let value = data;
      return value.name;
  } catch(error) {
      console.error(error);
  }
}

let rabbitList = [];
let foodDifference = null;
let rabbitNum = 0;
let extraFood = 0;
let babyMult = 0;

const randomFoodInterval = (min, max) => {
  return Math.ceil(Math.random() * (max - min + 1) + min);
}
const extraFood = () => {
   return foodCalc(randomFoodInterval(Math.floor(rabbitNum * 0.5), Math.floor(rabbitNum * 1.5)));
}
const mainGame = async () => {
  extra = extraFood();
  if (extraFood >= 0) {
    if (extraFood %  2 === 0) {
      babyMult += extraFood / 5
      extraFood -= babyMult * 5
      for (let i = 0; i < babyMult; i++) {
        let mommy = null;
        let daddy = null;
        for (mom of rabbitList) {
          if (mom.gender === "female" && mom.hadBaby === false) {
            mom.hadBaby = true;
            mommy = mom.number;
          }
        }
        for (dad of rabbitList) {
          if (dad.gender === "male" && dad.hadBaby === false) {
            dad.hadBaby = true;
            daddy = dad.number;
          }
        }
        for (i = 0; i < Math.ceil(Math.random() * 12); i++) {
          await rabbit.add(mommy, daddy);
          numBabies += 1;
        }
      
      }
    }
  } else {
    for (let i = 0; i > extraFood; i--) {
    rabbit.remove();
    numBabies -= 1;
    }
    extraFood = 0;
  }
}

const startGame = async () => {
  while (numberAnswer) {
    const startingRabbits = window.prompt("Enter a number of starting rabbits. (At least 2!)");
    if (startingRabbits >= 2) {
      await rabbit.initialize(startingRabbits);
      break;
    } else {
      numberAnswer = false;
    }
  }
}

const foodCalc = (food) => {
  foodDifference = food - rabbitNum;
  extraFood += foodDifference;
  return extraFood;
}

rabbit = {
  name: null,
  gender: null,
  age: 1,
  number: 0,
  alive: true,
  hadBaby: false,
  add: async (mom, dad) => {
    let newRabbit = {};
    rabbit.number += 1;
    newRabbit = {
      name: await tryFetch(3),
      gender: rabbit.gender,
      age: rabbit.age,
      number: rabbit.number,
      alive: rabbit.alive,
      mother: mom,
      father: dad,
      hadBaby: false
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
  initialize: async (numRabbits) => {
    for (i = 0; i < numRabbits; i++) {
      if (i === 0) {
        await rabbit.add(null, null);
      } else if (i === 1) {
        await rabbit.add(null, null);
      } else {
        await rabbit.add(null, null)
      }
    }
  }
};

let numberAnswer = true;
let numBabies = 0;

startGame();

while (rabbitNum > 0) {

  mainGame();
  
  if (numBabies >= 0) {
    console.log(`You gained ${numBabies} babies!`)
  }
  console.log(`You now have ${rabbitNum} rabbits!`);
  console.log(`You now have ${extraFood} extra food!`);
  rabbitNum = 0;
}