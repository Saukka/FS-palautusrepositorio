import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherURL = `https://api.weatherapi.com/v1/current.json?key=${api_key}`

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => {
    return response.data
  })
}

const getWeather = (city) => {
    const request = axios.get(`${weatherURL}&q=${city}&aqi=no`)
    
    return request.then(response => {
        return response.data
    })
}


export default { getAll, getWeather}