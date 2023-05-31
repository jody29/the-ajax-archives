import { useCallback, useState } from 'react';

export function useToggleList<T = any>(state: T[] = []) {
  const [list, setList] = useState<T[]>(state);

  const toggle = useCallback(
    (item: T) => {
      const copy = [...list];

      const index = copy.indexOf(item);

      if (index > -1) {
        copy.splice(index, 1);
      } else {
        copy.push(item);
      }

      setList(copy);
    },
    [list],
  );

  return {
    list,
    toggle,
    overwrite: setList,
  };
}
