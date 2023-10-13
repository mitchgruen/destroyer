import '../styles/DraggableCorner.css'
import { DndContext, useDraggable } from '@dnd-kit/core';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSize } from '../app/slices/noteSlice';
import { setTopLeft, setTopRight, setBottomLeft, setBottomRight } from '../app/slices/noteSlice';

function DraggableCorner(props) {

  const note = useSelector(state => state.note[props.noteId])
  const dispatch = useDispatch()

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'DraggableCorner',
  })

  // Making sure that position is ending up where we need it to be
  // console.log('Here is props.position: ' + props.position)

  // need to set the initial position of each corner
  const style = transform ? {
    transform: `translate3d(${note[props.position].x + transform.x}px, ${note[props.position].y + transform.y}px, 0)`
  } : {
    transform: `translate3d(${note[props.position].x}px, ${note[props.position].y}px, 0)`
  }

  if (transform) {
    switch(props.position) {
      case 'topLeft':
        console.log('Inside top left')
        console.dir(transform.x)
        // dispatch(setTopLeft({
        //   noteId: props.noteId, 
        //   x: transform.x, 
        //   y: transform.y
        // }))
        break
      case 'topRight':
        dispatch(setTopRight({
          noteId: props.noteId, 
          x: transform.x, 
          y: transform.y
        }))
        break
      case 'bottomLeft':
        dispatch(setBottomLeft({
          noteId: props.noteId, 
          x: transform.x, 
          y: transform.y
        }))
        break
      case 'bottomRight':
        dispatch(setBottomRight({
          noteId: props.noteId, 
          x: transform.x, 
          y: transform.y
        }))
        break
      default: break
    }
  }

  // if one of these corners is being transformed, update redux state continuously and remove the on 
  // drag end attribute
  // problem though, that will re render the parent, which will re render the child
  // so you're going to need to use refs somehow


  return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div className='DraggableCorner'></div>
      </div>
  );
}

export default DraggableCorner;