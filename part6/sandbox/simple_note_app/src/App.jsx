import React from 'react';

import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';

const App = () => (
  <div>
    <NewNote />
    <VisibilityFilter />
    <Notes />
  </div>
);

export default App;
