import { DndContext } from '@dnd-kit/core';
import Square from './Square';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setPosition } from '../app/slices/noteSlice';

function Note(props) {

  const note = useSelector(state => state.note[props.noteId])
  console.log(note)

  const dispatch = useDispatch()

  return (
    <div className="App">
      <DndContext onDragEnd={handleDragEnd}>
        <Square noteId={props.noteId}/>
      </DndContext>
    </div>
  );
  function handleDragEnd(e) {
    dispatch(setPosition({
      noteId: props.noteId, 
      // tlx: note.topLeft.x + e.delta.x,
      // tly: note.topLeft.y + e.delta.y,
      // trx: note.topRight.x + e.delta.x,
      // try: note.topRight.y + e.delta.y,
      // blx: note.bottomLeft.x + e.delta.x,
      // bly: note.bottomLeft.y + e.delta.y,
      // brx: note.bottomRight.x + e.delta.x,
      // bry: note.bottomRight.y + e.delta.y

      x: e.delta.x,
      y: e.delta.y 
    }))
  }
}

export default Note; 