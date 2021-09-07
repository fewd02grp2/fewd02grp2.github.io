import React, { Component } from "react";
import "./TaskCard.css";

export default function TaskCard(props) {
  const statusIcon = {
    todo: "ellipsis-h",
    inProgress: "spinner",
    review: "eye",
    done: "check-circle",
  };

  return (
    <div className={"task-card " + props.status}>
      <div className="task-card-status">
        <i className={"fa fa-" + statusIcon[props.status]}></i>
      </div>
      <div className="task-card-body">
        <div>
          <span className="title">{props.title}</span>
          <span className={"priority priority-" + props.priority}>
            {props.priority}
          </span>
        </div>
        <div className="description">{props.description}</div>
        <div className="due">Due: {props.due}</div>
        <div className="assign">Assigned To: {props.assignment}</div>
      </div>
      <div className="extra-functions">
        <i
          className="fas fa-edit btn-edit-task"
          id={props.id}
          onClick={props.onClickEditBtn}
        ></i>
        <i
          className="fa fa-trash btn-delete-task"
          id={props.id}
          onClick={props.onClickDeleteBtn}
        ></i>
      </div>
    </div>
  );
}
