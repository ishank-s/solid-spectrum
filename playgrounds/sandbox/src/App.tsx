import type { Component } from 'solid-js'
import { Hello } from '@solid-spectrum/hello'
import {useToggleState} from "@solid-spectrum/solid-stately"
import logo from './logo.svg'
import styles from './App.module.css'

const App: Component = () => {
  const {isSelected,setSelected,toggle} = useToggleState({isSelected:true})
  return (
    <div>
      <input type="checkbox" checked={isSelected()}/>
      <button onClick={toggle}>Click</button>
    </div>
  )
}

export default App
