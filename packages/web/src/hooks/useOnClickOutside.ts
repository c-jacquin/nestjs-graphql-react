import { useEffect, MutableRefObject } from 'react';

function useOnClickOutside(
  ref: MutableRefObject<HTMLElement>,
  handler: (evt: globalThis.MouseEvent) => void,
) {
  useEffect(() => {
    const listener = (event: globalThis.MouseEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
