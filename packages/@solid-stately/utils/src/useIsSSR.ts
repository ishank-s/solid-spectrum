import { isServer } from 'solid-js/web'

export default function useIsSSR() {
  return isServer
}
