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
    {props.name} {props.count}
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => (
    setGood(good + 1)
  )
  
  const handleNeutralClick = () => (
    setNeutral(neutral + 1)
  )
  
  const handleBadClick = () => {
    setBad(bad +1)
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
    </div>
  )
}

export default App;
