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

import {DOMAttributes} from '@react-types/shared';
import {mergeProps, useSyncRef} from '@solid-aria/utils';
import {useContext,createContext,Context} from 'solid-js';

export interface DOMPropsResponderProps extends DOMAttributes {
  ref?: Element
}

interface IDOMPropsResponderContext extends DOMAttributes {
  register(): void,
  ref?: Element
}

export const DOMPropsResponderContext:Context<IDOMPropsResponderContext|undefined> = createContext<IDOMPropsResponderContext>();

export function useDOMPropsResponderContext(props: DOMPropsResponderProps): DOMPropsResponderProps {
  // Consume context from <DOMPropsResponder> and merge with props.
  let context = useContext(DOMPropsResponderContext);
  if (context) {
    let {register, ...contextProps} = context;
    props = mergeProps(contextProps, props);
    register();
  }
  useSyncRef(context as any, props.ref);

  return props;
}
