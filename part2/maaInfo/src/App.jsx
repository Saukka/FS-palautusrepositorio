import { useState, useEffect } from 'react'
import service from './services/countries'

const App = () => {

  const [filter, setFilter] = useState("Finland")
  const [data, setData] = useState(null)
  const [countries, setCountries] = useState(null)
  const [info, setInfo] = useState(null)

  useEffect(() =>{
    service
      .getAll()
      .then(response => {
        setData(response)
      })
  }, [])

  const infoToShow = country => {
    setInfo(country)
  }

  const handleCountryChange = (event) => {
    setInfo(null)
    setFilter(event.target.value)
    setCountries(data.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
     Find countries <input
     value={filter}
     onChange={handleCountryChange}
     />
    <Countries countries={countries} setInfo={infoToShow}/>
    <CountryInfo country={info} />
    </div>
  )
}

const CountryName = ({country, setInfo}) => {
  return (
    <li>
      {country.name.common} 
    <button type="button" onClick={setInfo}>
      show
    </button>
      </li>
  )
}

const Countries = ({countries, setInfo}) => {
  if (countries === null || countries.length === 0) {
    return
  } else if (countries.length === 1) {
    return(
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
        <CountryName key={country.name.common} country={country} setInfo={() => setInfo(country)}/>
      )}
      </ul>
    </div>
  )
}

const CountryInfo = ({country}) => {

  if (country === null) {
    return
  }

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