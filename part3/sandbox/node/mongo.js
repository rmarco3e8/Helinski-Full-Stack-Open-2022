const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <paassword>");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.ydz5jhz.mongodb.net/noteApp?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// mongoose
//     .connect(url)
//     .then((result) => {
//         console.log("connected");
//         // console.log(result);

//         const note = new Note({
//             content: "a one, a two, a three, crunch",
//             date: new Date(),
//             important: true,
//         });

//         return note.save();
//     })
//     .then((result) => {
//         console.log("note saved!");
//         // console.log(result);
//         return mongoose.connection.close();
//     })
//     .catch(err => console.log(err));

mongoose
    .connect(url)
    .then(() => {
        console.log("connected");

        return Note.find({});
    })
    .then((result) => {
        console.log("notes found!");

        result.forEach(note => console.log(note));

        return mongoose.connection.close();
    })
    .catch(err => console.log(err));