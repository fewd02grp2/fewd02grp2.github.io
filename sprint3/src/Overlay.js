import React, { Component } from 'react'
import './Overlay.css'

export default function Overlay(props) {
    return (
        <div className="overlay" onClick={props.toggleOverlay}></div>
    )
}