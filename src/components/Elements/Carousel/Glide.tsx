import GlideJs from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import React, { useEffect, useRef } from 'react';
import { ChevronBarRight, ChevronBarLeft } from 'react-bootstrap-icons';

import { useWindowSize } from '../../../hooks/useWindowSize.ts';
import { useMenusStore } from '../../../stores/menus.ts';

interface Options {
  type?: 'slider' | 'carousel';
  startAt?: number;
  perView?: number;
  focusAt?: string | number;
  gap?: number;
  autoplay?: number | false;
  hoverpause?: boolean;
  keyboard?: boolean;
  bound?: boolean;
  swipeThreshold?: number | boolean;
  dragThreshold?: number | boolean;
  perSwipe?: '' | '|';
  touchRatio?: number;
  touchAngle?: number;
  animationDuration?: number;
  rewind?: boolean;
  rewindDuration?: number;
  animationTimingFunc?: string;
  waitForTransition?: boolean;
  throttle?: number;
  direction?: 'ltr' | 'rtl';
  peek?: number | string | Record<'before' | 'after', number>;
  cloningRatio?: number;
  breakpoints?: Record<string, Partial<Options>>;
  classes?: {
    swipeable: string;
    dragging: string;
    slide: Record<'clone' | 'active', string>;
    arrow: Record<'disabled', string>;
    nav: Record<'active', string>;
  };
}

interface GlideProps {
  className?: string;
  options?: Options;
  noDots?: boolean;
  noControls?: boolean;
  children: React.ReactNode;
}

interface ItemProps {
  className?: string;
  children: React.ReactNode;
}

const isElement = (node: unknown): node is Element => {
  return !!(node && (node as Element).querySelectorAll);
};

export const Glide = ({
  className = '',
  options,
  noDots = false,
  noControls = false,
  children,
}: GlideProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const glideRef = useRef<GlideJs | null>(null);
  const { width } = useWindowSize();

  const { placementStatus, behaviourStatus, attrMobile } = useMenusStore().value;

  const init = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    glideRef.current = new GlideJs(carouselRef.current as HTMLElement, options);
    if (!noDots) {
      glideRef.current.on(['mount.before'], () => {
        const bulletCount = isElement(glideRef.current?.selector)
          ? glideRef.current?.selector.querySelectorAll('.glide__slide').length
          : 0;
        const bulletWrapper = isElement(glideRef.current?.selector)
          ? glideRef.current?.selector.querySelectorAll('.glide__bullets')[0]
          : null;

        if (!bulletWrapper) {
          return;
        }

        while (bulletWrapper.firstChild) {
          bulletWrapper.removeChild(bulletWrapper.firstChild);
        }

        if (bulletCount) {
          for (let index = 0; index < bulletCount; index += 1) {
            const button = document.createElement('button');
            button.className = 'glide__bullet';
            button.setAttribute('data-glide-dir', `=${index}`);
            bulletWrapper.appendChild(button);
          }
        }
      });
    }

    // Hiding them with d-none if it is needed
    glideRef.current.on(['resize', 'build.after'], () => {
      if (!glideRef.current) {
        return;
      }

      const { perView } = glideRef.current.settings;
      const total = isElement(glideRef.current.selector)
        ? glideRef.current.selector.querySelectorAll('.glide__slide').length
        : 0;
      const sub = total - perView;

      // Adds or removes d-none class
      if (isElement(glideRef.current.selector)) {
        glideRef.current.selector.querySelectorAll('.glide__bullet').forEach((el, i) => {
          if (i > sub) {
            el.classList.add('d-none');
          } else {
            el.classList.remove('d-none');
          }
        });
      }
      // Prevents the empty last stop when resized for a larger breakpoint with more items
      if (glideRef.current.index > sub && sub >= 0) {
        glideRef.current.go(`=${sub}`);
      }
    });

    glideRef.current.mount();
  };
  const update = () => {
    glideRef.current?.update();
  };
  const destroy = () => {
    glideRef.current?.destroy();
  };

  useEffect(() => {
    init();
    return () => {
      destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (width && carouselRef.current && glideRef.current) {
      setTimeout(() => {
        update();
      }, 10);
    }
  }, [width, placementStatus, behaviourStatus, attrMobile]);

  return (
    <div ref={carouselRef} className={`glide ${className}`}>
      <div className="glide__track" data-glide-el="track">
        <div className="glide__slides">{children}</div>
        {!noControls && (
          <div className="text-center">
            <span className="glide__arrows slider-nav" data-glide-el="controls">
              <button
                type="button"
                className="btn btn-icon btn-icon-only btn-outline-primary"
                data-glide-dir="<"
              >
                <ChevronBarLeft></ChevronBarLeft>
              </button>
            </span>{' '}
            {!noDots && <span className="glide__bullets" data-glide-el="controls[nav]" />}{' '}
            <span className="glide__arrows slider-nav" data-glide-el="controls">
              <button
                type="button"
                className="btn btn-icon btn-icon-only btn-outline-primary"
                data-glide-dir=">"
              >
                <ChevronBarRight></ChevronBarRight>
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const Item = ({ className = '', children }: ItemProps) => (
  <div className={`glide__slide ${className}`}>{children}</div>
);

Glide.Item = Item;
