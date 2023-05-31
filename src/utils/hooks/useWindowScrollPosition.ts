import _throttle from 'lodash.throttle';
import { useEffect, useState } from 'react';

import { isBrowser } from '../isBrowser';

interface UseWindowScrollPositionOptions {
  throttle: number;
}

const defaultOptions = {
  throttle: 100,
};

const getPosition = () => ({
  x: isBrowser ? window.pageXOffset : 0,
  y: isBrowser ? window.pageYOffset : 0,
});

export function useWindowScrollPosition(opts: UseWindowScrollPositionOptions = defaultOptions) {
  const [position, setPosition] = useState(getPosition());

  useEffect(() => {
    const handleScroll = _throttle(() => {
      setPosition(getPosition());
    }, opts.throttle);

    if (isBrowser) {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [opts.throttle]);

  return position;
}
