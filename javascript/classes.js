let Player = class {
    constructor(alignment) {
      this.male = new RabbitContainer('male');
      this.female = new RabbitContainer('female');
      this.alignment = alignment
      this.attack = 0;
      this.health = 0;
    };
    findPower() {
      this.attack = 0;
      this.health = 0;
      for (let bunny of this.male.rabbits) {
        if (bunny.alive) {
          this.attack += bunny.attack;
          this.health += bunny.health;
        }
      }
    };
    attackEnemy(enemy) {
      //get the difference between this.attack and enemy.health
      enemy.findPower();
      this.findPower();
      console.log(enemy.health);
      console.log(this.attack);
      let difference = enemy.health - this.attack;
      console.log(difference);
      let deadRabbit = null;
      while (difference < 0 && (enemy.male.alive > 0 || enemy.female.alive > 0)) {
        if (Math.random() < 0.5 && enemy.male.alive > 0) {
          deadRabbit = enemy.male.killRabbit();
          difference += deadRabbit.health;
        } else if (enemy.female.alive > 0) {
          deadRabbit = enemy.female.killRabbit();
          difference += deadRabbit.health;
        }
        console.log('test');
      }
      $(`#${enemy.alignment}-num-bunnies`).text(`x${enemy.male.alive + enemy.female.alive}`);
    };
    //call findPower() to re-update enemy's attack and health
    // Passes one season.
    seasonPass() {
      let numRabbits = this.male.alive + this.female.alive; // calculates the current TOTAL number of rabbits.
      // console.log(numRabbits);
      let totalFood = generateFood(numRabbits); // calls the generateFood function to generate food based on the number
      $(`#${this.alignment}-food`).html(`Your bunnies found ${totalFood} <img src="images/food.png" alt="carrot" class="carrot"> this year!`)
      // console.log(totalFood);                                // of rabbits calculated above.
      let foodDifference = totalFood - numRabbits; // calculates the difference between the number of rabbits and the
      // console.log(foodDifference);                           //amount of food generated.
      if (foodDifference < 0) { // if the difference in food is a negative number, kills rabbits until there is just enough food to
        while (foodDifference < 0) { // feed all of them.
          if (Math.random() > 0.5) { // picks either male or female and kills one of whichever one it picks.
            this.male.killRabbit();
          } else {
            this.female.killRabbit();
          }
          foodDifference++;
        }
      } else if (Math.floor(foodDifference / 2) >= 1) { // checks if the difference in food is at least two.
        let babyMult = Math.floor(foodDifference / 2);
        for (let i = 0; i < babyMult; i++) { // for every 2 extra food, iterates once.
          for (let i = 0; i < Math.ceil(Math.random() * 2); i++) {
            let newMom = this.female.findParent(); // sets newMom and newDad to the oldest available parents.
            let newDad = this.male.findParent();
            if (newMom === undefined || newDad === undefined) {
              console.log("no Parents");
            } else {
              if (Math.random() > .5) {
                this.male.generateRabbit(nameGen('male'), newMom, newDad); // generates a random male or female with the parents that were found above.
              } else {
                this.female.generateRabbit(nameGen('female'), newMom, newDad);
              }
            }
          }

        }
      }
      $(`#${this.alignment}-num-bunnies`).text(`x${this.male.alive + this.female.alive}`);
      // console.log(this.male.alive + this.female.alive);
      for (let bunny of this.male.rabbits) {
        if (bunny.alive === true) {
          bunny.hadBaby = false;
        }
      }
      for (let bunny of this.female.rabbits) {
        if (bunny.alive === true) {
          bunny.hadBaby = false;
        }
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
            return oneToDie;
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
        this.attack = Math.ceil(Math.random() * 5);
        this.health = Math.ceil(Math.random() * 5);
      };
    }