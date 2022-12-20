const mongoose = require("mongoose");

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log("Add a person like this: node mongo.js <password> <name> <number>");
    console.log("Get all people like this: node mongo.js <password>")
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.ydz5jhz.mongodb.net/personApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {

    const name = process.argv[3];
    const number = process.argv[4];

    mongoose.connect(url)
        .then(() => {
            const person = Person({
                name: name,
                number: number
            });
            return person.save();
        })
        .then((res) => {
            console.log(`added ${res.name} number ${res.number} to phonebook`);
            return mongoose.connection.close();
        })
        .catch(err => console.log(err));
} else {
    mongoose.connect(url)
    .then(() => Person.find())
    .then(res => {
        console.log("phonebook:");
        res.forEach(person => console.log(`${person.name} ${person.number}`));
        return mongoose.connection.close();
    })
    .catch(err => console.log(err));
}