import { useState, useEffect } from "react";
import "./App.css";
import TaskModal from "./TaskModal";
import DeleteModal from "./DeleteModal";
import Overlay from "./Overlay";
import TaskCard from "./TaskCard";
import AddButton from "./AddButton";
import { Switch, Route, Link } from "react-router-dom";
import Todo from "./Component/Todo/Todo";
import InProgress from "./Component/InProgress/InProgress";
import Review from "./Component/Review/Review";
import Done from "./Component/Done/Done";
import ChangeText from "./ChangeText";
import Getday from "./Getday";
// import Weather from "./Weather";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [taskID, setTaskID] = useState();
  const [modalHeader, setModalHeader] = useState("Add New Task");
  const [modalTitle, setModalTitle] = useState(null);
  const [modalDueDate, setModalDueDate] = useState(null);
  const [modalDescription, setModalDescription] = useState(null);
  const [modalAssignment, setModalAssignment] = useState(null);
  const [modalStatus, setModalStatus] = useState(null);
  const [modalPriority, setModalPriority] = useState(null);
  const [blockEditButton, setBlockEditButton] = useState(true);
  const [blockAddButton, setBlockAddButton] = useState(true);
  const [submitMethod, setSubmitMethod] = useState("post");
  const [showTask, setShowTask] = useState(true);

  const fetchAllTasks = async () => {
    const res = await fetch("http://localhost:8080/tasks");
    const allTasks = await res.json();
    setTasks(allTasks);
  };

  const getOneTask = async (id) => {
    const url = `http://localhost:8080/tasks/${id}`;
    const res = await fetch(url);
    const task = await res.json();
    return task;
  };

  const fillModal = async (id) => {
    const task = await getOneTask(id);
    setModalTitle(task.title);
    setModalDueDate(task.due);
    setModalDescription(task.description);
    setModalAssignment(task.assignment);
    setModalStatus(task.status);
    setModalPriority(task.priority);
  };

  const clearModal = () => {
    setModalTitle(null);
    setModalDueDate(null);
    setModalDescription(null);
    setModalAssignment(null);
    setModalStatus(null);
    setModalPriority(null);
  };

  const usePostMethod = () => {
    setSubmitMethod("post");
  };

  const usePutMethod = () => {
    setSubmitMethod("put");
  };

  const toggleTaskModal = () => {
    setShowTaskModal((curState) => !curState);
    setShowOverlay((curState) => !curState);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal((curState) => !curState);
    setShowOverlay((curState) => !curState);
  };

  const toggleOverlay = () => {
    setShowTaskModal(false);
    setShowDeleteModal(false);
    setShowOverlay(false);
  };

  const showTaskCard = () => {
    showTask(true);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
          integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
          crossorigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"
          integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        ></script>
        <title>Home</title>
      </head>

      <body>
        <div className="logo">
          <div>
            <i className="far fa-user-circle"></i>
            <span>Username</span>
          </div>
          <div>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </div>
        </div>
        <div className="container">
          <div className="side-bar">
            <div className="profile">
              <i className="far fa-user-circle"></i>
              <p>Username</p>
            </div>
            <div className="tasks">
              <Link to="/">All Tasks</Link>
            </div>
            <div className="status">
              <p>
                <Link to="/">Status</Link>
              </p>
              <div>
                <Link
                  to="/Todo"
                  className="status-item status-item-todo"
                  id="todo"
                >
                  <i className="fas fa-ellipsis-h"></i>
                  <span>Todo</span>
                </Link>
                <Link
                  to="/InProgress"
                  className="status-item status-item-inProgress"
                  id="inProgress"
                >
                  <i className="fas fa-spinner"></i>
                  <span>In Progress</span>
                </Link>
                <Link
                  to="/Review"
                  className="status-item status-item-review"
                  id="review"
                >
                  <i className="far fa-eye"></i>
                  <span>Review</span>
                </Link>
                <Link
                  to="/Done"
                  className="status-item status-item-done"
                  id="done"
                >
                  <i className="fas fa-check-circle"></i>
                  <span>Done</span>
                </Link>
              </div>
            </div>

            <a href="/" id="logout-btn" className="button-os">
              <i className="fas fa-sign-out-alt"></i>Logout
            </a>
          </div>
          <section className="desktop-main-body">
            <div className="main-body-header">
              <div className="greeting-msg">
                <div className="console-container">
                  <span id="text"></span>
                  <div className="console-underscore" id="console"></div>

                  <ChangeText />
                </div>
              </div>

              <div className="day-info">
                <i class="fas fa-sun"></i>
                <Getday />

                {/* <Weather /> */}
                <div className="today">
                  <span id="weekday-span"></span>

                  <div className="weather" id="weather-div"></div>
                </div>
                <div className="date" id="today-div"></div>
              </div>
            </div>
            <section className="task-card-container">
              <Route path="/Todo" component={Todo} />
              <Route path="/InProgress" component={InProgress} />
              <Route path="/Review" component={Review} />
              <Route path="/Done" component={Done} />
              {/* <Route> */}
              <Route path="/" exact>
                {tasks.map((t, index) => (
                  <TaskCard
                    id={t._id}
                    title={t.title}
                    due={t.due}
                    assignment={t.assignment}
                    description={t.description}
                    status={t.status}
                    priority={t.priority}
                    key={index}
                    onClickEditBtn={async () => {
                      await fillModal(t._id);
                      setModalHeader("Edit Task");
                      setBlockAddButton(true);
                      setBlockEditButton(false);
                      setTaskID(t._id);
                      toggleTaskModal();
                    }}
                    onClickDeleteBtn={() => {
                      setTaskID(t._id);
                      toggleDeleteModal();
                    }}
                  />
                ))}
                {/* </Route path='/'> */}
              </Route>
            </section>
            {/* Add task modal */}
            {showTaskModal && (
              <TaskModal
                modalHeader={modalHeader}
                taskID={taskID}
                title={modalTitle}
                due={modalDueDate}
                description={modalDescription}
                assignment={modalAssignment}
                status={modalStatus}
                priority={modalPriority}
                blockAddButton={blockAddButton}
                blockEditButton={blockEditButton}
                submitMethod={submitMethod}
                usePostMethod={usePostMethod}
                usePutMethod={usePutMethod}
                toggleTaskModal={toggleTaskModal}
              />
            )}
            {/* Delete task modal */}
            {showDeleteModal && (
              <DeleteModal
                taskID={taskID}
                toggleDeleteModal={toggleDeleteModal}
              />
            )}
            {/* Overlay */}
            {showOverlay && <Overlay toggleOverlay={toggleOverlay} />}
            <div
              onClick={() => {
                clearModal();
                setModalHeader("Add New Task");
                setBlockAddButton(false);
                setBlockEditButton(true);
                toggleTaskModal();
              }}
            >
              <AddButton />
            </div>
          </section>
        </div>
        <footer>
          <a href="/tasks">
            <i className="fas fa-home" id="home-button"></i>
          </a>
          <a href="/tasks/new">
            <i className="fas fa-plus-circle" id="add-task-lg"></i>
          </a>
          <a href="">
            <i className="fas fa-bars" id="details-button"></i>
          </a>
        </footer>
        <script type="text/javascript" src="./tasks.js"></script>
      </body>
    </html>
  );
}

export default App;
