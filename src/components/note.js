import { Rnd } from 'react-rnd';
import { useState, useEffect, useRef } from 'react';
import NoteStyle from '../styles/NoteStyle.css'
import { useSelector, useDispatch } from 'react-redux';
import { setPosition } from '../app/slices/noteSlice';

function Note({noteId, noteState, setNoteState, bringToFront}) {

  // const note = useSelector(state => state.note[props.noteId])
  // const dispatch = useDispatch()

  const [size, setSize] = useState({x: 200, y: 250, prevx: 200, prevy: 250})
  const minHeightGlobal = 50

  function handleClose(delta) {
    
  }

  function handleMinimize() {
    if (size.y <= minHeightGlobal && noteState[noteId].minimized) {
      setSize({x: size.x, y: size.prevy, prevx: size.x, prevy: size.y})
      setNoteState(previousState => ({
        ...previousState, 
        [noteId]: {
          ...previousState[noteId],
          minimized: false
        }
      }))
    } else {
      setSize({x: size.x, y: minHeightGlobal, prevx: size.x, prevy: size.y})
      setNoteState(previousState => ({
        ...previousState, 
        [noteId]: {
          ...previousState[noteId],
          minimized: true
        }
      }))
    }
  }

  return (
  <div style={{overflow: 'hidden'}}>
    <Rnd
      onMouseDown={bringToFront}
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
      size={{width: size.x, height: size.y}}
      onResizeStop={(e, dir, ref, delta, position) => {
        if (parseInt(ref.style.height) <= minHeightGlobal && noteState[noteId].minimized) {
          setSize({x: size.x + delta.width, y: size.y + delta.height, prevx: size.x, prevy: size.prevy})
          setNoteState(previousState => ({
            ...previousState, 
            [noteId]: {
              x: noteState[noteId].x,
              y: noteState[noteId].y,
              height: parseInt(ref.style.height),
              width: parseInt(ref.style.width),
              minimized: true
            }
          }))
        } else if (parseInt(ref.style.height) <= minHeightGlobal) {
          setSize({x: size.x + delta.width, y: size.y + delta.height, prevx: size.x, prevy: size.y})
          setNoteState(previousState => ({
            ...previousState, 
            [noteId]: {
              x: noteState[noteId].x,
              y: noteState[noteId].y,
              height: parseInt(ref.style.height),
              width: parseInt(ref.style.width),
              minimized: true
            }
          }))
        } else {
          setSize({x: size.x + delta.width, y: size.y + delta.height, prevx: size.x, prevy: size.y})
          setNoteState(previousState => ({
            ...previousState, 
            [noteId]: {
              x: noteState[noteId].x,
              y: noteState[noteId].y,
              height: parseInt(ref.style.height),
              width: parseInt(ref.style.width),
              minimized: false
            }
          }))
        }

      }}
      onDragStop={(e, ref) => {
        setNoteState(previousState => ({
          ...previousState, 
          [noteId]: {
            x: ref.x,
            y: ref.y,
            height: noteState[noteId].height,
            width: noteState[noteId].width,
            minimized: noteState[noteId].minimized
          }
        }))
      }}
    >
      <div className='note'>
        <div class="header-left-1">
          <button onClick={handleClose}>
            <i class="fa-solid fa-x"></i>
          </button>
        </div>
        <div class="header-left-2">
          <button onClick={handleMinimize}>
            <i class="fa-solid fa-minus"></i>
          </button>
        </div>
        <div class="header-center drag-handle">
        </div>
        <div class="header-right drag-handle">
          <span className='timer'>23:47</span>
        </div>
        <div className='note-textarea-wrapper'>
          <textarea class="note-textarea"></textarea>
        </div>
      </div>
    </Rnd>
  </div>
  );
}

export default Note; 