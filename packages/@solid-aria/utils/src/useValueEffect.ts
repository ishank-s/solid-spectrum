/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { useLayoutEffect } from './'
import { Accessor, createSignal } from 'solid-js'

type SetValueAction<S> = (prev?: S) => Generator<any, void, unknown>
export type AnyFn = (...args: unknown[]) => unknown
// This hook works like `useState`, but when setting the value, you pass a generator function
// that can yield multiple values. Each yielded value updates the state and waits for the next
// layout effect, then continues the generator. This allows sequential updates to state to be
// written linearly.
export function useValueEffect<S>(defaultValue: S | (() => S)) {
  let [value, setValue] = createSignal(defaultValue)
  let effect: SetValueAction<S> | null = null

  // Must be stable so that `queue` is stable.
  let nextIter = () => {
    // Run the generator to the next yield.
    if (!effect) {
      return
    }
    let newValue = (effect as unknown as ReturnType<SetValueAction<S>>).next()
    while (!newValue.done && value() === newValue.value) {
      // If the value is the same as the current value,
      // then continue to the next yield. Otherwise,
      // set the value in state and wait for the next layout effect.
      newValue = (effect as unknown as ReturnType<SetValueAction<S>>).next()
    }
    // If the generator is done, reset the effect.
    if (newValue.done) {
      effect = null
      return
    }

    // Always update valueRef when setting the state.
    // This is needed because the function is not regenerated with the new state value since
    // they must be stable across renders. Instead, it gets carried in the ref, but the setState
    // is also needed in order to cause a rerender.
    setValue(newValue.value)
    // this list of dependencies is stable, setState and refs never change after first render.
  }

  useLayoutEffect(() => {
    // If there is an effect currently running, continue to the next yield.
    if (effect) {
      nextIter()
    }
  })

  // queue must be a stable function, much like setState.
  let queue :(fn:any)=>void= (fn: SetValueAction<S>) => {
    effect = fn(value as any) as any
    nextIter()
    // this list of dependencies is stable, setState and refs never change after first render.
    // in addition, nextIter is stable as outlined above
  }

  return [value, queue ] as const
}
