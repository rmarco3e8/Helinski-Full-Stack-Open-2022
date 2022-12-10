import Note from "./components/Note.js";

const App = ({notes}) => {
    return (
        <>
            <h1>Notes</h1>
            <ul>
                {notes.map(note =>
                    <Note key={note.id} text={note.content} />
                )}
            </ul>
        </>
    );
};

export default App;
