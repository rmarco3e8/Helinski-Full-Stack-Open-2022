import {
  React,
  useState,
  useEffect,
  useRef,
} from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Togglable from './components/Togglable';
import noteService from './services/notes';
import loginService from './services/login';
import './index.css';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
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
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      noteService.setToken(loggedUser.token);
    }
  }, []);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
      });
  };

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((updatedNote) => {
        setNotes(notes.map((n) => (n.id === id ? updatedNote : n)));
      })
      .catch(() => {
        setErrorMessage(`Note "${note.content}" was already removed from server`);
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important);

  const handleLogin = async (credentials) => {
    try {
      const newUser = await loginService.login(credentials);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(newUser));
      noteService.setToken(newUser.token);
      setUser(newUser);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedNoteappUser');
    noteService.setToken(null);
    setUser(null);
  };

  return (
    <>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null
        ? (
          <>
            <Togglable buttonLabel="login">
              <LoginForm
                logInUser={handleLogin}
              />
            </Togglable>
            <br />
          </>
        )
        : (
          <div>
            <p>
              {`${user.name} logged-in`}
              &nbsp;
              <button type="button" onClick={handleLogout}>logout</button>
            </p>
            <Togglable buttonLabel="new note" ref={noteFormRef}>
              <NoteForm createNote={addNote} />
            </Togglable>
            <br />
          </div>
        )}

      <button type="button" onClick={() => setShowAll(!showAll)}>
        show&nbsp;
        { showAll ? 'important' : 'all' }
      </button>

      <ul>
        {notesToShow.map((note) => (
          <Note note={note} key={note.id} toggleImportance={toggleImportance} />
        ))}
      </ul>

      <Footer />
    </>
  );
};

export default App;
