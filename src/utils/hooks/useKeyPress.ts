import { useEffect } from 'react';

export function useKeyPress(targetKey: string, callback: () => void) {
  useEffect(() => {
    function downHandler({ key }: KeyboardEvent) {
      if (key === targetKey) {
        callback();
      }
    }

    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [callback, targetKey]);
}
