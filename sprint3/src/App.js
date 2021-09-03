import { useState, useEffect } from 'react'
import './App.css';
import TaskModal from './TaskModal'
import DeleteModal from './DeleteModal';
import Overlay from './Overlay';
import TaskCard from './TaskCard';
import AddButton from './AddButton';

function App() {
  const [ tasks, setTasks ] = useState([])
  const [ showTaskModal, setShowTaskModal ] = useState(false)
  const [ showDeleteModal, setShowDeleteModal ] = useState(false)
  const [ showOverlay, setShowOverlay ] = useState(false)
  const [ taskID, setTaskID ] = useState()

  const fetchAllTasks = async () => {
    const res = await fetch("http://localhost:8080/tasks")
    const allTasks = await res.json()
    // console.log(allTasks)
    setTasks(allTasks)
  }

  const toggleTaskModal = () => {
    setShowTaskModal(curState => !curState)
    setShowOverlay(curState => !curState)
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(curState => !curState)
    setShowOverlay(curState => !curState)
  }

  const toggleOverlay = () => {
    setShowTaskModal(false)
    setShowDeleteModal(false)
    setShowOverlay(false)
  }
  
  useEffect(() => {
    fetchAllTasks()
  }, [])


  return (    
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <title>Home</title>
    </head>

<body>
    <div className="logo">
        <div>
            <i className="far fa-user-circle"></i>
            <span>Username</span>
        </div>
        <div>
            <i className="fas fa-sign-out-alt"></i><span>Logout</span>
        </div>
    </div>
    <div className="container">
        <div className="side-bar">
            <div className="profile">
                <i className="far fa-user-circle"></i>
                <p>Username</p>
            </div>
            <div className="tasks">
                <a href="">All Tasks</a>
            </div>
            <div className="status">
                <p>Status</p>
                <div>
                    <a href="" className="status-item status-item-todo" id="todo"><i className="fas fa-ellipsis-h"></i><span>Todo</span></a>
                    <a href="" className="status-item status-item-inProgress" id="inProgress"><i className="fas fa-spinner"></i><span>In Progress</span></a>
                    <a href="" className="status-item status-item-review" id="review"><i className="far fa-eye"></i><span>Review</span></a>
                    <a href="" className="status-item status-item-done" id="done"><i className="fas fa-check-circle"></i><span>Done</span></a>
                </div>
            </div>
            <a href="/" id="logout-btn" className="button-os"><i className="fas fa-sign-out-alt"></i>Logout</a>
        </div>
        <section className="desktop-main-body">
            <div className="main-body-header">
                <div className="greeting-msg">
                    <div className='console-container'><span id='text'></span>
                        <div className='console-underscore' id='console'></div>
                    </div>
                </div>
                <div className="day-info">
                    <div className="today">
                        <span id="weekday-span"></span>
                        <div className="weather" id="weather-div"></div>
                    </div>
                    <div className="date" id="today-div"></div>
                </div>
            </div>
            <section className="task-card-container">
              {tasks.map((t, index) => 
              <>
                <TaskCard
                  id={t._id} 
                  title={t.title}
                  due={t.due}
                  assignment={t.assignment}
                  description={t.description}
                  status={t.status}
                  priority={t.priority}
                  key={index}
                  onClickEditBtn={toggleTaskModal}
                  onClickDeleteBtn={() => {
                    setTaskID(t._id)
                    toggleDeleteModal()
                  }}
                />
                </>
              )}
            </section>
            {/* Add task modal */}
            {showTaskModal && <TaskModal formTitle="" onClick={toggleTaskModal} />}
            {/* Delete task modal */}
            {showDeleteModal && <DeleteModal taskID={taskID} onClick={toggleDeleteModal} />}
            {/* Overlay */}
            {showOverlay && <Overlay onClick={toggleOverlay} />}
            <button className="add-new-task" onClick={toggleTaskModal}>
              <AddButton />
            </button>
            </section>
    </div>
    <footer>
        <a href="/tasks"><i className="fas fa-home" id="home-button"></i></a>
        <a href="/tasks/new"><i className="fas fa-plus-circle" id="add-task-lg"></i></a>
        <a href=""><i className="fas fa-bars" id="details-button"></i></a>
    </footer>
    <script type="text/javascript" src="./tasks.js"></script>
</body>

</html>
  )
}

export default App;