import { useEffect, useRef, useState } from 'react';

export const UNDO_TIME = 4000;

type CallbackFn = () => Promise<any>;

export function useUndo() {
  const [undoing, setUndoing] = useState(false);
  const [cancel, setCancel] = useState(false);
  const timeout = useRef<any>();

  const [callback, setCallback] = useState<CallbackFn>();

  useEffect(() => {
    clearTimeout(timeout.current);
    if (undoing) {
      timeout.current = setTimeout(() => {
        if (callback) {
          callback();
        }
        setUndoing(false);
      }, UNDO_TIME);
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [undoing, callback]);

  useEffect(() => {
    if (cancel) {
      setUndoing(false);
      setCancel(false);
      clearTimeout(timeout.current);
    }
  }, [cancel, timeout]);

  function start(func: CallbackFn) {
    setCallback(() => func);
    setUndoing(true);
  }

  return {
    undoing,
    start,
    cancel: () => setCancel(true),
  };
}
