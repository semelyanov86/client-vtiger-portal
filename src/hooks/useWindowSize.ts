import { useState, useEffect } from 'react';

interface windowSizeParams {
  width: number | null;
  height: number | null;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<windowSizeParams>({
    width: null,
    height: null,
  });

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      }, 50);
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return windowSize;
};
