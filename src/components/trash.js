import '../styles/TrashStyle.css';

function Trash({ onClose, isTrashOpen }) {
  if (!isTrashOpen) return null;

  return (
    <div className="trash-container">
      <div className="trash-menu">
        <div className="close">
          <button onClick={onClose}>
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <div className="header" />
        <div className="trash-body">
          <div className="trash-content">
            <h4>
              Coming soon. In the meantime, check out one of my talks or
              articles:
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
        </div>
      </div>
    </div>
  );
}

export default Trash;
