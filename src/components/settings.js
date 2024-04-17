import '../styles/SettingsStyle.css';

function Settings({ onClose, isSettingsOpen }) {
  if (!isSettingsOpen) return null;

  return (
    <div className="settings-container">
      <div className="settings-menu">
        <div className="close">
          <button onClick={onClose}>
            <i className={`fa-solid fa-x hover-hand`}></i>
          </button>
        </div>
        <div className="header" />
        <div className="settings-body">
          <div className="settings-content">
            <h4>
              Coming soon. In the meantime, check out one of my talks or articles:
            </h4>
            <ul>
              <li>
                <a href="https://drive.google.com/file/d/1FIoyouAGz42mMUAi2aYPclHFpP4Kmf2_/view">
                  Recent talk on Event Streaming, Message Brokers, and Kafka
                </a>
              </li>
              <li>
                <a href="https://medium.com/@kafkometry/introducing-kafkometry-ae156ec6d205">
                  Introducing Kafkometry, a Visualizer for Kafka Clusters
                </a>
              </li>
              <li>
                <a href="https://www.peoplenewspapers.com/2020/01/06/skilled-programmer-gets-lessons-in-entrepreneurship/">
                  Skilled Programmer Gets Lessons in Entrepreneurship
                </a>
              </li>
            </ul>
          </div>

          {/* <ul>
            <li>Primary Color</li>
            <li>Random Color</li>
            <li>Night Mode</li>
            <li>Default Note Timer</li>
            <li>Trash Hold Time</li>
            <li>Keep Me Logged In</li>
            <li>Log Out</li>
            <li>Hide/Show Timers</li>
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default Settings;
