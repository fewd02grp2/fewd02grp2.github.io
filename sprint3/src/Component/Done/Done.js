import React, { Component } from "react";
import { useState, useEffect } from "react";
import "./Done.css";
import TaskCard from "../../TaskCard";
import App from "../../App";
export default function DoneCard(props) {
  // const [tasks, setTasks] = useState([]);
  // const [showTaskModal, setShowTaskModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [showOverlay, setShowOverlay] = useState(false);
  // const [taskID, setTaskID] = useState();
  // const [modalHeader, setModalHeader] = useState("Add New Task");
  // const [modalTitle, setModalTitle] = useState(null);
  // const [modalDueDate, setModalDueDate] = useState(null);
  // const [modalDescription, setModalDescription] = useState(null);
  // const [modalAssignment, setModalAssignment] = useState(null);
  // const [modalStatus, setModalStatus] = useState(null);
  // const [modalPriority, setModalPriority] = useState(null);
  // const [blockEditButton, setBlockEditButton] = useState(true);
  // const [blockAddButton, setBlockAddButton] = useState(true);
  // const [submitMethod, setSubmitMethod] = useState("post");

  // const getOneTask = async (id) => {
  //   const url = `http://localhost:8080/tasks/${id}`;
  //   const res = await fetch(url);
  //   const task = await res.json();
  //   return task;
  // };

  // const fillModal = async (id) => {
  //   const task = await getOneTask(id);
  //   setModalTitle(task.title);
  //   setModalDueDate(task.due);
  //   setModalDescription(task.description);
  //   setModalAssignment(task.assignment);
  //   setModalStatus(task.status);
  //   setModalPriority(task.priority);
  // };
  // const toggleTaskModal = () => {
  //   setShowTaskModal((curState) => !curState);
  //   setShowOverlay((curState) => !curState);
  // };

  // const toggleDeleteModal = () => {
  //   setShowDeleteModal((curState) => !curState);
  //   setShowOverlay((curState) => !curState);
  // };

  // if(task.status==="done"){

  return (
    <div>
      <section className="task-card-container">
        <h1>Halo</h1>
      </section>
    </div>

    // <div>
    //   <section className="task-card-container">
    //     {tasks.map((t, index) => (
    //       <TaskCard
    //         id={t._id}
    //         title={t.title}
    //         due={t.due}
    //         assignment={t.assignment}
    //         description={t.description}
    //         status={t.status}
    //         priority={t.priority}
    //         key={index}
    //         onClickEditBtn={async () => {
    //           await fillModal(t._id);
    //           setModalHeader("Edit Task");
    //           setBlockAddButton(true);
    //           setBlockEditButton(false);
    //           setTaskID(t._id);
    //           toggleTaskModal();
    //         }}
    //         onClickDeleteBtn={() => {
    //           setTaskID(t._id);
    //           toggleDeleteModal();
    //         }}
    //       />
    //     ))}
    //   </section>
    // </div>
  );
}
// }
