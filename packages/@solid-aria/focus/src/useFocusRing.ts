
import {isFocusVisible, useFocus, useFocusVisibleListener, useFocusWithin} from '@solid-aria/interactions';
import {Accessor, JSX, createSignal} from 'solid-js'
export interface AriaFocusRingProps {
  /**
   * Whether to show the focus ring when something
   * inside the container element has focus (true), or
   * only if the container itself has focus (false).
   * @default 'false'
   */
  within?: boolean,

  /** Whether the element is a text input. */
  isTextInput?: boolean,

  /** Whether the element will be auto focused. */
  autoFocus?: boolean
}

export interface FocusRingAria {
  /** Whether the element is currently focused. */
  isFocused: Accessor<boolean>,

  /** Whether keyboard focus should be visible. */
  isFocusVisible: Accessor<boolean>,

  /** Props to apply to the container element with the focus ring. */
  focusProps: JSX.DOMAttributes<HTMLInputElement>
}

/**
 * Determines whether a focus ring should be shown to indicate keyboard focus.
 * Focus rings are visible only when the user is interacting with a keyboard,
 * not with a mouse, touch, or other input methods.
 */
export function useFocusRing(props: AriaFocusRingProps = {}): FocusRingAria {
  let {
    autoFocus = false,
    isTextInput,
    within
  } = props;
  let state = {
    isFocused: false,
    isFocusVisible: autoFocus || isFocusVisible()
  };
  let [isFocused, setFocused] = createSignal(false);
  let [isFocusVisibleState, setFocusVisible] = createSignal<boolean>(state.isFocused && state.isFocusVisible);

  let updateState = () => setFocusVisible(state.isFocused && state.isFocusVisible);

  let onFocusChange = (isFocused:boolean) => {
    state.isFocused = isFocused;
    setFocused(isFocused);
    updateState();
  };

  useFocusVisibleListener((isFocusVisible:boolean) => {
    state.isFocusVisible = isFocusVisible;
    updateState();
  }, [], {isTextInput});

  let {focusProps} = useFocus({
    isDisabled: within,
    onFocusChange
  });

  let {focusWithinProps} = useFocusWithin({
    isDisabled: !within,
    onFocusWithinChange: onFocusChange
  });

  return {
    isFocused,
    isFocusVisible: (()=>state.isFocused) && isFocusVisibleState,
    focusProps: (within ? focusWithinProps : focusProps) as any
  };
}
