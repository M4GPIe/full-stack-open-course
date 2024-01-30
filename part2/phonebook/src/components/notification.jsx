const Notification = ({message,type})=>{
    const style = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
    switch(type){
        case "error":
            style.color = 'red'
            break
        case "success":
            style.color = 'green'
            break
        case "update":
            style.color = 'blue'
        default:
    }
    console.log(message===null)
    //display notificaton only when there's a message
    if (message === '') {
        return null
    }

    return (
    <div style={style}>
        {message}
    </div>
    )
}
export default Notification