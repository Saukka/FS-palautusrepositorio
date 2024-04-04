import { useState, useEffect } from 'react'
import service from './services/countries'

const App = () => {

  const [filter, setFilter] = useState(["Finland"])
  const [data, setData] = useState(null)
  const [countries, setCountries] = useState(null)

  useEffect(() =>{
    service
      .getAll()
      .then(response => {
        setData(response)
      })
  }, [])

  const handleCountryChange = (event) => {
    setFilter(event.target.value)
    setCountries(data.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
     Find countries <input
     value={filter}
     onChange={handleCountryChange}
     />
    <Countries countries={countries} />
    </div>
  )
}

const CountryName = ({country}) => {
  return (
    <li>{country.name.common}</li>
  )
}

const Countries = ({countries}) => {
  if (countries === null || countries.length === 0) {
    return
  } else if (countries.length === 1) {
    return (
      <div>
      <CountryInfo country={countries[0]}/>
      </div>
    )
  } else if (countries.length > 10) {
    return(
      <div>
        <span>Too many matches, specify anohter filter</span>
      </div>
    )
  }
  return(
    <div>
      <ul>
      {countries.map(country =>
        <CountryName key={country.name.common} country={country}/>
      )}
      </ul>
    </div>
  )
}

const CountryInfo = ({country}) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <br></br>
      <span>Capital {country.capital[0]}</span>
      <br></br>
      <span>Area {country.area}</span>
      <br></br>
      <br></br>
      <b>languages</b>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>
            {language}
          </li>
        ))}
      </ul>
      <br></br>
      <img src={country.flags.png}/>
    </div>
  )
}

export default App