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
      <Content parts={parts}/>
      <Total parts={parts}/>
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

const Total = ({parts}) => {
  const number = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
    <div>
      <p>Number of exercises {number}</p>
    </div>
  )
}

export default App