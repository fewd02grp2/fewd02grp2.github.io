import React, { Component } from 'react'
import './DeleteModal.css'

export default function DeleteModal(props) {
    const handleDeleteTask = async () => {
        const setting = {
            method: 'DELETE'
        }
        const url = `http://localhost:8080/tasks/${props.taskID}`
        const res = await fetch(url, setting)
    }

    return (
        <div className="delete-modal"> 
            <i className="fas fa-times close-delete-modal" onClick={props.onClick}></i>
            <h3>Confirm delete?</h3>
            <div>
                <button className="close-delete-modal" onClick={props.onClick}>Cancel</button>
                <button className="confirm-delete" onClick={(evt) => {
                    evt.preventDefault()
                    handleDeleteTask()
                    window.location.reload()
                    }}>Delete</button>
            </div>
        </div>
    )
}