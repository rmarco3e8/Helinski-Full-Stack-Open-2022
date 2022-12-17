import { useState, useEffect } from "react";
import axios from "axios";
import phonebookService from "./services/phonebook";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        phonebookService
            .getAll()
            .then(initialPersons => setPersons(initialPersons));
    }, []);

    const handleNameChange = (e) => setNewName(e.target.value);

    const handleNumberChange = (e) => setNewNumber(e.target.value);

    const handleFilterChange = (e) => setFilter(e.target.value);

    const checkDuplicateName = () => persons.reduce((found, person) => found = person.name === newName, false);

    const resetForm = () => {
        setNewName("");
        setNewNumber("");
    };

    const addPerson = (e) => {
        e.preventDefault();

        if (checkDuplicateName()) {
            const prompt = `${newName} is already added to the phonebook, replace the old number with a new one?`;
            if (window.confirm(prompt)) {
                const person = persons.find(person => person.name === newName);
                const id = person.id;
                const personToUpdate = {
                    ...person,
                    number: newNumber
                };
                phonebookService
                    .update(id, personToUpdate)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id !== id ? person : updatedPerson));
                    })
            }
        } 
        else {
            const newPerson = {
                name: newName,
                number: newNumber
            };

            phonebookService
                .create(newPerson)
                .then(addedPerson => {
                    setPersons(persons.concat(addedPerson));
                });
        }
        resetForm();
    };

    const removePerson = (id) => {

        const prompt = `Delete ${persons.find(person => person.id === id).name}?`;

        if (window.confirm(prompt)) {
            phonebookService
            .remove(id)
            .then(() => setPersons(persons.filter(person => person.id !== id)));
        }
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
            <Persons 
                persons={persons} 
                filter={filter} 
                removePerson={removePerson}
            />
        </div>
    );
};

export default App;