import './App.css';
import Note from './components/note';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addNote } from './app/slices/noteSlice';

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()

  function handleClick(e) {
    dispatch(addNote({noteId: count}))
    setCount(count + 1)
  }
  
  return (
    <div className="App">
      <button onClick={handleClick}>New Note</button>
      {[...Array(count)].map((_, i) => (
        <Note key={i} noteId={i} />
      ))} 
    </div>
  );
}

export default App;
