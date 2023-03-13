const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header name={course}/>
      <Content parts={[parts[0], parts[1], parts[2]]}/>
      <Total part1={parts[0]} part2={parts[1]} part3={parts[2]}/>
    </div>
  )
}


const Header = (course) => {

  return (
    <div>
    <h1>{course.name}</h1>
  </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part name={parts[0].name} exercises = {parts[0].exercises}/>
      <Part name={parts[1].name} exercises = {parts[1].exercises}/>
      <Part name={parts[2].name} exercises = {parts[2].exercises}/>
    </div>
  )
}

const Part = (part) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const number = props.part1.exercises + props.part2.exercises + props.part3.exercises
  return (
    <div>
      <p>Number of exercises {number}</p>
    </div>
  )
}

export default App