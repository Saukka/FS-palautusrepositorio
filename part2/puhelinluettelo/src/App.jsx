import { useState, useEffect } from 'react'
import axios from 'axios'

import Person from './components/Person'

const App = () => {
  const server = 'http://localhost:3001/persons'

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [peopleToShow, setPeopleToShow] = useState(persons)

  useEffect(() => {
    console.log('effect')
    axios
      .get(server)
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        filterPeople(filter, response.data)
      })
  }, [])
  console.log('render', persons.length, ' persons')


  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
      filterPeople(filter, persons.concat(person))
    }

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
      <Persons people={peopleToShow} />
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

const Persons = ({people}) => {
  return (
    <div>
      <ul>
        {people.map(person =>
          <Person key={person.name} person={person} />
          )}
      </ul>
    </div>
  )
}

export default App