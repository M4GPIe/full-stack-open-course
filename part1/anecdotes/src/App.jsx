import { useState } from 'react'
import Random_Button from './components/Random_Button'
import Vote_Button from './components/Vote_Button'



function maxIndex(arr){
  console.log('function array', arr)
  let maxI = 0
  for(let i = 0;i<arr.length;i++){
    if(arr[i]>arr[maxI]){maxI=i}
  }
  return maxI

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const mostVoted = maxIndex(votes)

  const Random_Button_handleClick = ()=>{
    let index = Math.round(Math.random()*(anecdotes.length-1))
    setSelected(index)
  }

  const Vote_Button_handleClick = ()=>{
    let new_votes = [...votes]
    new_votes[selected]+=1
    setVotes(new_votes)
  }

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <h3>{anecdotes[selected]}</h3>
        <p>This anectode has {votes[selected]||0} votes.</p>
        <Random_Button handleClick = {Random_Button_handleClick}/>
        <Vote_Button handleClick = {Vote_Button_handleClick}/>
      </div>
      <div>
        <h2>Most voted anecdote</h2>
        <h3>{anecdotes[mostVoted]}</h3>
      </div>
    </div>
  )
}

export default App