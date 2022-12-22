require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Person = require("./models/person");
// const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

// morgan.token("post-data", (req, res) => {
//     if(req.method === "POST") {
//         return JSON.stringify(req.body);
//     } else {
//         return "";
//     }
// });

// app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post-data"));

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};
app.use(requestLogger);

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ];

app.get("/api/persons", (request, response) => {
    Person.find({})
        .then(people => {
            response.json(people);
        })
});

app.get("/api/info", (request, response) => {
    Person.countDocuments()
        .then(count => {
            response.send(
                `<div>
                <p>Phonebook has info for ${count} people</p>
                <p>${new Date()}</p>
                </div>`
            );
        });
});

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then((foundPerson) => {
            if (foundPerson) {
                response.json(foundPerson);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => response.status(204).end())
        .catch(error => next(error));
});

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: "Name is missing"
        });
    }
    if (!body.number) {
        return response.status(400).json({
            error: "Number is missing"
        });
    }
    const person = new Person({
        name: body.name, 
        number: body.number
    });
    person.save()
        .then((savedPerson) => {
            response.json(savedPerson);
        });
});

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body
    
    const person = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.log(error);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});