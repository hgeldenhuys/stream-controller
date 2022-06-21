import {useEffect, useState} from 'react'
import './App.css'
import {useEventListener} from '@mantine/hooks';
import {Title} from "@mantine/core";
import client from 'socket.io-client'

const validKeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

type Vector = [number, number]

interface InputChangedEvent {
  keys?: Array<number>,
  left?: Vector
  right?: Vector
}


// const server = client('ws://localhost:4000/server')
// server.on('connect', () => {
//   console.log('👋 CONNECTED server')
//   server.onAny((evt)=> {
//     console.log("👋 ANY", evt)
//   })
//   server.on("Connected", (event) => {
//     console.log("👋 Connected", event)
//   })
//   server.on("InputChanged", (event) => {
//     console.log("👋 EVENT RECEIVED", event)
//   })
// })

// const socket = client('ws://localhost:4000/client')
const socket = client('wss://staging-gateway.herokuapp.com/client')
socket.on('connect', () => {
  console.log('👋 CONNECTED client')
  // socket.emit("")
})


function App() {
  const [chars, setChars] = useState<Array<string>>([])
  const [codes, setCodes] = useState<Array<number>>([])
  const [send, setSend] = useState<InputChangedEvent>({})

  const refMouse = useEventListener('mousemove', (evt)=>{
    // console.log(evt.screenX, evt.screenY)
  });
  const refDown = useEventListener('keydown', (evt)=>{
    evt.preventDefault()
    // console.log(evt.metaKey, evt.shiftKey, evt.altKey)
    if (validKeys.includes(evt.key) && !evt.metaKey) {
      if (!chars.includes(evt.key)) setChars([...chars, evt.key])
      if (!codes.includes(evt.keyCode)) setCodes([...codes, evt.keyCode])
    }
  });
  const refUp = useEventListener('keyup', (evt)=>{
    evt.preventDefault()
    if (validKeys.includes(evt.key)) {
      if (chars.includes(evt.key)) setChars(chars.filter(c => c !== evt.key))
      if (codes.includes(evt.keyCode)) setCodes(codes.filter(c => c !== evt.keyCode))
    }
  });
  // const ref = useMergedRef(refUp, refDown, refMouse);
  useEffect(()=>{
    const body = document.body
    console.log(body)
    refDown.current = body
    refUp.current = body
    refMouse.current = body
  }, [])

  useEffect(()=>{
    const event: InputChangedEvent = {
      keys: codes
    }
    console.log(`Sending`, JSON.stringify(event))
    if (JSON.stringify(event) !== JSON.stringify(send)) {
      socket.emit("InputChanged", event)
      setSend(event)
    }
  }, [codes])

  return (
    <div className="App" >
      <Title>Chars: {JSON.stringify(chars)}</Title>
      <Title>Codes: {JSON.stringify(codes)}</Title>
    </div>
  )
}
//
// setTimeout(()=>{
//   console.log("Typing...")
//   document.body.dispatchEvent(new KeyboardEvent('keydown', {
//     'key': 'a'
//   }));
// },2000)

export default App
