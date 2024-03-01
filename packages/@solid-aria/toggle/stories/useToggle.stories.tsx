import { createEffect, createSignal, Component } from 'solid-js'
import { useToggle } from '../src/useToggle'
import type { Meta, StoryObj } from 'storybook-solidjs'

type ToggleStoryType = Component<{ initial?: boolean,variant:'primary'|'secondary' }>
const ToggleStory: ToggleStoryType = props => {
  const [isSelected, setSelected] = createSignal<boolean>(!!props.initial)
  let inputRef
  const state = useToggle(
    {},
    { isSelected, setSelected, toggle: () => setSelected(v => !v) },
    inputRef as any,
  )
  createEffect(() => {
    console.log(props.variant)
    setSelected(!!props.initial)
  })
  return (
    <div>
      <button
        style={
          {
            backgroundColor: state.isPressed()
              ? state.isSelected()
                ? 'darkgreen'
                : 'gray'
              : state.isSelected()
              ? 'green'
              : 'lightgray',
            color: props.initial ? 'white' : 'black',
            padding: '10',
            border: 'none',
          } as any
        }
        ref={inputRef}
        onClick={() => setSelected(v => !v)}
      >
        Pin
      </button>
    </div>
  )
}
type Story = StoryObj<ToggleStoryType>;

export const SToggleStory: Story = {
  render: (props:any) => <ToggleStory {...props} />,
  name: 'Toggle Story',
  argTypes: {
    initial: { control: 'boolean' },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
}


export default {
  title: 'Use Toggle',
  component: ToggleStory,
} as Meta<ToggleStoryType>
