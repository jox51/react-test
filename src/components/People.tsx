import React, {useState, useEffect} from 'react'
import axios from 'axios'

type Person = {
  id:number 
  name: string 
  country: string

}

type Country = {
  name:string,
  count:number,
  people:string[]
}

const People : React.FC = () => {

  const [people, setPeople] = useState<Person[]>([])
  const [countries, setCountries] = useState<Country[]>([])

  useEffect(()=>{
    axios.get('https://65ca55883b05d29307e029aa.mockapi.io/a360test/items').then(response =>{
      setPeople(response.data)
      console.log(response.data)
    })
    .catch(err => {
      console.error(err)
    })

  },[])

  useEffect(()=>{
    const countryMap: {[key:string]: Country} = {};
    people.forEach(person => {
      if(!countryMap[person.country]){
        countryMap[person.country] = {
          name: person.country,
          count: 1,
          people: [person.name]
        }
      } else {
        countryMap[person.country].count++
        countryMap[person.country].people.push(person.name)
      }
    })
    setCountries(Object.values(countryMap).sort((a, b) => b.count - a.count))
  },[people])

  console.log({people, countries})

const handleClick = (country:string) => {
  setCountries(countries.filter(c => c.name !== country));
}
  

  return (
    <div>
    {countries.map(country => (
      <div key={country.name}>
        <h2 onClick={() => handleClick(country.name)}>{country.name} ({country.count})</h2>
        <p>{country.people.join(', ')}</p>
      </div>
    ))}
  </div>
  )
}

export default People
