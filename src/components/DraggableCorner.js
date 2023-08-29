import '../styles/DraggableCorner.css'
import { DndContext, useDraggable } from '@dnd-kit/core';
import { useEffect } from 'react';

function DraggableCorner(props) {

  const {size, setSize} = props.props

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'DraggableCorner',
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : null

  // useEffect(() => {
  //   setSize({x: size.x + transform.x, y: size.y + transform.y})
  // },)
  if (transform) {
    setSize({x: size.x + transform.x, y: size.y + transform.y})
  } 

  return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div className='DraggableCorner'></div>
      </div>
  );
}

export default DraggableCorner;