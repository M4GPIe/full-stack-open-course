import { useState } from 'react'

const Button=(props)=>{
  const {text, handleClick} = props
  return(<button onClick={handleClick}>{text}</button>)
}

const Header=(props)=>{
  const {text} = props
  return(<h1>{text}</h1>)
}

const StatisticLine=(props)=>{
  const {text,number} = props
  if(number>0){
    return(
      <tr>
        <td>{text}</td>
        <td>{number}</td>
      </tr>
      )
  }
}

const Statistics=(props)=>{
  const {good,neutral,bad,all}=props
  const av = (good*1+neutral*0+bad*-1)/all
  const positive = good*100/all
  if(all==0){
    return(<p>Cannot compute statistics, no reviews yet.</p>)
  }else{
    return(
      <div>
        <table>
          <tbody align = 'center'>
            <tr>
              <th>Type of Review</th>
              <th>Number of reviews</th>
            </tr>
            <StatisticLine text='good' number={good}/>
            <StatisticLine text='neutral' number={neutral}/>
            <StatisticLine text='bad' number={bad}/>
            <StatisticLine text='all' number={good+neutral+bad}/>
            <tr>
              <th>Average</th>
              <th>Positive reviews</th>
            </tr>
            <tr>
              <td>{av}</td>
              <td>{positive}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}

const App = () => {
  //state parameters
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all =good+neutral+bad

  //button onClick handlers
  const handleGood=()=>{
    setGood(good+1)
  }

  const handleNeutral=()=>{
    setNeutral(neutral+1)
  }

  const handleBad=()=>{
    setBad(bad+1)
  }


  //App body
  return (
    <div>
      <Header text='give feedback'/>
      <Button text='good' handleClick={handleGood}/>
      <Button text='neutral' handleClick={handleNeutral}/>
      <Button text='bad' handleClick={handleBad}/>
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App