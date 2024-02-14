import { useState } from "react"
import login from "../services/login"

const Login = ({loginFunction})=>{

    
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    //input value handling
    const handleUserNameChange = ({target})=>setUserName(target.value)

    const handlePasswordChange = ({target})=>setPassword(target.value)

    //onSubmit
    const onSubmit = (event)=>{
        event.preventDefault()

        const credentials = {userName, password}
        loginFunction(credentials)
    }

    return(
        <form onSubmit={onSubmit}>
            <div>
                userName: <input id="userNameInput" value={userName} onChange={handleUserNameChange}/>
            </div>
            <div>
                password: <input id="passwordInput" value={password} onChange={handlePasswordChange}/>
            </div>
            <div>
                <button id="loginSubmitButton" type="submit">Log in</button>
            </div>
        </form>
    )
}

export default Login