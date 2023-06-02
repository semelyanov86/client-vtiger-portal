import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import styles from './ScrollByCount.module.css';

interface ScrollByCountProps {
  count: number;
  children: ReactNode[];
}

export const ScrollByCount: React.FC<ScrollByCountProps> = ({ count, children }) => {
  const [scrollVisible, setScrollVisible] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const height = (containerRef.current.clientHeight / children.length) * count;
      setScrollVisible(true);
      setScrollHeight(height * 2);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div ref={containerRef} className={styles.scrollContent}>
      {scrollVisible ? (
        <OverlayScrollbarsComponent
          style={{ height: scrollHeight }}
          options={{
            scrollbars: { autoHide: 'leave', autoHideDelay: 600 },
            overflow: { x: 'hidden', y: 'scroll' },
          }}
        >
          {children}
        </OverlayScrollbarsComponent>
      ) : (
        children
      )}
    </div>
  );
};
