import '../styles/square.css';
import DraggableCorner from './DraggableCorner';
import { useDraggable, DndContext } from '@dnd-kit/core';
import { useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSize, setPosition } from '../app/slices/noteSlice';

function Square(props) {

  // get rid of all the stuff you're doing with props
  // see if you can use useSelector to grab hold of state within this component
  // then, I think we need to head over to DraggableCorner, and within there, set up useDispatch to update the size for our squaress

  const note = useSelector(state => state.note[props.noteId])
  const dispatch = useDispatch()
  // import setPosition and setSize

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'Square',
  });
  
  let style = transform ? {
    transform: `translate3d(${transform.x + note.position.x}px, ${transform.y + note.position.y}px, 0)`,
    height: `${note.size.y}px`,
    width: `${note.size.x}px`
  } : {
    transform: `translate3d(${note.position.x}px, ${note.position.y}px, 0)`,
    height: `${note.size.y}px`,
    width: `${note.size.x}px`
  };

  function handleDragEnd(e) {
    dispatch(setSize({
      noteId: props.noteId, 
      x: note.size.x + e.delta.x, 
      y: note.size.y + e.delta.y
    }))
  }

  console.log('UPDATED STYLE ' + style.height)

  return (
    <div className='square' ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className='top-left'>
        <DndContext onDragEnd={handleDragEnd}>
          <DraggableCorner noteId={props.noteId}/>
        </DndContext>
      </div>
      <div className='top-right'>
        <DndContext onDragEnd={handleDragEnd}>
          <DraggableCorner noteId={props.noteId}/>
        </DndContext>
      </div>
      <div className='bottom-left'>
        <DndContext onDragEnd={handleDragEnd}>
          <DraggableCorner noteId={props.noteId}/>
        </DndContext>
      </div>
      <div className='bottom-right'>
        <DndContext onDragEnd={handleDragEnd}>
          <DraggableCorner noteId={props.noteId}/>
        </DndContext>
      </div>
    </div>
  );
}

export default Square;