import '../styles/square.css'
import DraggableCorner from './DraggableCorner';
import { useDraggable, DndContext } from '@dnd-kit/core';
import { useState, useContext } from "react";

function Square(props) {
  // what is going on with props.props? Figure this out and clean it up
  const {position, setPosition, size, setSize} = props.props

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'Square',
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x + position.x}px, ${transform.y + position.y}px, 0)`,
    height: `height: ${size.x}`,
    width: `width: ${size.y}`
  } : {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    height: `height: ${size.x}`,
    width: `width: ${size.y}`
  };
  // console.log(transform)

  // have a useEffect that runs setPosition after a drag end event?

  return (
    <div className='square' ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className='top-left'>
        <DndContext>
          <DraggableCorner props={{size, setSize}}/>
        </DndContext>
      </div>
      <div className='top-right'>
        <DndContext>
          <DraggableCorner props={{size, setSize}}/>
        </DndContext>
      </div>
      <div className='bottom-left'>
        <DndContext>
          <DraggableCorner props={{size, setSize}}/>
        </DndContext>
      </div>
      <div className='bottom-right'>
        <DndContext>
          <DraggableCorner props={{size, setSize}}/>
        </DndContext>
      </div>
    </div>
  );
}

export default Square;