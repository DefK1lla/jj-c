// Файл useResize.js
import { useState, useEffect, useCallback } from 'react';

export const useResize = (myRef: any) => {
  const [height, setHeight] = useState(0);

  const handleResize = useCallback(() => {
    setHeight(myRef.current.clientHeight);
  }, [myRef]);

  useEffect(() => {
    myRef.current && myRef.current.addEventListener('resize', handleResize);
    return () => {
      myRef.current.removeEventListener('resize', handleResize);
    };
  }, [myRef, handleResize]);

  return height;
};
