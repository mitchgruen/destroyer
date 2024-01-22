// import SettingsStyle from '../styles/SettingsStyle.css'

function Settings({onClose, isSettingsOpen}) {

  if (!isSettingsOpen) return null

  return (
    <div className='settings-container'>
      <div className='settings-menu'>
        <div className='close'>
          <button onClick={onClose}>
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <div className='header'/>
        <div className='settings-body'>
          <ul>
            <li>Primary Color</li>
            <li>Random Color</li>
            <li>Night Mode</li>
            <li>Default Note Timer</li>
            <li>Trash Hold Time</li>
            <li>Keep Me Logged In</li>
            <li>Hide/Show Timers</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Settings;