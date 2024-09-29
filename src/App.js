import './App.css';
import { useState, useEffect } from 'react';
import Die from './components/Die.jsx';
import ReactConfetti from './components/Confetti.jsx';
import { nanoid } from 'nanoid';


function App() {

  const [dieNumbers, setDieNumbers] = useState(() => newDiceNumbers())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)

  //Effect to check if values and isHold are equal and true
  useEffect(() => {
    
    const winner = dieNumbers.every(num =>{
      return num.isHeld && dieNumbers[0].value === num.value
     })
    
     if(winner){
      setTenzies(true)
    }
     
  }, [dieNumbers])

  //Function to generate a new die
  function generateNewDie(){
    return {
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
    }
  }

  //Function to set the initial value of dieNumbers
  function newDiceNumbers(){
    const diceArray = []
    for(let i = 0; i < 10; i++){
      
      diceArray.push(generateNewDie())
    }
    return diceArray
  }

  //Function to roll new dice
  function rollDice(){
    setRolls(prevRolls => prevRolls + 1)
    if(!tenzies){
      setDieNumbers(prevDieNumbers => prevDieNumbers.map(item =>{
        return item.isHeld ? item : generateNewDie()
       }))
    } else {
      setTenzies(!tenzies)
      setDieNumbers(newDiceNumbers())
      setRolls(0)
    }
  }

  //Function to hold clicked dice
  function hold(id){
    setDieNumbers(prevDieNumbers => prevDieNumbers.map(item => {
      return item.id === id ? {...item, isHeld: !item.isHeld} : item
    }))
  }

  const diceCollection = dieNumbers.map((item) => {
    return <Die key={item.id} 
                value={item.value} 
                isHeld={item.isHeld} 
                hold={()=> hold(item.id)}/> 
  })

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice--container'>
        {diceCollection}
      </div>
      <p className='rolls'>Number of rolls: {rolls}</p>
      {<button className='roll--btn' onClick={()=>rollDice()} >{tenzies ? "New Game": "Roll"}</button>}
      {tenzies && <ReactConfetti />}
    </main>
  );
}

export default App;
