import './App.css';
import { useState, useEffect } from 'react';
import Die from './components/Die.jsx';
import ReactConfetti from './components/Confetti.jsx';
import Timer from './components/Timer.jsx';
import BestTime from './components/BestTime.jsx';
import { nanoid } from 'nanoid';


function App() {

  const [dieNumbers, setDieNumbers] = useState(() => newDiceNumbers())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
 

  //States for timer
  const[isActive, setIsActive] = useState(false)
  const[time, setTime] = useState(0)
  

  //State for the flag
  const [clicked, setIsClicked] = useState(false)
 

  //Effect to check if values and isHold are equal and true
  useEffect(() => {
    
    const winner = dieNumbers.every(num =>{
      return num.isHeld && dieNumbers[0].value === num.value
     })
    
     if(winner){
      bestTime()
      setTenzies(true)
      setIsActive(false)
    }
     
  }, [dieNumbers])
  
  //Function to save best time in local storage
  function bestTime(){
    const bestTime = JSON.parse(localStorage.getItem("time"))

    if(time < bestTime){
      localStorage.setItem("time", JSON.stringify(time))
    }
  }

  

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

  //Flag function: to only run the timer on the first click of roll dice.
  function toggleTimer(){
    if(!clicked){
      setIsClicked(!clicked)
      setIsActive(!isActive)
    }
  }

  //Function to roll new dice
  function rollDice(){
    setRolls(prevRolls => prevRolls + 1)
    if(!tenzies){
      setDieNumbers(prevDieNumbers => prevDieNumbers.map(item =>{
        return item.isHeld ? item : generateNewDie()
       }))
    } 
    
    //New game conditions
    else {
      setTenzies(!tenzies)
      setDieNumbers(newDiceNumbers())
      setRolls(0)
      setTime(0)
      setIsClicked(!clicked)
    }
   
    toggleTimer()
  }

  //Function to hold clicked dice
  function hold(id){
    setDieNumbers(prevDieNumbers => prevDieNumbers.map(item => {
      return item.id === id ? {...item, isHeld: !item.isHeld} : item
    }))
    toggleTimer()
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
      <Timer isActive={isActive} time={time} setTime={setTime}/>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice--container'>
        {diceCollection}
      </div>
      <div className='btm'>
        <p className='rolls'>Number of rolls: {rolls}</p>
        <div className='best-cont'>
          <p>Your best time: </p>
          <BestTime /> 
        </div>
      </div>
      {<button className='roll--btn' onClick={()=>rollDice()} >{tenzies ? "New Game": "Roll"}</button>}
      {tenzies && <ReactConfetti />}
    </main>
  );
}

export default App;
