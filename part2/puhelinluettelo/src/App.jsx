import { useState, useEffect } from 'react'
import service from './services/persons'
import Person from './components/Person'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [peopleToShow, setPeopleToShow] = useState(persons)
  const [message, setMessage] = useState('')
  const [notiColor, setColor] = useState()

  const green = "notification"
  const red = "errorNoti"

  useEffect(() => {
    service
      .getAll()
      .then(persons => {
        setPersons(persons)
        setPeopleToShow(persons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(e => e.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find(person => person.name === newName)
        const changedPerson = {...oldPerson, number: newNumber}
        service
          .update(changedPerson)
          .then(returnedPerson => {
            const newPersons = persons.map(person => person.id !== changedPerson.id ? person : returnedPerson)
            setPersons(newPersons)
            filterPeople(filter, newPersons)
            Noti(`Replaced number of ${changedPerson.name}`, green)
          })
          .catch(
            Noti(`Information of ${changedPerson.name} has already been removed from server`, red)
          )
      } else {
        return
      }
    } else {
      service
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          filterPeople(filter, persons.concat(returnedPerson))
          Noti(`Added ${returnedPerson.name}`, green)
        })
    }
  }

  const deletePerson = person => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }
    const name = person.name
    service
      .deletePerson(person.id)
      .catch(error => {
        Noti(`Information of ${name} has already been removed from server`, red)
      })
    const newPersons = persons.filter(p => p.id !== person.id)
    setPersons(newPersons)
    filterPeople(filter, newPersons)
    Noti(`Deleted information of ${name}`, green)
  }

  const Noti = (message, color) => {
    setColor(color)
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const Notification = ({ message }) => {
    if (message === '') {
      return null
    }
    return (
      <div className={notiColor}>
        {message}
      </div>
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    filterPeople(event.target.value, persons)
  }

  const filterPeople = (filter, people) => {
    setPeopleToShow(people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handler={handleFilterChange} />
      <h3>Add a person</h3>
      <PersonForm addName={addName} name={newName} nameHandler={handleNameChange} number={newNumber} numberHandler={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons people={peopleToShow} removal={deletePerson}/>
    </div>
  )

}

const Filter = (props) => {
  return (
    <div>
        filter shown with: <input 
        value={props.filter}
        onChange={props.handler}
        />
      </div>
  )

}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
        <div>
          name: <input 
          value={props.name}
          onChange={props.nameHandler}
          />
        </div>
        <div>
          number: <input 
          value={props.number}
          onChange={props.numberHandler}
        />
        </div>
        <div><button type="submit">add</button></div>

      </form>
  )
}

const Persons = ({people, removal}) => {
  return (
    <div>
      <ul>
        {people.map(person =>
          <Person key={person.name} person={person} deletePerson={() => removal(person)}/>
          )}
      </ul>
    </div>
  )
}

export default App