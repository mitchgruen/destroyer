import { Rnd } from 'react-rnd';
import { useState, useEffect, useRef } from 'react';
import NoteStyle from '../styles/NoteStyle.css'
import { useSelector, useDispatch } from 'react-redux';
import { setPosition } from '../app/slices/noteSlice';

function Note(props) {

  const note = useSelector(state => state.note[props.noteId])
  const dispatch = useDispatch()

  const [size, setSize] = useState({x: 200, y: 250, prevx: 200, prevy: 250})
  const minHeightGlobal = 50

  function handleClose(delta) {
    
  }

  function handleMinimize() {
    console.log('minimize clicked!')
    console.dir(size)
    if (size.y <= minHeightGlobal) {
      setSize({x: size.prevx, y: size.prevy, prevx: size.x, prevy: size.y})
    } else {
      setSize({x: size.x, y: minHeightGlobal, prevx: size.x, prevy: size.y})
    }
  }

  return (
  <div className="App" style={{overflow: 'hidden'}}>
    <Rnd
      minWidth= {150}
      minHeight= {minHeightGlobal}
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
        setSize({x: size.x + delta.width, y: size.y + delta.height, prevx: size.x, prevy: size.y})
        console.dir(size)
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