import { createEffect } from "solid-js";

function hasResizeObserver() {
  return typeof window.ResizeObserver !== 'undefined';
}

type useResizeObserverOptionsType<T> = {
  ref: T | undefined,
  onResize: () => void
}

export function useResizeObserver<T extends Element>(options: useResizeObserverOptionsType<T>) {
  const {ref, onResize} = options;

  createEffect(() => {
    if (!ref) {
      return;
    }

    if (!hasResizeObserver()) {
      window.addEventListener('resize', onResize, false);
      return () => {
        window.removeEventListener('resize', onResize, false);
      };
    } else {

      const resizeObserverInstance = new window.ResizeObserver((entries) => {
        if (!entries.length) {
          return;
        }

        onResize();
      });
      resizeObserverInstance.observe(ref);

      return () => {
        if (ref) {
          resizeObserverInstance.unobserve(ref);
        }
      };
    }

  }, [onResize, ref]);
}
