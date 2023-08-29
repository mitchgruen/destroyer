import { DndContext } from '@dnd-kit/core';
import Square from './Square'
import { useState, useEffect } from "react";

function Note() {
  const [position, setPosition] = useState({x: 0, y: 0}) 
  const [size, setSize] = useState({x: 100, y: 100 })
  return (
    <div className="App">
      <DndContext onDragEnd={handleDragEnd}>
        <Square props={{position, setPosition, size, setSize}}/> 
      </DndContext>
    </div>
  );
  function handleDragEnd(e) {
    // console.log(e.delta)
    setPosition({x: position.x + e.delta.x, y: position.y + e.delta.y})
    console.log(position)
  }
}

export default Note; 