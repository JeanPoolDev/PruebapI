import { useEffect, useState } from "react"

const API_PALABRASGATITO = 'https://catfact.ninja/fact';
const APIKEY_GIFTS = 'ZTn32DZsQHhOyBFFxYeqh5PGeDodPV1N'
const API_GIFTS = 'https://api.giphy.com/v1/gifs/search'


export function App () {

  const [fact, SetFact] = useState()
  const [image, SetImage] = useState()

  useEffect(() => {

    fetch(API_PALABRASGATITO)
    .then(response => response.json())
    .then(data => {
      const {fact} = data
      SetFact(fact)

      const firstWord = fact.split(' ',[3]).join(' ')
      console.log(firstWord)

      fetch(`${API_GIFTS}?q=${firstWord}&api_key=${APIKEY_GIFTS}`)
        .then(res => res.json())
        .then(data => {
          SetImage(data.data[0].images.original.url) 
        })
    })

  }, [])


  return (
    <>
    <div className="flex mx-8 items-center min-h-screen">
      <div className="mr-10">
        <h1 className="font-black font text-xl mb-7">App de gatitos</h1>
        { fact && <p>{fact}</p> }
      </div>
      { image && <img src={image} alt={fact} /> }
    </div>
    </>
  )
}