import { useState, useEffect } from 'react';

export const useWindowScroll = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const offset = 80;
  let windowScrolled = false;
  let prevScrollPos = window.pageYOffset;
  // eslint-disable-next-line
  const handleLoad = () => {
    prevScrollPos = window.pageYOffset;
  };
  // eslint-disable-next-line
  const handleScroll = () => {
    windowScrolled = true;
  };
  // Horizontal menu hiding and showing based on menu behaviour and scroll position
  // eslint-disable-next-line
  const onWindowScrollInterval = () => {
    if (windowScrolled) {
      const currentScrollPos = window.pageYOffset;
      windowScrolled = false;

      if (Math.abs(prevScrollPos - currentScrollPos) <= offset && currentScrollPos > offset) {
        prevScrollPos = currentScrollPos;
        return;
      }

      if (prevScrollPos > currentScrollPos || currentScrollPos <= offset) {
        setScrolled(false);
      } else if (prevScrollPos <= currentScrollPos && currentScrollPos > offset) {
        setScrolled(true);
      }
      prevScrollPos = currentScrollPos;
    }
  };
  useEffect(() => {
    const intervalId = setInterval(onWindowScrollInterval, 200);

    window.addEventListener('load', handleLoad);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleLoad);
    };
  }, [handleLoad, handleScroll, onWindowScrollInterval]);

  return scrolled;
};
