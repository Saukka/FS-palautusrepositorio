import { useState } from 'react'


const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Value = (props) => (
  <div>
    {props.name} {props.count} {props.unit}
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const updateValues = (newGood, newBad) => {
    const newAll = all + 1
    setAll(newAll)

    const newAverage = (newGood - newBad)/newAll
    setAverage(newAverage)

    const newPositive = newGood/newAll
    setPositive(newPositive)
  }

  const handleGoodClick = () => {
    const newGood = good + 1
    setGood(newGood)
    updateValues(newGood, 0, bad)
  }

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    updateValues(good, bad)
  }
  
  const handleBadClick = () => {
    const newBad = bad + 1
    setBad(newBad)
    updateValues(good, newBad)
  }

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>

      <Header text="statistics"/>
      <Value name="good" count={good}/>
      <Value name="neutral" count={neutral}/>
      <Value name="bad" count={bad}/>
      <Value name="all" count={all}/>
      <Value name="average" count={average}/>
      <Value name="positive" count={positive * 100} unit="%"/> 
    </div>
  )
}

export default App;
