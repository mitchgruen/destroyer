import '../styles/droppable.css'
import { useDroppable } from '@dnd-kit/core';
import Square from './Square';

function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style} className='droppable'>
      {props.children}
    </div>
  );
}

export default Droppable;