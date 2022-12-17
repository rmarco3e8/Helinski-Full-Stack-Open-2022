import PersonEntry from "./PersonEntry";

const Persons = ({persons, filter, removePerson}) => {
    const personsToShow = filter === "" ?
    persons :
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <>
            {personsToShow.map(person => {
                return(
                    <div key={person.id}>
                        <PersonEntry name={person.name} number={person.number}/> &nbsp;
                        <button onClick={() => removePerson(person.id)}>delete</button>
                    </div>
                );
            })}
        </>
    );
}

export default Persons;