import { useState, useEffect } from 'react'
import service from './services/persons'
import Person from './components/Person'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [peopleToShow, setPeopleToShow] = useState(persons)

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
          })
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
        })
    }
  }

  const deletePerson = person => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }
    service
      .deletePerson(person.id)
      .catch(error => {
        alert('An error happened. This person has probably been deleted already')
      })
    const newPersons = persons.filter(p => p.id !== person.id)
    setPersons(newPersons)
    filterPeople(filter, newPersons)
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
      <h3>Add a person</h3>
      <Filter filter={filter} handler={handleFilterChange} />
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