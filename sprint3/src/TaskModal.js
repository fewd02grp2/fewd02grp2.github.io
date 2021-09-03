import React, { Component } from 'react'
import './TaskModal.css'

export default function TaskModal(props) {
    return (
        <div className="modal">
                <i className="fas fa-times close-modal" onClick={props.onClick}></i>
                <h3 id="modal-header">Add New Task</h3>
                <form action="/tasks" method="POST">
                    <div className="form-row">
                        <label for="task-title"><i className="fas fa-tasks"></i></label>
                        <div className="input-label">
                            <label for="task-title">Task Title</label>
                            <input type="text" id="task-title" name="title" placeholder="Title" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <label for="task-duedate"><i className="far fa-calendar-alt"></i></label>
                        <div className="input-label">
                            <label for="task-duedate">Due Date</label>
                            <input type="date" id="task-duedate" name="due" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <label for="task-description" className="task-description"><i className="fas fa-comment"></i></label>
                        <div className="input-label">
                            <label for="task-description">Description</label>
                            <textarea name="description" id="task-description" cols="30" rows="5" placeholder="Description"></textarea>
                        </div>
                    </div>
                    <div className="form-row">
                        <label for="task-assignment"><i className="fas fa-user-check"></i></label>
                        <div className="input-label">
                            <label for="task-assignment">Assigned To</label>
                            <input type="text" id="task-assignment" name="assignment" placeholder="Assigned To" />
                        </div>
                    </div>
                    <div className="form-row">
                        <label for=""><i className="fas fa-list-ol"></i></label>
                        <div id="status-priority-pair">
                            <div className="task-status">
                                <label for="task-status" className="task-status">Status</label>
                                <select name="status" id="task-status" required>
                                        <option value="todo">Todo</option>
                                        <option value="inProgress">In Progress</option>
                                        <option value="review">Review</option>
                                        <option value="done">Done</option>
                                    </select>
                            </div>
                            <div className="task-priority">
                                <label for="task-priority" className="task-priority">Priority</label>
                                <select name="priority" id="task-priority" required>
                                        <option value="High">High</option>
                                        <option value="Low">Low</option>
                                    </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="confirm-add"><i className="fas fa-plus"></i>ADD</button>
                    <button type='button' className="confirm-edit"><i className="fas fa-edit"></i>EDIT</button>
                </form>
            </div>
    )
}