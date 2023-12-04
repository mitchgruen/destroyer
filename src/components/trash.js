import TrashStyle from '../styles/TrashStyle.css'

function Trash({onClose, isTrashOpen}) {

  if (!isTrashOpen) return null

  return (
    <div className='trash-container'>
      <div className='trash-menu'>
        <div className='close'>
          <button onClick={onClose}>
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <div className='header'/>
        <div className='trash-body'>
          <ul>
            <li>Date Content Preview ...see more</li>
            <li>Date Content Preview ...see more</li>
            <li>Date Content Preview ...see more</li>
            <li>Date Content Preview ...see more</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Trash;