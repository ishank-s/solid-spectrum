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

import {FocusableElement} from '@react-types/shared';
import { mergeProps, useContext ,JSX} from "solid-js";
import {PressProps} from './usePress';
import {IPressResponderContext, PressResponderContext} from './context';
import { useSyncRef } from '@solid-aria/utils';

interface PressResponderProps extends PressProps {
  children: JSX.Element
}

export const PressResponder = ({children, ...props}: PressResponderProps, ref: FocusableElement) => {
  let isRegistered = {current:false};
  let prevContext = useContext(PressResponderContext);
  let context = mergeProps(prevContext || {}, {
    ...props,
    ref: ref || prevContext?.ref,
    register() {
      isRegistered.current = true;
      if (prevContext) {
        prevContext.register();
      }
    }
    })

  useSyncRef(prevContext as IPressResponderContext, ref);


  return (
    <PressResponderContext.Provider value={context}>
      {children}
    </PressResponderContext.Provider>
  );
};
