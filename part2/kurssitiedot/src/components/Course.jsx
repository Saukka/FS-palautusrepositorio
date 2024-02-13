
const Course = ({course}) => {
    return (
      <div> 
        <Header header={course.name}/>
        <Content parts={course.parts} />
      </div>
    )
  }
  
const Header = ({header}) => {
return (
    <div>
    <h2>{header}</h2>
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
        <b><Total parts={parts}/></b>
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

const Total = ({parts}) => {

const total = parts.reduce( (s,p) => {
return s + p.exercises
}, 0)

return (
    <div>
    <br></br>
    Total of {total} exercises
    </div>
)
}
  export default Course