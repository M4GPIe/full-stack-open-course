const Header = (props)=>{
    return(<h1>{props.courseName}</h1>)
}

const Total_Exercises = (props)=>{
    const {parts} = props
    return(
      <p>Total exercises: {parts.reduce((sum, part)=>{return sum+part.exercises},0)}</p>
    )
}
const Part = (props)=>{
    return(<p>{props.part.name} {props.part.exercises}</p>)
}
  
const Content = (props)=>{
    const {parts} = props
    return(
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}

const Course = (props)=>{
    const {course} = props
    return(
        <div>
            <Header courseName={course.name}/>
            <Content parts={course.parts}/>
            <Total_Exercises parts={course.parts}/>
        </div>
    )
}

export default Course