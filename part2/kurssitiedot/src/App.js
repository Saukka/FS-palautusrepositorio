const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name}/>
      <Content parts={course.parts} />
    </div>
  )
}

const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Content = ({parts}) => {

  let total = 0
  for (let i = 0; i < parts.length; i++) {
    total += parts[i].exercises
  }

  return (
    <div>
      <ul>
        {parts.map(part =>
          <Part key={part.id} part={part}/>
        )}
      </ul>
      <b>total of {total} exercises</b>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      <li>{part.name} {part.exercises}</li>
    </div>
  )
}

export default App