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

  return (
    <div>
      <ul>
        {parts.map(part =>
          <Part key={part.id} part={part}/>
        )}
      </ul>
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