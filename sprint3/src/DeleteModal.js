import React, { Component } from 'react'
import './DeleteModal.css'

export default function DeleteModal(props) {
    return (
        <div className="delete-modal"> 
            <i className="fas fa-times close-delete-modal" onClick={props.onClick}></i>
            <h3>Confirm delete?</h3>
            <div>
                <button className="close-delete-modal">Cancel</button>
                <button className="confirm-delete" onClick="location.reload()">Delete</button>
            </div>
        </div>
    )
}