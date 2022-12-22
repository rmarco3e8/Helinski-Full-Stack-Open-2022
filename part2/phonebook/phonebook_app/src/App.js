import { useState, useEffect } from "react";
import "./index.css";

import phonebookService from "./services/phonebook";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");
    const [notification, setNotification] = useState(null);
    const [errorFlag, setErrorFlag] = useState(false);

    useEffect(() => {
        phonebookService
            .getAll()
            .then(initialPersons => setPersons(initialPersons));
    }, []);

    const handleNameChange = (e) => setNewName(e.target.value);

    const handleNumberChange = (e) => setNewNumber(e.target.value);

    const handleFilterChange = (e) => setFilter(e.target.value);

    const checkDuplicateName = () => persons.reduce((found, person) => found = found || person.name === newName, false);

    const resetForm = () => {
        setNewName("");
        setNewNumber("");
    };

    const notify = (message, error) => {
        setErrorFlag(error);
        setNotification(message);
        setTimeout(() => setNotification(null), 5000);
    }

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
                        notify(`Updated ${updatedPerson.name}'s number`, false);
                    })
                    .catch(error => {
                        notify(`Information of ${person.name} has already been removed from the server`, true);
                    });
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
                    notify(`Added ${addedPerson.name}`, false);
                })
                .catch(error => {
                    console.log(error.response.data.error);
                    notify(error.response.data.error, true);
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
            <Notification errorFlag={errorFlag} message={notification}/>
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