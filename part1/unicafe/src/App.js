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

const Statistics = ({stats}) => {
  if (stats[3] == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={stats[0]}/>
          <StatisticLine text="neutral" value={stats[1]}/>
          <StatisticLine text="bad" value={stats[2]}/>
          <StatisticLine text="all" value={stats[3]}/>
          <StatisticLine text="average" value={stats[4]}/>
          <StatisticLine text="positive" value={stats[5] * 100} unit="%"/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
      <td>{props.unit}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const stats = [good, neutral, bad, all, average, positive]

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
    updateValues(newGood, bad)
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
      <Statistics stats={stats}/>
    </div>
  )
}

export default App;

