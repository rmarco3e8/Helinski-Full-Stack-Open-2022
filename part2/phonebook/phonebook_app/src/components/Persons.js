import PersonEntry from "./PersonEntry";

const Persons = ({persons, filter}) => {
    const personsToShow = filter === "" ?
    persons :
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <>
            {personsToShow.map(person => <PersonEntry key={person.name} name={person.name} number={person.number} />)}
        </>
    );
}

export default Persons;