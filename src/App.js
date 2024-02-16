import './styles/AppStyle.css';
import Note from './components/note';
import Settings from './components/settings';
import Trash from './components/trash';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote } from './app/slices/noteSlice';
import { ReactComponent as DestroyerLogo } from './assets/logo/destroyertext.svg';
import { ReactComponent as AddIcon } from './assets/icons/plus-sharp-regular.svg';
import { ReactComponent as SettingsIcon } from './assets/icons/gear-sharp-solid.svg';
import { ReactComponent as TrashIcon } from './assets/icons/trash-sharp-solid.svg';

function App() {
  const [zIndexCounter, setZIndexCounter] = useState(0);
  const [minuteTick, setMinuteTick] = useState(0);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isTrashOpen, setTrashOpen] = useState(false);

  // const notes = useSelector(state => state.notes)

  // next I need to grab the coordinates of a click event whenever one takes place

  useEffect(() => {
    const interval = setInterval(() => {
      setMinuteTick((n) => n + 1);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const noteState = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  function handleClick() {
    setZIndexCounter(zIndexCounter + 1);
    dispatch(addNote({ z: zIndexCounter }));
  }

  // EC2 API Test
  // useEffect(() => {
  //   axios.get('http://54.85.203.34:8000/')
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err))
  // }, [])

  // useEffect(() => {
  //   axios.get('http://54.85.203.34:8000/test')
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err))
  // }, [])

  return (
    <div className="app">
      <div
        className={`main ${
          isSettingsOpen || isTrashOpen ? 'blur-background' : ''
        }`}
      >
        <div className="navbar">
          <div>
            <DestroyerLogo className="logo" />
          </div>
          <button onClick={handleClick} className="navbar-icon">
            <i className="fa-solid fa-plus"></i>
            {/* <AddIcon className="navbar-icon" /> */}
          </button>
          <button onClick={() => setSettingsOpen(true)} className="navbar-icon">
            <i className="fa-solid fa-gear"></i>
            {/* <SettingsIcon className="navbar-icon" /> */}
          </button>
          <button onClick={() => setTrashOpen(true)} className="navbar-icon">
            <i className="fa-solid fa-trash"></i>
            {/* <TrashIcon className="navbar-icon" /> */}
          </button>
        </div>
        {Object.keys(noteState).map((uuid, index) => (
          <Note
            key={uuid}
            uuid={uuid}
            zIndexCounter={zIndexCounter}
            setZIndexCounter={setZIndexCounter}
            minuteTick={minuteTick}
          />
        ))}
      </div>
      <Settings
        onClose={() => setSettingsOpen(false)}
        isSettingsOpen={isSettingsOpen}
      />
      <Trash onClose={() => setTrashOpen(false)} isTrashOpen={isTrashOpen} />
    </div>
  );
}

export default App;
