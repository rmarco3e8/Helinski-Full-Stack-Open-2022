const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <div>
                name: <input required value={props.newName} onChange={props.handleNameChange}/>
            </div>
            <div>
                number: <input type="tel" pattern="\d{2,3}-\d{2,3}-\d{4,7}" required value={props.newNumber} onChange={props.handleNumberChange} />
                
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;