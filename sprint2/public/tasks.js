// const fetch = require('node-fetch')
const taskCardContainer = document.querySelector('.task-card-container')
const weekDaySpan = document.getElementById('weekday-span')
const todayDiv = document.getElementById('today-div')
const weatherDiv = document.getElementById('weather-div')
const statusItems = document.querySelectorAll('.status-item')
const modal = document.querySelector('.modal')
const deleteModal = document.querySelector('.delete-modal')
const btnCloseModal = document.querySelector('.close-modal')
const btnOpenModal = document.querySelector('.show-modal')
const closeDeleteModalButtons = document.querySelectorAll('.close-delete-modal')
const btnConfirmDelete = document.querySelector('.confirm-delete')
const overlay = document.querySelector('.overlay')


    const displayTaskCard = async () => {
        const res = await fetch('http://localhost:8080/tasks')
        const dataArr = await res.json()
        // taskCardContainer.innerHTML= null
        for (const task of dataArr) {
            const statusIcon = {
                todo: 'ellipsis-h',
                inProgress: 'spinner',
                review: 'eye',
                done: 'check-circle'
            }
            const taskCard = document.createElement('div')
            taskCard.innerHTML = `
                <div class="task-card-status">
                    <i class="fas fa-${statusIcon[task.status]}"></i>
                </div>
                <div class="task-card-body">
                    <div>
                       <span class="title">${task.title}</span>    
                        <span class="priority priority-${task.priority}">${task.priority}</span>
                    </div>
                    <div class="description">${task.description}</div>
                    <div class="due">Due: ${task.due}</div>
                    <div class="assign">Assigned To: ${task.assignment}</div>
                    </div>
                    <div class="extra-functions">
                    <i class="fas fa-edit btn-edit-task" id=${task._id}></i>
                    <i class="fa fa-trash btn-delete-task" id="${task._id}"></i>
                    </div>
                </div>
            `
            taskCard.classList.add('task-card')
            taskCard.classList.add(`${task.status}`)
            taskCardContainer.append(taskCard)
        }
    }

    const getDayInfo = async () => {
        const dayRes = await fetch('http://localhost:8080/dayinfo')
        const dayData = await dayRes.json()
        weekDaySpan.innerText = dayData[0]
        todayDiv.innerText = dayData[1]
    
        const weatherRes = await fetch('http://localhost:8080/weatherinfo')
        const weatherData = await weatherRes.json()
        const weatherCode = weatherData.weather[0].id
        let weatherIcon
        const obj = {
            200: 'bolt',
            300: 'cloud-rain',
            500: 'cloud-showers-heavy',
            600: 'snowflake',
            700: 'smog',
            800: 'sun',
            810: 'cloud'
        }
        if (weatherCode > 800) weatherIcon = obj[810]
        else if (weatherCode == 800) weatherIcon = obj[800]
        else if (weatherCode >= 700) weatherIcon = obj[700]
        else if (weatherCode >= 600) weatherIcon = obj[600]
        else if (weatherCode >= 500) weatherIcon = obj[500]
        else if (weatherCode >= 300) weatherIcon = obj[300]
        else if (weatherCode >= 200) weatherIcon = obj[200]
        weatherDiv.innerHTML = `<i class="fas fa-${weatherIcon}"></i>`
    }


// Render body function
const renderPage = async () => {
    await displayTaskCard()
    await getDayInfo()
    
    // Modals
    const editButtons = document.querySelectorAll('.btn-edit-task')
    const modalHeader = document.querySelector('#modal-header')
    const modalTaskTitle = document.querySelector('input[name="title"]')
    const modalDueDate = document.querySelector('input[name="due"]')
    const modalDescription = document.querySelector('textarea[name="description"]')
    const modalAssignment = document.querySelector('input[name="assignment"]')
    const modalStatus = document.querySelector('select[name="status"]')
    const modalPriority = document.querySelector('select[name="priority"]')
    const modalEditButton = document.querySelector('.confirm-edit')
    const modalAddButton = document.querySelector('.confirm-add')


    const toggleModal = () => {
        modal.classList.toggle('hidden')
        overlay.classList.toggle('hidden')
    }
    const toggleDeleteModal = (taskId) => {
        deleteModal.classList.toggle('hidden')
        overlay.classList.toggle('hidden')
    }
    const toggleOverlay = () => {
        modal.classList.add('hidden')
        deleteModal.classList.add('hidden')
        overlay.classList.toggle('hidden')
    }
    btnOpenModal.addEventListener('click', () => {
        toggleModal()
        modalHeader.innerText = 'Add New Task'
        modalTaskTitle.value = null
        modalDueDate.value = null
        modalDescription.value = null
        modalAssignment.value = null
        modalStatus.value = 'todo'
        modalPriority.value = 'High'
        modalEditButton.setAttribute('disabled', '')
        modalAddButton.removeAttribute('disabled')
    })
    btnCloseModal.addEventListener('click', toggleModal)
    overlay.addEventListener('click', toggleOverlay)
    
    for (const btn of closeDeleteModalButtons) {
        btn.addEventListener('click', toggleDeleteModal)
    }

    // Task Cards
    const allTaskCards = document.querySelectorAll('.task-card')
    for (const statusItem of statusItems) {
        statusItem.addEventListener('click', (evt) => {
            evt.preventDefault()
            const status = evt.currentTarget.id
            for (const taskCard of allTaskCards) {
                if (!taskCard.classList.contains(status)) {
                    taskCard.classList.add('hidden')
                } else {
                    taskCard.classList.remove('hidden')
                }
            }    
        })
    }
    

    // PUT
    const fetchTask = async (id) => {
        const url = 'http://localhost:8080/tasks/' + id
        const res = await fetch(url)
        const task = await res.json()
        // console.log(task)
        return task
    }
    for (const editButton of editButtons) {
        editButton.addEventListener('click', async (evt) => {
            const taskID = evt.target.id
            const task = await fetchTask(taskID)
            toggleModal()
            modalHeader.innerText = 'Edit Task'
            modalTaskTitle.value = task.title
            modalDueDate.value = task.due
            modalDescription.value = task.description
            modalAssignment.value = task.assignment
            modalStatus.value = task.status
            modalPriority.value = task.priority
            modalEditButton.removeAttribute('disabled')
            modalAddButton.setAttribute('disabled', '')

            const updatedItem = {}
            modalEditButton.addEventListener('click', (evt) => {
                evt.preventDefault()
                updatedItem._id = task._id
                updatedItem.title = modalTaskTitle.value
                updatedItem.due = modalDueDate.value
                updatedItem.description = modalDescription.value
                updatedItem.assignment = modalAssignment.value
                updatedItem.status = modalStatus.value
                updatedItem.priority = modalPriority.value
                // console.log(updatedItem)
                performUpdateTask(updatedItem)
            })
        }
    )}
    const performUpdateTask = async (task) => {
        const taskObj = {
            _id: task._id,
            title: task.title,
            due: task.due,
            description: task.description,
            assignment: task.assignment,
            status: task.status,
            priority: task.priority
        }

        const url = 'http://localhost:8080/tasks/' + task._id
        // console.log(url)
        const setting = { 
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskObj)
        }
        const res = await fetch(url, setting)
        window.location.reload()
    }

    // DELETE
    const deleteTask = async (id) => {
        const url = 'http://localhost:8080/tasks/' + id
        const setting = { method: 'DELETE' }
        const res = await fetch(url, setting)
    }
    const deleteIcons = document.querySelectorAll('.btn-delete-task')
    for (const deleteIcon of deleteIcons) {
        deleteIcon.addEventListener('click', (evt) => {
            const taskID = evt.target.id
            toggleDeleteModal()
            btnConfirmDelete.addEventListener('click', () => deleteTask(taskID))
        })
    }
}
renderPage()