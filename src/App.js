import "./styles/AppStyle.css";
import Note from "./components/note";
import Settings from "./components/settings";
import Trash from "./components/trash";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNote, replaceState } from "./redux/slices/noteSlice";
import axios from "axios";
import store from "./redux/store";
import { ReactComponent as DestroyerLogo } from "./assets/logo/destroyer-wordmark-black.svg";
import { Plus, WandMagicSparkles } from "./icons";

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
      .post("/.netlify/functions/sort", reduxState)
      .then((res) => {
        dispatch(replaceState(JSON.parse(res.data.notes)));
      })
      .catch((err) => {
        console.error(
          "[sort] error:",
          err.response?.status,
          err.response?.data ?? err.message,
        );
      });
  }

  return (
    <div className="app">
      <div
        className={`app-grid ${
          isSettingsOpen || isTrashOpen ? "blur-background" : ""
        }`}
      >
        <div className="navbar">
          <div>
            <DestroyerLogo className="logo" />
            {/* <div className="main-logo">Destroyer</div> */}
          </div>
          <button onClick={handleClick} className="navbar-icon">
            <Plus />
          </button>
          <button onClick={handleSort} className="navbar-icon">
            <WandMagicSparkles />
          </button>
          {/* <button onClick={() => setSettingsOpen(true)} className="navbar-icon">
            <Gear />
          </button> */}
          {/* <button onClick={() => setTrashOpen(true)} className="navbar-icon">
            <TrashIcon />
          </button> */}
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
          <a
            className="privacy"
            href="https://destroyerapp.netlify.app/privacy.pdf"
          >
            Privacy
          </a>
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
