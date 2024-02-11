const Login = ({userName, handleUserNameChange, password, handlePasswordChange, onSubmit})=>{
    return(
        <form onSubmit={onSubmit}>
            <div>
                userName: <input value={userName} onChange={handleUserNameChange}/>
            </div>
            <div>
                password: <input value={password} onChange={handlePasswordChange}/>
            </div>
            <div>
                <button type="submit">Log in</button>
            </div>
        </form>
    )
}

export default Login