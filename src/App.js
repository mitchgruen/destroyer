import './styles/AppStyle.css';
import Note from './components/note';
import Settings from './components/settings';
import Trash from './components/trash';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, replaceState } from './redux/slices/noteSlice';
import axios from 'axios';
import store from './redux/store';
import { ReactComponent as DestroyerLogo } from './assets/logo/destroyer-wordmark-black.svg';
// import { ReactComponent as AddIcon } from './assets/icons/plus-sharp-regular.svg';
// import { ReactComponent as SettingsIcon } from './assets/icons/gear-sharp-solid.svg';
// import { ReactComponent as TrashIcon } from './assets/icons/trash-sharp-solid.svg';

function App() {
  const [zIndexCounter, setZIndexCounter] = useState(1);
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

  function handleSort() {
    const reduxState = store.getState();
    axios
      .post('https://www.api.destroyerapp.com/sort', reduxState)
      .then((res) => {
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
            <DestroyerLogo className="logo" />
            {/* <div className="main-logo">Destroyer</div> */}
          </div>
          <button onClick={handleClick} className="navbar-icon">
            <i className={`fa-solid fa-plus hover-hand`}></i>
            {/* <AddIcon className="navbar-icon" /> */}
          </button>
          <button onClick={handleSort} className="navbar-icon">
            <i className="fa-regular fa-wand-magic-sparkles hover-hand"></i>
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
          <a className='privacy' href='../public/privacy.pdf'>Privacy</a>
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
