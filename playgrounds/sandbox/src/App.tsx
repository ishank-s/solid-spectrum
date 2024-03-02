import { createSignal, type Component, createEffect } from 'solid-js'
import { useToggle } from '@solid-spectrum/solid-aria'
import { debugSignal } from '@solid-devtools/logger'

const ToggleButton:Component<{initial:boolean}> = (props)=>{
  const [isSelected, setSelected] = createSignal<boolean>(props.initial)
  let inputRef:HTMLButtonElement
  const state = useToggle(
    {},
    { isSelected, setSelected, toggle: () => setSelected(v => !v) },
    inputRef!
  )
  createEffect(() => {
    console.log('Prop value changed:', props.initial);
    setSelected(props.initial)
  });
  return <button
  style={{
    backgroundColor: state.isPressed()
      ? state.isSelected()
        ? 'darkgreen'
        : 'gray'
      : state.isSelected()
      ? 'green'
      : 'lightgray',
    color: state.isSelected() ? 'white' : 'black',
    padding: '10',
    border: 'none',
  } as any}
  ref={inputRef!}
  onClick={()=>setSelected((v)=>!v)}
>
  Pin
</button>
}
const App: Component = () => {
     const [val,setVal] = createSignal(false);
  debugSignal(val)
  return (
    <div>
      <ToggleButton initial={val()}/>
      <button onClick={()=>setVal(v=>!v)}>test b</button>
    </div>
  )
}

export default App
