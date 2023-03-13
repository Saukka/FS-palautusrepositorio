const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course}/>
      <Content parts={[part1, part2, part3]}/>
      <Total part1={part1} part2={part2} part3={part3}/>
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