import './styles/AppStyle.css';
import Note from './components/note';
import Settings from './components/settings';
import Trash from './components/trash';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, replaceState } from './redux/slices/noteSlice';
import axios from 'axios';
import store from './redux/store';
// import { ReactComponent as DestroyerLogo } from './assets/logo/destroyertext.svg';
// import { ReactComponent as AddIcon } from './assets/icons/plus-sharp-regular.svg';
// import { ReactComponent as SettingsIcon } from './assets/icons/gear-sharp-solid.svg';
// import { ReactComponent as TrashIcon } from './assets/icons/trash-sharp-solid.svg';

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
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const noteState = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  function handleClick() {
    setZIndexCounter(zIndexCounter + 1);
    dispatch(addNote({ z: zIndexCounter }));
  }

  const hardCodeState = {
    jkl: {
      uuid: 'jkl',
      x: 250,
      y: 250,
      z: 1,
      height: 100,
      prevHeight: 250,
      width: 100,
      prevWidth: 200,
      minimized: false,
      content: 'Test Test Test 1 2 3',
      timestamp: Date.now() - 86250000,
    },
  };

  function handleSort() {
    console.log('Sort clicked!');
    const reduxState = store.getState();
    console.log('Here is the Redux State: ' + reduxState);
    axios
      .post('http://localhost:8000/sort', reduxState)
      .then((res) => {
        console.log('Here is res: ');
        console.log(typeof JSON.parse(res.data.notes));
        console.log(res.data.notes);
        dispatch(replaceState(JSON.parse(res.data.notes)));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="app">
      <div
        className={`app-grid ${
          isSettingsOpen || isTrashOpen ? 'blur-background' : ''
        }`}
      >
        <div className="navbar">
          <div>
            {/* <DestroyerLogo className="logo" /> */}
            <div className="main-logo">Destroyer</div>
          </div>
          <button onClick={handleClick} className="navbar-icon">
            <i className={`fa-solid fa-plus hover-hand`}></i>
            {/* <AddIcon className="navbar-icon" /> */}
          </button>
          <button onClick={handleSort} className="navbar-icon">
            <i class="fa-regular fa-wand-magic-sparkles hover-hand"></i>
            {/* <AddIcon className="navbar-icon" /> */}
          </button>
          <button onClick={() => setSettingsOpen(true)} className="navbar-icon">
            <i className={`fa-solid fa-gear hover-hand`}></i>
            {/* <SettingsIcon className="navbar-icon" /> */}
          </button>
          <button onClick={() => setTrashOpen(true)} className="navbar-icon">
            <i className={`fa-solid fa-trash hover-hand`}></i>
            {/* <TrashIcon className="navbar-icon" /> */}
          </button>
        </div>
        <div></div>
        <div className="notes-container">
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
