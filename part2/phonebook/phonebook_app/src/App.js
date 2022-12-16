import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    // const [persons, setPersons] = useState([
    //     { name: "Arto Hellas", number: "040-123456", id: 1 },
    //     { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    //     { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    //     { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 }
    // ]);
    
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(response => setPersons(response.data));
    }, []);

    const handleNameChange = (e) => setNewName(e.target.value);

    const handleNumberChange = (e) => setNewNumber(e.target.value);

    const handleFilterChange = (e) => setFilter(e.target.value);

    const checkDuplicateName = () => persons.reduce((found, person) => found = person.name === newName, false);

    const addPerson = (e) => {
        e.preventDefault();

        if (checkDuplicateName()) {
            alert(`${newName} is already added to the phonebook`);
        } 
        else {
            const newPerson = {
                name: newName,
                number: newNumber
            };
    
            setPersons(persons.concat(newPerson));
        }
        setNewName("");
        setNewNumber("");
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} onChange={handleFilterChange} />

            <h2>Add entry</h2>
            <PersonForm 
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter}/>
        </div>
    );
};

export default App;