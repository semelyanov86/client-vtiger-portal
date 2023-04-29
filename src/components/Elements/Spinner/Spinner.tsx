import { useEffect } from 'react';

export const Spinner = () => {
  useEffect(() => {
    const contentArea = document.querySelector<HTMLElement>('#contentArea');
    const htmlTag = document.documentElement;
    if (!contentArea) {
      htmlTag.setAttribute('data-show', 'false');
    } else {
      contentArea.setAttribute('style', 'opacity:0');
    }
    document.body.classList.add('spinner');
    return () => {
      setTimeout(() => {
        if (!contentArea) {
          htmlTag.setAttribute('data-show', 'true');
        } else {
          contentArea.setAttribute('style', 'opacity:1');
        }
        document.body.classList.remove('spinner');
      }, 30);
    };
  }, []);

  return <></>;
};
