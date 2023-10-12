import '../styles/DraggableCorner.css'
import { DndContext, useDraggable } from '@dnd-kit/core';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSize } from '../app/slices/noteSlice';

function DraggableCorner(props) {

  // const {handleResize} = props.props
  const note = useSelector(state => state.note[props.noteId])
  const dispatch = useDispatch()

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'DraggableCorner',
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : null

// dispatch(setSize({
//   noteId: props.noteId, 
//   x: note.size.x + (transform?.x ?? 0), 
//   y: note.size.y + (transform?.y ?? 0)
// }))

  // do you even need a useEffect? Shouldn't dragging one of the corners
  // trigger a re-render?

  // or
  // the question is basically, when do I run setSize?

  return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div className='DraggableCorner'></div>
      </div>
  );
}

export default DraggableCorner;