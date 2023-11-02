import './App.css';
import Note from './components/note';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addNote, deleteNote, setContent, setZIndex, setSize, setPosition, setMinimized } from './app/slices/noteSlice';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [count, setCount] = useState(0)
  const [noteState, setNoteState] = useState({})
  const [zIndexCounter, setZIndexCounter] = useState(0)

  function bringToFront(e) {
    setZIndexCounter(zIndexCounter + 1)
    e.currentTarget.style.zIndex = zIndexCounter
    console.log('Bring to front clicked')
  }

  function handleClick(e) {
    // dispatch(addNote({noteId: count}))
    setNoteState(previousState => ({
      ...previousState,
      [count]: {
        x: 50,
        y: 50,
        height: 250,
        width: 200,
        minimized: false
      }}))
    setCount(count + 1)
  }
  
  return (
    <div className="App">
      <button onClick={handleClick}>New Note</button>
      {[...Array(count)].map((_, i) => (
        <Note key={i} noteId={i} noteState={noteState} setNoteState={setNoteState} bringToFront={bringToFront}/>
      ))} 
    </div>
  );
}

export default App;
