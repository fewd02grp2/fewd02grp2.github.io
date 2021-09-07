import { useState } from 'react'
import './TaskModal.css'

export default function TaskModal(props) {

    const [ formValue, setFormValue ] = useState({
        title: props.title,
        due: props.due,
        description: props.description,
        assignment: props.assignment,
        status: props.status,
        priority: props.priority
    })

    const handleInputChange = (evt) => {
        setFormValue(evt.target.value)
    }

    const handleCreateTask = async (task) => {
        const url = `http://localhost:8080/tasks`
        const setting = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task)
        }
        const res = await fetch(url, setting)
    }

    const handleUpdateTask = async (task) => {
        const url = `http://localhost:8080/tasks/${props.taskID}`
        const setting = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        }
        const res = await fetch(url, setting)
    }

    return (
        <div className="modal">
                <i className="fas fa-times close-modal" onClick={props.toggleTaskModal}></i>
                <h3 id="modal-header">{props.modalHeader}</h3>
                <form action="" method="" onSubmit={(evt) => {
                        evt.preventDefault()
                        const { title, due, description, assignment, status, priority } = evt.target
                        const taskObj = {
                            title: title.value,
                            due: due.value,
                            description: description.value,
                            assignment: assignment.value,
                            status: status.value,
                            priority: priority.value
                        }
                        if (props.submitMethod === 'post') {
                            handleCreateTask(taskObj)
                        } else if (props.submitMethod === 'put') {
                            handleUpdateTask(taskObj)
                        }
                        window.location.reload()
                    }}>
                    <div className="form-row">
                        <label for="task-title"><i className="fas fa-tasks"></i></label>
                        <div className="input-label">
                            <label for="task-title">Task Title</label>
                            <input type="text" id="task-title" name="title" placeholder="Title" value={formValue.title} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <label for="task-duedate"><i className="far fa-calendar-alt"></i></label>
                        <div className="input-label">
                            <label for="task-duedate">Due Date</label>
                            <input type="date" id="task-duedate" name="due" value={formValue.due} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <label for="task-description" className="task-description"><i className="fas fa-comment"></i></label>
                        <div className="input-label">
                            <label for="task-description">Description</label>
                            <textarea name="description" id="task-description" cols="30" rows="5" placeholder="Description" value={formValue.description} onChange={handleInputChange}></textarea>
                        </div>
                    </div>
                    <div className="form-row">
                        <label for="task-assignment"><i className="fas fa-user-check"></i></label>
                        <div className="input-label">
                            <label for="task-assignment">Assigned To</label>
                            <input type="text" id="task-assignment" name="assignment" placeholder="Assigned To" value={formValue.assignment} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <label for=""><i className="fas fa-list-ol"></i></label>
                        <div id="status-priority-pair">
                            <div className="task-status">
                                <label for="task-status" className="task-status">Status</label>
                                <select name="status" id="task-status" value={formValue.status} onChange={handleInputChange} required>
                                        <option value="todo">Todo</option>
                                        <option value="inProgress">In Progress</option>
                                        <option value="review">Review</option>
                                        <option value="done">Done</option>
                                    </select>
                            </div>
                            <div className="task-priority">
                                <label for="task-priority" className="task-priority">Priority</label>
                                <select name="priority" id="task-priority" value={formValue.priority} onChange={handleInputChange} required>
                                        <option value="High">High</option>
                                        <option value="Low">Low</option>
                                    </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="confirm-add" onClick={props.usePostMethod} disabled={props.blockAddButton}><i className="fas fa-plus"></i>ADD</button>
                    <button type='submit' className="confirm-edit" onClick={props.usePutMethod} disabled={props.blockEditButton}><i className="fas fa-edit"></i>EDIT</button>
                </form>
            </div>
    )
}