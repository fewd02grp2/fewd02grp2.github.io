import "./Done.css";
import App from "../../App";
import React, { useState, useEffect } from "react";
import TaskCard from "../../TaskCard";

export default function Done() {
  const [tasks, setTasks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  useEffect(() => {
    const getOneTask = async () => {
      const url = `http://localhost:8080/tasks`;
      const res = await fetch(url);
      const task = await res.json();
      setTasks(task);
    };
    getOneTask();
    return () => {
      // cleanup
    };
  }, []);
  useEffect(() => {
    const toggleTaskModal = () => {
      setShowTaskModal((curState) => !curState);
      setShowOverlay((curState) => !curState);
    };
  }, []);

  useEffect(() => {
    const toggleDeleteModal = () => {
      setShowDeleteModal((curState) => !curState);
      setShowOverlay((curState) => !curState);
    };
  }, []);

  return (
    <div>
      {tasks
        .filter((t) => t.status === "done")
        .map((t) => {
          return (
            <TaskCard
              id={t._id}
              title={t.title}
              due={t.due}
              assignment={t.assignment}
              description={t.description}
              status={t.status}
              priority={t.priority}
              key={t._id}
              // onClickEditBtn={async () => {
              //   await fillModal(t._id);
              //   setModalHeader("Edit Task");
              //   setBlockAddButton(true);
              //   setBlockEditButton(false);
              //   setTaskID(t._id);
              //   toggleTaskModal();
              // }}
              // onClickDeleteBtn={() => {
              //   setTaskID(t._id);
              //   toggleDeleteModal();
              // }}
            />
          );
        })}
    </div>
  );
}
