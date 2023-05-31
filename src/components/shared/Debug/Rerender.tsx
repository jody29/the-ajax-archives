import React, { useRef } from 'react';

export const Rerender = () => {
  const renders = useRef(0);

  return <>Rerender count: {++renders.current}</>;
};
