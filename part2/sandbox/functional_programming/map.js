let animals = [
    {name: "bob", species: "dog"},
    {name: "bill", species: "cat"},
    {name: "bo", species: "dog"},
    {name: "bart", species: "hamster"},
    {name: "barny", species: "squirrel"},
    {name: "bartholomew", species: "cat"},
    {name: "squidward", species: "squid"}
];

// from animals to list of their names
let names = animals.map(animal => animal.name);
console.log("all animal names: ", names);

// from animals to list of species
let species = animals.map(animal => animal.species);
console.log("all animal species: ", species);

// list of species but cats are replaced by rats
let cats_to_rats = species.map((species) => {
    if (species === "cat") {
        return "rat";
    }
    return species;
});
console.log("all cats are now rats: ", cats_to_rats);

// array of objects to array of strings
let introductions = animals.map(animal => `Meet ${animal.name}, who is a ${animal.species}.`);
console.log("Meet every animal! ", introductions)