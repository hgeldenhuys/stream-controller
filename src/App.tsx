import {createRef, useEffect, useState} from 'react'
import './App.css'
import {useEventListener} from '@mantine/hooks';
import {Title} from "@mantine/core";
import client from 'socket.io-client'
import {Arrows} from "./Arrows";
import {createRoot} from "react-dom/client";

const validKeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ArrowDownArrowUpArrowLeftArrowRight'

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
    console.log(evt.keyCode, evt.metaKey, evt.shiftKey, evt.altKey)
    if (validKeys.includes(evt.key) && !evt.metaKey) {
      if (!chars.includes(evt.key)) setChars([...chars, evt.key])
      if (!codes.includes(evt.keyCode)) setCodes([...codes, evt.keyCode])
    } else {
      console.log(evt.key)
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
    const body = window.document.body
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

  console.log(chars)
  const r= createRef<any>()
  useEffect(() => {
    r.current.focus()
  }, [])

  const keyUp = (char: string, key: number)=> () => {
    setChars(chars.filter(c=> c !== char));
    setCodes(codes.filter(c=> c !== key));
  }

  const keyDown = (char: string, key: number)=> () => {
    setChars([...chars, char]);
    setCodes([...codes, key]);
  }

  return (
    <>
      <input type="text" ref={r}/>
      <div className="App"
        style={{
        width: "20vw",
        height: 200,
        position: "absolute",
        top: "calc(25% - 120px)",
        left: 20,
        zIndex: 100
      }}>
        {/*<Arrows chars={[]}/>*/}
        <div style={{position: "absolute", left: 100, top: "calc(50%)"}}>
          <div onTouchEnd={keyUp("w", 87)} onTouchStart={keyDown('w', 87)} style={{border: '4px solid rgb(169 169 169 / 44%)', width: 50, height: 85, borderRadius: 5, position: "absolute", backgroundColor: chars.includes("w")? "rgb(169 169 169 / 24%)":undefined}}/>
          <div onTouchEnd={keyUp("d", 68)} onTouchStart={keyDown('d', 68)} style={{border: '4px solid rgb(169 169 169 / 44%)', width: 50, height: 85, borderRadius: 5, position: "absolute", backgroundColor: chars.includes("d")? "rgb(169 169 169 / 24%)":undefined, transform: "rotate(90deg) translate(69px, -69px)"}}/>
          <div onTouchEnd={keyUp("s", 83)} onTouchStart={keyDown('s', 83)} style={{border: '4px solid rgb(169 169 169 / 44%)', width: 50, height: 85, borderRadius: 5, position: "absolute", backgroundColor: chars.includes("s")? "rgb(169 169 169 / 24%)":undefined, transform: "rotate(180deg) translate(0px, -138px)"}}/>
          <div onTouchEnd={keyUp("a", 65)} onTouchStart={keyDown('a', 65)} style={{border: '4px solid rgb(169 169 169 / 44%)', width: 50, height: 85, borderRadius: 5, position: "absolute", backgroundColor: chars.includes("a")? "rgb(169 169 169 / 24%)":undefined, transform: "rotate(90deg) translate(69px, 69px)"}}/>
        </div>
      </div>
      <div className="App"
           style={{
             width: "20vw",
             height: 200,
             position: "absolute",
             top: "calc(25% - 120px)",
             right: 70,
             zIndex: 100
           }}>
        {/*<Arrows chars={[]}/>*/}
        <div style={{position: "absolute", left: 100, top: "50%"}}>
          <div onTouchEnd={keyUp("ArrowUp", 38)} onTouchStart={keyDown('ArrowUp', 38)} style={{border: '4px solid rgb(169 169 169 / 44%)', width: 50, height: 85, borderRadius: 5, position: "absolute", backgroundColor: chars.includes("ArrowUp")? "rgb(169 169 169 / 24%)":undefined}}/>
          <div onTouchEnd={keyUp("ArrowRight", 39)} onTouchStart={keyDown('ArrowRight', 39)} style={{border: '4px solid rgb(169 169 169 / 44%)', width: 50, height: 85, borderRadius: 5, position: "absolute", backgroundColor: chars.includes("ArrowRight")? "rgb(169 169 169 / 24%)":undefined, transform: "rotate(90deg) translate(69px, -69px)"}}/>
          <div onTouchEnd={keyUp("ArrowDown", 40)} onTouchStart={keyDown('ArrowDown', 40)} style={{border: '4px solid rgb(169 169 169 / 44%)', width: 50, height: 85, borderRadius: 5, position: "absolute", backgroundColor: chars.includes("ArrowDown")? "rgb(169 169 169 / 24%)":undefined, transform: "rotate(180deg) translate(0px, -138px)"}}/>
          <div onTouchEnd={keyUp("ArrowLeft", 37)} onTouchStart={keyDown('ArrowLeft', 37)} style={{border: '4px solid rgb(169 169 169 / 44%)', width: 50, height: 85, borderRadius: 5, position: "absolute", backgroundColor: chars.includes("ArrowLeft")? "rgb(169 169 169 / 24%)":undefined, transform: "rotate(90deg) translate(69px, 69px)"}}/>
        </div>
      </div>
      <iframe src="https://viewer.millicast.com?streamId=vLjcY2/l4x42dlc&controls=false" allowFullScreen width="640"
              height="480" style={{width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0}} />
    </>
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
