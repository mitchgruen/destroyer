import '../styles/square.css';
import DraggableCorner from './DraggableCorner';
import { useDraggable, DndContext } from '@dnd-kit/core';
import { useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setTopLeft, setTopRight, setBottomLeft, setBottomRight } from '../app/slices/noteSlice';

function Square(props) {

  const note = useSelector(state => state.note[props.noteId])
  const dispatch = useDispatch()

  // find central position of square
  // const squarePosition = {x: 0, y: 0}
  // for (const key in note) {
  //   squarePosition.x += Number(note[key].x)
  //   squarePosition.y += Number(note[key].y)
  // }
  // squarePosition.x /= 4 
  // squarePosition.y /= 4 
  // console.log('Here is Square Position:')
  // console.dir(squarePosition)


  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'Square',
  });

  const style = transform ? {
    transform: `translate3d(${note.topLeft.x + transform.x}px, ${note.topLeft.y + transform.y}px, 0)`,
  } : {
    transform: `translate3d(${note.topLeft.x}px, ${note.topLeft.y}px, 0)`,
  }

  const squareStyle = {
    position: 'absolute',
    zIndex: '2',
    height: `${note.bottomLeft.y - note.topLeft.y}px`,
    width: `${note.topRight.x - note.topLeft.x}px`,
    border: 'black',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: '2px',
    borderRadius: '8px'
  }

  function handleTopLeft(e) {
    dispatch(setTopLeft({
      noteId: props.noteId, 
      x: e.delta.x, 
      y: e.delta.y
    }))
  }
  function handleTopRight(e) {
    dispatch(setTopRight({
      noteId: props.noteId, 
      x: e.delta.x, 
      y: e.delta.y
    }))
  }
  function handleBottomLeft(e) {
    dispatch(setBottomLeft({
      noteId: props.noteId, 
      x: e.delta.x, 
      y: e.delta.y
    }))
  }
  function handleBottomRight(e) {
    dispatch(setBottomRight({
      noteId: props.noteId, 
      x: e.delta.x, 
      y: e.delta.y
    }))
  }

  // wait a sec... draggable corners are not children of squares any more
  // remember we went out of our way to make that change
  // so we can probably use a useEffect to update the size of the square in real time without
  // creating any looping issues

  return (
    <div>
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div style={squareStyle}></div>
      </div>
      <DndContext onDragEnd={handleTopLeft}>
        <DraggableCorner noteId={props.noteId} position={'topLeft'}/>
      </DndContext>

      <DndContext onDragEnd={handleTopRight}>
        <DraggableCorner noteId={props.noteId} position={'topRight'}/>
      </DndContext>

      <DndContext onDragEnd={handleBottomLeft}>
        <DraggableCorner noteId={props.noteId} position={'bottomLeft'}/>
      </DndContext>

      <DndContext onDragEnd={handleBottomRight}>
        <DraggableCorner noteId={props.noteId} position={'bottomRight'}/>
      </DndContext>
    </div>
  );
}

export default Square;