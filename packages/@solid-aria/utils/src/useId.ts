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

import { useLayoutEffect } from './useLayoutEffect'
import { Accessor, createSignal, createEffect } from 'solid-js'
//TODO: add this function
// import {useSSRSafeId} from '@react-aria/ssr';
import { useValueEffect } from './'
let idsUpdaterMap: Map<string, (v: string) => void> = new Map()
export function useCounter(hasDefault?: boolean): Accessor<number> {
  let [count, setCount] = createSignal(0)

  useLayoutEffect(
    () => {
      if (hasDefault) {
        setCount(c => c + 1)
      }
    },
    () => hasDefault,
  )

  return count
}
export function useSSRSafeId(defaultId?: string): string {
  let counter = useCounter(!!defaultId)
  return defaultId || `react-aria$-${counter}`
}
/**
 * If a default is not provided, generate an id.
 * @param defaultId - Default component id.
 */
export function useId(defaultId?: string) {
  let [value, setValue] = createSignal(defaultId)
  let nextId: { current?: string } = {}

  //TODO: add the above function to this res variable
  //   let res = useSSRSafeId(value);
  let res = value

  let updateValue = (val: string) => {
    nextId.current = val
  }
  idsUpdaterMap.set(res() as any, updateValue)

  useLayoutEffect(() => {
    let r = res
    return () => {
      idsUpdaterMap.delete(r() || '')
    }
  }, res)

  // This cannot cause an infinite loop because the ref is updated first.
  // eslint-disable-next-line
  createEffect(() => {
    let newId = nextId.current
    if (newId) {
      nextId.current = undefined
      setValue(newId)
    }
  })

  return res as Accessor<string>
}

/**
 * Merges two ids.
 * Different ids will trigger a side-effect and re-render components hooked up with `useId`.
 */
export function mergeIds(idA: string, idB: string): string {
  if (idA === idB) {
    return idA
  }

  let setIdA = idsUpdaterMap.get(idA)
  if (setIdA) {
    setIdA(idB)
    return idB
  }

  let setIdB = idsUpdaterMap.get(idB)
  if (setIdB) {
    setIdB(idA)
    return idA
  }

  return idB
}

/**
 * Used to generate an id, and after render, check if that id is rendered so we know
 * if we can use it in places such as labelledby.
 * @param depArray - When to recalculate if the id is in the DOM.
 */
export function useSlotId(
  depArray: ReadonlyArray<() => unknown> = [],
): Accessor<string | (() => string)> {
  let id = useId()
  let [resolvedId, setResolvedId] = useValueEffect(id)
  let updateId = () => {
    setResolvedId(function* () {
      yield id

      yield document.getElementById(id()) ? id : undefined
    })
  }

  useLayoutEffect(updateId, [id, updateId, ...depArray])

  return resolvedId
}
