import Note from './components/note';
import Settings from './components/settings';
import Trash from './components/trash'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addNote } from './app/slices/noteSlice';

function App() {
  const [zIndexCounter, setZIndexCounter] = useState(0)
  const [minuteTick, setMinuteTick] = useState(0)
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isTrashOpen, setTrashOpen] = useState(false);

  // const notes = useSelector(state => state.notes)
  
  // next I need to grab the coordinates of a click event whenever one takes place

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
    <div className='app'>
      <div className={`main ${isSettingsOpen || isTrashOpen ? 'blur-background' : ''}`}>
        <div className='navbar'>
          <button onClick={handleClick} className='navbar-icon'>
            <i className="fa-solid fa-plus"></i>
          </button>
          <div>
            JotSpace
          </div>
          <button onClick={() => setSettingsOpen(true)} className='navbar-icon'>
            <i className="fa-solid fa-gear"></i>
          </button>
          <button onClick={() => setTrashOpen(true)} className='navbar-icon'>
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        {
          Object.keys(noteState).map((uuid, index) => (
            <Note key={uuid} uuid={uuid} zIndexCounter={zIndexCounter} setZIndexCounter={setZIndexCounter} minuteTick={minuteTick}/>
          ))
        }
      </div>
      <Settings onClose={() => setSettingsOpen(false)} isSettingsOpen={isSettingsOpen}/>
      <Trash onClose={() => setTrashOpen(false)} isTrashOpen={isTrashOpen}/>
    </div>
  );
}

export default App;
