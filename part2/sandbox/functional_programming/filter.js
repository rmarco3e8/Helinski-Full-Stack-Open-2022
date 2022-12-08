let animals = [
    {name: "bob", species: "dog"},
    {name: "bill", species: "cat"},
    {name: "bo", species: "dog"},
    {name: "bart", species: "hamster"},
    {name: "barny", species: "squirrel"},
    {name: "bartholomew", species: "cat"}
];

// more verbose, multiple lines
// sorry bartholomew you're not invited...
let cats = animals.filter((animal) => {

    if (animal.name === "bartholomew") {
        return false;
    }
    return animal.species === "cat";
});
console.log("filtered for cats: ", cats);


// arrow function, shortened
let dogs = animals.filter(animal => animal.species === "dog");
console.log("filtered for dogs: ", dogs);


// now I'm sick of dogs
let isDog = (animal) => animal.species === "dog";
let noDogsAllowed = animals.filter(animal => !isDog(animal));
console.log("filtered of dogs: ", noDogsAllowed);

/*

Examples of syntax:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

Arrow function:
    filter((element) => {  …  })
    filter((element, index) => {  …  })
    filter((element, index, array) => {  …  })

Callback function:
    filter(callbackFn)
    filter(callbackFn, thisArg)

Inline callback function:
    filter(function (element) {  …  })
    filter(function (element, index) {  …  })
    filter(function (element, index, array) {  …  })
    filter(function (element, index, array) {  …  }, thisArg)

*/