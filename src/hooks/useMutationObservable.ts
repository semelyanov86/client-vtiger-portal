import { useEffect, useState } from 'react';

const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: false, subtree: false },
};

export const useMutationObservable = (
  targetEl: Node,
  cb: MutationCallback,
  options = DEFAULT_OPTIONS
) => {
  const [observer, setObserver] = useState<MutationObserver>({} as MutationObserver);

  useEffect(() => {
    const obs = new MutationObserver(cb);
    setObserver(obs);
  }, [cb, options, setObserver]);

  useEffect(() => {
    if (Object.keys(observer).length === 0) return;
    const { config } = options;
    observer.observe(targetEl, config);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer, targetEl, options]);
};
