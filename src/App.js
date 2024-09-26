import './App.css';
import { useState } from 'react';
import Die from './components/Die.jsx';
import { nanoid } from 'nanoid';


function App() {

  const [dieNumbers, setDieNumbers] = useState(() => newDiceNumbers())

  function newDiceNumbers(){
    const diceArray = []
    for(let i = 0; i < 10; i++){
      
      diceArray.push({
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      })
    }
    return diceArray
  }

  function rollNewNumbers(){
   setDieNumbers(newDiceNumbers())
  }

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

  // console.log(diceCollection)

  


  return (
    <main>
      <div className='dice--container'>
        {diceCollection}
      </div>
      {<button className='roll--btn' onClick={()=>rollNewNumbers()} >Roll</button>}
    </main>
  );
}

export default App;
