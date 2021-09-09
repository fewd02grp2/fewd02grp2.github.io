import { useState } from 'react'
import './LoginModal.css'

function LoginModal(props) {
    const [ text, setText ] = useState('Login')
    const [ isUserExist, setIsUserExist ] = useState(false)
    const [ isInvalidLogin, setIsInvalidLogin ] = useState(false)
    const [ isRegisterForm, setIsRegisterForm ] = useState(false)
    const [ isNewRegistered, setIsNewRegistered ] = useState(false)

    const switchToRegisterForm = () => {
        setText('Register')
        setIsRegisterForm(true)
    }

    const returnToLoginForm = () => {
        setText('Login')
        setIsRegisterForm(false)
    }

    const handleLogin = async (user) => {
        const url = `http://localhost:8080/login`
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const foundUser = await res.json()
        if (res.ok) {
            // console.log(foundUser[0]._id)
            // console.log(foundUser[0].username)
            props.setUserID(foundUser[0]._id)
            props.setUserName(foundUser[0].username)
            // console.log(foundUser[0].username)
            // console.log(`Current user ID is ${foundUser[0]._id}`)
            props.onLogin()
        }
        else setIsInvalidLogin(true)
    }

    const handleRegister = async (user) => {
        const userUrl = `http://localhost:8080/users`
        const registerUrl = `http://localhost:8080/register`
        const setting = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        }

        const userRes = await fetch(userUrl, setting)
        // const userData = await userRes.json()
        if (userRes.ok) {
            setIsUserExist(true)
            // console.log(`Username already exist!`)
        } else {
            const registerRes = await fetch(registerUrl, setting)
            if (registerRes.ok) {
                setIsUserExist(false)
                setIsNewRegistered(true)
            }
        }
    }

    return(
        <div className="login-modal"> 
            <form action="" onSubmit={async evt => {
                evt.preventDefault()
                const { username, password } = evt.target
                const userObj = {
                    username: username.value,
                    password: password.value
                }
                // console.log(userObj)
                if (isRegisterForm) {
                    handleRegister(userObj)
                } else if (!isRegisterForm) {
                    handleLogin(userObj)
                }
            }}>
                <h3>{text}</h3>
                <div className="form-row">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" />
                </div>
                <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" />
                </div>
                {!props.isLoggedIn && <p className="no-acct" onClick={() => {
                    setIsInvalidLogin(false)
                    switchToRegisterForm()
                }}>Don't have an account?</p>}
                {isRegisterForm && <p className="return-msg" onClick={() => {
                    setIsUserExist(false)
                    returnToLoginForm()
                }}><i class="fas fa-arrow-left"></i>Return to Login</p>}
                {isNewRegistered && <p className="success-msg"><i class="far fa-check-circle"></i>New User Registered! Return to Login</p>}
                {isInvalidLogin && <p className="error-msg"><i class="fas fa-times"></i>Invalid username/password</p>}
                {isUserExist && <p className="error-msg"><i class="fas fa-times"></i>Username already exist!</p>}
                <button type="submit">{text}</button>
            </form>
        </div>
    )
}

export default LoginModal