import { Rnd } from 'react-rnd';
import { useState, useEffect, useRef } from 'react';
import NoteStyle from '../styles/NoteStyle.css'
import { useSelector, useDispatch } from 'react-redux';
import { addNote, deleteNote, setContent, setZIndex, setSize, setPosition, setMinimized, setZ } from '../app/slices/noteSlice';

function Note({uuid, zIndexCounter, setZIndexCounter, minuteTick}) {

  const note = useSelector(state => state.notes[uuid])
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({hours: 24, minutes: 0})
  useEffect(() => {
    let countdown = get24HourCountdown(note.timestamp)
    setTimeRemaining({hours: countdown.hours, minutes: countdown.minutes})
    console.log('minuteTick is working')
  }, [minuteTick, note.timestamp])



  const minHeightGlobal = 50

  function bringToFront() {
    setZIndexCounter(zIndexCounter + 1)
    dispatch(setZ({uuid: uuid, z: zIndexCounter}))
    console.log('Bring to front clicked')
  }

  function handleClose() {
    dispatch(deleteNote({uuid: uuid}))
  }

  function handleMinimize() {
    if (note.height <= minHeightGlobal && note.minimized) {
      dispatch(setSize({uuid: uuid, height: note.prevHeight, prevHeight: note.height, width:note.width, prevWidth: note.prevWidth}))
      dispatch(setMinimized({uuid: uuid, minimized: false}))
    } else {
      dispatch(setSize({uuid: uuid, height: minHeightGlobal, prevHeight: note.height, width:note.width, prevWidth: note.width}))
      dispatch(setMinimized({uuid: uuid, minimized: true}))
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      console.log('enter press detected')
      e.preventDefault()
      setIsEditing(false)
    }
  }

  function getTimeDifference(date1, date2) {
    const difference = date2 - date1;
  
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  
    return { hours, minutes };
  }
  
  // go through this to make sure you understand how it works
  function get24HourCountdown(createdAt) {
    const creationTime = new Date(createdAt);
    const now = new Date();
    let timeLeft = creationTime.getTime() + 24 * 60 * 60 * 1000 - now.getTime(); // Time left in milliseconds
  
    if (timeLeft < 0) {
      // If the countdown has finished, return "00:00"
      return { hours: '00', minutes: '00' };
    }
  
    // To start from "24:00" we need to include the case where exactly 24 hours are left
    let hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    let minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
    // If exactly 60 minutes are left in an hour, it should still count as a full hour
    // and the minutes should reset to "00"
    if (minutesLeft === 60) {
      hoursLeft += 1;
      minutesLeft = 0;
    }
  
    const formattedHours = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft.toString();
    const formattedMinutes = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft.toString();
  
    return { hours: formattedHours, minutes: formattedMinutes };
  }
  

  // useEffect(() => {
  //   const noteTimer = setInterval(() => {
  //     console.log('in set interval...')
  //     let countdown = get24HourCountdown(note.timestamp)
  //     setTimeRemaining({hours: countdown.hours, minutes: countdown.minutes})
  //   }, 60 * 1000)

  //   return () => clearInterval(noteTimer)

  // })


  return (
  <div style={{overflow: 'hidden'}}>
    <Rnd
      style={{zIndex: note.z}}
      minWidth = {150}
      minHeight = {minHeightGlobal}
      lockAspectRatio={false}
      enableUserSelectHack={true}
      default={{
        x: 50,
        y: 50,
        width: 200,
        height: 250
      }}
      dragHandleClassName='drag-handle'
      size={{width: note.width, height: note.height}}
      position={{x: note.x, y: note.y}}
      enableResizing={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false
      }}
      onResizeStop={(e, dir, ref, delta, position) => {
        if (parseInt(ref.style.height) <= minHeightGlobal && note.minimized) {
          dispatch(setSize({uuid: uuid, height: note.height + delta.height, prevHeight: note.prevHeight, width: note.width + delta.width, prevWidth: note.width}))
          dispatch(setMinimized({uuid: uuid, minimized: true}))
        } else if (parseInt(ref.style.height) <= minHeightGlobal) {
          dispatch(setSize({uuid: uuid, height: note.height + delta.height, prevHeight: note.height, width: note.width + delta.width, prevWidth: note.width}))
          dispatch(setMinimized({uuid: uuid, minimized: true}))
        } else {
          dispatch(setSize({uuid: uuid, height: note.height + delta.height, prevHeight: note.height, width: note.width + delta.width, prevWidth: note.width}))
          dispatch(setMinimized({uuid: uuid, minimized: false}))
        }
      }}
      onDragStop={(e, ref) => {
        dispatch(setPosition({uuid: uuid, x: ref.x, y: ref.y}))
      }}
    >
      <div className='note'>
        <div className="header-left-1">
          <button onClick={handleClose}>
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <div className="header-left-2">
          <button onClick={handleMinimize}>
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>
        <div className="header-center drag-handle" onMouseDown={bringToFront}></div>
        <div className="header-right drag-handle" onMouseDown={bringToFront}>
          <span className='timer'>{timeRemaining.hours ? timeRemaining.hours : '00'}:{timeRemaining.minutes ? timeRemaining.minutes : '00'}</span>
        </div>
        <div className='note-textarea-wrapper' onMouseDown={bringToFront} onClick={() => setIsEditing(true)}>
          {isEditing ? 
            <textarea 
              className='note-textarea'
              value={note.content}
              onKeyDown={handleKeyDown} 
              onChange={(e) => dispatch(setContent({uuid: uuid, content: e.target.value}))} 
              onBlur={() => setIsEditing(false)} 
              autoFocus
            />
            : 
            <div
              className='note-textarea left-align'
            >
              {note.content}
            </div>
          }
        </div>
      </div>
    </Rnd>
  </div>
  );
}

export default Note; 