import { createSignal, type Component, createEffect } from 'solid-js'
import { debugSignal } from '@solid-devtools/logger'
import { AriaToggleButtonProps, createToggleButton } from '@solid-aria/button'
import 'solid-devtools'

const ToggleButton = (props: AriaToggleButtonProps) => {
  let ref: HTMLButtonElement | undefined

  const { buttonProps, isPressed, state } = createToggleButton(props, () => ref)
  return (
    <>
      <button
        {...buttonProps}
        style={{
          'background-color': isPressed()
            ? state.isSelected()
              ? 'darkblue'
              : 'darkgreen'
            : state.isSelected()
            ? 'blue'
            : 'green',
          color: 'white',
          padding: '10px',
          cursor: 'pointer',
          'user-select': 'none',
          '-webkit-user-select': 'none',
          border: 'none',
        }}
        ref={ref}
      >
        {isPressed()
          ? state.isSelected()
            ? 'darkblue'
            : 'darkgreen'
          : state.isSelected()
          ? 'blue'
          : 'green'}
        {props.children}
      </button>
      <button
      
      >
        {props.children}
      </button>
    </>
  )
}

function App() {
  return <ToggleButton>Test</ToggleButton>
}

export default App
