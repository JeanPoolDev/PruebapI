import { useEffect, useState } from "react"

const API_PALABRASGATITO = 'https://catfact.ninja/fact';


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

      fetch(`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`)
        .then(res => res.json())
        .then(data => {
          const { mimetype } = data
          console.log(mimetype)
          SetImage(`https://cataas.com${mimetype}`)
        })


    })

    

  }, [])


  return (
    <>
    <h1 className="font-black">App de gatitos</h1>
    { fact && <p>{fact}</p> }
    { image && <img src={image} alt={fact} /> }
    </>
  )
}