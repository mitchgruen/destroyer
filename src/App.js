import { DndContext } from '@dnd-kit/core';
import './App.css';
import './components/Square'
import Note from './components/note';
import { useState, useEffect } from "react";
import DraggableCorner from './components/DraggableCorner';

function App() {
  const [count, setCount] = useState(0)

  function handleClick(e) {
    setCount(count + 1)
  }
  
  return (
    <div className="App">
      <button onClick={handleClick}>New Note</button>
      {[...Array(count)].map((_, i) => (
        <Note key={i} />
      ))} 
    </div>
  );
}

export default App;
