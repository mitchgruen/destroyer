import { DndContext } from '@dnd-kit/core';
import Square from './Square';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSize, setPosition } from '../app/slices/noteSlice';

function Note(props) {

  // OLD
  // const [position, setPosition] = useState({x: 0, y: 0}) 
  // const [size, setSize] = useState({x: 100, y: 100 })
  const note = useSelector(state => state.note[props.noteId])
  console.log(note)

  // if this note's position already exists in state, read it
  // otherwise, add it, then read it

  // console.log(position) 
  const dispatch = useDispatch()

  return (
    <div className="App">
      <DndContext onDragEnd={handleDragEnd}>
        <Square noteId={props.noteId}/>
      </DndContext>
    </div>
  );
  function handleDragEnd(e) {
    // OLD
    // console.log(e.delta)
    // setPosition({x: position.x + e.delta.x, y: position.y + e.delta.y})
    // console.log(position)

    // so I guess whatever you put in the argument for setPosition is the "payload"


    dispatch(setPosition({
      noteId: props.noteId, 
      x: note.position.x + e.delta.x, 
      y: note.position.y + e.delta.y}))
  }
}

export default Note; 