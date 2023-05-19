import { MutableRefObject, useRef, useState } from 'react';

const none = {};
function useLazyRef(init: () => unknown) {
  return useState(init)[0];
}

export function useJitRef<
  F extends (...args: unknown[]) => T,
  T = ReturnType<F>
>(init: F): MutableRefObject<T> {
  const value = useRef<T | typeof none>(none);
  const ref = useLazyRef(() => ({
    get current() {
      if (value.current === none) {
        value.current = init();
      }
      return value.current;
    },
    set current(v) {
      value.current = v;
    }
  }));

  return ref as MutableRefObject<T>;
}
