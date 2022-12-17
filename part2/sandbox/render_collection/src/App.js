import {useState, useEffect} from "react";
import Note from "./components/Note.js";
import axios from "axios";
import noteService from "./services/notes";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                console.log("promise fulfilled");
                setNotes(initialNotes);
            });
    }, []);

    const addNote = (event) => {
        event.preventDefault();
        const noteToAdd = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        };

        noteService
            .create(noteToAdd)
            .then(addedNote => {
                setNotes(notes.concat(addedNote));
                setNewNote("");
            });
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const toggleImportance = (id) => {
        const note = notes.find((note) => note.id === id);
        const changedNote = {...note, important: !note.important};
        noteService
            .update(id, changedNote)
            .then(updatedNote => {
                setNotes(notes.map((n) => n.id === id ? updatedNote : n));
            })
            .catch(error => {
                alert(
                    `the note '${note.content}' was already deleted from server`
                )
                setNotes(notes.filter(n => n.id !== id))
            });
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
                    <Note note={note} toggleImportance={toggleImportance} />
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
