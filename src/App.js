import './App.css';
import Note from './components/note';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addNote, deleteNote, setContent, setZIndex, setSize, setPosition, setMinimized } from './app/slices/noteSlice';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [zIndexCounter, setZIndexCounter] = useState(0)
  const [minuteTick, setMinuteTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMinuteTick(n => n + 1)
    }, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const noteState = useSelector(state => state.notes)
  const dispatch = useDispatch()

  function handleClick() {
    setZIndexCounter(zIndexCounter + 1)
    dispatch(addNote({z: zIndexCounter}))
  }
  
  return (
    <div className="App">
      <button onClick={handleClick}>New Note</button>
      {
        Object.keys(noteState).map((uuid, index) => (
          <Note key={uuid} uuid={uuid} zIndexCounter={zIndexCounter} setZIndexCounter={setZIndexCounter} minuteTick={minuteTick}/>
        ))
      }
    </div>
  );
}

export default App;
