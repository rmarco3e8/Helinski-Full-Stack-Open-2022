import {useState, useEffect} from "react";
import Note from "./components/Note.js";
import Notification from "./components/Notification.js";

import noteService from "./services/notes";

import "./index.css";

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    };
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
        </div>
    );
};

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
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
                setErrorMessage(`Note "${note.content}" was already removed from server`);
                setTimeout(() => setErrorMessage(null), 5000);
                setNotes(notes.filter(n => n.id !== id));
            });
    };

    const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);


    return (
        <>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? "important" : "all"}
            </button>
            <ul>
                {notesToShow.map(note =>
                    <Note note={note} key={note.id} toggleImportance={toggleImportance} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
            <Footer />
        </>
    );
};

export default App;
