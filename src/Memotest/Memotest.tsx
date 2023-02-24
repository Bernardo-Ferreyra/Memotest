
import './memotest.css'
import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti' 

const IMAGES =[
    "https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/angularjs-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/chrome-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/git-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/nodejs-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/react-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/vuejs-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/typescript-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/docker-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/mongodb-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/html5-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/css3-original.svg?size=128&color=currentColor"

].flatMap((image)=> [`a|${image}`, `b|${image}`]).sort(()=> Math.random() -0.5);

const Memotest = () => {
  const [gueseed, setGueseed] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [showConfetti, setConfetti] = useState({showConfetti: false})


  useEffect(() => {
    if (selected.length === 2){
      if(selected[0].split("|")[1] === selected[1].split("|")[1]){
        setGueseed((gueseed)=> gueseed.concat(selected))
      }
      setTimeout(() => setSelected([]), 1000)
    }

  }, [selected])

  useEffect(() => {
    if (gueseed.length === IMAGES.length){
      setConfetti({ showConfetti: true})
      setTimeout(() => location.reload(), 8000)
      
    }
  }, [gueseed])
  
  
  return (
    <div className='memotest-container'>
    {showConfetti.showConfetti && <ReactConfetti/> }
    
    {gueseed.length === IMAGES.length ? <h1>GANASTE!</h1> :<h1>Memotest</h1>}

    <ul className="memotest--main">
      {IMAGES.map((image) => {
        const [,url]= image.split("|")
        return(

          <li 
            key={image} 
            className='card'
            onClick={()=>selected.length < 2 && setSelected((selected) => selected.concat(image))}
          >
           {selected.includes(image) || gueseed.includes(image) ? 
              (
                <img  src={url} alt="icon" />
              ) : (
                <img  src="https://icongr.am/clarity/search.svg?size=128&color=dcdcdc" alt="icon" />
              )
            }
          </li>
        )
      })}
    </ul>

    </div>
  )
}

export default Memotest