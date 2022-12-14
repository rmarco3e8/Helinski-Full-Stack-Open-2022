import {useState, useEffect} from "react";
import Note from "./components/Note.js";
import axios from "axios";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        console.log("effect");
        axios
            .get("http://localhost:3001/notes")
            .then(response => {
                console.log("promise fulfilled");
                setNotes(response.data);
            });
    }, []);
    console.log("render", notes.length, "notes");

    const addNote = (event) => {
        event.preventDefault();
        const noteToAdd = {
            id: notes.length + 1,
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        };
        setNotes(notes.concat(noteToAdd));
        setNewNote("");
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);


    return (
        <>
            <h1>Notes</h1>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? "important" : "all"}
            </button>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} text={note.content} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
        </>
    );
};

export default App;
